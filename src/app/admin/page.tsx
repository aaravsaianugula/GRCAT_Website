"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Counts {
  faqs: number;
  events: number;
  feedback: number;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const [faqRes, eventRes] = await Promise.all([
        fetch("/api/admin/faqs"),
        fetch("/api/admin/events"),
      ]);

      if (faqRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!faqRes.ok || !eventRes.ok) {
        setError("Failed to load data");
        return;
      }

      const faqs = await faqRes.json();
      const events = await eventRes.json();

      setCounts({
        faqs: faqs.length,
        events: events.length,
        feedback: 0,
      });
    }
    load();
  }, [router]);

  if (error) {
    return <p className="font-body text-red-500">{error}</p>;
  }

  const cards = [
    { label: "FAQs", count: counts?.faqs ?? "—", href: "/admin/faqs", color: "bg-gator-green/10 text-gator-green" },
    { label: "Events", count: counts?.events ?? "—", href: "/admin/events", color: "bg-sky-blue/10 text-sky-blue" },
    { label: "Feedback", count: counts?.feedback ?? "—", href: "/admin/feedback", color: "bg-sunrise-orange/10 text-sunrise-orange" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-pine-cone">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-ever-green/[0.06] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className={`mb-3 inline-flex rounded-xl px-3 py-1.5 font-body text-xs font-bold ${c.color}`}>
              {c.label}
            </div>
            <p className="font-heading text-3xl font-bold text-pine-cone">{c.count}</p>
            <p className="mt-1 font-body text-sm text-pine-cone/50">total entries</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
