"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-ivory-deep px-5 py-24 sm:py-32" aria-label="Customer testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-10">Kind words</p>
        <div className="relative min-h-[220px] sm:min-h-[200px]">
          {testimonials.map((t, idx) => (
            <figure key={idx} aria-hidden={idx !== i} className={`absolute inset-0 transition-all duration-1000 ease-out ${idx === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
              <blockquote className="font-serif text-[1.85rem] leading-snug sm:text-4xl">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-8 text-[0.7rem] uppercase tracking-[0.26em] text-muted">{t.name}, {t.place}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-1">
          {testimonials.map((_, idx) => (
            <button key={idx} type="button" aria-label={`Show testimonial ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)} className="flex h-9 w-9 items-center justify-center">
              <span className={`h-px transition-all duration-500 ${idx === i ? "w-8 bg-charcoal" : "w-4 bg-charcoal/30"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
