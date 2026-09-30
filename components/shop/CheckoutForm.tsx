"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatZAR } from "@/lib/format";
import { OrderSummary } from "./OrderSummary";

const provinces = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];
type Errors = Record<string, string>;

export function CheckoutForm() {
  const { lines, setQty, notify } = useStore();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  if (done) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="eyebrow mb-5">Order received</p>
        <h2 className="text-4xl uppercase tracking-[0.04em]">Thank you</h2>
        <p className="mt-6 text-muted">Your order reference is <span className="text-charcoal">{done}</span>. A confirmation has been sent to your email. Payment processing will be connected to your chosen gateway (for example Yoco, PayFast or Peach Payments).</p>
        <Button href="/shop" className="mt-10">Continue shopping</Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-4xl">Your bag is empty</p>
        <Button href="/shop" className="mt-10">Shop the collection</Button>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = "Enter a valid email address.";
    if (v("name").length < 2) errs.name = "Enter your full name.";
    if (!/^(\+27|0)[1-9]\d{8}$/.test(v("phone").replace(/[\s-]/g, ""))) errs.phone = "Enter a South African number, e.g. +27 82 123 4567.";
    if (v("address").length < 4) errs.address = "Enter your street address.";
    if (v("city").length < 2) errs.city = "Enter your city or suburb.";
    if (!v("province")) errs.province = "Select a province.";
    if (!/^\d{4}$/.test(v("postal"))) errs.postal = "Enter a 4-digit postal code.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify("Please check the highlighted fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone("TLO-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  }

  const field = (id: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">{label}</label>
      <input id={id} name={id} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-e` : undefined} className={`min-h-[52px] w-full border bg-transparent px-4 text-base outline-none transition-colors focus:border-charcoal ${errors[id] ? "border-cognac" : "border-line"}`} {...props} />
      {errors[id] && <p id={`${id}-e`} role="alert" className="mt-1.5 text-xs text-cognac">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <div className="space-y-12">
        <section aria-labelledby="c-contact">
          <h2 id="c-contact" className="mb-6 text-3xl">Contact</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "+27 82 123 4567", inputMode: "tel" })}
          </div>
        </section>
        <section aria-labelledby="c-delivery">
          <h2 id="c-delivery" className="mb-6 text-3xl">Delivery address</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">{field("name", "Full name", { autoComplete: "name" })}</div>
            <div className="sm:col-span-2">{field("address", "Street address", { autoComplete: "street-address" })}</div>
            {field("city", "City / suburb", { autoComplete: "address-level2" })}
            <div>
              <label htmlFor="province" className="eyebrow mb-2 block">Province</label>
              <select id="province" name="province" defaultValue="" aria-invalid={!!errors.province} className={`min-h-[52px] w-full border bg-transparent px-4 text-base outline-none focus:border-charcoal ${errors.province ? "border-cognac" : "border-line"}`}>
                <option value="" disabled>Select</option>
                {provinces.map((p) => (<option key={p}>{p}</option>))}
              </select>
              {errors.province && <p role="alert" className="mt-1.5 text-xs text-cognac">{errors.province}</p>}
            </div>
            {field("postal", "Postal code", { inputMode: "numeric", maxLength: 4, autoComplete: "postal-code" })}
          </div>
        </section>
        <section aria-labelledby="c-pay">
          <h2 id="c-pay" className="mb-4 text-3xl">Payment</h2>
          <p className="border border-line p-5 text-sm text-muted">Card, instant EFT and Apple Pay are processed securely by your chosen payment gateway once connected. No payment is taken in this demo.</p>
        </section>
      </div>

      <aside className="h-fit bg-ivory-deep p-7 sm:p-9 lg:sticky lg:top-28">
        <h2 className="mb-6 text-2xl">Order summary</h2>
        <ul className="mb-7 space-y-5">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ivory"><ProductImage src={l.image} alt={l.name} sizes="80px" /></div>
              <div className="flex-1 text-sm">
                <p className="font-serif text-lg leading-tight">{l.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{l.colour} &times; {l.quantity}</p>
                <button type="button" onClick={() => setQty(l.key, l.quantity - 1)} className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-muted underline">Remove one</button>
              </div>
              <p className="text-sm tabular-nums">{formatZAR(l.price * l.quantity)}</p>
            </li>
          ))}
        </ul>
        <OrderSummary />
        <Button type="submit" loading={loading} className="mt-7 w-full">Place order</Button>
        <p className="mt-5 text-center text-[0.68rem] uppercase tracking-[0.18em] text-muted">Secure checkout &nbsp;|&nbsp; Delivery across South Africa</p>
        <Link href="/cart" className="link-underline mx-auto mt-4 block w-fit text-[0.66rem] uppercase tracking-[0.22em]">Back to bag</Link>
      </aside>
    </form>
  );
}
