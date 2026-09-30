import { getFeatured } from "@/lib/commerce";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export async function FeaturedCollection() {
  const items = await getFeatured(6);
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" aria-labelledby="collection-h">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal><div id="collection-h"><SectionHeading eyebrow="Featured" title="The Collection" body="Designed with intention. Crafted from premium materials. Made to become part of your everyday." /></div></Reveal>
        <Reveal delay={150}><Button href="/shop" variant="ghost">View all pieces</Button></Reveal>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
        {items.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 3) * 110}>
            <ProductCard product={p} sizes="(max-width:1024px) 50vw, 33vw" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
