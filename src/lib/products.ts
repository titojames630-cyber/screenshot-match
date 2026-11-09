import draftsman from "@/assets/products/gaslo-draftsman-set-609.webp";
import labcoat from "@/assets/products/polyester-white-labcoat.webp";
import protractor from "@/assets/products/protractor-360.webp";
import casioEs from "@/assets/products/casio-fx-991es-plus.webp";
import casioEx from "@/assets/products/casio-fx-991ex-classwiz.webp";
import casioEx2 from "@/assets/products/casio-fx-991ex-classwiz-2.webp";
import setSquare from "@/assets/products/gaslo-set-square-35cm.webp";
import tSquare from "@/assets/products/t-square-90cm.webp";

// Store settings. Values marked "recommended" are sensible defaults: confirm or edit them.
export const SITE = {
  name: "Bargains Stationery",
  tagline: "Engineering your success",
  announcement: "Lipa na M-Pesa · Same-day delivery in Nairobi · Order on WhatsApp",
  whatsapp: "254788142433",
  phone: "0788 142 433",
  phoneIntl: "+254788142433",
  email: "bargainsstationery@gmail.com",
  social: {
    tiktok: { handle: "@bargainsstationery", url: "https://www.tiktok.com/@bargainsstationery" },
    instagram: { handle: "@bargainsstationery", url: "https://www.instagram.com/bargainsstationery" },
  },
  payment: { method: "M-Pesa Paybill", paybill: "542542", account: "375020" },
  location: "Nairobi, Kenya", // recommended: replace with your shop or pickup address
  hours: "Mon–Sat, 8:00am – 6:00pm", // recommended
  delivery: {
    // recommended terms
    nairobi: "Same-day delivery in Nairobi for orders confirmed before 2:00pm",
    countrywide: "Countrywide delivery by courier in 1–3 working days",
    fee: "Delivery fee depends on your location and is confirmed on WhatsApp before you pay",
  },
  returnsDays: 7, // recommended
};

export const telLink = `tel:${SITE.phoneIntl}`;
export const smsLink = `sms:${SITE.phoneIntl}`;

export type Category = { slug: string; name: string; description: string; image: string; group: "stationery" | "safety" };

export const CATEGORIES: Category[] = [
  { slug: "technical-drawing", name: "Technical Drawing Instruments", description: "Draftsman sets, set squares and protractors.", image: draftsman, group: "stationery" },
  { slug: "calculators", name: "Scientific Calculators", description: "Genuine Casio calculators for engineering maths.", image: casioEx, group: "stationery" },
  { slug: "drafting", name: "Drafting Tools", description: "T-squares and drawing aids for the drawing board.", image: tSquare, group: "stationery" },
  { slug: "lab-wear", name: "Lab Coats & Protective Wear", description: "Lab coats for practicals and workshop sessions.", image: labcoat, group: "safety" },
];

export type Product = {
  id: string; slug: string; name: string; category: string;
  short: string; description: string;
  price: number; originalPrice?: number;
  image: string; images?: string[]; variants?: string[]; stock: number; sku: string;
  brand?: string;
  specs: Record<string, string>;
  featured?: boolean; sale?: boolean; isNew?: boolean;
};

