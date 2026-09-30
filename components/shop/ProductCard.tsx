import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatZAR } from "@/lib/format";
import { ProductImage } from "@/components/ui/ProductImage";
import { WishlistButton } from "./WishlistButton";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product, priority = false, sizes = "(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw", showTagline = true }: { product: Product; priority?: boolean; sizes?: string; showTagline?: boolean }) {
  const second = product.images[1];
  return (
    <article className="group relative">
      <Link href={`/product/${product.slug}`} className="block" aria-label={product.name}>
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
          <ProductImage src={product.images[0]} alt={`${product.name}, ${product.colours[0].name} leather ${product.category.replace(/s$/, "")}`} sizes={sizes} priority={priority} className={`transition-all duration-[900ms] ease-out ${second ? "group-hover:opacity-0" : "group-hover:scale-105"}`} />
          {second && <ProductImage src={second} alt={`${product.name}, alternate view`} sizes={sizes} className="opacity-0 transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100" />}
          {product.isNew && product.inStock && <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em]">New</span>}
          {!product.inStock && <span className="absolute left-3 top-3 bg-charcoal px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-ivory">Sold out</span>}
        </div>
      </Link>
      <WishlistButton product={product} className="absolute right-1.5 top-1.5 h-11 w-11 text-charcoal" />
      <div className="absolute inset-x-0 top-0 hidden aspect-[4/5] items-end p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:flex pointer-events-none">
        <div className="pointer-events-auto w-full"><QuickAdd product={product} /></div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-[1.15rem] leading-snug sm:text-[1.3rem]">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          {showTagline && <p className="mt-1 text-[0.8rem] leading-snug text-muted">{product.tagline}</p>}
        </div>
        <p className="shrink-0 pt-0.5 text-sm tabular-nums">{formatZAR(product.price)}</p>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5" aria-label={`Available in ${product.colours.map((c) => c.name).join(", ")}`}>
        {product.colours.map((c) => (
          <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-charcoal/20" style={{ background: c.hex }} />
        ))}
        {product.colours.length === 1 && <span className="ml-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted">{product.colours[0].name}</span>}
      </div>
      <div className="mt-3 lg:hidden"><QuickAdd product={product} /></div>
    </article>
  );
}
