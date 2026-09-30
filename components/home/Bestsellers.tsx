import { getBestsellers } from "@/lib/commerce";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";

export async function Bestsellers() {
  const items = await getBestsellers(4);
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" aria-labelledby="best-h">
      <Reveal className="text-center"><div id="best-h"><SectionHeading align="center" eyebrow="Most loved" title="Bestsellers" body="The pieces our customers return to, and reorder as gifts." /></div></Reveal>
      <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {items.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 100}><ProductCard product={p} showTagline={false} /></Reveal>
        ))}
      </ul>
      <div className="mt-16 flex justify-center"><Button href="/shop" variant="outline">Shop all</Button></div>
    </section>
  );
}
