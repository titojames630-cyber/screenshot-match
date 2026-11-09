import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, filterProducts, whatsappLink } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Special Offers | Bargains Stationery" },
      { name: "description", content: "Discounts on engineering stationery and calculators." },
      { property: "og:title", content: "Deals | Bargains Stationery" },
      { property: "og:description", content: "Our best bargains on engineering essentials." },
    ],
  }),
  component: () => (
    <div>
      <section className="blueprint-dark bg-ink py-14 text-center text-ink-foreground">
        <h1 className="text-4xl font-black">Today's <span className="text-primary-bright">deals</span></h1>
        <p className="mt-3 text-ink-foreground/80">Genuine discounts on engineering essentials.</p>
      </section>
      <Deals />
    </div>
  ),
});

function Deals() {
  const deals = filterProducts({ sale: true });
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {deals.length === 0 && (
        <div className="mb-10 rounded-xl border-2 border-dashed border-primary p-8 text-center">
          <h2 className="text-2xl font-extrabold">New deals drop every week</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">There are no discounts running right now, but our everyday prices are already student-friendly. Get the next deal first on WhatsApp.</p>
          <a href={whatsappLink("Hello Bargains Stationery, please add me to your weekly deals list.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6">Get deals on WhatsApp</a>
        </div>
      )}
      <h2 className="mb-6 text-2xl font-extrabold">{deals.length ? "On offer now" : "Everyday bargain prices"}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {(deals.length ? deals : PRODUCTS).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
