import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { bySlug, type Product } from "./products";

export type CartLine = { slug: string; qty: number; variant?: string | undefined };
type Ctx = {
  cart: CartLine[]; wishlist: string[];
  add: (slug: string, qty?: number, variant?: string | undefined) => void;
  setQty: (i: number, qty: number) => void;
  setVariant: (i: number, variant: string) => void;
  remove: (i: number) => void; clear: () => void;
  toggleWish: (slug: string) => void;
  count: number; total: number;
  lines: (CartLine & { product: Product })[];
};
// Keep one context across hot reloads so the provider and consumers always match.
const g = globalThis as unknown as { __bsStoreCtx?: React.Context<Ctx | null> };
const StoreCtx = (g.__bsStoreCtx ??= createContext<Ctx | null>(null));

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      // drop items that are no longer in the catalogue
      setCart((JSON.parse(localStorage.getItem("bs-cart") || "[]") as CartLine[]).filter((l) => bySlug(l.slug)));
      setWish((JSON.parse(localStorage.getItem("bs-wish") || "[]") as string[]).filter((s) => bySlug(s)));
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("bs-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("bs-wish", JSON.stringify(wishlist)); }, [wishlist, ready]);

  const lines = cart.flatMap((l) => { const product = bySlug(l.slug); return product ? [{ ...l, product }] : []; });
  const value: Ctx = {
    cart, wishlist, lines,
    add: (slug, qty = 1, variant) => setCart((c) => {
      const i = c.findIndex((l) => l.slug === slug && l.variant === variant);
      if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
      return [...c, { slug, qty, variant }];
    }),
    setQty: (i, qty) => setCart((c) => c.map((l, j) => (j === i ? { ...l, qty: Math.max(1, qty) } : l))),
    setVariant: (i, variant) => setCart((c) => {
      const line = c[i]; if (!line) return c;
      const dup = c.findIndex((l, j) => j !== i && l.slug === line.slug && l.variant === variant);
      if (dup >= 0) return c.flatMap((l, j) => (j === i ? [] : j === dup ? [{ ...l, qty: l.qty + line.qty }] : [l]));
      return c.map((l, j) => (j === i ? { ...l, variant } : l));
    }),
    remove: (i) => setCart((c) => c.filter((_, j) => j !== i)),
    clear: () => setCart([]),
    toggleWish: (slug) => setWish((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
    count: lines.reduce((a, l) => a + l.qty, 0),
    total: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
export const useStore = () => {
  const c = useContext(StoreCtx);
  // Never blank the page: fall back to an empty, inert store (e.g. during a hot reload).
  return c ?? FALLBACK;
};

const FALLBACK: Ctx = {
  cart: [], wishlist: [], lines: [], count: 0, total: 0,
  add: () => {}, setQty: () => {}, setVariant: () => {}, remove: () => {}, clear: () => {}, toggleWish: () => {},
};
