"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-3 lg:grid-cols-[88px_1fr]">
      <ul className="order-2 flex gap-3 lg:order-1 lg:flex-col" aria-label="Product images">
        {images.map((src, i) => (
          <li key={src + i} className="w-20 lg:w-full">
            <button type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} aria-current={i === active} className={`relative block aspect-[4/5] w-full overflow-hidden bg-ivory-deep outline-offset-2 transition-opacity ${i === active ? "outline outline-1 outline-charcoal" : "opacity-60 hover:opacity-100"}`}>
              <ProductImage src={src} alt="" sizes="100px" />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative order-1 aspect-[4/5] overflow-hidden bg-ivory-deep lg:order-2">
        {images.map((src, i) => (
          <div key={src + i} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
            <ProductImage src={src} alt={`${name}, view ${i + 1}`} sizes="(max-width:1024px) 100vw, 55vw" priority={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
