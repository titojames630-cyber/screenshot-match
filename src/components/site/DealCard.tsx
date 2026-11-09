import { Link } from "@tanstack/react-router";
import { Check, Gift, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { bySlug, dealPrice, dealWorth, kes, type Deal } from "@/lib/products";
import { useStore } from "@/lib/store";

export function DealCard({ d }: { d: Deal }) {
  const { add } = useStore();
  const [choice, setChoice] = useState(d.choices?.[0]);
  const worth = dealWorth(d), price = dealPrice(d), save = worth - price;
  const addDeal = () => {
    add(d.slug, 1, choice);
    toast.success(`${d.name} added to cart`, { action: { label: "View cart", onClick: () => { window.location.href = "/cart"; } } });
  };
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 font-display text-sm font-black text-primary-foreground shadow-lg">Save {kes(save)}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-2xl font-black">{d.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
        <ul className="mt-5 divide-y rounded-lg border text-sm">
          {d.items.map((s) => {
            const p = bySlug(s)!;
            return (
              <li key={s} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <Link to="/product/$slug" params={{ slug: s }} className="flex items-center gap-3 hover:text-primary">
                  <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                  <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" aria-hidden />{p.name}</span>
                </Link>
                <span className="whitespace-nowrap tabular-nums text-muted-foreground">{kes(p.price)}</span>
              </li>
            );
          })}
          {d.free.map((s) => {
            const p = bySlug(s)!;
            return (
              <li key={s} className="flex items-center justify-between gap-3 bg-success/5 px-3 py-2.5">
                <span className="flex items-center gap-3">
                  <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                  <span className="flex items-center gap-1.5"><Gift className="h-4 w-4 text-success" aria-hidden />{p.name}</span>
                </span>
                <span className="whitespace-nowrap"><s className="mr-2 text-xs text-muted-foreground">{kes(p.price)}</s><strong className="text-success">FREE</strong></span>
              </li>
            );
          })}
          {d.discount > 0 && (
            <li className="flex items-center justify-between px-3 py-2.5 font-semibold text-success"><span>Bundle discount</span><span className="tabular-nums">− {kes(d.discount)}</span></li>
          )}
        </ul>
        {d.choices && (
          <label className="mt-4 flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">{d.choiceLabel}</span>
            <select value={choice} onChange={(e) => setChoice(e.target.value)} className="rounded-md border bg-background px-3 py-2">
              {d.choices.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        )}
        {d.note && <p className="mt-3 text-xs text-muted-foreground">{d.note}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-sm text-muted-foreground line-through">Worth {kes(worth)}</p>
            <p className="font-display text-3xl font-black text-primary">{kes(price)}</p>
          </div>
          <button onClick={addDeal} className="btn btn-primary"><ShoppingCart className="h-4 w-4" aria-hidden /> Add deal</button>
        </div>
      </div>
    </article>
  );
}
