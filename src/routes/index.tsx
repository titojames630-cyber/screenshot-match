import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck, BadgePercent, Building2, GraduationCap, HardHat, MessageCircle, PencilRuler, ShieldCheck, ShoppingCart,
  Smartphone, Truck, Wallet, type LucideIcon,
} from "lucide-react";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import hero from "@/assets/hero-products.webp";
import { CATEGORIES, DEALS, PRODUCTS, SITE, whatsappLink } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { FAQS } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { DealCard } from "@/components/site/DealCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bargains Stationery | Drawing Equipment, Calculators, Attire & Safety Gear in Kenya" },
      { name: "description", content: "Drawing equipment, Casio scientific calculators, lab coats, overalls, safety boots and reflector vests at student prices. Pay by M-Pesa, same-day Nairobi delivery." },
      { property: "og:title", content: "Bargains Stationery: Engineering your success" },
      { property: "og:description", content: "Engineering stationery at prices that make sense. Order on WhatsApp, pay by M-Pesa." },
    ],
    links: [{ rel: "preload", as: "image", href: hero, fetchPriority: "high" }],
  }),
  component: Index,
});

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-8">
      <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
      <div className="ruler mt-3 w-24" />
    </Reveal>
  );
}

const TRUST = [
  { i: Wallet, t: "Lipa na M-Pesa", d: `Paybill ${SITE.payment.paybill}` },
  { i: Truck, t: "Same-day in Nairobi", d: "Countrywide in 1–3 days" },
  { i: MessageCircle, t: "WhatsApp support", d: SITE.phone },
  { i: BadgeCheck, t: `${SITE.returnsDays}-day returns`, d: "On unused items" },
];

