import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { bySlug, type Product } from "./products";

export type CartLine = { slug: string; qty: number; variant?: string };
type Ctx = {
  cart: CartLine[]; wishlist: string[];
  add: (slug: string, qty?: number, variant?: string) => void;
  setQty: (i: number, qty: number) => void;
  remove: (i: number) => void; clear: () => void;
  toggleWish: (slug: string) => void;
  count: number; total: number;
  lines: (CartLine & { product: Product })[];
};
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWish] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("bs-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("bs-wish") || "[]"));
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
    remove: (i) => setCart((c) => c.filter((_, j) => j !== i)),
    clear: () => setCart([]),
    toggleWish: (slug) => setWish((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
    count: cart.reduce((a, l) => a + l.qty, 0),
    total: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
};
