import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/products";

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
    { i: MessageCircle, t: "WhatsApp", v: "Chat with us", href: whatsappLink("Hello Bargains Stationery") },
    { i: Phone, t: "Phone", v: SITE.phone, href: `tel:${SITE.phone}` },
    { i: Mail, t: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-4xl font-black uppercase">Contact us</h1>
      <div className="ruler mt-3 w-24" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map(({ i: I, t, v, href }) => (
          <a key={t} href={href} target="_blank" rel="noreferrer" className="rounded-lg border p-6 transition hover:border-primary hover:shadow-lg">
            <I className="h-7 w-7 text-primary" />
            <h2 className="mt-3 font-display font-bold">{t}</h2>
            <p className="text-sm text-muted-foreground">{v}</p>
          </a>
        ))}
      </div>
      <h2 className="mt-14 text-2xl font-black uppercase">FAQs</h2>
      <div className="mt-4 divide-y rounded-lg border">
        {[
          ["How do I order?", "Add items to your cart and send your order via WhatsApp. We'll confirm availability, price and payment."],
          ["Do you deliver?", "Delivery and collection options are confirmed with you when you order."],
          ["What about returns?", "Our returns policy will be shared here soon. Contact us with any concerns."],
        ].map(([q, a]) => (
          <details key={q} className="p-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>
        ))}
      </div>
    </div>
  );
}
