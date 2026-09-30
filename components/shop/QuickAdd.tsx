"use client";

import { useState } from "react";
import { useStore } from "@/components/providers";
import { CheckIcon } from "@/components/ui/Icons";
import { Spinner } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export function QuickAdd({ product, colour, className = "" }: { product: Product; colour?: string; className?: string }) {
  const { addToCart, setCartOpen } = useStore();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  if (!product.inStock) {
    return <span className={`flex h-11 items-center justify-center text-[0.66rem] uppercase tracking-[0.22em] text-muted ${className}`}>Sold out</span>;
  }

  return (
    <button
      type="button"
      disabled={state === "loading"}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setState("loading");
        await addToCart(product, colour ?? product.colours[0].name);
        setState("done");
        setCartOpen(true);
        setTimeout(() => setState("idle"), 1600);
      }}
      className={`flex h-11 w-full items-center justify-center gap-2 bg-charcoal text-[0.66rem] uppercase tracking-[0.22em] text-ivory transition-colors duration-500 hover:bg-cognac-deep disabled:opacity-80 ${className}`}
    >
      {state === "loading" && <Spinner />}
      {state === "done" && <CheckIcon />}
      {state === "idle" ? "Quick add" : state === "loading" ? "Adding" : "Added"}
    </button>
  );
}
