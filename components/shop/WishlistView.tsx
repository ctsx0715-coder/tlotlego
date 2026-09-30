"use client";

import { useStore } from "@/components/providers";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export function WishlistView({ products }: { products: Product[] }) {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  if (saved.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-4xl">Nothing saved yet</p>
        <p className="mx-auto mt-4 max-w-sm text-muted">Tap the heart on any piece to keep it here.</p>
        <Button href="/shop" className="mt-10">Explore the collection</Button>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
      {saved.map((p) => (<li key={p.id}><ProductCard product={p} /></li>))}
    </ul>
  );
}
