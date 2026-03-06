"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAudience, type Audience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Search index                                                       */
/* ------------------------------------------------------------------ */

type ResultType = "Pages" | "Toolkits" | "Tools" | "FAQs";

interface SearchEntry {
  title: string;
  description: string;
  href: string;
  type: ResultType;
  keywords: string[];
  audience: Audience[] | "all";
}

const SEARCH_INDEX: SearchEntry[] = [
  // Pages
  {
    title: "About the AI Task Force",
    description: "Learn about GRC's AI Task Force mission, members, and goals.",
    href: "/about",
    type: "Pages",
    keywords: ["about", "mission", "team", "members", "task force", "green river", "grc"],
    audience: "all",
  },
  {
    title: "Assessment Scale",
    description: "GRC's 5-level AI assessment scale for evaluating AI use in coursework.",
    href: "/assessment-scale",
    type: "Pages",
    keywords: ["assessment", "scale", "levels", "grading", "rubric", "evaluation", "ai use"],
    audience: "all",
  },
  {
    title: "Assessment Scale - Level 1: No AI",
    description: "Level 1 restricts all AI tool usage for the assignment.",
    href: "/assessment-scale/1",
    type: "Pages",
    keywords: ["level 1", "no ai", "restricted", "banned", "prohibition"],
    audience: "all",
  },
  {
    title: "Assessment Scale - Level 2: AI-Assisted Brainstorming",
    description: "Level 2 allows AI for brainstorming and idea generation only.",
    href: "/assessment-scale/2",
    type: "Pages",
    keywords: ["level 2", "brainstorming", "ideation", "planning", "idea generation"],
    audience: "all",
  },
  {
    title: "Assessment Scale - Level 3: AI-Assisted Editing",
    description: "Level 3 permits AI for editing, grammar, and refinement.",
    href: "/assessment-scale/3",
    type: "Pages",
    keywords: ["level 3", "editing", "grammar", "refinement", "proofreading", "revision"],
    audience: "all",
  },
  {
    title: "Assessment Scale - Level 4: AI-Assisted Writing",
    description: "Level 4 allows AI as a co-writer with proper attribution.",
    href: "/assessment-scale/4",
    type: "Pages",
    keywords: ["level 4", "co-writing", "assisted writing", "collaboration", "attribution"],
    audience: "all",
  },
  {
    title: "Assessment Scale - Level 5: Full AI Usage",
    description: "Level 5 permits unrestricted AI usage with full transparency.",
    href: "/assessment-scale/5",
    type: "Pages",
    keywords: ["level 5", "full ai", "unrestricted", "open", "transparency"],
    audience: "all",
  },
  {
    title: "AI Playground",
    description: "Experiment with AI tools in a guided, hands-on environment.",
    href: "/playground",
    type: "Pages",
    keywords: ["playground", "experiment", "hands-on", "try", "interactive", "demo", "tools"],
    audience: "all",
  },
  {
    title: "Events",
    description: "Upcoming AI Task Force events, workshops, and training sessions.",
    href: "/events",
    type: "Pages",
    keywords: ["events", "workshops", "training", "sessions", "calendar", "upcoming"],
    audience: "all",
  },
  {
    title: "Give Us Feedback",
    description: "Share your thoughts on AI resources, policies, or this website.",
    href: "/feedback",
    type: "Pages",
    keywords: ["feedback", "contact", "suggestions", "comments", "form"],
    audience: "all",
  },

  // Best Practices
  {
    title: "Best Practices for Students",
    description: "Guidelines for students on responsible and effective AI use.",
    href: "/best-practices/students",
    type: "Pages",
    keywords: ["best practices", "student", "guidelines", "responsible use", "academic integrity"],
    audience: ["student"],
  },
  {
    title: "Best Practices for Faculty",
    description: "Guidelines for faculty on integrating AI into teaching and assessment.",
    href: "/best-practices/faculty",
    type: "Pages",
    keywords: ["best practices", "faculty", "teaching", "integration", "pedagogy", "curriculum"],
    audience: ["faculty"],
  },
  {
    title: "Best Practices for Staff",
    description: "Guidelines for staff on using AI tools in administrative workflows.",
    href: "/best-practices/staff",
    type: "Pages",
    keywords: ["best practices", "staff", "administrative", "workflow", "operations"],
    audience: ["staff"],
  },

  // Toolkits
  {
    title: "AI Toolkits",
    description: "Browse all AI toolkits for teaching, learning, and campus operations.",
    href: "/toolkits",
    type: "Toolkits",
    keywords: ["toolkits", "resources", "guides", "collection", "all toolkits"],
    audience: "all",
  },
  {
    title: "Syllabus Language Toolkit",
    description: "Templates and examples for adding AI policies to your syllabus.",
    href: "/toolkits/syllabus",
    type: "Toolkits",
    keywords: ["syllabus", "language", "policy", "template", "course", "statement"],
    audience: ["faculty"],
  },
  {
    title: "Student AI Language Toolkit",
    description: "Help students understand and communicate about AI usage expectations.",
    href: "/toolkits/student-language",
    type: "Toolkits",
    keywords: ["student", "language", "communication", "expectations", "understanding"],
    audience: ["student", "faculty"],
  },
  {
    title: "Ethics & Privacy Toolkit",
    description: "Navigate ethical considerations and data privacy with AI tools.",
    href: "/toolkits/ethics-privacy",
    type: "Toolkits",
    keywords: ["ethics", "privacy", "data", "security", "responsible", "bias", "ferpa"],
    audience: "all",
  },
  {
    title: "Prompting Toolkit",
    description: "Learn effective prompting techniques for better AI outputs.",
    href: "/toolkits/prompting",
    type: "Toolkits",
    keywords: ["prompting", "prompt engineering", "techniques", "chatgpt", "claude", "ai writing"],
    audience: "all",
  },
  {
    title: "Assessment Design Toolkit",
    description: "Design AI-aware assessments aligned with the GRC assessment scale.",
    href: "/toolkits/assessment-design",
    type: "Toolkits",
    keywords: ["assessment", "design", "rubric", "assignments", "ai-proof", "evaluation"],
    audience: ["faculty"],
  },
  {
    title: "Custom GPTs Toolkit",
    description: "Build and deploy custom GPTs for educational and operational use.",
    href: "/toolkits/custom-gpts",
    type: "Toolkits",
    keywords: ["custom gpts", "gpt builder", "chatgpt", "openai", "tailored", "specialized"],
    audience: ["faculty", "staff"],
  },

  // Tools (from playground)
  {
    title: "ChatGPT",
    description: "OpenAI's conversational AI for writing, analysis, and brainstorming.",
    href: "/playground",
    type: "Tools",
    keywords: ["chatgpt", "openai", "gpt-4", "writing", "conversation", "chatbot"],
    audience: "all",
  },
  {
    title: "Claude",
    description: "Anthropic's AI assistant for research, writing, and analysis.",
    href: "/playground",
    type: "Tools",
    keywords: ["claude", "anthropic", "research", "writing", "analysis"],
    audience: "all",
  },
  {
    title: "Microsoft Copilot",
    description: "AI assistant integrated with Microsoft 365 for productivity.",
    href: "/playground",
    type: "Tools",
    keywords: ["copilot", "microsoft", "365", "office", "word", "excel", "productivity"],
    audience: "all",
  },
  {
    title: "Google Gemini",
    description: "Google's multimodal AI for search, writing, and creative tasks.",
    href: "/playground",
    type: "Tools",
    keywords: ["gemini", "google", "bard", "multimodal", "search"],
    audience: "all",
  },

  // FAQs
  {
    title: "What is the AI Assessment Scale?",
    description: "The scale defines 5 levels of permitted AI use in coursework.",
    href: "/faqs",
    type: "FAQs",
    keywords: ["faq", "what is", "assessment scale", "levels", "explained"],
    audience: "all",
  },
  {
    title: "Can I use AI on my assignments?",
    description: "It depends on the AI level your instructor sets. Check your syllabus.",
    href: "/faqs",
    type: "FAQs",
    keywords: ["faq", "assignments", "allowed", "can i", "homework", "cheating"],
    audience: ["student"],
  },
  {
    title: "How do I cite AI-generated content?",
    description: "Follow your instructor's guidelines and APA/MLA AI citation standards.",
    href: "/faqs",
    type: "FAQs",
    keywords: ["faq", "cite", "citation", "apa", "mla", "reference", "attribution"],
    audience: ["student", "faculty"],
  },
  {
    title: "Is student data safe with AI tools?",
    description: "GRC reviews tools for FERPA compliance. Never enter sensitive data.",
    href: "/faqs",
    type: "FAQs",
    keywords: ["faq", "data", "privacy", "ferpa", "safe", "security", "student data"],
    audience: "all",
  },
  {
    title: "How do I add AI policies to my syllabus?",
    description: "Use the Syllabus Language Toolkit for templates and examples.",
    href: "/faqs",
    type: "FAQs",
    keywords: ["faq", "syllabus", "policy", "add", "how to", "template"],
    audience: ["faculty"],
  },
];

