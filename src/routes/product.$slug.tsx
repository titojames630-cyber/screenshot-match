import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PRODUCTS, bySlug, categoryName, discount, kes, whatsappLink } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = bySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | Bargains Stationery` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.short },
        ]
      : [{ title: "Product not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add, toggleWish, wishlist } = useStore();
  const [variant, setVariant] = useState(p.variants?.[0]);
  const [qty, setQty] = useState(1);
  const d = discount(p);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" search={{ category: p.category }} className="hover:text-primary">{categoryName(p.category)}</Link> / {p.name}</nav>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="blueprint relative overflow-hidden rounded-lg border bg-secondary">
          <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
          {d > 0 && <span className="absolute left-3 top-3 rounded bg-primary px-3 py-1 font-display text-sm font-bold text-primary-foreground">-{d}%</span>}
        </div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-widest text-primary">{categoryName(p.category)}</p>
          <h1 className="mt-2 text-3xl font-black">{p.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-black text-primary">{kes(p.price)}</span>
            {p.originalPrice && <span className="text-muted-foreground line-through">{kes(p.originalPrice)}</span>}
          </div>
          <p className={`mt-2 text-sm font-semibold ${p.stock > 0 ? "text-success" : "text-muted-foreground"}`}>{p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"} · SKU {p.sku}</p>
          <p className="mt-5 text-muted-foreground">{p.description}</p>
          {p.variants && (
            <div className="mt-6">
              <p className="mb-2 font-display text-xs font-bold uppercase">Option</p>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v) => (
                  <button key={v} onClick={() => setVariant(v)} className={`rounded border-2 px-4 py-2 text-sm font-semibold ${variant === v ? "border-primary text-primary" : ""}`}>{v}</button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center rounded border">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button disabled={p.stock === 0} onClick={() => { add(p.slug, qty, variant); toast.success("Added to cart"); }} className="btn btn-primary flex-1 disabled:opacity-40">Add to Cart</button>
            <button onClick={() => toggleWish(p.slug)} aria-label="Wishlist" className="rounded border px-3"><Heart className={wishlist.includes(p.slug) ? "fill-primary text-primary" : ""} /></button>
          </div>
          <a href={whatsappLink(`Hi, I'd like to order: ${p.name}${variant ? ` (${variant})` : ""} x${qty}`)} target="_blank" rel="noreferrer" className="btn btn-outline mt-3 w-full"><MessageCircle className="h-4 w-4" /> Order on WhatsApp</a>
          <table className="mt-8 w-full text-sm">
            <tbody>
              {Object.entries(p.specs).map(([k, v]) => (
                <tr key={k} className="border-b"><td className="py-2 font-semibold">{k}</td><td className="py-2 text-muted-foreground">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-black uppercase">You may also need</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
