import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, MessageCircle, Phone, Search, ShoppingCart, X } from "lucide-react";
import { useId, useState } from "react";
import { Logo } from "./Logo";
import { CATEGORIES, PRODUCTS, SITE, priceLabel, searchProducts, telLink, whatsappLink } from "@/lib/products";
import { useStore } from "@/lib/store";


function SearchBox({ onDone, dark = false, inputId }: { onDone?: () => void; dark?: boolean; inputId?: string }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(-1);
  const nav = useNavigate();
  const listId = useId();
  const hits = q.trim().length > 1 ? searchProducts(q).slice(0, 6) : [];
  const go = (slug?: string) => {
    if (slug) nav({ to: "/product/$slug", params: { slug } });
    else nav({ to: "/shop", search: { q } });
    setQ(""); setActive(-1); onDone?.();
  };
  return (
    <form role="search" className="relative w-full" onSubmit={(e) => { e.preventDefault(); go(active >= 0 ? hits[active]?.slug : undefined); }}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id={inputId}
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setActive(-1); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
          if (e.key === "Escape") { setQ(""); setActive(-1); }
        }}
        placeholder="Search calculators, set squares, boots, overalls…"
        aria-label="Search products"
        role="combobox"
        aria-expanded={hits.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        className={`w-full rounded-md border py-2.5 pl-9 pr-3 text-base text-foreground outline-none focus:border-primary sm:text-sm ${dark ? "border-charcoal bg-background" : "bg-secondary focus:bg-background"}`}
      />
      {hits.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-foreground shadow-lg">
          {hits.map((p, i) => (
            <li key={p.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => go(p.slug)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-secondary ${i === active ? "bg-secondary" : ""}`}>
                <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                <span className="flex-1">{p.name}</span>
                <span className="font-semibold text-primary">{priceLabel(p)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

const navCls = "block border-b-2 border-transparent py-3 font-display text-[0.8rem] font-bold uppercase tracking-wider text-ink-foreground/85 hover:text-primary-bright [&.active]:border-primary-bright [&.active]:text-ink-foreground";

export function Header() {
  const { count, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="relative z-40 md:sticky md:top-0 bg-ink text-ink-foreground shadow-md">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-1.5 text-xs font-semibold sm:justify-between">
          <p className="text-center">{SITE.announcement}</p>
          <div className="hidden items-center gap-5 sm:flex">
            <a href={telLink} className="inline-flex items-center gap-1.5 hover:underline"><Phone className="h-3.5 w-3.5" aria-hidden />{SITE.phone}</a>
            <a href={whatsappLink("Hello Bargains Stationery")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline"><MessageCircle className="h-3.5 w-3.5" aria-hidden />WhatsApp us</a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <button className="-ml-1 grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X /> : <Menu />}
        </button>
        <Link to="/" aria-label="Bargains Stationery home" onClick={close}><Logo /></Link>
        <div className="mx-4 hidden flex-1 md:block"><SearchBox dark /></div>
        <div className="ml-auto flex items-center gap-1">
          <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative grid h-11 w-11 place-items-center hover:text-primary-bright">
            <Heart />{wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative grid h-11 w-11 place-items-center hover:text-primary-bright">
            <ShoppingCart />{count > 0 && <Badge n={count} />}
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden"><SearchBox dark inputId="mobile-search" /></div>

      <nav aria-label="Main" className="hidden border-t border-charcoal lg:block">
        <ul className="mx-auto flex max-w-7xl gap-6 px-4">
          <li><Link to="/" activeOptions={{ exact: true }} className={navCls}>Home</Link></li>
          {CATEGORIES.map((c) => {
            const items = PRODUCTS.filter((x) => x.category === c.slug);
            return (
              <li key={c.slug} className="group relative">
                <Link to="/shop" search={{ category: c.slug }} activeOptions={{ exact: true, includeSearch: true }} className={`${navCls} inline-flex items-center gap-1`}>
                  {c.name} <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-1 rounded-b-lg border border-t-0 bg-popover p-2 text-foreground opacity-0 shadow-2xl transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {items.map((x) => (
                    <Link key={x.slug} to="/product/$slug" params={{ slug: x.slug }} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-secondary">
                      <img src={x.image} alt="" loading="lazy" className="h-10 w-10 rounded object-cover" />
                      <span className="flex-1 leading-tight">{x.name}</span>
                      <span className="whitespace-nowrap text-xs font-bold text-primary">{priceLabel(x)}</span>
                    </Link>
                  ))}
                  <Link to="/shop" search={{ category: c.slug }} className="mt-1 block rounded-md bg-secondary px-3 py-2 text-center text-xs font-bold uppercase tracking-wider hover:text-primary">View all {c.short.toLowerCase()} →</Link>
                </div>
              </li>
            );
          })}
          <li><Link to="/deals" className={navCls}>Deals</Link></li>
          <li><Link to="/contact" className={navCls}>Contact</Link></li>
        </ul>
      </nav>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[75vh] overflow-y-auto border-t border-charcoal px-4 pb-6 lg:hidden">
          {([
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop all" },
            { to: "/deals", label: "Deals" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact Us" },
          ] as const).map((n) => (
            <Link key={n.label} to={n.to} onClick={close} className="block border-b border-charcoal py-3 font-display text-sm font-bold uppercase">{n.label}</Link>
          ))}
          <p className="mt-5 font-display text-xs font-bold uppercase tracking-widest text-primary-bright">Shop by category</p>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} onClick={close} className="block py-2.5 text-sm opacity-90">{c.name}</Link>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a href={telLink} className="btn btn-outline"><Phone className="h-4 w-4" aria-hidden /> Call</a>
            <a href={whatsappLink("Hello Bargains Stationery")} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return <span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.7rem] font-bold text-primary-foreground" aria-hidden>{n}</span>;
}
