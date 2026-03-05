"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  const selectOption = useCallback(
    (value: Audience) => {
      setAudience(value);
      setOpen(false);
      setFocusedIndex(-1);
      if (value) router.push(`/${value}`);
    },
    [setAudience, router],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(0);
      }
    },
    [],
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, audiences.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) selectOption(audiences[focusedIndex].value);
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [focusedIndex, selectOption],
  );

  // Focus the active option button when focusedIndex changes
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      const optionEl = document.getElementById(`audience-option-${audiences[focusedIndex].value}`);
      optionEl?.focus();
    }
  }, [open, focusedIndex]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-2 rounded-xl border border-ever-green/10 bg-ever-green/[0.03] px-4 py-2 font-body text-sm font-medium text-pine-cone/80 transition-all hover:border-ever-green/20 hover:bg-ever-green/[0.06]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch audience view"
        aria-activedescendant={focusedIndex >= 0 ? `audience-option-${audiences[focusedIndex].value}` : undefined}
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
            ref={listRef}
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            role="listbox"
            aria-label="Audience options"
            onKeyDown={handleListKeyDown}
            className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-ever-green/10 bg-white p-1 shadow-elevated"
          >
            {audiences.map((a) => (
              <li key={a.value}>
                <button
                  id={`audience-option-${a.value}`}
                  role="option"
                  tabIndex={0}
                  aria-selected={audience === a.value}
                  onClick={() => selectOption(a.value)}
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