// Products and prices from the Bargains Stationery WhatsApp catalogue.
// Stock numbers are a default of 20: update them to your real stock (0 shows "Sold out").
const p = (x: Product) => x;
export const PRODUCTS: Product[] = [
  p({ id: "1", slug: "gaslo-draftsman-set-609", name: "Gaslo Draftsman Set (609 Model)", brand: "Gaslo", category: "technical-drawing",
    short: "Essential for all students taking a technical drawing unit, for easy curve drawing.",
    description: "Gaslo Draft Tech technical drawing set, model 609. Essential for all students taking a technical drawing unit, with precision compasses and instruments for easy curve drawing. Comes in a protective carry case.",
    price: 800, image: draftsman, stock: 20, sku: "BS-TD-609", specs: { Brand: "Gaslo (Draft Tech)", Model: "609", Use: "Technical drawing, curves and arcs", Case: "Hard plastic carry case" }, featured: true }),
  p({ id: "2", slug: "gaslo-set-square-35cm", name: "Gaslo 35cm Set Square (30° & 45°)", brand: "Gaslo", category: "technical-drawing",
    short: "Both 30° and 45° set squares, 3.0mm thick, for isometric, orthographic and perspective drawing.",
    description: "A pair of 35cm Gaslo set squares (30°/60° and 45°), 3.0mm thick. Essential for technical drawing, especially isometric, orthographic and perspective drawing.",
    price: 400, image: setSquare, stock: 20, sku: "BS-TD-SS35", specs: { Brand: "Gaslo", Size: "35 cm", Thickness: "3.0 mm", Angles: "30°/60° and 45°" }, featured: true }),
  p({ id: "3", slug: "protractor-360", name: "360° Clear Plastic Protractor", category: "technical-drawing",
    short: "Full-circle protractor, essential for technical drawing and survey classes.",
    description: "Full-circle 360° clear plastic protractor with easy-to-read markings. Essential for technical drawing and survey classes.",
    price: 300, image: protractor, stock: 20, sku: "BS-TD-P360", specs: { Type: "Full circle, 360°", Material: "Clear plastic", Use: "Technical drawing and surveying" }, featured: true }),
  p({ id: "4", slug: "casio-fx-991ex-classwiz", name: "Casio fx-991EX ClassWiz", brand: "Casio", category: "calculators",
    short: "552 functions with a high-resolution display. Essential for all engineering maths units.",
    description: "Casio fx-991EX ClassWiz scientific calculator with 552 functions, a high-resolution display and spreadsheet mode. Essential for all engineering maths units and a good long-term investment.",
    price: 2500, image: casioEx, images: [casioEx, casioEx2], stock: 20, sku: "BS-CA-991EX", specs: { Brand: "Casio", Model: "fx-991EX ClassWiz", Functions: "552", Display: "High-resolution natural textbook display" }, featured: true }),
  p({ id: "5", slug: "casio-fx-991es-plus", name: "Casio fx-991ES Plus (Black)", brand: "Casio", category: "calculators",
    short: "417 functions. Essential for basic engineering calculations.",
    description: "Casio fx-991ES Plus scientific calculator in black, with 417 functions and a natural textbook display. Essential for basic engineering calculations.",
    price: 2200, image: casioEs, variants: ["Black"], stock: 20, sku: "BS-CA-991ES", specs: { Brand: "Casio", Model: "fx-991ES Plus (2nd edition)", Functions: "417", Colour: "Black" }, featured: true }),
  p({ id: "6", slug: "t-square-90cm", name: "90cm Detachable T-Square", category: "drafting",
    short: "Detachable head with a pouch for easy portability.",
    description: "90cm T-square with a detachable head and a carry pouch for easy portability. Essential for drawing on the board.",
    price: 650, image: tSquare, stock: 20, sku: "BS-DR-T90", specs: { Length: "90 cm", Head: "Detachable", Includes: "Carry pouch" }, featured: true }),
  p({ id: "7", slug: "polyester-white-labcoat", name: "Polyester White Lab Coat", category: "lab-wear",
    short: "All sizes available (S, M, L, XL). For lab sessions and as a substitute for overalls.",
    description: "White polyester lab coat, available in sizes S, M, L and XL. Essential for lab sessions and a smart substitute for overalls.",
    price: 700, image: labcoat, variants: ["S", "M", "L", "XL"], stock: 20, sku: "BS-LW-LC", specs: { Material: "Polyester", Colour: "White", Sizes: "S, M, L, XL" }, featured: true }),
];

export const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
export const discount = (pr: Product) => pr.originalPrice ? Math.round((1 - pr.price / pr.originalPrice) * 100) : 0;
export const bySlug = (s: string) => PRODUCTS.find((x) => x.slug === s);
export const categoryName = (s: string) => CATEGORIES.find((c) => c.slug === s)?.name ?? s;
const SYNONYMS: Record<string, string[]> = {
  geometry: ["draftsman", "protractor", "set square"], "maths set": ["draftsman"], compass: ["draftsman"],
  calculator: ["casio"], calc: ["casio"], classwiz: ["classwiz"], "991": ["casio"], "draftsman": ["draftsman"], "drawing set": ["draftsman"],
  "t square": ["t square"], tsquare: ["t square"], triangle: ["set square"], labcoat: ["lab coat"], "lab coat": ["lab coat"],
  dustcoat: ["lab coat"], overall: ["lab coat"], coat: ["lab coat"], angle: ["protractor", "set square"],
};
const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
/** Forgiving product search: matches any word, known synonyms, and small typos. */
export function matchesQuery(p: Product, q: string) {
  const hay = norm(`${p.name} ${p.brand ?? ""} ${p.short} ${categoryName(p.category)} ${p.variants?.join(" ") ?? ""}`);
  const nq = norm(q);
  if (!nq) return true;
  if (hay.includes(nq)) return true;
  const extra = Object.entries(SYNONYMS).filter(([k]) => nq.includes(k)).flatMap(([, v]) => v);
  if (extra.some((e) => hay.includes(e))) return true;
  const words = hay.split(" ");
  return nq.split(" ").filter((w) => w.length > 2).every((w) =>
    words.some((h) => h.startsWith(w) || (w.length > 4 && close(w, h))));
}
function close(a: string, b: string) {
  // allow one typo (edit distance 1) against words of similar length
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}
export const searchProducts = (q: string) => PRODUCTS.filter((p) => matchesQuery(p, q));

export const filterProducts = (opts: { category?: string | undefined; group?: string | undefined; q?: string | undefined; sale?: boolean | undefined }) =>
  PRODUCTS.filter((x) => {
    if (opts.category && x.category !== opts.category) return false;
    if (opts.group && CATEGORIES.find((c) => c.slug === x.category)?.group !== opts.group) return false;
    if (opts.sale && !x.originalPrice) return false;
    if (opts.q && !matchesQuery(x, opts.q)) return false;
    return true;
  });
export const BARGAIN: Product = PRODUCTS.find((x) => x.slug === "casio-fx-991ex-classwiz")!;
export const whatsappLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
