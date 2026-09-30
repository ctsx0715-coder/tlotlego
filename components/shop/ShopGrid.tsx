"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { CloseIcon } from "@/components/ui/Icons";

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

const priceBands = [
  { id: "all", label: "Any price", test: () => true },
  { id: "u1000", label: "Under R1 000", test: (n: number) => n < 1000 },
  { id: "1-3", label: "R1 000 to R3 000", test: (n: number) => n >= 1000 && n <= 3000 },
  { id: "3-5", label: "R3 000 to R5 000", test: (n: number) => n > 3000 && n <= 5000 },
  { id: "o5", label: "Over R5 000", test: (n: number) => n > 5000 },
];

export function ShopGrid({ products, initialSort = "featured", showCategoryFilter = true }: { products: Product[]; initialSort?: Sort; showCategoryFilter?: boolean }) {
  const [sort, setSort] = useState<Sort>(initialSort);
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [colour, setColour] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [open, setOpen] = useState(false);

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);
  const colours = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colours.map((c) => c.name)))).sort(), [products]);

  const list = useMemo(() => {
    const band = priceBands.find((b) => b.id === price)!;
    const out = products.filter(
      (p) => (category === "all" || p.category === category) && band.test(p.price) && (colour === "all" || p.colours.some((c) => c.name === colour)) && (!inStockOnly || p.inStock),
    );
    const sorted = [...out];
    if (sort === "newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, sort, category, price, colour, inStockOnly]);

  const active = [category !== "all", price !== "all", colour !== "all", inStockOnly].filter(Boolean).length;
  const reset = () => { setCategory("all"); setPrice("all"); setColour("all"); setInStockOnly(false); };

  const chip = (on: boolean) => `border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-colors ${on ? "border-charcoal bg-charcoal text-ivory" : "border-line hover:border-charcoal"}`;

  const filters = (
    <div className="space-y-9">
      {showCategoryFilter && (
        <fieldset>
          <legend className="eyebrow mb-4">Category</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(category === "all")} onClick={() => setCategory("all")}>All</button>
            {categories.map((c) => (<button key={c} type="button" className={`${chip(category === c)} capitalize`} onClick={() => setCategory(c)}>{c}</button>))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend className="eyebrow mb-4">Price</legend>
        <div className="flex flex-wrap gap-2">
          {priceBands.map((b) => (<button key={b.id} type="button" className={chip(price === b.id)} onClick={() => setPrice(b.id)}>{b.label}</button>))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-4">Colour</legend>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(colour === "all")} onClick={() => setColour("all")}>All</button>
          {colours.map((c) => (<button key={c} type="button" className={chip(colour === c)} onClick={() => setColour(c)}>{c}</button>))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-4">Availability</legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-[#9a5a2e]" />
          In stock only
        </label>
      </fieldset>
    </div>
  );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 flex items-center justify-between gap-4 border-y border-line bg-ivory/95 px-5 py-3 backdrop-blur sm:top-[72px] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <button type="button" onClick={() => setOpen(true)} className="flex min-h-11 items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em]" aria-haspopup="dialog">
          Filter{active > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cognac text-[0.6rem] text-ivory">{active}</span>}
        </button>
        <p className="hidden text-xs text-muted sm:block" aria-live="polite">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
        <label className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em]">
          <span className="hidden sm:inline">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-h-11 cursor-pointer border-0 bg-transparent pr-2 text-[0.7rem] uppercase tracking-[0.18em] outline-none" aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-serif text-3xl">No pieces match those filters</p>
          <button type="button" onClick={reset} className="link-underline mt-6 text-[0.7rem] uppercase tracking-[0.24em]">Clear filters</button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {list.map((p, i) => (<li key={p.id}><ProductCard product={p} priority={i < 4} showTagline /></li>))}
        </ul>
      )}

      {open && (
        <div className="fixed inset-0 z-[55]" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="animate-fade absolute inset-0 bg-charcoal/50" onClick={() => setOpen(false)} />
          <aside className="animate-drawer-left absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-ivory">
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <h2 className="font-serif text-2xl">Filter</h2>
              <button type="button" aria-label="Close filters" className="-mr-2 flex h-11 w-11 items-center justify-center" onClick={() => setOpen(false)}><CloseIcon /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">{filters}</div>
            <div className="flex gap-3 border-t border-line p-6">
              <button type="button" onClick={reset} className="min-h-[52px] flex-1 border border-line text-[0.68rem] uppercase tracking-[0.22em]">Clear</button>
              <button type="button" onClick={() => setOpen(false)} className="min-h-[52px] flex-[2] bg-charcoal text-[0.68rem] uppercase tracking-[0.22em] text-ivory">Show {list.length} {list.length === 1 ? "piece" : "pieces"}</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
