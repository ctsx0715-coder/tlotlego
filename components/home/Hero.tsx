import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative -mt-16 h-[100svh] min-h-[620px] w-full overflow-hidden bg-brown text-ivory sm:-mt-[72px]" aria-label="Introduction">
      <Image src="/images/hero.svg" alt="A cognac leather satchel with brass hardware, lit softly against a dark background" fill priority sizes="100vw" unoptimized className="animate-hero object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/40" />
      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <p className="eyebrow animate-rise !text-sand" style={{ animationDelay: "300ms" }}>Autumn / Winter Collection</p>
        <h1 className="animate-rise mt-5 max-w-3xl text-[3.1rem] uppercase leading-[0.98] tracking-[0.02em] sm:text-[5.5rem] lg:text-[7rem]" style={{ animationDelay: "450ms" }}>
          Crafted <br className="hidden sm:block" />to last
        </h1>
        <p className="animate-rise mt-6 max-w-md text-base text-ivory/85 sm:text-lg" style={{ animationDelay: "650ms" }}>
          Premium leather goods, thoughtfully made.
        </p>
        <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "850ms" }}>
          <Button href="/shop" variant="light">Shop the collection</Button>
          <Button href="/craftsmanship" variant="outline" className="!border-ivory !text-ivory hover:!bg-ivory hover:!text-charcoal">Discover our craft</Button>
        </div>
      </div>
    </section>
  );
}