/* ------------------------------------------------------------------ */
/*  Fuzzy matching                                                     */
/* ------------------------------------------------------------------ */

function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  // Exact substring match scores highest
  if (t.includes(q)) return 100;

  // Word-start match
  const words = t.split(/\s+/);
  const queryWords = q.split(/\s+/);
  let wordScore = 0;
  for (const qw of queryWords) {
    for (const tw of words) {
      if (tw.startsWith(qw)) wordScore += 60;
      else if (tw.includes(qw)) wordScore += 30;
    }
  }
  if (wordScore > 0) return wordScore;

  // Character-level fuzzy match
  let qi = 0;
  let consecutive = 0;
  let score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      qi++;
      consecutive++;
      score += consecutive * 2;
    } else {
      consecutive = 0;
    }
  }
  return qi === q.length ? score : 0;
}

function searchEntries(query: string, audienceFilter: Audience): SearchEntry[] {
  if (!query.trim()) return [];

  const scored = SEARCH_INDEX
    .filter((entry) => {
      if (!audienceFilter) return true;
      if (!Array.isArray(entry.audience)) return true;
      return entry.audience.includes(audienceFilter);
    })
    .map((entry) => {
      const titleScore = fuzzyScore(query, entry.title) * 3;
      const descScore = fuzzyScore(query, entry.description) * 1.5;
      const keywordScore = Math.max(
        ...entry.keywords.map((k) => fuzzyScore(query, k) * 2),
        0,
      );
      const total = Math.max(titleScore, descScore, keywordScore);
      return { entry, score: total };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ entry }) => entry);
}

