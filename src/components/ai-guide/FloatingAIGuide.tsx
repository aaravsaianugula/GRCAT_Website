"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AIChat } from "@/components/playground/AIChat";

const PANEL_W = 380;
const PANEL_H = 520;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function FloatingAIGuide() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const [ctaDismissed, setCtaDismissed] = useState(false);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listen for CTA dismissed event
  useEffect(() => {
    // Check if already dismissed from a prior interaction this session
    if (sessionStorage.getItem("grc-floating-cta-dismissed")) {
      setCtaDismissed(true);
    }
    const handler = () => setCtaDismissed(true);
    window.addEventListener("cta-dismissed", handler);
    return () => window.removeEventListener("cta-dismissed", handler);
  }, []);

  // Mount gate (SSR safety) + intro timer
  useEffect(() => {
    setMounted(true);
    setPos({
      x: window.innerWidth - PANEL_W - 24,
      y: window.innerHeight - PANEL_H - 24,
    });

    let introReadyTimer: ReturnType<typeof setTimeout> | null = null;

    // Always show intro on every visit
    introTimerRef.current = setTimeout(() => {
      setShowIntro(true);
      // Delay introReady so browser paints the opacity-0 state first,
      // then CSS transition animates to opacity-1.
      introReadyTimer = setTimeout(() => setIntroReady(true), 80);
    }, 2000);
    return () => {
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
      if (introReadyTimer) clearTimeout(introReadyTimer);
    };
  }, []);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    setIntroReady(false);
  }, []);

  const openFromIntro = useCallback(() => {
    dismissIntro();
    setOpen(true);
    setHasOpened(true);
  }, [dismissIntro]);

  // Clamp position on resize
  useEffect(() => {
    const onResize = () => {
      setPos((prev) => {
        if (!prev) return prev;
        return {
          x: Math.min(prev.x, window.innerWidth - PANEL_W),
          y: Math.min(prev.y, window.innerHeight - 100),
        };
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    const currentPos = pos ?? { x: 0, y: 0 };
    offset.current = { x: e.clientX - currentPos.x, y: e.clientY - currentPos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - PANEL_W, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - offset.current.y)),
    });
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  // SSR guard — don't render until client-side mount
  if (!mounted) return null;

  return (
    <>
      {/* ---- First-Time Intro Overlay (pure CSS animations) ---- */}
      {showIntro && !open && (
        <>
          {/* Dim backdrop — no blur, just tint */}
          <div
            onClick={dismissIntro}
            className="fixed inset-0 z-[9997] bg-black/20 transition-opacity duration-300"
            style={{ opacity: introReady ? 1 : 0 }}
          />

          {/* Intro card */}
          <div
            className="fixed right-6 z-[9999] w-[300px] overflow-hidden rounded-2xl border border-grc-green/20 bg-white shadow-2xl transition-all duration-500 ease-out"
            style={{
              bottom: ctaDismissed ? 84 : 148,
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            }}
          >
            {/* Green header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-grc-green to-ever-green px-5 py-5">
              {/* Star icon */}
              <div
                className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-transform duration-500 ease-out"
                style={{
                  transform: introReady ? "scale(1) rotate(0deg)" : "scale(0) rotate(-90deg)",
                  transitionDelay: "200ms",
                }}
              >
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
                </svg>
              </div>

              <h3
                className="relative font-heading text-lg font-bold text-white transition-all duration-400 ease-out"
                style={{
                  opacity: introReady ? 1 : 0,
                  transform: introReady ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: "300ms",
                }}
              >
                Meet your AI Guide
              </h3>
              <p
                className="relative mt-1 font-body text-sm text-white/80 transition-all duration-400 ease-out"
                style={{
                  opacity: introReady ? 1 : 0,
                  transform: introReady ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: "400ms",
                }}
              >
                Your personal assistant for this site
              </p>
            </div>

            {/* Feature list — staggered via transition-delay */}
            <div className="px-5 py-4">
              <div className="flex flex-col gap-3">
                {[
                  { delay: "600ms", bg: "bg-sky-blue/10", text: "text-sky-blue", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "Navigate pages", desc: "for you in real time" },
                  { delay: "800ms", bg: "bg-gator-green/10", text: "text-gator-green", icon: "M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5M20.25 16.5V18A2.25 2.25 0 0118 20.25h-1.5M3.75 16.5V18A2.25 2.25 0 006 20.25h1.5", label: "Highlight sections", desc: "to walk you through" },
                  { delay: "1000ms", bg: "bg-sunrise-orange/10", text: "text-sunrise-orange", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", label: "Answer questions", desc: "about AI tools & policies" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 transition-all duration-400 ease-out"
                    style={{
                      opacity: introReady ? 1 : 0,
                      transform: introReady ? "translateX(0)" : "translateX(-12px)",
                      transitionDelay: item.delay,
                    }}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                      <svg className={`h-4 w-4 ${item.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <p className="font-body text-sm text-pine-cone/80">
                      <strong className="text-pine-cone">{item.label}</strong> {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div
                className="mt-5 flex gap-2 transition-all duration-400 ease-out"
                style={{
                  opacity: introReady ? 1 : 0,
                  transform: introReady ? "translateY(0)" : "translateY(8px)",
                  transitionDelay: "1200ms",
                }}
              >
                <button
                  onClick={openFromIntro}
                  className="flex-1 rounded-xl bg-grc-green px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-ever-green"
                >
                  Try it out
                </button>
                <button
                  onClick={dismissIntro}
                  className="rounded-xl border border-ever-green/10 px-4 py-2.5 font-body text-sm font-medium text-pine-cone/60 transition-colors hover:bg-surface-dim"
                >
                  Later
                </button>
              </div>
            </div>

            {/* Arrow pointing down to bubble */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-r border-b border-grc-green/20 bg-white" />
          </div>
        </>
      )}

      {/* ---- Floating Bubble ---- */}
      {!open && (
        <button
          onClick={() => {
            if (showIntro) dismissIntro();
            setOpen(true);
            setHasOpened(true);
          }}
          className="group fixed right-6 z-[9998] flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-grc-green shadow-[0_2px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(108,180,67,0.25)] hover:ring-grc-green/20 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-grc-green/50"
          style={{ bottom: ctaDismissed ? 24 : 88 }}
          aria-label="Open AI Guide"
        >
          <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </button>
      )}

      {/* ---- Chat Panel ---- */}
      {open && pos && (
        <div
          className="fixed z-[9999] flex flex-col rounded-2xl border border-ever-green/[0.08] bg-white shadow-2xl overflow-hidden animate-[scale-in_0.25s_ease-out]"
          style={{
            width: PANEL_W,
            height: PANEL_H,
            left: pos.x,
            top: pos.y,
          }}
        >
          {/* Draggable Header */}
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="flex items-center justify-between border-b border-ever-green/[0.06] bg-surface-dim/50 px-4 py-3 cursor-grab active:cursor-grabbing select-none touch-none shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grc-green/10">
                <svg className="h-4 w-4 text-grc-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-pine-cone">AI Guide</h3>
                <p className="font-body text-[10px] text-pine-cone/80">I can navigate you around the site</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-pine-cone/70 transition-colors hover:bg-ever-green/[0.06] hover:text-pine-cone"
                aria-label="Minimize AI Guide">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>
              <button onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-pine-cone/70 transition-colors hover:bg-sunrise-orange/10 hover:text-sunrise-orange"
                aria-label="Close AI Guide">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <AIChat floating />
        </div>
      )}
    </>
  );
}
