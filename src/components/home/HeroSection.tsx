"use client";

import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { springDefault } from "@/lib/animations/motion";
import type { ReactNode } from "react";
import type { Audience } from "@/contexts/AudienceContext";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  accent?: string;
  accentColor?: string;
  audience?: Audience;
  children?: ReactNode;
  dataAiId?: string;
}

const audienceBlobColor: Record<string, string> = {
  student: "bg-sky-blue/5",
  faculty: "bg-gator-green/5",
  staff: "bg-sunrise-orange/5",
};

const accentLineColor: Record<string, string> = {
  student: "bg-sky-blue/60",
  faculty: "bg-gator-green/60",
  staff: "bg-sunrise-orange/60",
};

export function HeroSection({
  title,
  subtitle,
  accent,
  accentColor = "bg-gator-green/15 text-gator-green",
  audience,
  children,
  dataAiId,
}: HeroSectionProps) {
  const blobColor = audience ? (audienceBlobColor[audience] ?? "bg-gator-green/5") : "bg-gator-green/5";

  return (
    <section data-ai-id={dataAiId} className="noise relative overflow-hidden gradient-mesh">
      <ParticleBackground />
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-gator-green/8 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-sky-blue/6 blur-[80px]" aria-hidden="true" />

      {/* Organic blob decorative behind heading — static to avoid GPU thrashing */}
      <div
        className={`pointer-events-none absolute left-[10%] top-1/2 -translate-y-1/2 h-[500px] w-[500px] blob-shape ${blobColor} blur-[60px]`}
        aria-hidden="true"
      />

      {/* Large decorative watermark */}
      <div
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 select-none font-heading text-[20rem] font-black leading-none tracking-tighter text-white/[0.04] sm:text-[28rem]"
        aria-hidden="true"
      >
        AI
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 sm:py-44 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springDefault}
          className="max-w-2xl"
        >
          {accent && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springDefault, delay: 0.2 }}
              className={`mb-5 inline-flex items-center gap-2 rounded-pill px-3.5 py-1 text-sm font-bold uppercase tracking-[0.15em] ${accentColor}`}
            >
              <span className="h-1 w-1 animate-pulse rounded-full bg-current" />
              {accent}
            </motion.span>
          )}
          <KineticHeading
            text={title}
            as="h1"
            variant="display"
            audience={audience}
            className="text-white"
          />
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-white/70 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-6 flex items-center gap-3 text-white/60">
            <span className={`h-px w-8 ${audience ? (accentLineColor[audience] ?? "bg-gator-green/60") : "bg-gator-green/60"}`} />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em]">Green River College AI Task Force</span>
          </div>
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springDefault, delay: 0.4 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
