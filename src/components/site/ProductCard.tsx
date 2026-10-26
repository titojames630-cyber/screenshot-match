import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { discount, kes, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(p.slug);
  const d = discount(p);
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: p.slug }}>
          <img src={p.image} alt={p.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        {d > 0 && <span className="absolute left-2 top-2 rounded bg-primary px-2 py-1 font-display text-xs font-bold text-primary-foreground">-{d}%</span>}
        {p.isNew && !d && <span className="absolute left-2 top-2 rounded bg-ink px-2 py-1 font-display text-xs font-bold text-ink-foreground">NEW</span>}
        <button onClick={() => toggleWish(p.slug)} aria-label="Toggle wishlist" className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background shadow">
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-sm font-bold leading-tight hover:text-primary sm:text-base">{p.name}</Link>
        <p className="mt-1 line-clamp-2 hidden text-xs text-muted-foreground sm:block">{p.short}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-base font-extrabold text-primary sm:text-lg">{kes(p.price)}</span>
          {p.originalPrice && <span className="text-xs text-muted-foreground line-through">{kes(p.originalPrice)}</span>}
        </div>
        <p className={`mt-1 text-xs font-semibold ${p.stock > 0 ? "text-success" : "text-muted-foreground"}`}>{p.stock > 0 ? (p.stock < 10 ? `Only ${p.stock} left` : "In stock") : "Out of stock"}</p>
        <div className="mt-auto pt-3">
          <button disabled={p.stock === 0} onClick={() => { add(p.slug, 1, p.variants?.[0]); toast.success(`${p.name} added to cart`); }}
            className="btn btn-primary w-full px-2 disabled:opacity-40">Add to Cart</button>
        </div>
      </div>
    </article>
  );
}
