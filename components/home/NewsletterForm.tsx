"use client";

import { useState } from "react";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark"; compact?: boolean }) {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!res.ok) throw new Error();
      setDone(true);
      notify("Welcome to the Journal");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (done) return <p className="font-serif text-2xl">Thank you. Your first letter is on its way.</p>;

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={`flex flex-col gap-3 sm:flex-row ${tone === "dark" ? "" : ""}`}>
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-invalid={!!error} aria-describedby={error ? "nl-err" : undefined} className={`min-h-[52px] flex-1 border-b bg-transparent px-1 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-cognac ${tone === "dark" ? "border-ivory/40" : "border-charcoal/40"}`} />
        <Button type="submit" loading={loading} variant={tone === "dark" ? "light" : "solid"}>Subscribe</Button>
      </div>
      {error && <p id="nl-err" role="alert" className="mt-3 text-sm text-cognac">{error}</p>}
    </form>
  );
}