function Index() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      {/* Hero */}
      <section className="blueprint-dark animate-grid-pan relative overflow-hidden bg-ink text-ink-foreground">
        <div aria-hidden className="animate-glow pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="animate-glow pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/25 blur-3xl [animation-delay:-3s]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary-bright/40 bg-primary/10 px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-bright">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-bright" aria-hidden /> Kenya's engineering supply store
            </p>
            <h1 className="animate-fade-up mt-5 text-4xl font-black leading-[1.05] [animation-delay:120ms] sm:text-5xl lg:text-6xl">
              Engineering essentials. <span className="bg-linear-to-r from-primary-bright to-[oklch(0.8_0.16_60)] bg-clip-text text-transparent">Unbeatable bargains.</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-lg text-lg text-ink-foreground/80 [animation-delay:240ms]">Drawing equipment, genuine Casio calculators, lab coats, overalls and safety boots for engineering students and draftsmen. Order in minutes on WhatsApp and pay by M-Pesa.</p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:360ms]">
              <Link to="/shop" className="btn btn-primary shadow-lg shadow-primary/30"><ShoppingCart className="h-4 w-4" aria-hidden /> Shop now</Link>
              <a href={whatsappLink("Hello Bargains Stationery, I would like to order")} target="_blank" rel="noreferrer" className="btn btn-outline"><MessageCircle className="h-4 w-4" aria-hidden /> Order on WhatsApp</a>
            </div>
            <dl className="animate-fade-up mt-10 grid max-w-md grid-cols-3 gap-4 [animation-delay:480ms]">
              {[[String(PRODUCTS.length), "Products"], [String(CATEGORIES.length), "Departments"], ["24/7", "WhatsApp orders"]].map(([v, l]) => (
                <div key={l} className="border-l-2 border-primary-bright pl-3">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-black">{v}</dd>
                  <dd className="text-xs text-ink-foreground/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="animate-fade-up relative [animation-delay:200ms]">
            <div className="absolute -inset-3 rounded-xl border border-primary/50" />
            <div className="absolute -inset-6 rounded-2xl border border-primary/20" aria-hidden />
            <div className="animate-float-slow overflow-hidden rounded-lg shadow-2xl shadow-black/50">
            <img src={hero} alt="Gaslo draftsman sets, a Casio calculator, safety boots and scale rulers from our shop" width={1200} height={900} fetchPriority="high" className="relative aspect-[4/3] w-full object-cover" />
            </div>
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

      {/* Marquee */}
      <div className="overflow-hidden border-b bg-ink py-3 text-ink-foreground" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em]">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {["Casio", "Gaslo", "Staedtler", "Lushunda", "Lipa na M-Pesa", "Same-day Nairobi delivery", "Student prices", "Order on WhatsApp"].map((t) => (
                <span key={t} className="flex items-center gap-10">{t}<span className="text-primary-bright">◆</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Deals */}
      <section className="mx-auto max-w-7xl px-4 pt-14">
        <SectionTitle kicker="Bundle & save" title="This week's deals" sub="Buy the set together: free protractor and pencil with the Stationery Deal, KES 200 off the Safety Deal." />
        <div className="grid gap-6 lg:grid-cols-2">
          {DEALS.map((d, i) => <Reveal key={d.slug} delay={i * 120} className="h-full"><DealCard d={d} /></Reveal>)}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Browse" title="Shop by category" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link to="/shop" search={{ category: c.slug }} className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-ink shadow-sm transition hover:-translate-y-1 hover:shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
                <img src={c.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-xs font-semibold text-white/70">{PRODUCTS.filter((x) => x.category === c.slug).length} products</p>
                  <h3 className="font-display text-base font-extrabold leading-tight sm:text-lg">{c.name}</h3>
                  <p className="mt-1 hidden text-xs text-white/75 sm:block">{c.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary-bright transition group-hover:gap-2">Shop now →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Hand-picked" title="Featured products" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 80} className="h-full"><ProductCard p={p} /></Reveal>)}
        </div>
        <div className="mt-8 text-center"><Link to="/shop" className="btn btn-outline">View all products</Link></div>
      </section>

      {/* Who we serve */}
      <section className="blueprint-dark bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">Who we serve</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Built for engineers, priced for students</h2>
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ServeCard i={GraduationCap} t="Engineering students" d="Casio calculators, SMP tables, draftsman sets and scale rulers." link={<Link to="/shop" search={{ category: "computation" }} className={SERVE} />} />
            <ServeCard i={PencilRuler} t="Draftsmen & architects" d="T-squares, set squares, scale rulers and Staedtler pencils." link={<Link to="/shop" search={{ category: "drawing-equipment" }} className={SERVE} />} />
            <ServeCard i={HardHat} t="Workshops & attachment" d="Overalls, lab coats, safety boots and reflector vests." link={<Link to="/shop" search={{ category: "safety-gear" }} className={SERVE} />} />
            <ServeCard i={Building2} t="Schools & colleges" d="Bulk orders for workshops and drawing classes. Ask for a quote." link={<a href={whatsappLink("Hello, I'd like a bulk quote for our school/college.")} target="_blank" rel="noreferrer" className={SERVE} />} />
          </Reveal>
        </div>
      </section>

      {/* How to order */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="Simple ordering" title="How to order and pay" />
        <Reveal><ol className="grid gap-6 md:grid-cols-3">
          {[
            { i: ShoppingCart, t: "1. Add to cart", d: "Pick your items and options, then tap “Order via WhatsApp”." },
            { i: MessageCircle, t: "2. Confirm on WhatsApp", d: "We confirm stock and your delivery fee within minutes during working hours." },
            { i: Smartphone, t: "3. Pay by M-Pesa", d: `Paybill ${SITE.payment.paybill}, Account ${SITE.payment.account}. We dispatch as soon as payment lands.` },
          ].map(({ i: I, t, d }) => (
            <li key={t} className="rounded-lg border p-6 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <I className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol></Reveal>
      </section>

      {/* Why us */}
      <section className="border-y bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="Why us" title="Why shop with Bargains Stationery?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: BadgePercent, t: "Affordable prices", d: "Student-friendly prices and weekly bargains." },
              { i: PencilRuler, t: "Engineering-focused", d: "Products chosen for technical drawing, engineering studies and site work." },
              { i: ShieldCheck, t: "Genuine brands", d: "Original Casio calculators and Gaslo drawing instruments." },
              { i: Truck, t: "Fast delivery", d: "Same-day in Nairobi, countrywide by courier." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-lg border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
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

const SERVE = "block h-full rounded-lg border border-charcoal p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-bright hover:bg-white/5";
function ServeCard({ i: I, t, d, link }: { i: LucideIcon; t: string; d: string; link: ReactElement<{ children?: ReactNode }> }) {
  return cloneElement(link, {}, <><I className="h-8 w-8 text-primary-bright" aria-hidden /><h3 className="mt-4 font-bold">{t}</h3><p className="mt-1 text-sm text-ink-foreground/75">{d}</p></>);
}

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <SectionTitle kicker="Questions" title="Frequently asked questions" />
      <Reveal className="divide-y rounded-lg border">
        {FAQS.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {q}<span className="ml-4 text-primary transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}

function WhatsAppDeals() {
  return (
    <section className="px-4 pb-16">
      <Reveal className="mx-auto max-w-4xl rounded-xl border-2 border-dashed border-primary bg-linear-to-br from-primary/5 to-transparent p-8 text-center sm:p-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Never miss a bargain</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Get weekly deals and new arrivals straight to your WhatsApp. Follow us on TikTok and Instagram <strong>{SITE.social.instagram.handle}</strong>.</p>
        <a href={whatsappLink("Hello Bargains Stationery, please add me to your weekly deals list.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6">
          <MessageCircle className="h-4 w-4" aria-hidden /> Get deals on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
