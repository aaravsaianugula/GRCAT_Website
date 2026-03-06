import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    heading: "Resources",
    links: [
      { href: "/assessment-scale", label: "AI Assessment Scale" },
      { href: "/toolkits", label: "Toolkits" },
      { href: "/playground", label: "AI Playground" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    heading: "Best Practices",
    links: [
      { href: "/best-practices/students", label: "For Students" },
      { href: "/best-practices/faculty", label: "For Faculty" },
      { href: "/best-practices/staff", label: "For Staff" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/events", label: "Events" },
      { href: "/feedback", label: "Give Feedback" },
      { href: "/about", label: "About the Taskforce" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-surface-dim/50">
      {/* Green glow divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gator-green/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-gator-green/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <Image src="/images/grc-logo.png" alt="GRC" width={28} height={28} className="h-7 w-7 rounded-lg" />
              <span className="font-heading text-base font-bold tracking-tight text-ever-green">
                GRC AI Taskforce
              </span>
            </Link>
            <p className="mt-4 max-w-[220px] font-body text-sm leading-relaxed text-pine-cone/80">
              Empowering education through responsible AI integration.
            </p>
            <p className="mt-3 font-body text-xs text-pine-cone/70">
              Green River College<br />
              12401 SE 320th St<br />
              Auburn, WA 98092
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.15em] text-pine-cone/70">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-pine-cone/70 transition-colors hover:text-ever-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-ever-green/[0.04] pt-6">
          <p className="font-body text-xs text-pine-cone/75">
            &copy; {new Date().getFullYear()} Green River College AI Taskforce. Built for ENGL 235 Unit 2.
          </p>
        </div>
      </div>
    </footer>
  );
}
