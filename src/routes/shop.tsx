import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, categoryName, filterProducts } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

const schema = z.object({
  category: z.string().optional(),
  group: z.string().optional(), // old links; ignored
  q: z.string().optional(),
  sort: z.enum(["featured", "low", "high"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: schema,
  head: () => ({
    meta: [
      { title: "Shop Drawing Equipment, Computation, Attire & Safety Gear | Bargains Stationery" },
      { name: "description", content: "Drawing equipment, Casio scientific calculators, lab coats, overalls, safety boots and reflector vests for engineering students in Kenya." },
      { property: "og:title", content: "Shop | Bargains Stationery" },
      { property: "og:description", content: "Engineering stationery at bargain prices." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const raw = Route.useSearch();
  const s = raw.category === "calculators" ? { ...raw, category: "computation" } : raw; // old links
  let items = filterProducts(s);
  const pr = (x: { price: number; priceOnRequest?: boolean }) => (x.priceOnRequest ? Number.POSITIVE_INFINITY : x.price);
  if (s.sort === "low") items = [...items].sort((a, b) => pr(a) - pr(b));
  if (s.sort === "high") items = [...items].sort((a, b) => (b.priceOnRequest ? -1 : a.priceOnRequest ? 1 : b.price - a.price));
  const title = s.q ? `Results for “${s.q}”` : s.category ? categoryName(s.category) : "Shop All";
  const cat = CATEGORIES.find((c) => c.slug === s.category);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-black">{title}</h1>
      {cat && <p className="mt-2 text-muted-foreground">{cat.description}</p>}
      <div className="ruler mt-3 w-24" />
      <nav aria-label="Departments" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
        <Link to="/shop" className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${!s.category ? "border-primary bg-primary text-primary-foreground" : ""}`}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to="/shop" search={{ category: c.slug }} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${s.category === c.slug ? "border-primary bg-primary text-primary-foreground" : ""}`}>{c.name}</Link>
        ))}
      </nav>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden h-fit rounded-lg bg-secondary p-4 lg:block">
          <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-widest">Categories</h2>
          <Link to="/shop" className="block py-1.5 text-sm hover:text-primary">All products</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className={`block py-1.5 text-sm hover:text-primary ${s.category === c.slug ? "font-bold text-primary" : ""}`}>{c.name}</Link>
          ))}
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{items.length} products</span>
            <div className="flex gap-2">
              {(["featured", "low", "high"] as const).map((o) => (
                <Link key={o} to="/shop" search={{ ...s, sort: o }} className={`rounded border px-3 py-1 text-xs ${ (s.sort ?? "featured") === o ? "border-primary text-primary" : ""}`}>
                  {o === "featured" ? "Featured" : o === "low" ? "Price ↑" : "Price ↓"}
                </Link>
              ))}
            </div>
          </div>
          {items.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          ) : <p className="py-20 text-center text-muted-foreground">No products found.</p>}
        </div>
      </div>
    </div>
  );
}
