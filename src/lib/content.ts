import { SITE } from "./products";

export const FAQS: [string, string][] = [
  ["How do I order?", "Add items to your cart and tap “Order via WhatsApp”. Your order is sent to us as a message, and we confirm stock and the delivery fee."],
  ["How do I pay?", `Pay by M-Pesa: Lipa na M-Pesa → Paybill ${SITE.payment.paybill}, Account ${SITE.payment.account}. Send us the M-Pesa confirmation message on WhatsApp.`],
  ["Do you deliver?", `Yes. ${SITE.delivery.nairobi}. ${SITE.delivery.countrywide}. ${SITE.delivery.fee}.`],
  ["Can I return an item?", `Yes, within ${SITE.returnsDays} days for unused items in their original packaging. A wrong-size lab coat can be exchanged.`],
  ["Do you supply schools and companies?", "Yes. We handle bulk orders for schools, colleges and contractors. WhatsApp us your list for a quote."],
];
