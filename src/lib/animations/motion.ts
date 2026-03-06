import type { Transition, Variants } from "framer-motion";

// ─── Spring Transition Presets ──────────────────────────────────
export const springDefault: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
  mass: 0.8,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 20,
  mass: 1,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 18,
  mass: 0.6,
};

export const springSnap: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

// ─── Shared Variants ────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: springGentle,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springDefault,
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ─── Bento Card Hover ───────────────────────────────────────────
export const bentoCardHover = {
  y: -6,
  scale: 1.015,
  transition: springSnap,
};

// ─── Audience-Specific Motion ───────────────────────────────────
type AudienceRole = "student" | "faculty" | "staff";

interface AudienceMotion {
  spring: Transition;
  yOffset: number;
  staggerDelay: number;
  fadeUp: Variants;
  stagger: Variants;
}

export function getAudienceMotion(audience: AudienceRole | null): AudienceMotion {
  switch (audience) {
    case "student":
      return {
        spring: springBouncy,
        yOffset: 32,
        staggerDelay: 0.12,
        fadeUp: {
          hidden: { opacity: 0, y: 32 },
          visible: { opacity: 1, y: 0, transition: springBouncy },
        },
        stagger: {
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        },
      };
    case "faculty":
      return {
        spring: springGentle,
        yOffset: 16,
        staggerDelay: 0.06,
        fadeUp: {
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: springGentle },
        },
        stagger: {
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.1 },
          },
        },
      };
    case "staff":
    default:
      return {
        spring: springDefault,
        yOffset: 24,
        staggerDelay: 0.08,
        fadeUp: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: springDefault },
        },
        stagger: {
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        },
      };
  }
}
