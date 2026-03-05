"use client";

import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import type { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  accent?: string;
  accentColor?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  accent,
  accentColor = "bg-gator-green/15 text-gator-green",
  children,
}: HeroSectionProps) {
  return (
    <section className="noise relative overflow-hidden gradient-mesh">
      <ParticleBackground />
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-gator-green/8 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-sky-blue/6 blur-[80px]" aria-hidden="true" />

      {/* Large decorative watermark */}
      <div
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 select-none font-heading text-[20rem] font-black leading-none tracking-tighter text-white/[0.04] sm:text-[28rem]"
        aria-hidden="true"
      >
        AI
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:py-36 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {accent && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`mb-5 inline-flex items-center gap-2 rounded-pill px-3.5 py-1 text-sm font-bold uppercase tracking-[0.15em] ${accentColor}`}
            >
              <span className="h-1 w-1 animate-pulse rounded-full bg-current" />
              {accent}
            </motion.span>
          )}
          <h1 className="text-display font-heading font-extrabold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-white/70 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-6 flex items-center gap-3 text-white/60">
            <span className="h-px w-8 bg-gator-green/60" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em]">Green River College AI Task Force</span>
          </div>
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
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
