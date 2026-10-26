import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { kes, whatsappLink } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Bargains Stationery" },
      { name: "description", content: "Review your cart and place your order." },
      { property: "og:title", content: "Cart | Bargains Stationery" },
      { property: "og:description", content: "Review your order." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, total, setQty, remove } = useStore();
  const msg = "Hello Bargains Stationery, I'd like to order:\n" +
    lines.map((l) => `- ${l.product.name}${l.variant ? ` (${l.variant})` : ""} x${l.qty} = ${kes(l.qty * l.product.price)}`).join("\n") +
    `\nTotal: ${kes(total)}`;
  if (!lines.length) return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-black uppercase">Your cart is empty</h1>
      <Link to="/shop" className="btn btn-primary mt-6">Shop now</Link>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_340px]">
      <div>
        <h1 className="mb-6 text-3xl font-black uppercase">Your cart</h1>
        <div className="divide-y rounded-lg border">
          {lines.map((l, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <img src={l.product.image} alt="" className="h-20 w-20 rounded object-cover" />
              <div className="flex-1">
                <Link to="/product/$slug" params={{ slug: l.slug }} className="font-display font-bold hover:text-primary">{l.product.name}</Link>
                {l.variant && <p className="text-xs text-muted-foreground">{l.variant}</p>}
                <p className="text-sm font-bold text-primary">{kes(l.product.price)}</p>
              </div>
              <div className="flex items-center rounded border">
                <button className="px-2 py-1" onClick={() => setQty(i, l.qty - 1)}>−</button>
                <span className="w-6 text-center text-sm">{l.qty}</span>
                <button className="px-2 py-1" onClick={() => setQty(i, l.qty + 1)}>+</button>
              </div>
              <button onClick={() => remove(i)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
            </div>
          ))}
        </div>
      </div>
      <aside className="blueprint-dark h-fit rounded-lg bg-ink p-6 text-ink-foreground">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest">Order summary</h2>
        <div className="mt-4 flex justify-between text-lg"><span>Total</span><span className="font-display font-black text-primary">{kes(total)}</span></div>
        <p className="mt-2 text-xs opacity-70">Delivery and payment are confirmed with you on WhatsApp.</p>
        <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="btn btn-primary mt-6 w-full">Order via WhatsApp</a>
      </aside>
    </div>
  );
}
