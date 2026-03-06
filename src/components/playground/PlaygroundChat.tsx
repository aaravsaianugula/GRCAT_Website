"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { useAudience } from "@/contexts/AudienceContext";
import { AI_TOPICS, getTopicForAudience, type AITopic } from "@/lib/data/ai-topics";
import ReactMarkdown from "react-markdown";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Topic color utilities                                              */
/* ------------------------------------------------------------------ */
function getTopicColorClasses(color: string) {
  switch (color) {
    case "sky-blue":
      return { bg: "bg-sky-500/10", text: "text-sky-600", border: "border-sky-500/20", hoverBg: "hover:bg-sky-500/[0.08]" };
    case "sunrise-orange":
      return { bg: "bg-sunrise-orange/10", text: "text-sunrise-orange", border: "border-sunrise-orange/20", hoverBg: "hover:bg-sunrise-orange/[0.08]" };
    case "card-accent-purple":
      return { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20", hoverBg: "hover:bg-purple-500/[0.08]" };
    default:
      return { bg: "bg-grc-green/10", text: "text-grc-green", border: "border-grc-green/20", hoverBg: "hover:bg-grc-green/[0.08]" };
  }
}

/* ------------------------------------------------------------------ */
/*  Audience-specific defaults (when no topic is selected)             */
/* ------------------------------------------------------------------ */
const DEFAULT_STARTERS: Record<string, string[]> = {
  student: [
    "What is AI in simple terms?",
    "Can AI help me with my homework?",
    "What should I know before using ChatGPT?",
    "Is AI biased?",
  ],
  faculty: [
    "How are LLMs changing student writing?",
    "What should I know about AI for my courses?",
    "How do I set an AI policy for assignments?",
    "What are AI hallucinations?",
  ],
  staff: [
    "How can AI help with my daily tasks?",
    "What AI tools are safe for work documents?",
    "What are the FERPA risks of using AI?",
    "How do AI assistants actually work?",
  ],
  default: [
    "What is AI?",
    "How do chatbots work?",
    "What are AI's limitations?",
    "Is AI biased?",
  ],
};

const GREETING: Record<string, string> = {
  student: "Curious about AI? Pick a topic or ask anything below",
  faculty: "Explore AI concepts relevant to your teaching",
  staff: "Learn about AI to use it effectively in your role",
  default: "Choose a topic to learn about, or ask anything below",
};

const MAX_USER_MESSAGES = 10;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function PlaygroundChat() {
  const { audience } = useAudience();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<AITopic | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const remaining = MAX_USER_MESSAGES - userMessageCount;
  const atLimit = remaining <= 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus();
  }, [isStreaming]);

  /* ---------------------------------------------------------------- */
  /*  Topic selection (applies audience overrides)                     */
  /* ---------------------------------------------------------------- */
  const selectTopic = useCallback((topic: AITopic) => {
    setActiveTopic(getTopicForAudience(topic, audience));
    setMessages([]);
    setError(null);
  }, [audience]);

  const clearTopic = useCallback(() => {
    setActiveTopic(null);
    setMessages([]);
    setError(null);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Send a message                                                   */
  /* ---------------------------------------------------------------- */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming || atLimit) return;

      setError(null);
      setInput("");

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
      const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "" };
      const nextMessages = [...messagesRef.current, userMsg];
      setMessages([...nextMessages, assistantMsg]);
      setIsStreaming(true);

      const recentMessages = nextMessages.slice(-5);
      const payload = recentMessages.map((m) => ({ role: m.role, content: m.content }));
      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: payload,
            audience,
            topic: activeTopic?.id,
            mode: "playground",
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? `Error ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;
            const data = trimmedLine.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.token) {
                accumulated += parsed.token;
                setMessages((prev) =>
                  prev.map((m) => m.id === assistantMsg.id ? { ...m, content: accumulated } : m),
                );
              }
            } catch { /* skip */ }
          }
        }

        if (accumulated.trim()) {
          setMessages((prev) =>
            prev.map((m) => m.id === assistantMsg.id ? { ...m, content: accumulated.trim() } : m),
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, content: "I wasn't able to generate a response. Please try again." }
                : m,
            ),
          );
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const errorMsg = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMsg);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, atLimit, audience, activeTopic],
  );

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const showTopicSelector = !activeTopic && messages.length === 0;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="rounded-3xl border border-ever-green/[0.06] bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ever-green/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-pine-cone">
              {activeTopic ? activeTopic.title : "AI Learning Assistant"}
            </h3>
            <p className="font-body text-xs text-pine-cone/70">
              {activeTopic ? "Educational topic mode" : "Explore AI concepts interactively"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeTopic && (
            <button
              onClick={clearTopic}
              className="rounded-pill border border-ever-green/[0.08] px-3 py-1.5 font-body text-xs text-pine-cone/70 transition-colors hover:border-grc-green/30 hover:text-grc-green"
            >
              Back to Topics
            </button>
          )}
          <span className={`rounded-pill px-2.5 py-1 font-body text-xs font-semibold ${remaining <= 3 ? "bg-sunrise-orange/10 text-sunrise-orange" : "bg-ever-green/[0.06] text-pine-cone/70"}`}>
            {remaining} left
          </span>
        </div>
      </div>

      {/* Message area */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex flex-col gap-3 overflow-y-auto px-4 py-4"
        style={{ height: showTopicSelector ? "auto" : "28rem" }}
      >
        {/* Topic selector grid */}
        {showTopicSelector ? (
          <div className="flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-center font-body text-sm text-pine-cone/60">
              {GREETING[audience ?? "default"] ?? GREETING.default}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AI_TOPICS.map((baseTopic) => {
                const topic = getTopicForAudience(baseTopic, audience);
                const colors = getTopicColorClasses(topic.color);
                return (
                  <button
                    key={topic.id}
                    onClick={() => selectTopic(baseTopic)}
                    className={`group flex flex-col items-start gap-2 rounded-2xl border ${colors.border} bg-white p-4 text-left transition-all ${colors.hoverBg} hover:shadow-md`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors.bg}`}>
                      <svg className={`h-5 w-5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={topic.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-heading text-sm font-bold ${colors.text}`}>{topic.title}</h4>
                      <p className="font-body text-xs text-pine-cone/60 mt-0.5">{topic.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="relative flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-pine-cone/10" />
              <span className="font-body text-xs text-pine-cone/40">or ask anything</span>
              <div className="h-px flex-1 bg-pine-cone/10" />
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out]">
            <p className="font-body text-sm text-pine-cone/60">
              {activeTopic ? `Let's explore: ${activeTopic.title}` : (GREETING[audience ?? "default"] ?? GREETING.default)}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(activeTopic?.starterPrompts ?? DEFAULT_STARTERS[audience ?? "default"] ?? DEFAULT_STARTERS.default).map((prompt) => (
                <button key={prompt} onClick={() => send(prompt)}
                  className="rounded-pill border border-ever-green/[0.08] bg-white px-4 py-2 text-sm font-body text-pine-cone/70 transition-colors hover:border-grc-green/30 hover:bg-grc-green/[0.04] hover:text-grc-green">
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isLastAssistant = msg.role === "assistant" && !isStreaming && idx === messages.length - 1;

            return (
              <div key={msg.id}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                      <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <div className={`rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${
                      msg.role === "user" ? "bg-purple-600 text-white" : "bg-purple-50 text-pine-cone"
                    }`}>
                      {msg.content ? (
                        msg.role === "assistant" ? (
                          <div className="prose-chat"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                        ) : msg.content
                      ) : (
                        msg.role === "assistant" && isStreaming ? <TypingDots /> : null
                      )}
                    </div>

                    {/* Suggested follow-up buttons */}
                    {activeTopic && isLastAssistant && msg.content && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {activeTopic.suggestedFollowUps.map((followUp) => (
                          <button
                            key={followUp}
                            onClick={() => send(followUp)}
                            disabled={isStreaming || atLimit}
                            className="rounded-pill border border-purple-200 bg-white px-3 py-1.5 font-body text-xs text-purple-600/70 transition-colors hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-40"
                          >
                            {followUp}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {error && (
          <div className="rounded-xl bg-sunrise-orange/10 px-4 py-2.5 font-body text-sm text-sunrise-orange">
            {error}
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-ever-green/[0.06] px-4 py-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={atLimit ? "Message limit reached" : activeTopic ? `Ask about ${activeTopic.title}...` : audience === "student" ? "Ask about AI, tools, or your assignments..." : audience === "faculty" ? "Ask about AI for teaching, policies, or tools..." : audience === "staff" ? "Ask about AI for work, privacy, or productivity..." : "Ask about AI concepts, ethics, history..."}
          disabled={isStreaming || atLimit}
          rows={1}
          aria-label="Type your message"
          className="flex-1 resize-none rounded-xl border border-ever-green/[0.08] bg-surface-dim px-3 py-2 font-body text-sm text-pine-cone placeholder:text-pine-cone/60 focus:border-purple-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button type="submit" disabled={isStreaming || !input.trim() || atLimit}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:opacity-40"
          aria-label="Send message">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
        {isStreaming && (
          <button type="button" onClick={() => { abortRef.current?.abort(); setIsStreaming(false); }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-sunrise-orange text-white transition-colors hover:bg-sunrise-orange/80"
            aria-label="Stop generating">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
          </button>
        )}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="inline-block h-1.5 w-1.5 rounded-full bg-pine-cone/30"
          style={{ animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
      ))}
    </span>
  );
}
