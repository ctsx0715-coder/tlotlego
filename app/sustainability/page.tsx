import { pageMeta } from "@/lib/seo";
import { sustainability } from "@/data/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMeta({ title: "Sustainability | Craft With Consideration", description: "Responsible leather sourcing, durable design, less waste and small-batch production. How Tlotlego Store thinks about making things to last.", path: "/sustainability", image: "/images/sustain.svg" });

export default function SustainabilityPage() {
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Responsibility" title="Craft with consideration" body="Practical commitments, stated plainly." crumbs={[{ label: "Home", href: "/" }, { label: "Sustainability" }]} />
      <div className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 lg:px-12">
        <ul className="grid gap-10 md:grid-cols-2">
          {sustainability.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="border-t border-charcoal/20 pt-6">
              <h2 className="text-3xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="px-5 pb-28 pt-10">
        <Prose>
          <p>Leather is a natural material with a real environmental footprint. We do not claim to be perfect, and we avoid broad claims we cannot support. What we can do is make fewer, better things, choose suppliers carefully, and design pieces that last long enough to justify the resources they use.</p>
          <p>If you would like to know more about where a specific material comes from, <a href="/contact">get in touch</a> and we will share what we know.</p>
        </Prose>
      </div>
    </div>
  );
}
