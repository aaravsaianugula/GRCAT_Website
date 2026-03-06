"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/feedback", label: "Feedback", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-surface-dim/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-ever-green/[0.06] bg-white">
        <div className="flex h-14 items-center gap-2 border-b border-ever-green/[0.06] px-5">
          <span className="font-heading text-sm font-bold text-ever-green">GRC Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors ${
                  active
                    ? "bg-ever-green/[0.06] text-ever-green"
                    : "text-pine-cone/70 hover:bg-ever-green/[0.04] hover:text-ever-green"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-ever-green/[0.06] p-3">
          <Link
            href="/"
            className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 font-body text-sm text-pine-cone/60 transition-colors hover:text-ever-green"
          >
            ← Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-body text-sm text-red-500/80 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">{children}</main>
    </div>
  );
}
