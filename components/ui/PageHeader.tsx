import Link from "next/link";
import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, body, crumbs }: { eyebrow?: string; title: string; body?: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <header className="mx-auto max-w-[1600px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-8 text-[0.66rem] uppercase tracking-[0.22em] text-muted">
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex gap-2">
                {c.href ? <Link href={c.href} className="link-underline">{c.label}</Link> : <span aria-current="page" className="text-charcoal">{c.label}</span>}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {eyebrow && <Reveal><p className="eyebrow mb-5">{eyebrow}</p></Reveal>}
      <Reveal delay={60}><h1 className="max-w-4xl text-[2.6rem] uppercase leading-[1.04] tracking-[0.03em] sm:text-6xl lg:text-7xl">{title}</h1></Reveal>
      {body && <Reveal delay={140}><p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{body}</p></Reveal>}
    </header>
  );
}
