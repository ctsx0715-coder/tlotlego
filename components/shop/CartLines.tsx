"use client";

import Link from "next/link";
import { useStore } from "@/components/providers";
import { formatZAR } from "@/lib/format";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityControl } from "./QuantityControl";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, setQty, remove, setCartOpen } = useStore();
  return (
    <ul className="divide-y divide-line">
      {lines.map((l) => (
        <li key={l.key} className={`flex gap-4 ${compact ? "py-5" : "py-7 sm:gap-6"}`}>
          <Link href={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className={`relative shrink-0 overflow-hidden bg-ivory-deep ${compact ? "h-28 w-24" : "h-36 w-28 sm:h-44 sm:w-36"}`}>
            <ProductImage src={l.image} alt={l.name} sizes="150px" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link href={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-lg leading-snug">{l.name}</Link>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{l.colour}</p>
              </div>
              <p className="text-sm tabular-nums">{formatZAR(l.price * l.quantity)}</p>
            </div>
            <div className="mt-auto flex items-end justify-between pt-3">
              <QuantityControl value={l.quantity} onChange={(n) => setQty(l.key, n)} label={`Quantity for ${l.name}`} />
              <button type="button" onClick={() => remove(l.key)} className="link-underline text-[0.66rem] uppercase tracking-[0.2em] text-muted" aria-label={`Remove ${l.name}`}>
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
