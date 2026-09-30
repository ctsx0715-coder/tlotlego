"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";

export function ProductView({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0].name);
  const images = product.colours.find((c) => c.name === colour)?.images ?? product.images;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16 xl:gap-24">
      <ProductGallery key={colour} images={images} name={product.name} />
      <div className="lg:sticky lg:top-28 lg:self-start"><ProductInfo product={product} onColourChange={setColour} /></div>
    </div>
  );
}
