"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/data/site";
import { formatZAR } from "@/lib/format";
import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/Icons";
import { CartLines } from "@/components/shop/CartLines";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, delivery, total } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const remaining = Math.max(0, site.freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / site.freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[55]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="animate-fade absolute inset-0 bg-charcoal/50" onClick={() => setCartOpen(false)} />
      <aside className="animate-drawer absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-ivory text-charcoal">
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button type="button" aria-label="Close bag" className="-mr-2 flex h-11 w-11 items-center justify-center" onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-3xl">Your bag is empty</p>
            <p className="mt-3 max-w-xs text-sm text-muted">Pieces made to last are waiting in the collection.</p>
            <Button href="/shop" className="mt-8" onClick={() => setCartOpen(false)}>
              Shop the collection
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="text-xs text-muted">
                {remaining > 0 ? `Add ${formatZAR(remaining)} for complimentary delivery` : "You qualify for complimentary delivery"}
              </p>
              <div className="mt-2 h-px w-full bg-line">
                <div className="h-px bg-cognac transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <CartLines compact />
            </div>
            <div className="border-t border-line bg-ivory px-6 pb-6 pt-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatZAR(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{delivery === 0 ? "Complimentary" : formatZAR(delivery)}</dd></div>
                <div className="flex justify-between border-t border-line pt-3 font-serif text-xl"><dt>Total</dt><dd>{formatZAR(total)}</dd></div>
              </dl>
              <Button href="/checkout" className="mt-5 w-full" onClick={() => setCartOpen(false)}>
                Proceed to checkout
              </Button>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="link-underline mx-auto mt-4 block w-fit text-[0.68rem] uppercase tracking-[0.22em]">
                View bag
              </Link>
              <p className="mt-5 text-center text-[0.68rem] uppercase tracking-[0.18em] text-muted">Secure checkout &nbsp;|&nbsp; Delivery across South Africa</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
