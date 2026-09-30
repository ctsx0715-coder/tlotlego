import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section className="border-t border-line px-5 py-24 sm:py-28" aria-labelledby="nl-h">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal><h2 id="nl-h" className="text-[2.2rem] uppercase tracking-[0.04em] sm:text-5xl">The Tlotlego Journal</h2></Reveal>
        <Reveal delay={100}><p className="mx-auto mt-6 max-w-md text-muted">Be the first to discover new collections, custom pieces and stories from the workshop.</p></Reveal>
        <Reveal delay={200}><div className="mx-auto mt-10 max-w-xl text-left"><NewsletterForm /></div></Reveal>
      </div>
    </section>
  );
}
