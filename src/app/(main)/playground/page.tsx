"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/shared/PageTransition";
import { useAudience } from "@/contexts/AudienceContext";
import { PlaygroundChat } from "@/components/playground/PlaygroundChat";
import { ToolDirectory } from "@/components/playground/ToolDirectory";

/* ------------------------------------------------------------------ */
/*  Audience-specific intro text                                       */
/* ------------------------------------------------------------------ */
const audienceIntros: Record<string, string> = {
  student: "Explore AI tools that can help with studying, writing, research, and creative projects.",
  faculty: "Discover AI tools for teaching, assessment, content creation, and research.",
  staff: "Find AI tools for productivity, communications, data analysis, and workflow automation.",
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function PlaygroundPage() {
  const { audience } = useAudience();

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        {/* -- Hero -------------------------------------------------- */}
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-leaf-green/15 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-grc-green">
            AI Playground
          </span>
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            Learn &amp; Explore AI
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={audience ?? "default"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-5 text-subtitle font-body text-pine-cone/60"
            >
              {audience && audienceIntros[audience]
                ? (
                  <>
                    {audienceIntros[audience]} Curated by the GRC AI Task Force from the{" "}
                    <Link
                      href="https://libguides.greenriver.edu/AITaskforce"
                      className="underline decoration-gator-green/40 underline-offset-2 transition-colors hover:text-gator-green"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AI LibGuide
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Chat with our AI guide to learn about artificial intelligence, or explore 80+
                    curated tools for every use case. Powered by the{" "}
                    <Link
                      href="https://libguides.greenriver.edu/AITaskforce"
                      className="underline decoration-gator-green/40 underline-offset-2 transition-colors hover:text-gator-green"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GRC AI Task Force
                    </Link>
                    .
                  </>
                )}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="divider-glow my-16" />

        {/* ============================================================ */}
        {/*  SECTION 1: Learn About AI — Educational Chatbot              */}
        {/* ============================================================ */}
        <section>
          <div className="mb-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-grc-green/10 px-3.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-grc-green">
              Interactive
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">
              Learn About AI
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
              Choose a topic to explore, or ask the AI Guide anything about artificial
              intelligence, GRC policies, and tools. Responses are educational and
              grounded in GRC&apos;s official resources.
            </p>
          </div>

          <PlaygroundChat />
        </section>

        <div className="divider-glow my-16" />

        {/* ============================================================ */}
        {/*  SECTION 2: Explore AI Tools — Full Tool Directory            */}
        {/* ============================================================ */}
        <section>
          <div className="mb-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-gator-green/15 px-3.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-gator-green">
              80+ Tools
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">
              Explore AI Tools
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
              Browse the full directory of AI tools curated by the GRC AI Task Force,
              organized by category and personalized for your role.
            </p>
          </div>

          <ToolDirectory audience={audience} />
        </section>
      </div>
    </PageTransition>
  );
}
