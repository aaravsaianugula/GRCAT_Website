"use client";

import { useRouter } from "next/navigation";

export function SearchTrigger() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/search")}
      className="flex items-center gap-2 rounded-button border border-border px-3 py-1.5 text-sm text-pine-cone/60 transition-colors hover:border-gator-green hover:text-pine-cone"
      aria-label="Search (Ctrl+K)"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden rounded border border-border bg-surface-dim px-1.5 py-0.5 font-body text-[10px] font-medium sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
