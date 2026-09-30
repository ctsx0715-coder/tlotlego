import Image from "next/image";
import { social } from "@/data/content";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/** Swap `social` in /data/content.ts (or fetch from an Instagram API) to show live posts. */
export function SocialGrid() {
  return (
    <section className="px-2 py-24 sm:px-3 sm:py-32" aria-labelledby="social-h">
      <div className="mb-14 text-center">
        <Reveal><h2 id="social-h" className="text-[2.4rem] uppercase tracking-[0.04em] sm:text-5xl">Follow the craft</h2></Reveal>
        <Reveal delay={100}><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block text-[0.75rem] uppercase tracking-[0.28em]">{site.instagramHandle}</a></Reveal>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {social.map((s, i) => (
          <Reveal as="li" key={s.src} delay={i * 70}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden bg-ivory-deep" aria-label={`${s.alt} on Instagram`}>
              <Image src={s.src} alt={s.alt} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw" unoptimized className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/25" />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
