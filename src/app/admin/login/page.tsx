"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-dim/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-ever-green/[0.06] bg-white p-8 shadow-elevated"
      >
        <h1 className="mb-1 font-heading text-2xl font-bold text-ever-green">Admin Panel</h1>
        <p className="mb-6 font-body text-sm text-pine-cone/60">Enter the admin password to continue.</p>

        <label className="mb-2 block font-body text-sm font-medium text-pine-cone/80">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border border-ever-green/[0.1] bg-surface-dim/30 px-4 py-2.5 font-body text-sm text-pine-cone outline-none transition-colors focus:border-ever-green/30 focus:ring-2 focus:ring-ever-green/10"
          placeholder="Enter password"
          autoFocus
        />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-xl bg-ever-green px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-grc-green disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
