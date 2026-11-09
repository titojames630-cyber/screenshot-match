import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { KITS, whatsappLink } from "@/lib/products";
import { KitCard } from "@/components/site/KitCard";

export const Route = createFileRoute("/kits")({
  head: () => ({
    meta: [
      { title: "Student Kits | Bargains Stationery" },
      { name: "description", content: "Ready-made engineering drawing, exam and site attachment kits for Kenyan students. One order, everything on your list." },
      { property: "og:title", content: "Student Kits | Bargains Stationery" },
      { property: "og:description", content: "Everything on your course list in one order." },
    ],
  }),
  component: Kits,
});

function Kits() {
  return (
    <div>
      <section className="blueprint-dark bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">Only at Bargains</p>
          <h1 className="mt-2 text-4xl font-black">Ready-made student kits</h1>
          <p className="mt-3 max-w-2xl text-ink-foreground/80">Everything on your list in one order, at one price. Change sizes or swap items on WhatsApp before you pay.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {KITS.map((k) => <KitCard key={k.slug} kit={k} />)}
      </div>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-xl border-2 border-dashed border-primary p-8 text-center">
          <h2 className="text-2xl font-extrabold">Need a kit for your course or school?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Send us your university, college or school supply list and we will put together a kit and quote for you.</p>
          <a href={whatsappLink("Hello Bargains Stationery, I'd like a kit for my course. Here is my supply list:")} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-6">
            <MessageCircle className="h-4 w-4" aria-hidden /> Send your list on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
