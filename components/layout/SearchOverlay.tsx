"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/providers";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatZAR } from "@/lib/format";
import type { Product } from "@/lib/types";

const suggestions = ["Tote", "Wallet", "Belt", "Cognac", "Black", "Crossbody"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (q.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        const data = await res.json();
        setResults(data.products ?? []);
      } catch {}
      setLoading(false);
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  if (!searchOpen) return null;

  const go = (term: string) => {
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-[60] animate-fade overflow-y-auto bg-ivory text-charcoal" role="dialog" aria-modal="true" aria-label="Search">
      <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-5 sm:px-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Search</span>
          <button type="button" aria-label="Close search" className="-mr-2 flex h-11 w-11 items-center justify-center" onClick={() => setSearchOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <form
          className="mt-6 flex items-center gap-4 border-b border-charcoal pb-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) go(q.trim());
          }}
        >
          <SearchIcon className="shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bags, wallets, belts"
            aria-label="Search the store"
            className="w-full bg-transparent font-serif text-3xl outline-none placeholder:text-muted/60 sm:text-5xl"
          />
        </form>

        {q.trim().length < 2 ? (
          <div className="mt-10">
            <p className="eyebrow mb-4">Popular</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} type="button" onClick={() => go(s)} className="border border-line px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:border-charcoal">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="eyebrow mb-6">{loading ? "Searching" : `${results.length} result${results.length === 1 ? "" : "s"}`}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {results.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <Link href={`/product/${p.slug}`} onClick={() => setSearchOpen(false)} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                      <ProductImage src={p.images[0]} alt={p.name} sizes="(max-width:640px) 45vw, 220px" className="transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 font-serif text-lg leading-tight">{p.name}</p>
                    <p className="mt-1 text-sm text-muted">{formatZAR(p.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {!loading && results.length === 0 && <p className="text-muted">Nothing matched. Try a category such as wallets or belts.</p>}
            {results.length > 0 && (
              <button type="button" onClick={() => go(q.trim())} className="link-underline mt-10 text-[0.7rem] uppercase tracking-[0.24em]">
                View all results
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
