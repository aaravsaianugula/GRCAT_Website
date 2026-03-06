"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudience } from "@/contexts/AudienceContext";

interface NavItem {
  href: string;
  label: string;
}

function getNavItems(audience: string | null): NavItem[] {
  const bestPracticesHref =
    audience === "student" ? "/best-practices/students" :
    audience === "staff" ? "/best-practices/staff" :
    "/best-practices/faculty";

  return [
    { href: "/about", label: "About" },
    { href: "/assessment-scale", label: "Assessment Scale" },
    { href: "/toolkits", label: "Toolkits" },
    { href: bestPracticesHref, label: "Best Practices" },
    { href: "/playground", label: "AI Playground" },
    { href: "/events", label: "Events" },
    { href: "/faqs", label: "FAQs" },
  ];
}

export function Navigation({ mobile, onNavClick }: { mobile?: boolean; onNavClick?: () => void }) {
  const pathname = usePathname();
  const { audience } = useAudience();
  const items = getNavItems(audience);

  if (mobile) {
    return (
      <nav aria-label="Main navigation">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavClick}
                  className={`block rounded-lg px-3 py-2.5 font-body text-base font-medium transition-colors ${
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
      </nav>
    );
  }

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-3 py-2 font-body text-sm font-medium transition-colors ${
                  active
                    ? "text-ever-green"
                    : "text-pine-cone/75 hover:text-ever-green"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gator-green" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
