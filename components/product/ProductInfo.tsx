"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatZAR } from "@/lib/format";
import { site } from "@/data/site";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";
import { QuantityControl } from "@/components/shop/QuantityControl";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { Accordion } from "./Accordion";
import { CheckIcon } from "@/components/ui/Icons";

export function ProductInfo({ product, onColourChange }: { product: Product; onColourChange?: (name: string) => void }) {
  const { addToCart, setCartOpen } = useStore();
  const router = useRouter();
  const [colour, setColour] = useState(product.colours[0].name);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);
  const [added, setAdded] = useState(false);

  const pick = (name: string) => { setColour(name); onColourChange?.(name); };

  async function add() {
    setAdding(true);
    await addToCart(product, colour, qty);
    setAdding(false);
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }
  async function buy() {
    setBuying(true);
    await addToCart(product, colour, qty);
    router.push("/checkout");
  }

  return (
    <div>
      <p className="eyebrow">{product.category}</p>
      <h1 className="mt-3 text-[2.4rem] leading-[1.05] sm:text-5xl">{product.name}</h1>
      <p className="mt-2 text-muted">{product.tagline}</p>
      <p className="mt-6 font-serif text-3xl">{formatZAR(product.price)}</p>
      <p className="mt-1 text-xs text-muted">VAT inclusive. {product.price >= site.freeDeliveryThreshold ? "Complimentary delivery." : `Complimentary delivery over ${formatZAR(site.freeDeliveryThreshold)}.`}</p>

      <p className="mt-8 leading-relaxed text-ink/85">{product.description}</p>

      <fieldset className="mt-9">
        <legend className="eyebrow mb-4">Colour <span className="ml-2 normal-case tracking-normal text-charcoal">{colour}</span></legend>
        <div className="flex gap-3">
          {product.colours.map((c) => (
            <button key={c.name} type="button" onClick={() => pick(c.name)} aria-label={c.name} aria-pressed={colour === c.name} className={`h-11 w-11 rounded-full border p-1 transition-colors ${colour === c.name ? "border-charcoal" : "border-transparent hover:border-line"}`}>
              <span className="block h-full w-full rounded-full border border-charcoal/10" style={{ background: c.hex }} />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center gap-4">
        <QuantityControl value={qty} onChange={setQty} />
        <WishlistButton product={product} label className="h-[46px] border border-line px-5 hover:border-charcoal" />
      </div>

      {product.inStock ? (
        <div className="mt-6 grid gap-3">
          <Button onClick={add} loading={adding} className="w-full">
            {added ? (<><CheckIcon /> Added to bag</>) : "Add to cart"}
          </Button>
          <Button onClick={buy} loading={buying} variant="outline" className="w-full">Buy now</Button>
        </div>
      ) : (
        <div className="mt-6"><Button disabled className="w-full">Sold out</Button><p className="mt-3 text-sm text-muted">This piece is currently unavailable. <a href="/contact" className="link-underline">Ask about restocks</a>.</p></div>
      )}

      <ul className="mt-6 space-y-1.5 text-xs text-muted">
        <li>Secure checkout</li>
        <li>Delivery across South Africa in 2 to 6 business days</li>
        <li>30-day returns on unused items</li>
      </ul>

      <div className="mt-10">
        <Accordion
          items={[
            { title: "Details", content: <ul className="list-inside list-disc space-y-1.5">{product.details.map((d) => (<li key={d}>{d}</li>))}</ul> },
            { title: "Materials", content: <p>{product.material}. Hides are sourced from tanneries with recognised environmental standards and finished by hand.</p> },
            { title: "Care", content: <p>{product.care}</p> },
            { title: "Delivery & Returns", content: <p>Orders ship within 1 to 2 business days across South Africa. Delivery is complimentary over {formatZAR(site.freeDeliveryThreshold)}, otherwise {formatZAR(site.deliveryFee)}. Unused items can be returned within 30 days of delivery.</p> },
          ]}
        />
      </div>
    </div>
  );
}
