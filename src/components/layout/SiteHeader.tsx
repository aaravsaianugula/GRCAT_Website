"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAudience } from "@/contexts/AudienceContext";
import { Navigation } from "./Navigation";
import { AudienceSwitcher } from "./AudienceSwitcher";
import { SearchTrigger } from "./SearchTrigger";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { audience } = useAudience();
  const router = useRouter();
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K to navigate to search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (pathname !== "/search") router.push("/search");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname]);

  // Escape key closes mobile menu + return focus to hamburger
  useEffect(() => {
    if (!mobileOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  // Return focus to hamburger when menu closes
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const homeHref = audience ? `/${audience}` : "/";

  return (
    <header className="sticky top-0 z-40">
      {/* Glassmorphic bar */}
      <div className="border-b border-ever-green/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link
            href={homeHref}
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/grc-logo.png"
              alt="Green River College"
              width={36}
              height={36}
              className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="hidden font-heading text-base font-bold tracking-tight text-ever-green sm:inline">
              GRC AI Taskforce
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <Navigation />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              <SearchTrigger />
              <AudienceSwitcher />
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-pine-cone transition-colors hover:bg-ever-green/5 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="overflow-hidden border-b border-ever-green/[0.06] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="px-5 py-4">
              <Navigation mobile onNavClick={closeMobileMenu} />
              <div className="mt-4 flex items-center gap-3 border-t border-ever-green/[0.06] pt-4">
                <SearchTrigger />
                <AudienceSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
