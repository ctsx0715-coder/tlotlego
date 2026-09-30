import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CustomOrders() {
  return (
    <section className="relative isolate overflow-hidden bg-brown text-ivory" aria-labelledby="custom-h">
      <Image src="/images/custom.svg" alt="" aria-hidden fill sizes="100vw" unoptimized className="-z-10 object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      <div className="mx-auto flex min-h-[620px] max-w-[1600px] items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <Reveal><p className="eyebrow mb-5 !text-sand">Custom service</p></Reveal>
          <Reveal delay={80}><h2 id="custom-h" className="text-[2.6rem] uppercase leading-[1.05] tracking-[0.03em] sm:text-6xl">Made for you</h2></Reveal>
          <Reveal delay={160}><p className="mt-7 text-lg leading-relaxed text-ivory/85">Looking for something specific? Our custom leather service allows you to create a piece tailored to your preferences.</p></Reveal>
          <Reveal delay={240}><Button href="/custom-orders" variant="light" className="mt-10">Request a custom order</Button></Reveal>
        </div>
      </div>
    </section>
  );
}
