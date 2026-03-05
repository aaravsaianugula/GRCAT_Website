import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Rate-limiting: in-memory store keyed by IP                        */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 30;

const hits = new Map<string, { count: number; start: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count++;
  return entry.count > MAX_REQUESTS;
}

/* ------------------------------------------------------------------ */
/*  System prompts per audience                                       */
/* ------------------------------------------------------------------ */
const SHARED_CONTEXT = `You are the GRC AI Guide on Green River College's AI Taskforce website (grc-ai-taskforce.vercel.app).

ABOUT THE TASKFORCE: The GRC AI Taskforce launched Fall 2023 in response to rapid AI adoption on campus. Co-led by Ari Wilber (English Faculty). Mission: provide faculty, staff, and students with resources, guidance, and best practices for responsible AI use. The Taskforce created toolkits, the AI Assessment Scale, workshop trainings, and this website with 85+ curated AI tools.

AI ASSESSMENT SCALE (5 levels, set per-assignment by instructors):
- Level 1 "No AI": AI use prohibited entirely
- Level 2 "AI Planning": AI for brainstorming/outlining only, final work must be human-written
- Level 3 "AI Collaboration": AI assists throughout but student drives and edits all output
- Level 4 "Full AI": AI does heavy lifting, student curates/evaluates/refines
- Level 5 "AI Exploration": Full AI integration, focus on critical evaluation of AI capabilities

KEY POLICIES: Never input PII or FERPA-protected data into AI tools. Always disclose AI use. Always verify AI outputs — AI can hallucinate.

WEBSITE PAGES: /playground (85+ tools), /assessment-scale (scale details), /toolkits (audience toolkits), /best-practices, /faqs, /about, /events, /feedback.

RESPONSE RULES: Keep every response under 3 sentences. Be direct — no filler, no preambles, no bullet lists unless asked. Answer the question, then stop. Never fabricate policies or facts.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  student: `${SHARED_CONTEXT}

AUDIENCE: Student. Be friendly and approachable. When relevant, mention specific Playground tools (ChatGPT, Perplexity for research, QuillBot for writing, NotebookLM for studying). Always remind them to check their syllabus for their instructor's AI Assessment Scale level. Emphasize: disclose AI use, maintain academic integrity.`,

  faculty: `${SHARED_CONTEXT}

AUDIENCE: Faculty. Be collegial and respect their expertise. Help with syllabus AI policy language, choosing Assessment Scale levels for assignments, designing AI-integrated or AI-restricted assignments, and evaluating tools for classroom use. Mention the Toolkits page for syllabus templates and the 40-hour AI 101 course. Recommend MagicSchool, Diffit, and Curipod for teaching.`,

  staff: `${SHARED_CONTEXT}

AUDIENCE: Staff. Focus on operational workflow improvements. Recommend Notion AI, ClickUp AI, Otter.ai for productivity. Emphasize FERPA compliance — never input student records, SSNs, or financial data into AI. Suggest the Toolkits page for staff-specific resources and prompting guides.`,

  default: `${SHARED_CONTEXT}

AUDIENCE: General visitor. Provide helpful AI education. Suggest they select an audience role (Student, Faculty, or Staff) at the top of the page for tailored recommendations. Point them to the Playground for 85+ tools and the Assessment Scale page to understand GRC's framework.`,
};

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */
type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

export async function POST(req: NextRequest) {
  // --- API key check ---
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return NextResponse.json(
      { error: "Chat service not configured" },
      { status: 500 },
    );
  }

  // --- Rate limit ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 },
    );
  }

  // --- Parse & validate body ---
  let messages: ChatMessage[];
  let audience: string | null;
  try {
    const body = await req.json();
    messages = body.messages;
    audience = body.audience ?? null;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages array is required" },
      { status: 400 },
    );
  }

  // Enforce limits
  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length > 10) {
    return NextResponse.json(
      { error: "Message limit reached (10 messages max)" },
      { status: 400 },
    );
  }

  // Sanitize: strip HTML, enforce max length, keep only valid roles
  const sanitized: ChatMessage[] = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role,
      content: String(m.content)
        .replace(/<[^>]*>/g, "")
        .slice(0, 1000),
    }));

  // --- Build request to OpenRouter ---
  // Gemma doesn't support the "system" role, so we prepend
  // the system prompt into the first user message instead.
  const systemPrompt =
    audience && SYSTEM_PROMPTS[audience]
      ? SYSTEM_PROMPTS[audience]
      : SYSTEM_PROMPTS.default;

  const orMessages = sanitized.map((m, i) => {
    if (i === 0 && m.role === "user") {
      return {
        ...m,
        content: `[Instructions: ${systemPrompt}]\n\n${m.content}`,
      };
    }
    return m;
  });

  let orResponse: Response;
  try {
    orResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://grc-ai-taskforce.vercel.app",
          "X-Title": "GRC AI Taskforce",
        },
        body: JSON.stringify({
          model: "google/gemma-3-12b-it:free",
          messages: orMessages,
          max_tokens: 150,
          temperature: 0.7,
          stream: true,
        }),
      },
    );
  } catch {
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 502 },
    );
  }

  if (!orResponse.ok) {
    const status = orResponse.status >= 500 ? 502 : orResponse.status;
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status },
    );
  }

  // --- Stream the response back ---
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readable = new ReadableStream({
    async start(controller) {
      const reader = orResponse.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ token })}\n\n`),
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } catch {
        // stream interrupted
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
