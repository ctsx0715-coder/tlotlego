"use client";

import { useState } from "react";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";

export function AccountForm() {
  const { notify } = useStore();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get("email")))) return setErr("Enter a valid email address.");
    if (String(fd.get("password")).length < 8) return setErr("Password must be at least 8 characters.");
    setErr("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    notify("Accounts will be enabled when a customer backend is connected");
  }

  const inputCls = "min-h-[52px] w-full border border-line bg-transparent px-4 text-base outline-none focus:border-charcoal";
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-10 flex border-b border-line" role="tablist">
        {(["in", "up"] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`min-h-12 flex-1 text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${mode === m ? "border-b border-charcoal text-charcoal" : "text-muted"}`}>
            {m === "in" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} noValidate className="space-y-5">
        {mode === "up" && (<div><label htmlFor="a-name" className="eyebrow mb-2 block">Full name</label><input id="a-name" name="name" autoComplete="name" className={inputCls} /></div>)}
        <div><label htmlFor="a-email" className="eyebrow mb-2 block">Email</label><input id="a-email" name="email" type="email" autoComplete="email" className={inputCls} /></div>
        <div><label htmlFor="a-pw" className="eyebrow mb-2 block">Password</label><input id="a-pw" name="password" type="password" autoComplete={mode === "in" ? "current-password" : "new-password"} className={inputCls} /></div>
        {err && <p role="alert" className="text-sm text-cognac">{err}</p>}
        <Button type="submit" loading={loading} className="w-full">{mode === "in" ? "Sign in" : "Create account"}</Button>
      </form>
    </div>
  );
}
