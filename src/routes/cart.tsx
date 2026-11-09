import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, PRODUCTS, SITE, kes, whatsappLink, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Bargains Stationery" },
      { name: "description", content: "Add items, see your running total and send your order on WhatsApp." },
      { property: "og:title", content: "Cart | Bargains Stationery" },
      { property: "og:description", content: "Review your order." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, total, count, setQty, setVariant, remove, clear } = useStore();
  const msg = "Hello Bargains Stationery, I'd like to order:\n" +
    lines.map((l) => `- ${l.product.name}${l.variant ? ` (${l.product.includes ? "free pencil " : ""}${l.variant})` : ""} x${l.qty} @ ${kes(l.product.price)} = ${kes(l.qty * l.product.price)}` +
      (l.product.includes ? `\n    includes: ${l.product.includes.join(", ")}` : "")).join("\n") +
    `\nTotal (${count} item${count === 1 ? "" : "s"}): ${kes(total)}` +
    "\n\nDelivery location: " +
    `\nI will pay via M-Pesa Paybill ${SITE.payment.paybill}, Account ${SITE.payment.account}.`;
  const copy = (v: string, label: string) => { navigator.clipboard?.writeText(v).then(() => toast.success(`${label} copied`)).catch(() => {}); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h1 className="text-3xl font-black">Your cart</h1>
            {lines.length > 0 && <button onClick={clear} className="text-sm text-muted-foreground underline hover:text-destructive">Clear cart</button>}
          </div>

          {lines.length === 0 ? (
            <div className="rounded-lg border border-dashed p-10 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden />
              <p className="mt-3 font-semibold">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Add items below and your total adds up automatically.</p>
            </div>
          ) : (
            <div className="divide-y rounded-lg border">
              <div className="hidden grid-cols-[1fr_auto_110px_40px] gap-4 bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:grid">
                <span>Item</span><span className="w-[120px] text-center">Qty</span><span className="text-right">Line total</span><span />
              </div>
              {lines.map((l, i) => (
                <div key={`${l.slug}-${l.variant}`} className="grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-3 p-4 sm:grid-cols-[64px_1fr_auto_110px_40px]">
                  <img src={l.product.image} alt="" className="h-16 w-16 rounded object-cover" />
                  <div className="min-w-0">
                    <Link to="/product/$slug" params={{ slug: l.slug }} className="font-display font-bold leading-tight hover:text-primary">{l.product.name}</Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">{kes(l.product.price)} each{l.product.originalPrice ? <span className="ml-1 line-through">{kes(l.product.originalPrice)}</span> : null}</p>
                    {l.product.includes && <p className="mt-0.5 text-xs text-muted-foreground">{l.product.includes.join(" · ")}</p>}
                    {l.product.variants && l.product.variants.length > 1 && (
                      <label className="mt-1 inline-flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{l.product.includes ? "Free pencil" : "Option"}</span>
                        <select value={l.variant} onChange={(e) => setVariant(i, e.target.value)} className="rounded border bg-background px-2 py-1 text-xs">
                          {l.product.variants.map((v) => <option key={v}>{v}</option>)}
                        </select>
                      </label>
                    )}
                  </div>
                  <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-auto sm:justify-start">
                    <div className="flex items-center rounded border">
                      <button className="grid h-10 w-10 place-items-center disabled:opacity-30" disabled={l.qty <= 1} aria-label={`Decrease ${l.product.name} quantity`} onClick={() => setQty(i, l.qty - 1)}><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center text-sm font-semibold tabular-nums" aria-live="polite">{l.qty}</span>
                      <button className="grid h-10 w-10 place-items-center" aria-label={`Increase ${l.product.name} quantity`} onClick={() => setQty(i, l.qty + 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <span className="font-display font-black tabular-nums sm:hidden">{kes(l.qty * l.product.price)}</span>
                  </div>
                  <span className="hidden text-right font-display font-black tabular-nums sm:block">{kes(l.qty * l.product.price)}</span>
                  <button onClick={() => remove(i)} aria-label={`Remove ${l.product.name}`} className="col-start-2 grid h-10 w-10 place-items-center justify-self-end sm:col-start-auto"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                </div>
              ))}
              <div className="flex items-center justify-between bg-secondary px-4 py-3">
                <span className="text-sm font-semibold">{count} item{count === 1 ? "" : "s"}</span>
                <span className="font-display text-lg font-black tabular-nums">{kes(total)}</span>
              </div>
            </div>
          )}

          <AddMore />
        </div>

        <aside className="blueprint-dark h-fit rounded-lg bg-ink p-6 text-ink-foreground lg:sticky lg:top-40">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest"><Calculator className="h-4 w-4" aria-hidden /> Order summary</h2>
          {lines.length > 0 ? (
            <ul className="mt-4 space-y-2 border-b border-charcoal pb-4 text-sm">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.variant}`} className="flex justify-between gap-3">
                  <span className="text-ink-foreground/80">{l.product.name}{l.variant ? ` (${l.variant})` : ""} <span className="whitespace-nowrap text-ink-foreground/60">× {l.qty}</span></span>
                  <span className="whitespace-nowrap tabular-nums">{kes(l.qty * l.product.price)}</span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-4 border-b border-charcoal pb-4 text-sm text-ink-foreground/70">No items yet.</p>}
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-ink-foreground/75">Items</span><span className="tabular-nums">{count}</span></div>
            <div className="flex justify-between"><span className="text-ink-foreground/75">Delivery</span><span>Confirmed on WhatsApp</span></div>
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-charcoal pt-3">
            <span className="text-lg font-bold">Total</span>
            <span key={total} className="animate-pop font-display text-2xl font-black tabular-nums text-primary-bright">{kes(total)}</span>
          </div>
          <p className="mt-1 flex items-start gap-2 text-xs text-ink-foreground/70"><Truck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{SITE.delivery.fee}.</p>
          {lines.length > 0 && <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6 w-full"><MessageCircle className="h-4 w-4" aria-hidden /> Order via WhatsApp</a>}
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
    </div>
  );
}

/** Every product listed by department, with quick add buttons, so the cart works as a price calculator. */
function AddMore() {
  const [tab, setTab] = useState(CATEGORIES[0]!.slug);
  const items = PRODUCTS.filter((p) => p.category === tab);
  return (
    <section className="mt-10" aria-labelledby="add-more">
      <h2 id="add-more" className="text-xl font-extrabold">Add more items</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tap + to add any item. Your total updates instantly.</p>
      <div role="tablist" aria-label="Departments" className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((c) => (
          <button key={c.slug} role="tab" aria-selected={tab === c.slug} onClick={() => setTab(c.slug)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${tab === c.slug ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{c.name}</button>
        ))}
      </div>
      <ul role="tabpanel" className="mt-3 divide-y rounded-lg border">
        {items.map((p) => <AddRow key={p.slug} p={p} />)}
      </ul>
    </section>
  );
}

function AddRow({ p }: { p: Product }) {
  const { add, lines } = useStore();
  const [variant, setVariant] = useState(p.variants?.[0]);
  const inCart = lines.filter((l) => l.slug === p.slug).reduce((a, l) => a + l.qty, 0);
  return (
    <li className="flex items-center gap-3 p-3">
      <img src={p.image} alt="" loading="lazy" className="h-12 w-12 rounded object-cover" />
      <div className="min-w-0 flex-1">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block truncate text-sm font-semibold hover:text-primary">{p.name}</Link>
        <p className="text-xs text-muted-foreground">
          {p.priceOnRequest ? "Price on request" : kes(p.price)}
          {inCart > 0 && <span className="ml-2 font-semibold text-success">· {inCart} in cart</span>}
        </p>
      </div>
      {p.variants && p.variants.length > 1 && !p.priceOnRequest && (
        <select value={variant} onChange={(e) => setVariant(e.target.value)} aria-label={`${p.name} option`} className="rounded border bg-background px-2 py-1.5 text-xs">
          {p.variants.map((v) => <option key={v}>{v}</option>)}
        </select>
      )}
      {p.priceOnRequest ? (
        <a href={whatsappLink(`Hello Bargains Stationery, what is the price of the ${p.name}?`)} target="_blank" rel="noreferrer" className="rounded-md border px-3 py-2 text-xs font-bold text-success">Ask price</a>
      ) : (
        <button onClick={() => { add(p.slug, 1, variant); toast.success(`${p.name}${variant ? ` (${variant})` : ""} added`); }} aria-label={`Add ${p.name} to cart`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-110 active:scale-95">
          <Plus className="h-5 w-5" aria-hidden />
        </button>
      )}
    </li>
  );
}
