"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  audience_filter: string | null;
  is_published: boolean;
}

const CATEGORIES = ["general", "student", "faculty", "staff", "policy", "tools"];

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadFaqs() {
    const res = await fetch("/api/admin/faqs");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setFaqs(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadFaqs(); }, []);

  async function handleSave(faq: Partial<Faq> & { id?: string }) {
    const isNew = !faq.id;
    const url = isNew ? "/api/admin/faqs" : `/api/admin/faqs/${faq.id}`;
    const method = isNew ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    });

    setEditing(null);
    setCreating(false);
    loadFaqs();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    loadFaqs();
  }

  async function togglePublish(faq: Faq) {
    await fetch(`/api/admin/faqs/${faq.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...faq, is_published: !faq.is_published }),
    });
    loadFaqs();
  }

  if (loading) return <p className="font-body text-pine-cone/50">Loading...</p>;

  const grouped = CATEGORIES.reduce<Record<string, Faq[]>>((acc, cat) => {
    acc[cat] = faqs.filter((f) => f.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-pine-cone">FAQs ({faqs.length})</h1>
        <button
          onClick={() => { setCreating(true); setEditing({ id: "", category: "general", question: "", answer: "", sort_order: 0, audience_filter: null, is_published: true }); }}
          className="rounded-xl bg-ever-green px-4 py-2 font-body text-sm font-semibold text-white hover:bg-grc-green"
        >
          + Add FAQ
        </button>
      </div>

      {(editing || creating) && (
        <FaqForm
          faq={editing!}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setCreating(false); }}
          isNew={creating}
        />
      )}

      {CATEGORIES.map((cat) => {
        const items = grouped[cat];
        if (!items?.length) return null;
        return (
          <div key={cat} className="mb-6">
            <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-pine-cone/50">
              {cat} ({items.length})
            </h2>
            <div className="space-y-2">
              {items.map((faq) => (
                <div
                  key={faq.id}
                  className={`flex items-start justify-between rounded-xl border bg-white p-4 ${faq.is_published ? "border-ever-green/[0.06]" : "border-red-200 bg-red-50/30"}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm font-semibold text-pine-cone">{faq.question}</p>
                    <p className="mt-1 font-body text-xs text-pine-cone/50 line-clamp-2">{faq.answer}</p>
                    {faq.audience_filter && (
                      <span className="mt-1 inline-block rounded-md bg-ever-green/[0.06] px-2 py-0.5 font-body text-xs text-ever-green">
                        {faq.audience_filter}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex shrink-0 gap-1">
                    <button onClick={() => togglePublish(faq)} className="rounded-lg px-2 py-1 font-body text-xs text-pine-cone/50 hover:bg-pine-cone/5" title={faq.is_published ? "Unpublish" : "Publish"}>
                      {faq.is_published ? "👁" : "👁‍🗨"}
                    </button>
                    <button onClick={() => { setEditing(faq); setCreating(false); }} className="rounded-lg px-2 py-1 font-body text-xs text-sky-blue hover:bg-sky-blue/10">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(faq.id)} className="rounded-lg px-2 py-1 font-body text-xs text-red-500 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FaqForm({ faq, onSave, onCancel, isNew }: { faq: Faq; onSave: (f: Partial<Faq>) => void; onCancel: () => void; isNew: boolean }) {
  const [form, setForm] = useState(faq);

  return (
    <div className="mb-6 rounded-2xl border border-ever-green/10 bg-white p-6">
      <h3 className="mb-4 font-heading text-lg font-bold text-pine-cone">{isNew ? "New FAQ" : "Edit FAQ"}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Audience Filter</label>
          <select
            value={form.audience_filter ?? ""}
            onChange={(e) => setForm({ ...form, audience_filter: e.target.value || null })}
            className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm"
          >
            <option value="">All audiences</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Question</label>
        <input
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm"
        />
      </div>
      <div className="mt-4">
        <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Answer</label>
        <textarea
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm"
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label className="flex items-center gap-2 font-body text-sm">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
          />
          Published
        </label>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
          className="w-20 rounded-lg border border-ever-green/10 px-3 py-1.5 font-body text-sm"
          placeholder="Order"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave(form)} className="rounded-xl bg-ever-green px-4 py-2 font-body text-sm font-semibold text-white hover:bg-grc-green">
          {isNew ? "Create" : "Save"}
        </button>
        <button onClick={onCancel} className="rounded-xl border border-ever-green/10 px-4 py-2 font-body text-sm text-pine-cone/70 hover:bg-pine-cone/5">
          Cancel
        </button>
      </div>
    </div>
  );
}
