import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";

export const metadata = pageMeta({ title: "Our Story | Handmade Leather Goods in South Africa", description: "Tlotlego Store makes handcrafted leather goods in South Africa, built on skilled craftsmanship, premium materials and pieces made to last.", path: "/our-story", image: "/images/story.svg" });

export default function StoryPage() {
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Our story" title="Made to be kept" body="A South African workshop making leather goods with patience, precision and a long view." crumbs={[{ label: "Home", href: "/" }, { label: "Our story" }]} />
      <Reveal variant="image" className="relative mx-auto aspect-[4/3] max-w-[1600px] sm:aspect-[21/9]">
        <Image src="/images/workshop.svg" alt="The Tlotlego workshop bench with leather, tools and hardware" fill sizes="100vw" unoptimized className="object-cover" priority />
      </Reveal>
      <div className="px-5 py-24 sm:py-32">
        <Prose>
          <p className="font-serif text-3xl leading-snug text-charcoal sm:text-4xl">Tlotlego means gratitude. It is how we think about the materials we are given and the people we make for.</p>
          <p>Tlotlego Store began with a simple frustration: too many leather goods were designed to be replaced. We wanted to make pieces that improve with age, that can be repaired, and that quietly become part of someone&rsquo;s everyday.</p>
          <h2>Craft first</h2>
          <p>Every piece begins with full-grain leather chosen by hand. Panels are cut, skived and stitched by artisans who understand that the small decisions, an edge finished twice or a stitch set a little tighter, are what a piece is judged on years later.</p>
          <h2>Made in South Africa</h2>
          <p>We design and make locally, working with tanneries and suppliers we know by name. It keeps our supply chain short and our standards visible, and it supports skilled work close to home.</p>
          <h2>Made for you</h2>
          <p>Alongside the collection we make custom pieces: a belt cut to your measurements, a wallet in a leather you have chosen, a bag adjusted to how you carry it.</p>
          <div className="pt-6 flex flex-wrap gap-3"><Button href="/craftsmanship">Our craftsmanship</Button><Button href="/custom-orders" variant="outline">Custom orders</Button></div>
        </Prose>
      </div>
    </div>
  );
}