/* ------------------------------------------------------------------ */
/*  Type icons                                                         */
/* ------------------------------------------------------------------ */

const typeColors: Record<ResultType, string> = {
  Pages: "bg-gator-green/10 text-gator-green",
  Toolkits: "bg-ever-green/10 text-ever-green",
  Tools: "bg-pine-cone/10 text-pine-cone",
  FAQs: "bg-gator-green/15 text-gator-green",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SearchPage() {
  const { audience } = useAudience();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K to focus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => searchEntries(query, audience), [query, audience]);

  const grouped = useMemo(() => {
    const groups: Partial<Record<ResultType, SearchEntry[]>> = {};
    for (const entry of results) {
      if (!groups[entry.type]) groups[entry.type] = [];
      groups[entry.type]!.push(entry);
    }
    return groups;
  }, [results]);

  const groupOrder: ResultType[] = ["Pages", "Toolkits", "Tools", "FAQs"];
  const hasResults = results.length > 0;
  const hasQuery = query.trim().length > 0;

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            Search
          </h1>
          <p className="mt-5 text-subtitle font-body text-pine-cone/60">
            Find resources, toolkits, best practices, and AI tools across the entire site.
          </p>
        </div>

        {/* Search input */}
        <div className="mx-auto mt-10 max-w-2xl" role="search" aria-label="Site search">
          <div className="relative flex items-center gap-3 rounded-2xl border border-ever-green/10 bg-white px-5 py-4 shadow-card transition-all focus-within:border-gator-green/30 focus-within:ring-2 focus-within:ring-gator-green/10">
            <svg className="h-5 w-5 shrink-0 text-pine-cone/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 bg-transparent font-body text-lg text-pine-cone outline-none placeholder:text-pine-cone/60"
            />
            {hasQuery && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="shrink-0 rounded-lg p-1 text-pine-cone/60 transition-colors hover:text-pine-cone/70"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden shrink-0 rounded-lg border border-ever-green/10 bg-surface-dim/60 px-2 py-0.5 font-body text-xs text-pine-cone/60 sm:inline-block">
              {typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform ?? "") ? "\u2318" : "Ctrl+"}K
            </kbd>
          </div>

          {/* Audience filter indicator */}
          {audience && (
            <p className="mt-3 text-center font-body text-sm text-pine-cone/60">
              Showing results relevant to{" "}
              <span className="font-semibold text-gator-green">
                {audience === "student" ? "students" : audience}
              </span>
            </p>
          )}
        </div>

        {/* Results area */}
        <ScrollReveal>
        <div className="mx-auto mt-8 max-w-2xl">
          <AnimatePresence mode="wait">
            {hasQuery && !hasResults ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pine-cone/5">
                  <svg className="h-7 w-7 text-pine-cone/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="mt-4 font-heading text-lg font-bold text-pine-cone/70">
                  No results found
                </p>
                <p className="mt-2 max-w-sm font-body text-sm text-pine-cone/60">
                  Try different keywords or check your spelling. You can also browse our{" "}
                  <Link href="/toolkits" className="font-semibold text-gator-green underline decoration-gator-green/30 underline-offset-2 hover:decoration-gator-green">
                    toolkits
                  </Link>{" "}
                  or{" "}
                  <Link href="/faqs" className="font-semibold text-gator-green underline decoration-gator-green/30 underline-offset-2 hover:decoration-gator-green">
                    FAQs
                  </Link>{" "}
                  directly.
                </p>
              </motion.div>
            ) : hasResults ? (
              /* Grouped results */
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <p className="font-body text-sm text-pine-cone/60" aria-live="polite">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </p>
                {groupOrder.map((type) => {
                  const entries = grouped[type];
                  if (!entries || entries.length === 0) return null;
                  return (
                    <div key={type}>
                      <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.1em] text-pine-cone/70">
                        {type}
                      </h2>
                      <div className="space-y-2">
                        {entries.map((entry) => (
                          <Link
                            key={entry.href + entry.title}
                            href={entry.href}
                            className="group block rounded-2xl border border-ever-green/[0.06] bg-white p-4 transition-all hover:border-gator-green/20 hover:shadow-card sm:p-5"
                          >
                            <div className="flex items-start gap-3">
                              <span className={`mt-0.5 shrink-0 rounded-lg px-2 py-0.5 font-body text-xs font-semibold ${typeColors[entry.type]}`}>
                                {entry.type === "FAQs" ? "FAQ" : entry.type.slice(0, -1)}
                              </span>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-heading text-base font-bold text-pine-cone group-hover:text-gator-green transition-colors">
                                  {entry.title}
                                </h3>
                                <p className="mt-1 font-body text-sm text-pine-cone/70 line-clamp-2">
                                  {entry.description}
                                </p>
                              </div>
                              <svg className="mt-1 h-4 w-4 shrink-0 text-pine-cone/20 transition-colors group-hover:text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              /* Initial state — no query yet */
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="py-10"
              >
                <p className="mb-5 text-center font-body text-sm font-semibold text-pine-cone/60">
                  Popular searches
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["assessment scale", "syllabus", "ChatGPT", "ethics", "prompting", "best practices", "citation"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="rounded-pill border border-ever-green/[0.08] bg-white px-4 py-2 font-body text-sm text-pine-cone/65 shadow-sm transition-all hover:border-gator-green/20 hover:text-gator-green"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
