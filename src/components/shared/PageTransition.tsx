"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springDefault}
    >
      {children}
    </motion.div>
  );
}
