"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { springSnap } from "@/lib/animations/motion";

interface WhatsNewBannerProps {
  message: string;
  link?: string;
  linkLabel?: string;
  variant?: "green" | "blue" | "orange";
}

const variantStyles: Record<string, string> = {
  green: "bg-gator-green/[0.06] border-gator-green/10 text-ever-green",
  blue: "bg-sky-blue/[0.06] border-sky-blue/10 text-sky-blue-text",
  orange: "bg-sunrise-orange/[0.06] border-sunrise-orange/10 text-sunrise-orange-text",
};

function hashMessage(msg: string): string {
  let hash = 0;
  for (let i = 0; i < msg.length; i++) {
    hash = ((hash << 5) - hash + msg.charCodeAt(i)) | 0;
  }
  return String(hash);
}

export function WhatsNewBanner({
  message,
  link,
  linkLabel = "Learn more",
  variant = "green",
}: WhatsNewBannerProps) {
  const [dismissed, setDismissed] = useState(true);
  const storageKey = `grc-banner-${hashMessage(message)}`;

  useEffect(() => {
    setDismissed(sessionStorage.getItem(storageKey) === "1");
  }, [storageKey]);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem(storageKey, "1");
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          role="status"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={springSnap}
          className={`overflow-hidden border-b ${variantStyles[variant]}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 lg:px-8">
            <p className="flex-1 font-body text-sm">
              <span className="mr-2 inline-flex items-center rounded-md bg-current/10 px-1.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider">
                New
              </span>
              {message}
              {link && (
                <Link
                  href={link}
                  className="ml-2 font-semibold underline underline-offset-2 hover:no-underline"
                >
                  {linkLabel}
                </Link>
              )}
            </p>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
