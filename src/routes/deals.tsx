import { createFileRoute } from "@tanstack/react-router";
import { filterProducts } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Special Offers | Bargains Stationery" },
      { name: "description", content: "Discounted engineering stationery and safety attire." },
      { property: "og:title", content: "Deals | Bargains Stationery" },
      { property: "og:description", content: "Our best bargains on engineering essentials." },
    ],
  }),
  component: () => (
    <div>
      <section className="blueprint-dark bg-ink py-14 text-center text-ink-foreground">
        <h1 className="text-4xl font-black uppercase">Today's <span className="text-primary">deals</span></h1>
        <p className="mt-3 opacity-75">Genuine discounts on engineering essentials.</p>
      </section>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 md:grid-cols-4">
        {filterProducts({ sale: true }).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  ),
});
