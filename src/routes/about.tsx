import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Bargains Stationery" },
      { name: "description", content: "Kenya's engineering-focused stationery and safety attire store." },
      { property: "og:title", content: "About Bargains Stationery" },
      { property: "og:description", content: "Affordability, reliability and engineering excellence." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Logo size="lg" />
          <h1 className="mt-6 text-4xl font-black uppercase">Built for engineers, priced for students.</h1>
          <p className="mt-4 text-muted-foreground">Bargains Stationery supplies engineering students, draftsmen, architects and construction professionals with the tools they need — technical drawing equipment, calculators, measuring instruments and site safety attire.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {["Affordability", "Reliability", "Engineering Excellence"].map((v) => (
              <div key={v} className="rounded-lg border-t-4 border-primary bg-secondary p-4 font-display text-xs font-bold uppercase">{v}</div>
            ))}
          </div>
          <Link to="/shop" className="btn btn-primary mt-8">Start shopping</Link>
        </div>
        <img src={hero} alt="Engineering tools" loading="lazy" className="rounded-lg" />
      </div>
    </div>
  ),
});
