"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { useAudience } from "@/contexts/AudienceContext";
import { findRelevantPages, buildPageContext } from "@/lib/data/site-content";
import { useAIActions, parseSlashCommands } from "@/hooks/useAIActions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: { label: string; route: string }[];
}

interface AIChatProps {
  floating?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Starter prompts by audience                                        */
/* ------------------------------------------------------------------ */
const STARTERS: Record<string, string[]> = {
  student: [
    "What is AI?",
    "How can AI help me study?",
    "What's the AI Assessment Scale?",
    "Walk me through the toolkits",
  ],
  faculty: [
    "Help me write an AI syllabus policy",
    "Explain the Assessment Scale levels",
    "Show me the assessment design toolkit",
    "How can I detect AI-generated work?",
  ],
  staff: [
    "How can AI improve my workflow?",
    "What about FERPA and AI?",
    "Show me the best AI tools for email",
    "Walk me through the ethics toolkit",
  ],
  default: [
    "What is generative AI?",
    "How is GRC using AI?",
    "Show me the AI tools",
    "Take me to the Assessment Scale",
  ],
};

const MAX_USER_MESSAGES = 10;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function AIChat({ floating = false }: AIChatProps) {
  const { audience } = useAudience();
  const { cleanResponse, getPageLinks, executeSmartNav, executeCommands, currentPage } = useAIActions();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
      const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "" };
      const nextMessages = [...messagesRef.current, userMsg];
      setMessages([...nextMessages, assistantMsg]);
      setIsStreaming(true);

      const relevantPages = findRelevantPages(trimmed);
      const pageContext = buildPageContext(relevantPages);

      // Only send last 2-3 turns to the API — keeps tokens low on free models
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
            pageContext: pageContext || undefined,
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

        // Finalize response
        if (accumulated.trim()) {
          // Parse slash commands, filter out malformed ones (e.g. "/nav toolkits" missing page=)
          const commands = parseSlashCommands(accumulated).filter((cmd) => {
            if (cmd.command === "nav" && !cmd.args.page) return false;
            if (cmd.command === "show" && !cmd.args.id) return false;
            if (cmd.command === "walk" && !cmd.args.page) return false;
            return true;
          });
          const clean = cleanResponse(accumulated);
          const links = getPageLinks(clean);
          // If clean text is empty after stripping commands, show a nav message
          const displayText = clean || "Taking you there now!";
          setMessages((prev) =>
            prev.map((m) => m.id === assistantMsg.id ? { ...m, content: displayText, links } : m),
          );
          // Primary: execute LLM slash commands; Fallback: client-side keyword matching
          if (commands.length > 0) {
            executeCommands(commands);
          }
          // Always run fallback — handles walk-through highlighting + catches missed commands
          executeSmartNav(trimmed, clean);
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
    [isStreaming, atLimit, audience, cleanResponse, getPageLinks, executeSmartNav, executeCommands],
  );

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  const containerClass = floating
    ? "flex flex-col h-full"
    : "rounded-3xl border border-ever-green/[0.06] bg-white shadow-card overflow-hidden";

  return (
    <div className={containerClass}>
      {/* Header — only in embedded mode */}
      {!floating && (
        <div className="flex items-center justify-between border-b border-ever-green/[0.06] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-grc-green/10">
              <svg className="h-5 w-5 text-grc-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-pine-cone">Ask the AI Guide</h3>
              <p className="font-body text-xs text-pine-cone/70">Powered by Gemma via OpenRouter</p>
            </div>
          </div>
          <span className={`rounded-pill px-2.5 py-1 font-body text-xs font-semibold ${remaining <= 3 ? "bg-sunrise-orange/10 text-sunrise-orange" : "bg-ever-green/[0.06] text-pine-cone/70"}`}>
            {remaining} left
          </span>
        </div>
      )}

      {/* Message area */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className={`flex flex-col gap-3 overflow-y-auto px-4 py-4 ${floating ? "flex-1 min-h-0" : ""}`}
        style={floating ? undefined : { height: "24rem" }}
      >
        {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-out]">
              <p className="font-body text-sm text-pine-cone/60">
                {floating ? "Hi! I can walk you through the site." : "Ask me anything about AI at Green River College"}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {starterPrompts.map((prompt) => (
                  <button key={prompt} onClick={() => send(prompt)}
                    className={`rounded-pill border border-ever-green/[0.08] bg-white ${floating ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} font-body text-pine-cone/70 transition-colors hover:border-grc-green/30 hover:bg-grc-green/[0.04] hover:text-grc-green`}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const contextStart = messages.length - 5;
              const showDivider = contextStart > 0 && idx === contextStart;

              return (
              <div key={msg.id}>
                {showDivider && (
                  <div className="flex items-center gap-2 py-2 select-none" aria-hidden>
                    <div className="h-px flex-1 bg-pine-cone/10" />
                    <span className="font-body text-[10px] text-pine-cone/70">new context</span>
                    <div className="h-px flex-1 bg-pine-cone/10" />
                  </div>
                )}
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-grc-green/10">
                    <svg className="h-4 w-4 text-grc-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className={`rounded-2xl px-4 py-3 font-body text-sm leading-relaxed ${
                    msg.role === "user" ? "bg-grc-green text-white" : "bg-ever-green/[0.04] text-pine-cone"
                  }`}>
                    {msg.content ? (
                      msg.role === "assistant" ? (
                        <div className="prose-chat"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                      ) : msg.content
                    ) : (
                      msg.role === "assistant" && isStreaming ? <TypingDots /> : null
                    )}
                  </div>

                  {/* Page link pills — generated client-side from AI response text */}
                  {msg.role === "assistant" && !isStreaming && (msg.links ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.links!.map((link, i) => (
                        <Link key={i} href={link.route}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-grc-green/20 bg-grc-green/[0.04] px-3 py-1.5 font-body text-xs font-medium text-grc-green transition-colors hover:bg-grc-green/10">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          {link.label}
                        </Link>
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
        className={`flex items-end gap-2 border-t border-ever-green/[0.06] px-4 py-3 ${floating ? "shrink-0" : ""}`}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={atLimit ? "Message limit reached" : floating ? "Ask me anything..." : "Ask about AI tools, policies, or best practices..."}
          disabled={isStreaming || atLimit}
          rows={1}
          aria-label="Type your message"
          className="flex-1 resize-none rounded-xl border border-ever-green/[0.08] bg-surface-dim px-3 py-2 font-body text-sm text-pine-cone placeholder:text-pine-cone/60 focus:border-grc-green/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button type="submit" disabled={isStreaming || !input.trim() || atLimit}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-grc-green text-white transition-colors hover:bg-ever-green disabled:opacity-40"
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

      {/* Remaining count badge — floating mode */}
      {floating && (
        <div className="absolute top-0 right-12 px-2 py-1">
          <span className={`rounded-pill px-2 py-0.5 font-body text-[10px] font-semibold ${remaining <= 3 ? "bg-sunrise-orange/10 text-sunrise-orange" : "bg-ever-green/[0.06] text-pine-cone/70"}`}>
            {remaining}
          </span>
        </div>
      )}
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
