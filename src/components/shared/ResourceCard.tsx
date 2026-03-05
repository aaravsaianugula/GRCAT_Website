"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ResourceCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  featured?: boolean;
  accentColor?: string;
}

export function ResourceCard({
  href,
  title,
  description,
  icon,
  delay = 0,
  featured = false,
  accentColor = "group-hover:border-gator-green/20",
}: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? "sm:col-span-2" : ""}
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ever-green/[0.06] bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-elevated ${accentColor}`}
      >
        {/* Subtle gradient on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ever-green/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ever-green/[0.06] text-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gator-green/10">
              {icon}
            </div>
            <svg
              className="h-4 w-4 text-pine-cone/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gator-green/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
          <h3 className="font-heading text-base font-bold text-ever-green">
            {title}
          </h3>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
