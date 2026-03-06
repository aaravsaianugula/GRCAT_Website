"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import { useExplorationProgress } from "@/hooks/useExplorationProgress";
import { useAudience } from "@/contexts/AudienceContext";

const audienceLabel: Record<string, string> = {
  student: "Level up!",
  faculty: "Resources Reviewed",
  staff: "Tools Discovered",
};

const audienceRingColor: Record<string, string> = {
  student: "text-sky-blue",
  faculty: "text-gator-green",
  staff: "text-sunrise-orange",
};

export function ProgressIndicator() {
  const { percentage, mounted, trackPageVisit, categories } = useExplorationProgress();
  const { audience } = useAudience();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  // Track page visits
  useEffect(() => {
    if (mounted && pathname) {
      trackPageVisit(pathname);
    }
  }, [mounted, pathname, trackPageVisit]);

  if (!mounted || percentage === 0) return null;

  const label = audience ? (audienceLabel[audience] ?? "Exploring") : "Exploring";
  const ringColor = audience ? (audienceRingColor[audience] ?? "text-gator-green") : "text-gator-green";
  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <motion.button
        onClick={() => setExpanded((p) => !p)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card transition-shadow hover:shadow-elevated"
        aria-label={`${percentage}% explored. ${label}`}
        whileHover={{ scale: 1.05 }}
        transition={springDefault}
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ever-green/10" />
          <circle
            cx="24" cy="24" r="18"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            className={ringColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="font-heading text-[10px] font-black text-ever-green">{percentage}%</span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={springDefault}
            className="absolute bottom-14 left-0 w-52 rounded-2xl border border-ever-green/[0.06] bg-white p-4 shadow-elevated"
          >
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-ever-green/60">
              {label}
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-pine-cone/70">{categories.pages.label}</span>
                <span className="font-heading text-xs font-bold text-ever-green">{categories.pages.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-pine-cone/70">{categories.quiz.label}</span>
                <span className="font-heading text-xs font-bold text-ever-green">{categories.quiz.done ? "Done" : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-pine-cone/70">{categories.toolkits.label}</span>
                <span className="font-heading text-xs font-bold text-ever-green">{categories.toolkits.count}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
