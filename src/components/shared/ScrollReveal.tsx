"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springDefault, springGentle } from "@/lib/animations/motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "default" | "gentle";
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  variant = "default",
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const spring = variant === "gentle" ? springGentle : springDefault;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...spring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
