import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgePercent, HardHat, MessageCircle, Truck } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { BARGAIN, CATEGORIES, PRODUCTS, kes } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bargains Stationery — Engineering Essentials, Unbeatable Bargains" },
      { name: "description", content: "Technical drawing equipment, engineering calculators and construction safety attire at affordable prices in Kenya." },
      { property: "og:title", content: "Bargains Stationery — Engineering Essentials" },
      { property: "og:description", content: "Engineering stationery and safety gear at prices that make sense." },
    ],
  }),
  component: Index,
});

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">{title}</h2>
      <div className="ruler mt-3 w-24" />
    </div>
  );
}

function Index() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <>
      <section className="blueprint-dark relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">Kenya's engineering supply store</p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Engineering essentials. <span className="text-primary">Unbeatable bargains.</span>
            </h1>
            <p className="mt-5 max-w-lg opacity-80">From technical drawing equipment to construction safety gear, get the essentials you need at prices that make sense.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/deals" className="btn btn-outline">Explore Deals</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-lg border border-primary/50" />
            <img src={hero} alt="Technical drawing tools, calculator and safety gear" width={1600} height={1008} className="relative aspect-[4/3] w-full rounded-lg object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle kicker="Browse" title="Shop by category" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-bold leading-tight">{c.name}</h3>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{c.description}</p>
                <span className="mt-2 inline-block font-display text-xs font-bold uppercase text-primary">Shop category →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="blueprint bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="Hand-picked" title="Featured products" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="blueprint-dark grid overflow-hidden rounded-xl bg-ink text-ink-foreground md:grid-cols-2">
          <img src={BARGAIN.image} alt={BARGAIN.name} loading="lazy" className="h-full max-h-96 w-full object-cover" />
          <div className="p-8 sm:p-12">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">The bargain of the week</p>
            <h2 className="mt-3 text-3xl font-black uppercase">{BARGAIN.name}</h2>
            <p className="mt-2 opacity-75">Quality engineering essentials. Prices worth checking out.</p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-black text-primary">{kes(BARGAIN.price)}</span>
              <span className="line-through opacity-60">{kes(BARGAIN.originalPrice!)}</span>
            </div>
            <p className="mt-2 text-sm font-semibold">You save {kes(BARGAIN.originalPrice! - BARGAIN.price)} · {BARGAIN.stock > 0 ? "In stock" : "Out of stock"}</p>
            <Link to="/product/$slug" params={{ slug: BARGAIN.slug }} className="btn btn-primary mt-8">Shop Now</Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="Why us" title="Why shop with Bargains Stationery?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: BadgePercent, t: "Affordable Prices", d: "Engineering essentials at competitive prices." },
              { i: HardHat, t: "Engineering-Focused", d: "Products selected for technical drawing, engineering studies and construction work." },
              { i: MessageCircle, t: "Convenient Ordering", d: "Browse online and place your order through WhatsApp." },
              { i: Truck, t: "Delivery & Collection", d: "Delivery and collection arrangements confirmed when you order." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-lg border bg-card p-6">
                <I className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="text-2xl font-black uppercase sm:text-3xl">Stay updated. <span className="text-primary">Never miss a bargain.</span></h2>
      <p className="mt-3 text-muted-foreground">Get updates on new arrivals, special offers, and engineering essentials.</p>
      <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg({ ok: false, t: "Please enter a valid email address." });
        setMsg({ ok: true, t: "Thanks! Newsletter sign-ups will be activated soon." });
        setEmail("");
      }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" aria-label="Email"
          className="flex-1 rounded-md border px-4 py-3 outline-none focus:border-primary" />
        <button className="btn btn-primary">Subscribe</button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">By subscribing you agree to receive marketing emails. Unsubscribe any time.</p>
      {msg && <p className={`mt-3 text-sm font-semibold ${msg.ok ? "text-success" : "text-destructive"}`}>{msg.t}</p>}
    </section>
  );
}
