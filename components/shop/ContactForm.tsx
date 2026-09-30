"use client";

import { useState } from "react";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const { notify } = useStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!body.name?.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email ?? "")) errs.email = "Enter a valid email address.";
    if ((body.message ?? "").trim().length < 10) errs.message = "Please write a short message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      setDone(true);
      notify("Message sent");
    } catch { notify("Something went wrong. Please try again."); }
    setLoading(false);
  }

  if (done) return <p className="font-serif text-3xl">Thank you. We will reply within one business day.</p>;
  const cls = (k: string) => `min-h-[52px] w-full border bg-transparent px-4 text-base outline-none focus:border-charcoal ${errors[k] ? "border-cognac" : "border-line"}`;
  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div><label htmlFor="c-name" className="eyebrow mb-2 block">Name</label><input id="c-name" name="name" autoComplete="name" className={cls("name")} />{errors.name && <p role="alert" className="mt-1.5 text-xs text-cognac">{errors.name}</p>}</div>
      <div><label htmlFor="c-email" className="eyebrow mb-2 block">Email</label><input id="c-email" name="email" type="email" autoComplete="email" className={cls("email")} />{errors.email && <p role="alert" className="mt-1.5 text-xs text-cognac">{errors.email}</p>}</div>
      <div><label htmlFor="c-msg" className="eyebrow mb-2 block">Message</label><textarea id="c-msg" name="message" rows={5} className={`${cls("message")} py-3`} />{errors.message && <p role="alert" className="mt-1.5 text-xs text-cognac">{errors.message}</p>}</div>
      <Button type="submit" loading={loading}>Send message</Button>
    </form>
  );
}
