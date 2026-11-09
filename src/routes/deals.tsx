import { createFileRoute } from "@tanstack/react-router";
import { BadgePercent, MessageCircle } from "lucide-react";
import { DEALS, whatsappLink } from "@/lib/products";
import { Reveal } from "@/components/site/Reveal";
import { DealCard } from "@/components/site/DealCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Bundles | Bargains Stationery" },
      { name: "description", content: "Stationery Deal with a free protractor and pencil, and a Safety Deal on boots, overall and gloves with KES 200 off." },
      { property: "og:title", content: "Deals | Bargains Stationery" },
      { property: "og:description", content: "Bundle deals on drawing equipment and safety gear." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  return (
    <div>
      <section className="blueprint-dark animate-grid-pan relative overflow-hidden bg-ink py-14 text-center text-ink-foreground">
        <div aria-hidden className="animate-glow pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary-bright/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-bright"><BadgePercent className="h-4 w-4" aria-hidden /> Bundle & save</p>
          <h1 className="animate-fade-up mt-4 text-4xl font-black [animation-delay:120ms] sm:text-5xl">Today's <span className="text-primary-bright">deals</span></h1>
          <p className="animate-fade-up mx-auto mt-3 max-w-xl px-4 text-ink-foreground/80 [animation-delay:240ms]">Buy the set together and save. Free items are added to your order automatically.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2">
        {DEALS.map((d, i) => <Reveal key={d.slug} delay={i * 120} className="h-full"><DealCard d={d} /></Reveal>)}
      </div>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-xl border-2 border-dashed border-primary p-8 text-center">
          <h2 className="text-2xl font-extrabold">Want a custom bundle?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Buying for a class or a group? Send us your list and we'll quote a bundle price.</p>
          <a href={whatsappLink("Hello Bargains Stationery, I'd like a bundle price for this list:")} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6"><MessageCircle className="h-4 w-4" aria-hidden /> Ask for a bundle price</a>
        </div>
      </section>
    </div>
  );
}

