import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck, BadgePercent, Building2, GraduationCap, HardHat, MessageCircle, PencilRuler, ShieldCheck, ShoppingCart,
  Smartphone, Truck, Wallet, type LucideIcon,
} from "lucide-react";
import { cloneElement, useEffect, useState, type ReactElement, type ReactNode } from "react";
import hero from "@/assets/hero.webp";
import { BARGAIN, CATEGORIES, KITS, PRODUCTS, SITE, kes, whatsappLink } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { KitCard } from "@/components/site/KitCard";
import { FAQS } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bargains Stationery | Engineering Stationery & Safety Gear in Kenya" },
      { name: "description", content: "Technical drawing equipment, engineering calculators, student kits and construction safety attire at affordable prices. Pay by M-Pesa, same-day Nairobi delivery." },
      { property: "og:title", content: "Bargains Stationery: Engineering your success" },
      { property: "og:description", content: "Engineering stationery and safety gear at prices that make sense. Order on WhatsApp, pay by M-Pesa." },
    ],
    links: [{ rel: "preload", as: "image", href: hero, fetchPriority: "high" }],
  }),
  component: Index,
});

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
      <div className="ruler mt-3 w-24" />
    </div>
  );
}

const TRUST = [
  { i: Wallet, t: "Lipa na M-Pesa", d: `Paybill ${SITE.payment.paybill}` },
  { i: Truck, t: "Same-day in Nairobi", d: "Countrywide in 1–3 days" },
  { i: MessageCircle, t: "WhatsApp support", d: SITE.phone },
  { i: BadgeCheck, t: `${SITE.returnsDays}-day returns`, d: "On unused items" },
];

function Index() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <>
      {/* Hero */}
      <section className="blueprint-dark relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">Kenya's engineering supply store</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Engineering essentials. <span className="text-primary-bright">Unbeatable bargains.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-foreground/80">Drawing sets, calculators, drafting tools and site safety gear for students, draftsmen and contractors. Order in minutes on WhatsApp and pay by M-Pesa.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary"><ShoppingCart className="h-4 w-4" aria-hidden /> Shop now</Link>
              <Link to="/kits" className="btn btn-outline">Student kits</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-lg border border-primary/50" />
            <img src={hero} alt="Technical drawing tools, a calculator and safety gear" width={1200} height={756} fetchPriority="high" className="relative aspect-[4/3] w-full rounded-lg object-cover" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Why order with us" className="border-b bg-background">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 lg:grid-cols-4">
          {TRUST.map(({ i: I, t, d }) => (
            <li key={t} className="flex items-center gap-3 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary"><I className="h-5 w-5 text-primary" aria-hidden /></span>
              <span><span className="block text-sm font-bold">{t}</span><span className="block text-xs text-muted-foreground">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <BargainOfTheWeek />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Browse" title="Shop by category" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={c.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-bold leading-tight">{c.name}</h3>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block">{c.description}</p>
                <span className="mt-2 inline-block text-xs font-bold text-primary">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Kits */}
      <section id="kits" className="border-y bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="Only at Bargains" title="Ready-made student kits" sub="Everything on your list in one order. No running around town looking for each item." />
          <div className="grid gap-6 md:grid-cols-3">{KITS.map((k) => <KitCard key={k.slug} kit={k} />)}</div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Hand-picked" title="Featured products" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <div className="mt-8 text-center"><Link to="/shop" className="btn btn-outline">View all products</Link></div>
      </section>

      {/* Who we serve */}
      <section className="blueprint-dark bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">Who we serve</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Built for engineers, priced for students</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ServeCard i={GraduationCap} t="Students" d="First-year kits, exam calculators and attachment gear." link={<Link to="/kits" className={SERVE} />} />
            <ServeCard i={PencilRuler} t="Draftsmen & architects" d="Boards, scale rulers, pencils and drawing instruments." link={<Link to="/shop" search={{ category: "drafting" }} className={SERVE} />} />
            <ServeCard i={HardHat} t="Contractors & site teams" d="Helmets, vests, boots and workwear in bulk." link={<Link to="/shop" search={{ group: "safety" }} className={SERVE} />} />
            <ServeCard i={Building2} t="Schools & colleges" d="Bulk orders for workshops and drawing classes. Ask for a quote." link={<a href={whatsappLink("Hello, I'd like a bulk quote for our school/college.")} target="_blank" rel="noreferrer" className={SERVE} />} />
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Simple ordering" title="How to order and pay" />
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            { i: ShoppingCart, t: "1. Add to cart", d: "Pick your items or a ready-made kit, then tap “Order via WhatsApp”." },
            { i: MessageCircle, t: "2. Confirm on WhatsApp", d: "We confirm stock and your delivery fee within minutes during working hours." },
            { i: Smartphone, t: "3. Pay by M-Pesa", d: `Paybill ${SITE.payment.paybill}, Account ${SITE.payment.account}. We dispatch as soon as payment lands.` },
          ].map(({ i: I, t, d }) => (
            <li key={t} className="rounded-lg border p-6">
              <I className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why us */}
      <section className="border-y bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="Why us" title="Why shop with Bargains Stationery?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: BadgePercent, t: "Affordable prices", d: "Student-friendly prices and weekly bargains." },
              { i: PencilRuler, t: "Engineering-focused", d: "Products chosen for technical drawing, engineering studies and site work." },
              { i: ShieldCheck, t: "Safety gear you can trust", d: "Protective wear for real construction sites." },
              { i: Truck, t: "Fast delivery", d: "Same-day in Nairobi, countrywide by courier." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-lg border bg-card p-6">
                <I className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-4 font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <WhatsAppDeals />
    </>
  );
}

