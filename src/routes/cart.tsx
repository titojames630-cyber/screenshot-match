import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, MessageCircle, Trash2, Truck } from "lucide-react";
import { toast } from "sonner";
import { SITE, kes, whatsappLink } from "@/lib/products";
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
    `\nTotal: ${kes(total)}` +
    "\n\nDelivery location: " +
    `\nI will pay via M-Pesa Paybill ${SITE.payment.paybill}, Account ${SITE.payment.account}.`;
  const copy = (v: string, label: string) => { navigator.clipboard?.writeText(v).then(() => toast.success(`${label} copied`)).catch(() => {}); };
  if (!lines.length) return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-black">Your cart is empty</h1>
      <p className="mt-2 text-muted-foreground">Browse our products or start with a ready-made student kit.</p>
      <div className="mt-6 flex justify-center gap-3"><Link to="/shop" className="btn btn-primary">Shop now</Link><Link to="/kits" className="btn btn-outline">Student kits</Link></div>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_340px]">
      <div>
        <h1 className="mb-6 text-3xl font-black">Your cart</h1>
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
                <button className="h-10 w-10" aria-label={`Decrease ${l.product.name} quantity`} onClick={() => setQty(i, l.qty - 1)}>−</button>
                <span className="w-6 text-center text-sm" aria-live="polite">{l.qty}</span>
                <button className="h-10 w-10" aria-label={`Increase ${l.product.name} quantity`} onClick={() => setQty(i, l.qty + 1)}>+</button>
              </div>
              <button onClick={() => remove(i)} aria-label={`Remove ${l.product.name}`} className="grid h-10 w-10 place-items-center"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
            </div>
          ))}
        </div>
      </div>
      <aside className="blueprint-dark h-fit rounded-lg bg-ink p-6 text-ink-foreground">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest">Order summary</h2>
        <div className="mt-4 flex justify-between text-lg"><span>Subtotal</span><span className="font-display font-black text-primary-bright">{kes(total)}</span></div>
        <p className="mt-1 flex items-start gap-2 text-xs text-ink-foreground/75"><Truck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{SITE.delivery.fee}.</p>
        <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6 w-full"><MessageCircle className="h-4 w-4" aria-hidden /> Order via WhatsApp</a>
        <div className="mt-6 rounded-lg border border-charcoal p-4">
          <p className="flex items-center gap-2 text-sm font-bold"><span className="rounded bg-success px-2 py-0.5 text-xs text-white">M-PESA</span> Pay via Paybill</p>
          <dl className="mt-3 space-y-2 text-sm">
            {([["Business no.", SITE.payment.paybill], ["Account no.", SITE.payment.account]] as const).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <dt className="text-ink-foreground/75">{k}</dt>
                <dd className="flex items-center gap-2 font-display font-black tracking-wider">{v}
                  <button onClick={() => copy(v, k)} aria-label={`Copy ${k}`} className="grid h-8 w-8 place-items-center rounded hover:bg-charcoal"><Copy className="h-3.5 w-3.5" aria-hidden /></button>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-ink-foreground/70">Pay after we confirm your total on WhatsApp, then send us the M-Pesa message.</p>
        </div>
        <Link to="/info/$page" params={{ page: "how-to-order" }} className="mt-4 block text-center text-xs underline">How ordering works</Link>
      </aside>
    </div>
  );
}
