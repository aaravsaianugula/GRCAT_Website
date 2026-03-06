import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Rate-limiting: in-memory store keyed by IP                        */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 15 * 60 * 1000;
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
/*  Smart model rotation with cooldown tracking                       */
/* ------------------------------------------------------------------ */
const MODELS = [
  "google/gemma-3n-e4b-it:free",
  "google/gemma-3n-e4b-it:free",
  "google/gemma-3-12b-it:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
];

let nextModelIndex = 0;
const cooldowns = new Map<string, number>();

function pickModel(): string | null {
  const now = Date.now();
  const tried = new Set<string>();
  for (let i = 0; i < MODELS.length; i++) {
    const idx = (nextModelIndex + i) % MODELS.length;
    const model = MODELS[idx];
    if (tried.has(model)) continue;
    tried.add(model);

    const cooldownUntil = cooldowns.get(model) ?? 0;
    if (now >= cooldownUntil) {
      nextModelIndex = (idx + 1) % MODELS.length;
      return model;
    }
  }
  return null;
}

function markCooldown(model: string, retryAfterSec?: number) {
  const duration = (retryAfterSec ?? 60) * 1000;
  cooldowns.set(model, Date.now() + duration);
}

function getShortestCooldown(): number {
  const now = Date.now();
  let shortest = Infinity;
  for (const until of cooldowns.values()) {
    const remaining = Math.max(0, until - now);
    if (remaining < shortest) shortest = remaining;
  }
  return Math.ceil(shortest / 1000);
}

/* ------------------------------------------------------------------ */
/*  System prompt — kept minimal for small free models                */
/* ------------------------------------------------------------------ */
const SHARED_CONTEXT = `You are the AI Guide on Green River College's AI Taskforce website. Answer questions about AI at GRC.

KEY FACTS:
- AI Assessment Scale: 5 levels (1=No AI, 2=Planning only, 3=Collaboration, 4=Full AI, 5=AI Exploration). Set per-assignment.
- Taskforce launched Fall 2023, co-led by Ari Wilber. Created toolkits, workshops, and 80+ curated AI tools.
- Key policies: Never input PII/FERPA data into AI. Always disclose AI use. Always verify outputs.
- Toolkits: Syllabus Statements, Student Language, Ethics & Privacy, Prompting, Assessment Design, Custom GPTs.

NAVIGATION — if the user wants to GO somewhere, append exactly ONE command at the end:
/nav page=assessment-scale OR toolkits OR playground OR best-practices OR faqs OR about OR quiz OR events OR feedback
/walk page=PAGE — guided tour
Do NOT list multiple commands. Do NOT use commands for general questions.
Example: "The Scale has 5 levels. /nav page=assessment-scale"

RULES: Keep responses under 3 sentences. Be direct. Never fabricate policies.`;

const AUDIENCE_SUFFIX: Record<string, string> = {
  student: "Audience: Student. Be friendly. Mention tools like ChatGPT, Perplexity, QuillBot. Remind to check syllabus for AI level.",
  faculty: "Audience: Faculty. Help with syllabus AI policy, choosing Scale levels, designing assignments.",
  staff: "Audience: Staff. Focus on workflow tools and FERPA compliance.",
  default: "Audience: General visitor. Suggest exploring the Assessment Scale and AI Playground.",
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
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return NextResponse.json({ error: "Chat service not configured" }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes." }, { status: 429 });
  }

  let messages: ChatMessage[];
  let audience: string | null;
  let pageContext: string | undefined;
  try {
    const body = await req.json();
    messages = body.messages;
    audience = body.audience ?? null;
    pageContext = body.pageContext;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
  }

  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length > 10) {
    return NextResponse.json({ error: "Message limit reached (10 messages max)" }, { status: 400 });
  }

  const sanitized: ChatMessage[] = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role,
      content: String(m.content).replace(/<[^>]*>/g, "").slice(0, 800),
    }));

  const suffix = AUDIENCE_SUFFIX[audience ?? "default"] ?? AUDIENCE_SUFFIX.default;
  let systemPrompt = `${SHARED_CONTEXT}\n${suffix}`;

  if (pageContext) {
    systemPrompt += `\n\nCONTEXT:\n${pageContext.slice(0, 400)}`;
  }

  const orMessages = [
    { role: "user" as const, content: `[Instructions]\n${systemPrompt}\n[End]\n\n${sanitized[0]?.content ?? ""}` },
    ...sanitized.slice(1),
  ];

  let orResponse: Response | null = null;
  const triedModels = new Set<string>();

  for (let attempt = 0; attempt < 4; attempt++) {
    const model = pickModel();
    if (!model) break;
    if (triedModels.has(model)) continue;
    triedModels.add(model);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://grc-ai-taskforce.vercel.app",
          "X-Title": "GRC AI Taskforce",
        },
        body: JSON.stringify({
          model,
          messages: orMessages,
          max_tokens: 200,
          temperature: 0.7,
          stream: true,
        }),
      });

      if (res.ok) {
        orResponse = res;
        break;
      }

      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get("retry-after") ?? "60", 10);
        markCooldown(model, retryAfter);
      }
    } catch {
      markCooldown(model, 30);
    }
  }

  if (!orResponse) {
    const wait = getShortestCooldown();
    return NextResponse.json(
      { error: `AI models are busy. Try again in ~${wait}s.` },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readable = new ReadableStream({
    async start(controller) {
      const reader = orResponse.body?.getReader();
      if (!reader) { controller.close(); return; }

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
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
              }
            } catch { /* skip malformed chunks */ }
          }
        }
      } catch { /* stream interrupted */ }
      finally {
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
