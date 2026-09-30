"use client";

import { formatZAR } from "@/lib/format";
import { useStore } from "@/components/providers";

export function OrderSummary() {
  const { subtotal, delivery, total } = useStore();
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatZAR(subtotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{delivery === 0 ? "Complimentary" : formatZAR(delivery)}</dd></div>
      <div className="flex justify-between border-t border-line pt-4 font-serif text-2xl"><dt>Total</dt><dd className="tabular-nums">{formatZAR(total)}</dd></div>
      <p className="pt-1 text-xs text-muted">Prices include VAT.</p>
    </dl>
  );
}
