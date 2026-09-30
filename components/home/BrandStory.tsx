import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const points = ["Skilled craftsmanship", "Premium materials", "Attention to detail", "Responsible sourcing", "Long-term durability", "Handmade and custom possibilities"];

export function BrandStory() {
  return (
    <section className="bg-ivory-deep" aria-labelledby="story-h">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        <Reveal variant="image" className="relative aspect-[4/5] w-full lg:aspect-auto lg:min-h-[820px]">
          <Image src="/images/story.svg" alt="Leather panels, tools and brass hardware laid out on the workshop bench" fill sizes="(max-width:1024px) 100vw, 50vw" unoptimized className="object-cover" />
        </Reveal>
        <div className="flex items-center px-5 py-20 sm:px-12 lg:px-20 xl:px-28">
          <div className="max-w-xl">
            <Reveal><p className="eyebrow mb-5">Our philosophy</p></Reveal>
            <Reveal delay={80}><h2 id="story-h" className="text-[2.4rem] uppercase leading-[1.05] tracking-[0.03em] sm:text-5xl lg:text-[3.6rem]">The Art of Craft</h2></Reveal>
            <Reveal delay={160}><p className="mt-8 font-serif text-2xl leading-snug sm:text-[1.75rem]">Tlotlego Store is built around the belief that great leather goods should be more than beautiful. They should be made to last.</p></Reveal>
            <Reveal delay={240}>
              <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-charcoal/15 pt-8 text-sm sm:grid-cols-2">
                {points.map((p) => (<li key={p} className="flex items-center gap-3"><span className="h-px w-5 bg-cognac" />{p}</li>))}
              </ul>
            </Reveal>
            <Reveal delay={320}><Button href="/our-story" variant="outline" className="mt-12">Our story</Button></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
