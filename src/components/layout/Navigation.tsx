"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudience } from "@/contexts/AudienceContext";

interface NavItem {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

function getNavEntries(audience: string | null): NavEntry[] {
  const bestPracticesHref =
    audience === "student" ? "/best-practices/students" :
    audience === "staff" ? "/best-practices/staff" :
    "/best-practices/faculty";

  return [
    { href: "/about", label: "About" },
    {
      label: "Resources",
      items: [
        { href: "/assessment-scale", label: "Assessment Scale" },
        { href: "/toolkits", label: "Toolkits" },
      ],
    },
    { href: bestPracticesHref, label: "Best Practices" },
    { href: "/playground", label: "AI Playground" },
    { href: "/events", label: "Events" },
    { href: "/faqs", label: "FAQs" },
  ];
}

function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const groupActive = group.items.some((item) => pathname.startsWith(item.href));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleMouseEnter() {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`nav-underline relative inline-flex items-center gap-1 px-3 py-2 font-body text-sm font-medium transition-colors ${
          groupActive
            ? "text-ever-green"
            : "text-pine-cone/75 hover:text-ever-green"
        }`}
      >
        {group.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-ever-green/[0.06] bg-white/95 py-1.5 shadow-elevated backdrop-blur-xl">
          {group.items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 font-body text-sm font-medium transition-colors ${
                  active
                    ? "bg-ever-green/[0.06] text-ever-green"
                    : "text-pine-cone/75 hover:bg-ever-green/[0.04] hover:text-ever-green"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
}

export function Navigation({ mobile, onNavClick }: { mobile?: boolean; onNavClick?: () => void }) {
  const pathname = usePathname();
  const { audience } = useAudience();
  const entries = getNavEntries(audience);

  if (mobile) {
    return (
      <nav aria-label="Main navigation">
        <ul className="space-y-0.5">
          {entries.map((entry) => {
            if (isGroup(entry)) {
              return (
                <li key={entry.label}>
                  <span className="block px-3 pt-4 pb-1 font-body text-xs font-semibold uppercase tracking-wider text-pine-cone/40">
                    {entry.label}
                  </span>
                  <ul className="space-y-0.5">
                    {entry.items.map((item) => {
                      const active = pathname.startsWith(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onNavClick}
                            className={`block rounded-lg px-3 py-2.5 pl-5 font-body text-base font-medium transition-colors ${
                              active
                                ? "bg-ever-green/8 text-ever-green"
                                : "text-pine-cone/70 hover:bg-ever-green/5 hover:text-ever-green"
                            }`}
                            aria-current={active ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            const active = pathname.startsWith(entry.href);
            return (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={onNavClick}
                  className={`block rounded-lg px-3 py-2.5 font-body text-base font-medium transition-colors ${
                    active
                      ? "bg-ever-green/8 text-ever-green"
                      : "text-pine-cone/70 hover:bg-ever-green/5 hover:text-ever-green"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {entry.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center">
        {entries.map((entry) => {
          if (isGroup(entry)) {
            return <DesktopDropdown key={entry.label} group={entry} pathname={pathname} />;
          }

          const active = pathname.startsWith(entry.href);
          return (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className={`nav-underline relative px-3 py-2 font-body text-sm font-medium transition-colors ${
                  active
                    ? "text-ever-green"
                    : "text-pine-cone/75 hover:text-ever-green"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {entry.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
