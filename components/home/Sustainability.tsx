import { sustainability } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "./SectionHeading";

export function Sustainability() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" aria-labelledby="sust-h">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5"><div id="sust-h"><SectionHeading eyebrow="Responsibility" title="Craft with consideration" body="We make fewer things, and we make them to be kept. That is the most practical form of sustainability we know." /></div>
          <Button href="/sustainability" variant="ghost" className="mt-10">Read more</Button>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {sustainability.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100} className="border-t border-charcoal/20 pt-6">
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
