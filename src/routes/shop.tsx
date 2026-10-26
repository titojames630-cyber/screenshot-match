import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, categoryName, filterProducts } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

const schema = z.object({
  category: z.string().optional(),
  group: z.enum(["stationery", "safety"]).optional(),
  q: z.string().optional(),
  sort: z.enum(["featured", "low", "high"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: schema,
  head: () => ({
    meta: [
      { title: "Shop Engineering Stationery & Safety Attire | Bargains Stationery" },
      { name: "description", content: "Browse drawing sets, calculators, drafting tools, measuring instruments and safety gear." },
      { property: "og:title", content: "Shop | Bargains Stationery" },
      { property: "og:description", content: "Engineering stationery and safety attire at bargain prices." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const s = Route.useSearch();
  let items = filterProducts(s);
  if (s.sort === "low") items = [...items].sort((a, b) => a.price - b.price);
  if (s.sort === "high") items = [...items].sort((a, b) => b.price - a.price);
  const title = s.q ? `Results for “${s.q}”` : s.category ? categoryName(s.category) : s.group === "safety" ? "Safety Attire" : s.group === "stationery" ? "Engineering Stationery" : "Shop All";
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-black uppercase">{title}</h1>
      <div className="ruler mt-3 w-24" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg bg-secondary p-4">
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
