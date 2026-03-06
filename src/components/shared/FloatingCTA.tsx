"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { springSnap } from "@/lib/animations/motion";

const STORAGE_KEY = "grc-floating-cta-dismissed";

type Phase = "init" | "visible" | "dismissed";

export function FloatingCTA() {
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    if (phase !== "init") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timer = setTimeout(
      () => setPhase("visible"),
      prefersReduced ? 0 : 3000,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  function handleDismiss() {
    setPhase("dismissed");
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new CustomEvent("cta-dismissed"));
  }

  return (
    <AnimatePresence>
      {phase === "visible" && (
      <motion.div
        key="floating-cta"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={springSnap}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2"
      >
        <Link
          href="/feedback"
          className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-5 py-3 font-body text-sm font-semibold text-white shadow-elevated transition-all hover:bg-gator-green hover:shadow-lg"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Give Feedback
        </Link>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss feedback button"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-pine-cone/10 text-pine-cone/70 transition-colors hover:bg-pine-cone/20 hover:text-pine-cone"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
