import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SITE, telLink, whatsappLink } from "@/lib/products";

type Page = { title: string; description: string; sections: { h: string; p: string[] }[] };

const P = SITE.payment;
const PAGES: Record<string, Page> = {
  delivery: {
    title: "Delivery information",
    description: "Delivery times, areas and fees for Bargains Stationery orders.",
    sections: [
      { h: "Nairobi", p: [`${SITE.delivery.nairobi}. Orders confirmed after 2:00pm are delivered the next working day.`] },
      { h: "Outside Nairobi", p: [`${SITE.delivery.countrywide}, through a trusted courier or matatu parcel service to your nearest town.`] },
      { h: "Delivery fees", p: [`${SITE.delivery.fee}. You can also arrange to collect your order.`] },
      { h: "Tracking your order", p: [`We send you a WhatsApp update when your order is dispatched. Questions? WhatsApp or call ${SITE.phone}.`] },
    ],
  },
  returns: {
    title: "Returns & refunds",
    description: "Our returns, exchange and refund policy.",
    sections: [
      { h: "Returns", p: [`You can return unused items in their original packaging within ${SITE.returnsDays} days of delivery. WhatsApp us your order details and the reason for the return.`] },
      { h: "Exchanges", p: ["A wrong-size lab coat can be exchanged for another size, subject to stock."] },
      { h: "Faulty items", p: ["If an item arrives damaged or faulty, tell us within 48 hours with a photo and we will replace it or refund you."] },
      { h: "Refunds", p: ["Approved refunds are sent back to the M-Pesa number you paid from, usually within 2 working days."] },
      { h: "Items we cannot take back", p: ["Items that have been used or damaged after delivery, and calculators with broken seals unless faulty."] },
    ],
  },
  "how-to-order": {
    title: "How to order & pay",
    description: "Order on WhatsApp and pay by M-Pesa Paybill.",
    sections: [
      { h: "1. Add items to your cart", p: ["Browse the shop, choose sizes or options, and add items to your cart."] },
      { h: "2. Send your order on WhatsApp", p: ["Tap “Order via WhatsApp” in your cart. Your full order is sent to us as a message. We confirm stock and the delivery fee."] },
      { h: "3. Pay by M-Pesa", p: [`Go to M-Pesa → Lipa na M-Pesa → Pay Bill. Business number: ${P.paybill}. Account number: ${P.account}. Enter the amount we confirmed and your PIN.`, "Send us the M-Pesa confirmation message on WhatsApp and we dispatch your order."] },
      { h: "Bulk and school orders", p: ["Schools, colleges and contractors can send a list on WhatsApp for a quote."] },
    ],
  },
  privacy: {
    title: "Privacy policy",
    description: "How Bargains Stationery handles your personal information.",
    sections: [
      { h: "What we collect", p: ["When you order we receive the details you share on WhatsApp, phone or email: your name, phone number, delivery location and order details."] },
      { h: "How we use it", p: ["Only to process and deliver your order, answer your questions and, if you ask to join, send you deals. We never sell your information."] },
      { h: "Your cart and wishlist", p: ["Your cart and wishlist are saved in your own browser on your device. They are not sent to us until you place an order."] },
      { h: "Your rights", p: [`Under the Kenya Data Protection Act, 2019 you can ask us to see, correct or delete your information. Email ${SITE.email}.`] },
    ],
  },
  terms: {
    title: "Terms & conditions",
    description: "Terms for buying from Bargains Stationery.",
    sections: [
      { h: "Prices", p: ["Prices are in Kenya Shillings. We confirm the final price and delivery fee on WhatsApp before you pay."] },
      { h: "Stock", p: ["Stock levels on the website are a guide. We confirm availability before you pay."] },
      { h: "Payment", p: [`Orders are processed once payment is received via M-Pesa Paybill ${P.paybill}, Account ${P.account}.`] },
      { h: "Returns", p: [`See our returns policy. Unused items can be returned within ${SITE.returnsDays} days.`] },
    ],
  },
};

export const Route = createFileRoute("/info/$page")({
  loader: ({ params }) => {
    const page = PAGES[params.page];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.page.title} | Bargains Stationery` },
          { name: "description", content: loaderData.page.description },
        ]
      : [{ title: "Page not found" }],
  }),
  component: InfoPage,
});

function InfoPage() {
  const { page } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> / {page.title}</nav>
      <h1 className="mt-4 text-4xl font-black">{page.title}</h1>
      <div className="ruler mt-3 w-24" />
      <div className="mt-8 space-y-8">
        {page.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-bold">{s.h}</h2>
            {s.p.map((t) => <p key={t} className="mt-2 leading-relaxed text-muted-foreground">{t}</p>)}
          </section>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3 rounded-lg bg-secondary p-6">
        <p className="w-full font-semibold">Still have a question?</p>
        <a href={whatsappLink("Hello Bargains Stationery")} target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp us</a>
        <a href={telLink} className="btn btn-outline">Call {SITE.phone}</a>
      </div>
    </div>
  );
}
