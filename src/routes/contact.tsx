import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from "lucide-react";
import { SITE, smsLink, telLink, whatsappLink } from "@/lib/products";
import { FAQS } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Bargains Stationery" },
      { name: "description", content: "Reach Bargains Stationery by WhatsApp, phone or email." },
      { property: "og:title", content: "Contact Bargains Stationery" },
      { property: "og:description", content: "Questions, orders and enquiries — we're here to help." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { i: MessageCircle, t: "WhatsApp", v: SITE.phone, href: whatsappLink("Hello Bargains Stationery") },
    { i: Phone, t: "Call", v: SITE.phone, href: telLink },
    { i: MessageSquare, t: "SMS", v: SITE.phone, href: smsLink },
    { i: Mail, t: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-4xl font-black">Contact us</h1>
      <p className="mt-3 text-muted-foreground">The fastest way to reach us is WhatsApp. We reply within minutes during working hours.</p>
      <div className="ruler mt-3 w-24" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ i: I, t, v, href }) => (
          <a key={t} href={href} target="_blank" rel="noreferrer" className="rounded-lg border p-6 transition hover:border-primary hover:shadow-lg">
            <I className="h-7 w-7 text-primary" />
            <h2 className="mt-3 font-display font-bold">{t}</h2>
            <p className="text-sm text-muted-foreground">{v}</p>
          </a>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <p className="flex items-center gap-3 rounded-lg bg-secondary p-4 text-sm"><MapPin className="h-5 w-5 text-primary" aria-hidden />{SITE.location}</p>
        <p className="flex items-center gap-3 rounded-lg bg-secondary p-4 text-sm"><Clock className="h-5 w-5 text-primary" aria-hidden />{SITE.hours}</p>
        <p className="flex items-center gap-3 rounded-lg bg-secondary p-4 text-sm"><span className="rounded bg-success px-2 py-0.5 text-xs font-bold text-white">M-PESA</span>Paybill {SITE.payment.paybill} · Acc {SITE.payment.account}</p>
      </div>
      <h2 className="mt-14 text-2xl font-extrabold">Frequently asked questions</h2>
      <div className="mt-4 divide-y rounded-lg border">
        {FAQS.map(([q, a]) => (
          <details key={q} className="p-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>
        ))}
      </div>
    </div>
  );
}
