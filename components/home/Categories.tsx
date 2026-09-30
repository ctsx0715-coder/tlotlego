import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const cats = [
  { title: "Handbags", href: "/shop/handbags", image: "/images/cat-handbags.svg", alt: "Cognac leather handbag" },
  { title: "Wallets", href: "/shop/wallets", image: "/images/cat-wallets.svg", alt: "Espresso leather wallet" },
  { title: "Belts", href: "/shop/belts", image: "/images/cat-belts.svg", alt: "Coiled black leather belt" },
  { title: "Custom", href: "/custom-orders", image: "/images/cat-custom.svg", alt: "Leather workshop tools and a cut panel" },
];

export function Categories() {
  return (
    <section aria-label="Shop by category" className="px-2 sm:px-3">
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {cats.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 90}>
            <Link href={c.href} className="group relative block aspect-[3/4] overflow-hidden bg-brown lg:aspect-[3/4.4]">
              <Image src={c.image} alt={c.alt} fill sizes="(max-width:1024px) 50vw, 25vw" unoptimized className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-7">
                <h3 className="text-2xl uppercase tracking-[0.12em] sm:text-3xl">{c.title}</h3>
                <span className="mt-2 inline-block text-[0.66rem] uppercase tracking-[0.26em] transition-all duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">Shop now</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
