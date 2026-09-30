"use client";

import { useStore } from "@/components/providers";
import { Button } from "@/components/ui/Button";
import { CartLines } from "./CartLines";
import { OrderSummary } from "./OrderSummary";

export function CartPageView() {
  const { lines } = useStore();
  if (lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-4xl">Your bag is empty</p>
        <p className="mx-auto mt-4 max-w-sm text-muted">Pieces made to last are waiting in the collection.</p>
        <Button href="/shop" className="mt-10">Shop the collection</Button>
      </div>
    );
  }
  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
      <CartLines />
      <aside className="h-fit bg-ivory-deep p-7 sm:p-9 lg:sticky lg:top-28">
        <h2 className="mb-6 text-2xl">Order summary</h2>
        <OrderSummary />
        <Button href="/checkout" className="mt-7 w-full">Proceed to checkout</Button>
        <ul className="mt-6 space-y-1.5 text-center text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          <li>Secure checkout</li>
          <li>Delivery across South Africa</li>
        </ul>
      </aside>
    </div>
  );
}
