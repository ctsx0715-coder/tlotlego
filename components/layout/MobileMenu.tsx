"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { useStore } from "@/components/providers";
import { CloseIcon } from "@/components/ui/Icons";

export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  if (!menuOpen) return null;

  const secondary = [
    { label: "Our Story", href: "/our-story" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Account", href: "/account" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="animate-fade absolute inset-0 bg-charcoal/50" onClick={() => setMenuOpen(false)} />
      <div className="animate-drawer-left absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-ivory text-charcoal">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="font-serif text-xl tracking-[0.3em]">TLOTLEGO</span>
          <button type="button" aria-label="Close menu" className="-mr-2 flex h-11 w-11 items-center justify-center" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.label} className="animate-rise" style={{ animationDelay: `${120 + i * 60}ms` }}>
                <Link href={n.href} className="block py-3 font-serif text-[2rem] leading-tight">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-10 space-y-1 border-t border-line pt-8">
            {secondary.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="block py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-6 py-5 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
        </div>
      </div>
    </div>
  );
}
