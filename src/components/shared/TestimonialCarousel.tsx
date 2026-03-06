"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import type { Audience } from "@/contexts/AudienceContext";

interface Testimonial {
  quote: string;
  name: string;
  role: "student" | "faculty" | "staff";
  detail: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The AI Assessment Scale made it so clear what I could and couldn't use. No more guessing.",
    name: "Sample Student",
    role: "student",
    detail: "Computer Science Major",
  },
  {
    quote: "I used AI to brainstorm essay topics and my writing actually got better because I learned to ask better questions.",
    name: "Sample Student",
    role: "student",
    detail: "English 101",
  },
  {
    quote: "Having a 5-level framework let me set different AI policies per assignment instead of a blanket ban.",
    name: "Sample Faculty",
    role: "faculty",
    detail: "Biology Department",
  },
  {
    quote: "The syllabus templates saved me hours. I just picked the level and customized the language.",
    name: "Sample Faculty",
    role: "faculty",
    detail: "Communications Instructor",
  },
  {
    quote: "AI helped me draft meeting summaries in minutes instead of hours. Game changer for admin work.",
    name: "Sample Staff",
    role: "staff",
    detail: "Student Services",
  },
  {
    quote: "The FERPA guidelines gave me confidence that I was using AI tools responsibly with student data.",
    name: "Sample Staff",
    role: "staff",
    detail: "Registrar's Office",
  },
];

const roleBorder: Record<string, string> = {
  student: "border-l-sky-blue",
  faculty: "border-l-gator-green",
  staff: "border-l-sunrise-orange",
};

const roleBadge: Record<string, string> = {
  student: "bg-sky-blue/10 text-sky-blue",
  faculty: "bg-gator-green/10 text-gator-green",
  staff: "bg-sunrise-orange/10 text-sunrise-orange",
};

interface TestimonialCarouselProps {
  audience?: Audience;
}

export function TestimonialCarousel({ audience }: TestimonialCarouselProps) {
  const prefersReduced = useReducedMotion();
  const sorted = audience
    ? [...testimonials.filter((t) => t.role === audience), ...testimonials.filter((t) => t.role !== audience)]
    : testimonials;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = sorted.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = sorted[current];

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current}
          initial={{ opacity: 0, ...(prefersReduced ? {} : { x: 30 }) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, ...(prefersReduced ? {} : { x: -30 }) }}
          transition={springDefault}
          className={`rounded-3xl border-l-4 ${roleBorder[t.role]} glass-light p-8 sm:p-10`}
        >
          <p className="font-body text-lg leading-relaxed text-pine-cone/80 sm:text-xl">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="mt-5 flex items-center gap-3">
            <div>
              <span className="font-heading text-sm font-bold text-ever-green">{t.name}</span>
              <span className="ml-2 font-body text-xs text-pine-cone/60">{t.detail}</span>
            </div>
            <span className={`ml-auto rounded-pill px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider ${roleBadge[t.role]}`}>
              {t.role}
              <span className="ml-1 opacity-50">Sample</span>
            </span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {sorted.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-ever-green" : "w-1.5 bg-ever-green/20"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-pine-cone/40 transition-colors hover:bg-ever-green/5 hover:text-pine-cone/60"
          >
            {paused ? (
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            )}
          </button>
          <button onClick={prev} aria-label="Previous testimonial" className="flex h-8 w-8 items-center justify-center rounded-lg text-pine-cone/40 transition-colors hover:bg-ever-green/5 hover:text-pine-cone/60">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={next} aria-label="Next testimonial" className="flex h-8 w-8 items-center justify-center rounded-lg text-pine-cone/40 transition-colors hover:bg-ever-green/5 hover:text-pine-cone/60">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
