"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springDefault, springBouncy, springGentle } from "@/lib/animations/motion";
import type { Audience } from "@/contexts/AudienceContext";

interface KineticHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  variant?: "display" | "title";
  gradient?: boolean;
  audience?: Audience;
  className?: string;
}

const audienceGradient: Record<string, string> = {
  student: "text-gradient-blue",
  faculty: "text-gradient-green",
  staff: "text-gradient-orange",
};

const audienceSpring: Record<string, typeof springDefault> = {
  student: springBouncy,
  faculty: springGentle,
  staff: springDefault,
};

export function KineticHeading({
  text,
  as: Tag = "h1",
  variant = "display",
  gradient = false,
  audience,
  className = "",
}: KineticHeadingProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const spring = audience ? (audienceSpring[audience] ?? springDefault) : springDefault;
  const gradientClass = gradient && audience ? (audienceGradient[audience] ?? "") : "";
  const variantClass = variant === "display" ? "text-display" : "text-title";

  if (prefersReduced) {
    return (
      <Tag className={`${variantClass} font-heading font-extrabold tracking-tight ${gradientClass} ${className}`}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={`${variantClass} font-heading font-extrabold tracking-tight ${gradientClass} ${className}`}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.04, delayChildren: 0.1 },
          },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: spring },
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
