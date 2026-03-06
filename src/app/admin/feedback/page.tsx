"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FeedbackEntry {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  message: string;
  created_at: string;
}

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/feedback");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) return;
      setFeedback(await res.json());
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) return <p className="font-body text-pine-cone/50">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-pine-cone">Feedback ({feedback.length})</h1>

      {feedback.length === 0 ? (
        <div className="rounded-2xl border border-ever-green/[0.06] bg-white p-8 text-center">
          <p className="font-body text-pine-cone/50">No feedback submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedback.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-ever-green/[0.06] bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-pine-cone">
                    {entry.name || "Anonymous"}
                    {entry.role && (
                      <span className="ml-2 rounded-md bg-ever-green/[0.06] px-2 py-0.5 text-xs font-medium text-ever-green">
                        {entry.role}
                      </span>
                    )}
                  </p>
                  {entry.email && (
                    <p className="font-body text-xs text-pine-cone/40">{entry.email}</p>
                  )}
                </div>
                <span className="font-body text-xs text-pine-cone/40">
                  {new Date(entry.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/80">{entry.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