const SERVE = "block h-full rounded-lg border border-charcoal p-6 transition hover:border-primary-bright";
function ServeCard({ i: I, t, d, link }: { i: LucideIcon; t: string; d: string; link: ReactElement<{ children?: ReactNode }> }) {
  return cloneElement(link, {}, <><I className="h-8 w-8 text-primary-bright" aria-hidden /><h3 className="mt-4 font-bold">{t}</h3><p className="mt-1 text-sm text-ink-foreground/75">{d}</p></>);
}

/** Next Sunday 23:59:59 in Nairobi (UTC+3). */
function dealEnd(now: Date) {
  const eat = new Date(now.getTime() + 3 * 3600_000);
  const daysToSunday = (7 - eat.getUTCDay()) % 7;
  const end = Date.UTC(eat.getUTCFullYear(), eat.getUTCMonth(), eat.getUTCDate() + daysToSunday, 23, 59, 59) - 3 * 3600_000;
  return end;
}

function BargainOfTheWeek() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, dealEnd(new Date()) - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const parts = left === null ? null : [
    ["days", Math.floor(left / 86_400_000)], ["hrs", Math.floor(left / 3_600_000) % 24],
    ["min", Math.floor(left / 60_000) % 60], ["sec", Math.floor(left / 1000) % 60],
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <div className="blueprint-dark grid overflow-hidden rounded-xl bg-ink text-ink-foreground md:grid-cols-2">
        <img src={BARGAIN.image} alt={BARGAIN.name} loading="lazy" decoding="async" className="h-full max-h-96 w-full object-cover" />
        <div className="p-8 sm:p-12">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">Bargain of the week</p>
          <h2 className="mt-3 text-3xl font-black">{BARGAIN.name}</h2>
          <p className="mt-2 text-ink-foreground/75">{BARGAIN.short}</p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-black text-primary-bright">{kes(BARGAIN.price)}</span>
            {BARGAIN.originalPrice && <span className="text-ink-foreground/60 line-through">{kes(BARGAIN.originalPrice)}</span>}
          </div>
          {BARGAIN.originalPrice && <p className="mt-2 text-sm font-semibold">You save {kes(BARGAIN.originalPrice - BARGAIN.price)} · {BARGAIN.stock > 0 ? `Only ${BARGAIN.stock} left` : "Sold out"}</p>}
          <div className="mt-6" aria-live="off">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-foreground/70">Offer ends Sunday midnight</p>
            <div className="mt-2 flex gap-2">
              {(parts ?? [["days", "–"], ["hrs", "–"], ["min", "–"], ["sec", "–"]]).map(([l, v]) => (
                <span key={l} className="min-w-14 rounded-md border border-charcoal px-2 py-1.5 text-center">
                  <span className="block font-display text-xl font-black tabular-nums">{typeof v === "number" ? String(v).padStart(2, "0") : v}</span>
                  <span className="block text-[0.65rem] uppercase text-ink-foreground/70">{l}</span>
                </span>
              ))}
            </div>
          </div>
          <Link to="/product/$slug" params={{ slug: BARGAIN.slug }} className="btn btn-primary mt-8">Grab the deal</Link>
        </div>
      </div>
    </section>
  );
}


function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <SectionTitle kicker="Questions" title="Frequently asked questions" />
      <div className="divide-y rounded-lg border">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {q}<span className="ml-4 text-primary transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function WhatsAppDeals() {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto max-w-4xl rounded-xl border-2 border-dashed border-primary p-8 text-center sm:p-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Never miss a bargain</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Get weekly deals and new arrivals straight to your WhatsApp. Follow us on TikTok and Instagram <strong>{SITE.social.instagram.handle}</strong>.</p>
        <a href={whatsappLink("Hello Bargains Stationery, please add me to your weekly deals list.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6">
          <MessageCircle className="h-4 w-4" aria-hidden /> Get deals on WhatsApp
        </a>
      </div>
    </section>
  );
}
