"use client";

import { useStore } from "@/components/providers";
import { HeartIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/types";

export function WishlistButton({ product, className = "", label = false }: { product: Product; className?: string; label?: boolean }) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className={`flex items-center justify-center gap-2 transition-transform duration-300 active:scale-90 ${saved ? "text-cognac" : ""} ${className}`}
    >
      <HeartIcon filled={saved} className={saved ? "scale-110" : ""} />
      {label && <span className="text-[0.68rem] uppercase tracking-[0.22em]">{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
