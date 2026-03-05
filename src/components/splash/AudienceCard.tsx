"use client";

import { motion } from "framer-motion";

interface AudienceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  delay: number;
}

export function AudienceCard({
  title,
  description,
  icon,
  color,
  onClick,
  delay,
}: AudienceCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-4 rounded-card border-2 border-white/20 bg-white/10 px-8 py-10 text-center backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-sky-blue"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 -z-10 rounded-card opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>

      {/* Text */}
      <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
      <p className="max-w-[220px] text-sm leading-relaxed text-white/70">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-all duration-200 group-hover:gap-3 group-hover:text-white">
        Get Started
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </motion.button>
  );
}
