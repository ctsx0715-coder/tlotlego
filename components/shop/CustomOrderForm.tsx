"use client";

import { useState } from "react";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";

type Errors = Record<string, string>;
const input = "min-h-[52px] w-full border bg-transparent px-4 text-base outline-none transition-colors focus:border-charcoal";

function F({ id, label, children, error, full = false }: { id: string; label: string; children: React.ReactNode; error?: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="eyebrow mb-2 block">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-xs text-cognac">{error}</p>}
    </div>
  );
}

export function CustomOrderForm() {
  const { notify } = useStore();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Errors = {};
    if (v("name").length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = "Enter a valid email address.";
    if (!/^(\+27|0)[1-9]\d{8}$/.test(v("phone").replace(/[\s-]/g, ""))) errs.phone = "Enter a South African number, e.g. +27 82 123 4567.";
    if (!v("type")) errs.type = "Select a product type.";
    if (v("requirements").length < 10) errs.requirements = "Tell us a little about what you have in mind.";
    const file = fd.get("reference");
    if (file instanceof File && file.size > 8 * 1024 * 1024) errs.reference = "Image must be under 8 MB.";
    setErrors(errs);
    if (Object.keys(errs).length) return notify("Please check the highlighted fields");
    setLoading(true);
    try {
      const res = await fetch("/api/custom-order", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setDone(true);
      notify("Enquiry sent");
    } catch {
      notify("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="border border-line p-10 text-center">
        <p className="eyebrow mb-4">Enquiry received</p>
        <h2 className="text-4xl">Thank you</h2>
        <p className="mx-auto mt-5 max-w-md text-muted">We will review your brief and respond within two business days with questions or a quote.</p>
      </div>
    );
  }

  const cls = (id: string) => `${input} ${errors[id] ? "border-cognac" : "border-line"}`;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2" encType="multipart/form-data">
      <F id="name" error={errors.name} label="Name"><input id="name" name="name" autoComplete="name" className={cls("name")} /></F>
      <F id="email" error={errors.email} label="Email"><input id="email" name="email" type="email" autoComplete="email" className={cls("email")} /></F>
      <F id="phone" error={errors.phone} label="Phone"><input id="phone" name="phone" type="tel" placeholder="+27 82 123 4567" autoComplete="tel" className={cls("phone")} /></F>
      <F id="type" error={errors.type} label="Product type">
        <select id="type" name="type" defaultValue="" className={cls("type")}>
          <option value="" disabled>Select</option>
          {["Handbag", "Wallet", "Belt", "Laptop sleeve", "Other"].map((o) => (<option key={o}>{o}</option>))}
        </select>
      </F>
      <F id="leather" error={errors.leather} label="Preferred leather">
        <select id="leather" name="leather" defaultValue="Full-grain cowhide" className={cls("leather")}>
          {["Full-grain cowhide", "Vegetable-tanned cowhide", "Soft nappa", "Suede", "Not sure yet"].map((o) => (<option key={o}>{o}</option>))}
        </select>
      </F>
      <F id="colour" error={errors.colour} label="Colour"><input id="colour" name="colour" placeholder="e.g. Cognac, black, olive" className={cls("colour")} /></F>
      <F id="size" error={errors.size} label="Size / dimensions" full><input id="size" name="size" placeholder="e.g. 34 x 30 x 13 cm, or belt waist size" className={cls("size")} /></F>
      <F id="requirements" error={errors.requirements} label="Customisation requirements" full><textarea id="requirements" name="requirements" rows={4} placeholder="Pockets, hardware, initials, closure, lining" className={`${cls("requirements")} py-3`} /></F>
      <F id="reference" error={errors.reference} label="Reference image" full>
        <label htmlFor="reference" className={`flex min-h-[52px] cursor-pointer items-center justify-between border border-dashed px-4 text-sm ${errors.reference ? "border-cognac" : "border-line"} hover:border-charcoal`}>
          <span className={fileName ? "text-charcoal" : "text-muted"}>{fileName || "Upload a photo or sketch (JPG, PNG, PDF)"}</span>
          <span className="text-[0.66rem] uppercase tracking-[0.2em]">Browse</span>
        </label>
        <input id="reference" name="reference" type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
      </F>
      <F id="notes" error={errors.notes} label="Additional notes" full><textarea id="notes" name="notes" rows={3} className={`${cls("notes")} py-3`} /></F>
      <div className="sm:col-span-2"><Button type="submit" loading={loading} className="w-full sm:w-auto">Send enquiry</Button></div>
    </form>
  );
}
