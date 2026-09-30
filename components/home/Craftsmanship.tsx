import Image from "next/image";
import { craftSteps } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Craftsmanship({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-charcoal text-ivory" aria-labelledby="craft-h">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {heading && (
          <Reveal><div id="craft-h"><SectionHeading tone="dark" eyebrow="The process" title="Made by hand, step by step" body="Every piece passes through skilled hands, from the first cut to the final inspection." /></div></Reveal>
        )}
        <ol className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {craftSteps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 130} className={i % 2 ? "lg:mt-16" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden bg-brown">
                <Image src={s.image} alt={`${s.title}: ${s.body}`.slice(0, 90)} fill sizes="(max-width:640px) 100vw, 25vw" unoptimized className="object-cover" />
              </div>
              <p className="mt-6 font-serif text-4xl text-sand">{s.n}</p>
              <h3 className="mt-2 text-2xl uppercase tracking-[0.14em]">{s.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
