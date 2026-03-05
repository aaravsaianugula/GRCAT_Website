"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudience, type Audience } from "@/contexts/AudienceContext";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Starter prompts by audience                                        */
/* ------------------------------------------------------------------ */
const STARTERS: Record<string, string[]> = {
  student: [
    "What is AI?",
    "How can AI help me study?",
    "What's the AI Assessment Scale?",
    "Which AI tools are free for students?",
  ],
  faculty: [
    "How do I write an AI policy for my syllabus?",
    "Explain the AI Assessment Scale levels",
    "What AI tools work for grading?",
    "How can I detect AI-generated work?",
  ],
  staff: [
    "How can AI improve my workflow?",
    "What should I know about FERPA and AI?",
    "Which AI tools are good for email?",
    "How do I use AI responsibly at work?",
  ],
  default: [
    "What is generative AI?",
    "How is GRC using AI?",
    "What are the best AI tools?",
    "How do I use AI responsibly?",
  ],
};

const MAX_USER_MESSAGES = 10;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function AIChat() {
  const { audience } = useAudience();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const remaining = MAX_USER_MESSAGES - userMessageCount;
  const atLimit = remaining <= 0;

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Focus textarea after streaming ends
  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus();
  }, [isStreaming]);

  const starterPrompts = STARTERS[audience ?? "default"] ?? STARTERS.default;

  /* ---------------------------------------------------------------- */
  /*  Send a message                                                   */
  /* ---------------------------------------------------------------- */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming || atLimit) return;

      setError(null);
      setInput("");

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };

      const nextMessages = [...messages, userMsg];
      setMessages([...nextMessages, assistantMsg]);
      setIsStreaming(true);

      // Build payload (only role + content)
      const payload = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload, audience }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(
            data?.error ?? `Error ${res.status}`,
          );
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
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, content: accumulated }
                      : m,
                  ),
                );
              }
            } catch {
              // skip
            }
          }
        }

        // If the assistant produced nothing, show a fallback
        if (!accumulated.trim()) {
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

        const errorMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMsg);

        // Remove the empty assistant message
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming, atLimit, audience],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="rounded-3xl border border-ever-green/[0.06] bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ever-green/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Bot icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-grc-green/10">
            <svg
              className="h-5 w-5 text-grc-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-pine-cone">
              Ask the AI Guide
            </h3>
            <p className="font-body text-xs text-pine-cone/70">
              Powered by Llama 3.1
            </p>
          </div>
        </div>

        {/* Message counter */}
        <span
          className={`rounded-pill px-2.5 py-1 font-body text-xs font-semibold ${
            remaining <= 3
              ? "bg-sunrise-orange/10 text-sunrise-orange"
              : "bg-ever-green/[0.06] text-pine-cone/70"
          }`}
        >
          {remaining} left
        </span>
      </div>

      {/* Message area */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex flex-col gap-3 overflow-y-auto px-5 py-5"
        style={{ height: "24rem" }}
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            /* Starter prompts */
            <motion.div
              key="starters"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex h-full flex-col items-center justify-center gap-4"
            >
              <p className="font-body text-sm text-pine-cone/60">
                Ask me anything about AI at Green River College
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {starterPrompts.map((prompt, i) => (
                  <motion.button
                    key={prompt}
                    variants={fadeIn}
                    custom={i}
                    onClick={() => send(prompt)}
                    className="rounded-pill border border-ever-green/[0.08] bg-white px-4 py-2 font-body text-sm text-pine-cone/70 transition-colors hover:border-grc-green/30 hover:bg-grc-green/[0.04] hover:text-grc-green"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-grc-green/10">
                    <svg
                      className="h-4 w-4 text-grc-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-grc-green text-white"
                      : "bg-ever-green/[0.04] text-pine-cone"
                  }`}
                >
                  {msg.content ||
                    (msg.role === "assistant" && isStreaming ? (
                      <TypingDots />
                    ) : null)}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl bg-sunrise-orange/10 px-4 py-2.5 font-body text-sm text-sunrise-orange"
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-ever-green/[0.06] px-5 py-4"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={atLimit ? "Message limit reached" : "Ask about AI tools, policies, or best practices..."}
          disabled={isStreaming || atLimit}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-ever-green/[0.08] bg-surface-dim px-4 py-2.5 font-body text-sm text-pine-cone placeholder:text-pine-cone/35 focus:border-grc-green/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim() || atLimit}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-grc-green text-white transition-colors hover:bg-ever-green disabled:opacity-40 disabled:hover:bg-grc-green"
          aria-label="Send message"
        >
          {isStreaming ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-pine-cone/30"
          style={{
            animation: "pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  );
}
