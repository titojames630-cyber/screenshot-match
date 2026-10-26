import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { PRODUCTS, SITE } from "@/lib/products";
import { useStore } from "@/lib/store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Engineering Stationery", search: { group: "stationery" } },
  { to: "/shop", label: "Safety Attire", search: { group: "safety" } },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

function SearchBox({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const hits = q.length > 1 ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];
  return (
    <form className="relative w-full" onSubmit={(e) => { e.preventDefault(); nav({ to: "/shop", search: { q } }); setQ(""); onDone?.(); }}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search calculators, helmets, drawing sets…" aria-label="Search products"
        className="w-full rounded-md border bg-secondary py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-background" />
      {hits.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-lg">
          {hits.map((p) => (
            <li key={p.id}>
              <Link to="/product/$slug" params={{ slug: p.slug }} onClick={() => { setQ(""); onDone?.(); }} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-secondary">
                <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />{p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export function Header() {
  const { count, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      <div className="bg-ink py-2 text-center font-display text-[0.7rem] font-bold tracking-[0.2em] text-ink-foreground">
        <span className="text-primary">■</span> {SITE.announcement}
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        <Link to="/"><Logo /></Link>
        <div className="mx-4 hidden flex-1 md:block"><SearchBox /></div>
        <div className="ml-auto flex items-center gap-4">
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-primary">
            <Heart />{wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-primary">
            <ShoppingCart />{count > 0 && <Badge n={count} />}
          </Link>
        </div>
      </div>
      <nav className="hidden border-t lg:block">
        <ul className="mx-auto flex max-w-7xl gap-8 px-4">
          {NAV.map((n) => (
            <li key={n.label}>
              <Link to={n.to} search={"search" in n ? n.search : undefined} activeOptions={{ exact: true, includeSearch: true }}
                className="block border-b-2 border-transparent py-3 font-display text-xs font-bold uppercase tracking-wider hover:text-primary [&.active]:border-primary [&.active]:text-primary">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <div className="border-t px-4 pb-4 lg:hidden">
          <div className="py-3 md:hidden"><SearchBox onDone={() => setOpen(false)} /></div>
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} search={"search" in n ? n.search : undefined} onClick={() => setOpen(false)}
              className="block border-b py-3 font-display text-sm font-bold uppercase">{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
function Badge({ n }: { n: number }) {
  return <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">{n}</span>;
}
