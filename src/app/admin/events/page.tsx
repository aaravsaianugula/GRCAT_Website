"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  date_label: string;
  event_type: string;
  description: string;
  is_upcoming: boolean;
  audience_highlights: { student: boolean; faculty: boolean; staff: boolean };
  sort_order: number;
  is_published: boolean;
}

const EVENT_TYPES = ["Course", "Workshop", "Launch", "Training", "Presentation", "Development", "Forum", "Milestone"];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadEvents() {
    const res = await fetch("/api/admin/events");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setEvents(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadEvents(); }, []);

  async function handleSave(event: Partial<Event> & { id?: string }) {
    const isNew = !event.id;
    const url = isNew ? "/api/admin/events" : `/api/admin/events/${event.id}`;
    await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    setEditing(null);
    setCreating(false);
    loadEvents();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    loadEvents();
  }

  if (loading) return <p className="font-body text-pine-cone/50">Loading...</p>;

  const upcoming = events.filter((e) => e.is_upcoming);
  const past = events.filter((e) => !e.is_upcoming);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-pine-cone">Events ({events.length})</h1>
        <button
          onClick={() => {
            setCreating(true);
            setEditing({
              id: "", title: "", date_label: "", event_type: "Workshop",
              description: "", is_upcoming: false,
              audience_highlights: { student: false, faculty: false, staff: false },
              sort_order: 0, is_published: true,
            });
          }}
          className="rounded-xl bg-ever-green px-4 py-2 font-body text-sm font-semibold text-white hover:bg-grc-green"
        >
          + Add Event
        </button>
      </div>

      {(editing || creating) && (
        <EventForm
          event={editing!}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setCreating(false); }}
          isNew={creating}
        />
      )}

      {[{ label: "Upcoming", items: upcoming }, { label: "Past", items: past }].map(({ label, items }) => (
        items.length > 0 && (
          <div key={label} className="mb-6">
            <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-pine-cone/50">{label}</h2>
            <div className="space-y-2">
              {items.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-start justify-between rounded-xl border bg-white p-4 ${event.is_published ? "border-ever-green/[0.06]" : "border-red-200 bg-red-50/30"}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-ever-green/[0.06] px-2 py-0.5 font-body text-xs font-medium text-ever-green">{event.event_type}</span>
                      <span className="font-body text-xs text-pine-cone/40">{event.date_label}</span>
                    </div>
                    <p className="mt-1 font-body text-sm font-semibold text-pine-cone">{event.title}</p>
                    <p className="mt-1 font-body text-xs text-pine-cone/50 line-clamp-1">{event.description}</p>
                  </div>
                  <div className="ml-3 flex shrink-0 gap-1">
                    <button onClick={() => { setEditing(event); setCreating(false); }} className="rounded-lg px-2 py-1 font-body text-xs text-sky-blue hover:bg-sky-blue/10">Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="rounded-lg px-2 py-1 font-body text-xs text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

function EventForm({ event, onSave, onCancel, isNew }: { event: Event; onSave: (e: Partial<Event>) => void; onCancel: () => void; isNew: boolean }) {
  const [form, setForm] = useState(event);

  return (
    <div className="mb-6 rounded-2xl border border-ever-green/10 bg-white p-6">
      <h3 className="mb-4 font-heading text-lg font-bold text-pine-cone">{isNew ? "New Event" : "Edit Event"}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm" />
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Date Label</label>
          <input value={form.date_label} onChange={(e) => setForm({ ...form, date_label: e.target.value })} className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm" placeholder="e.g. Spring 2026" />
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Type</label>
          <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm">
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Sort Order</label>
          <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1 block font-body text-xs font-medium text-pine-cone/60">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-ever-green/10 px-3 py-2 font-body text-sm" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" checked={form.is_upcoming} onChange={(e) => setForm({ ...form, is_upcoming: e.target.checked })} />
          Upcoming
        </label>
        <label className="flex items-center gap-2 font-body text-sm">
          <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
          Published
        </label>
        <span className="font-body text-xs text-pine-cone/40">Audience:</span>
        {(["student", "faculty", "staff"] as const).map((a) => (
          <label key={a} className="flex items-center gap-1 font-body text-sm">
            <input
              type="checkbox"
              checked={form.audience_highlights[a]}
              onChange={(e) => setForm({ ...form, audience_highlights: { ...form.audience_highlights, [a]: e.target.checked } })}
            />
            {a}
          </label>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave(form)} className="rounded-xl bg-ever-green px-4 py-2 font-body text-sm font-semibold text-white hover:bg-grc-green">{isNew ? "Create" : "Save"}</button>
        <button onClick={onCancel} className="rounded-xl border border-ever-green/10 px-4 py-2 font-body text-sm text-pine-cone/70 hover:bg-pine-cone/5">Cancel</button>
      </div>
    </div>
  );
}
