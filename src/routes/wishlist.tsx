import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Bargains Stationery" },
      { name: "description", content: "Products you've saved for later." },
      { property: "og:title", content: "Wishlist | Bargains Stationery" },
      { property: "og:description", content: "Your saved engineering essentials." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.slug));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-black uppercase">Wishlist</h1>
      {items.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <p className="mt-8 text-muted-foreground">Nothing saved yet. <Link to="/shop" className="font-semibold text-primary">Browse products</Link></p>
      )}
    </div>
  );
}
