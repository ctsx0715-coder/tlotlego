"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";
import { useStore } from "@/components/providers";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

export function Header() {
  const { count, wishlist, setCartOpen, setMenuOpen, setSearchOpen } = useStore();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 320);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"} ${
        solid ? "bg-ivory/95 text-charcoal backdrop-blur border-b border-line" : "bg-transparent text-ivory"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-[72px] sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          <Link href="/" className="hidden font-serif text-[1.6rem] tracking-[0.34em] lg:block" aria-label="Tlotlego home">
            TLOTLEGO
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-[0.68rem] uppercase tracking-[0.24em]">
            {nav.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="link-underline py-2">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="col-start-2 row-start-1 font-serif text-[1.35rem] tracking-[0.3em] lg:hidden" aria-label="Tlotlego home">
          TLOTLEGO
        </Link>

        <div className="col-start-3 row-start-1 flex items-center justify-end gap-0.5 sm:gap-2">
          <button type="button" aria-label="Search" className="flex h-11 w-11 items-center justify-center" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <Link href="/account" aria-label="Account" className="hidden h-11 w-11 items-center justify-center sm:flex">
            <UserIcon />
          </Link>
          <Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved`} className="relative hidden h-11 w-11 items-center justify-center sm:flex">
            <HeartIcon />
            {wishlist.length > 0 && <span className="absolute right-1.5 top-2 h-1.5 w-1.5 rounded-full bg-cognac" />}
          </Link>
          <button type="button" aria-label={`Open bag, ${count} items`} className="relative flex h-11 w-11 items-center justify-center" onClick={() => setCartOpen(true)}>
            <BagIcon />
            {count > 0 && (
              <span className="absolute right-0.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cognac px-1 text-[0.6rem] text-ivory">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
