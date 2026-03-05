"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAudience, type Audience } from "@/contexts/AudienceContext";
import { motion, AnimatePresence } from "framer-motion";

const audiences: { value: Audience; label: string; color: string }[] = [
  { value: "student", label: "Student", color: "bg-sky-blue" },
  { value: "faculty", label: "Faculty", color: "bg-gator-green" },
  { value: "staff", label: "Staff", color: "bg-sunrise-orange" },
];

export function AudienceSwitcher() {
  const { audience, setAudience } = useAudience();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = audiences.find((a) => a.value === audience);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-ever-green/10 bg-ever-green/[0.03] px-4 py-2 font-body text-sm font-medium text-pine-cone/80 transition-all hover:border-ever-green/20 hover:bg-ever-green/[0.06]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch audience view"
      >
        <span className={`h-2 w-2 rounded-full ${current?.color ?? "bg-pine-cone/30"}`} />
        <span>{current?.label ?? "Choose Role"}</span>
        <svg
          className={`h-3.5 w-3.5 text-pine-cone/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            role="listbox"
            aria-label="Audience options"
            className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-ever-green/10 bg-white p-1 shadow-elevated"
          >
            {audiences.map((a) => (
              <li key={a.value}>
                <button
                  role="option"
                  aria-selected={audience === a.value}
                  onClick={() => {
                    setAudience(a.value);
                    setOpen(false);
                    if (a.value) router.push(`/${a.value}`);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-body text-sm transition-colors ${
                    audience === a.value
                      ? "bg-ever-green/[0.06] font-semibold text-ever-green"
                      : "text-pine-cone/70 hover:bg-ever-green/[0.04] hover:text-pine-cone"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${a.color}`} />
                  <span>{a.label}</span>
                  {audience === a.value && (
                    <svg
                      className="ml-auto h-3.5 w-3.5 text-gator-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
