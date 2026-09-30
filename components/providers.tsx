"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Product } from "@/lib/types";
import { site } from "@/data/site";

type Toast = { id: number; message: string };

interface StoreState {
  lines: CartLine[];
  wishlist: string[];
  toasts: Toast[];
  cartOpen: boolean;
  menuOpen: boolean;
  searchOpen: boolean;
  subtotal: number;
  delivery: number;
  total: number;
  count: number;
  addToCart: (p: Product, colour: string, qty?: number) => Promise<void>;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  toggleWishlist: (p: Product) => void;
  notify: (message: string) => void;
  setCartOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
}

const Ctx = createContext<StoreState | null>(null);

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <Providers>");
  return v;
}

const CART_KEY = "tlotlego.cart.v1";
const WISH_KEY = "tlotlego.wishlist.v1";

export function Providers({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (c) setLines(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [lines, wishlist, hydrated]);

  useEffect(() => {
    const lock = cartOpen || menuOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, menuOpen, searchOpen]);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    async (p: Product, colour: string, qty = 1) => {
      // Simulated network latency so buttons can show a loading state.
      await new Promise((r) => setTimeout(r, 450));
      const col = p.colours.find((c) => c.name === colour) ?? p.colours[0];
      const key = `${p.id}:${col.name}`;
      setLines((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(10, l.quantity + qty) } : l));
        return [
          ...prev,
          {
            key,
            productId: p.id,
            slug: p.slug,
            name: p.name,
            colour: col.name,
            image: col.images[0] ?? p.images[0],
            price: p.price,
            quantity: qty,
          },
        ];
      });
      notify(`${p.name} added to your bag`);
    },
    [notify],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(10, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);

  const toggleWishlist = useCallback(
    (p: Product) => {
      setWishlist((prev) => {
        const has = prev.includes(p.id);
        notify(has ? `${p.name} removed from your wishlist` : `${p.name} saved to your wishlist`);
        return has ? prev.filter((id) => id !== p.id) : [...prev, p.id];
      });
    },
    [notify],
  );

  const value = useMemo<StoreState>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
    const delivery = subtotal === 0 || subtotal >= site.freeDeliveryThreshold ? 0 : site.deliveryFee;
    return {
      lines,
      wishlist,
      toasts,
      cartOpen,
      menuOpen,
      searchOpen,
      subtotal,
      delivery,
      total: subtotal + delivery,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      addToCart,
      setQty,
      remove,
      toggleWishlist,
      notify,
      setCartOpen,
      setMenuOpen,
      setSearchOpen,
    };
  }, [lines, wishlist, toasts, cartOpen, menuOpen, searchOpen, addToCart, setQty, remove, toggleWishlist, notify]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
