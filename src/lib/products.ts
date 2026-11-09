import draftsman from "@/assets/products/gaslo-draftsman-set-609.webp";
import labcoat from "@/assets/products/polyester-white-labcoat.webp";
import protractor from "@/assets/products/protractor-360.webp";
import casioEs from "@/assets/products/casio-fx-991es-plus.webp";
import casioEx from "@/assets/products/casio-fx-991ex-classwiz.webp";
import casioEx2 from "@/assets/products/casio-fx-991ex-classwiz-2.webp";
import setSquare from "@/assets/products/gaslo-set-square-35cm.webp";
import tSquare from "@/assets/products/t-square-90cm.webp";
import scaleRuler from "@/assets/products/scale-ruler-30cm.webp";
import pencils from "@/assets/products/staedtler-pencils.webp";
import overall from "@/assets/products/polyester-navy-overall.webp";
import boots from "@/assets/products/lushunda-safety-boots.webp";
import dustCoat from "@/assets/products/dust-coat.webp";
import helmet from "@/assets/products/safety-helmet.webp";
import vest from "@/assets/products/reflector-vest.webp";
import gloves from "@/assets/products/work-gloves.webp";
import smpTables from "@/assets/products/smp-mathematical-tables.webp";
import dealStationery from "@/assets/products/deal-stationery.webp";
import dealSafety from "@/assets/products/deal-safety.webp";

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

export type Category = { slug: string; name: string; short: string; description: string; image: string };

/** The four shop departments, shown as the main tabs. */
export const CATEGORIES: Category[] = [
  { slug: "drawing-equipment", name: "Drawing Equipment", short: "Drawing", description: "Draftsman sets, set squares, scale rulers, T-squares, protractors and pencils.", image: draftsman },
  { slug: "computation", name: "Computation", short: "Computation", description: "Casio scientific calculators and SMP mathematical tables.", image: casioEx },
  { slug: "engineering-attire", name: "Engineering Attire", short: "Attire", description: "Lab coats, overalls and dust coats for labs and workshops.", image: overall },
  { slug: "safety-gear", name: "Safety Gear", short: "Safety", description: "Safety boots, helmets, reflector vests and work gloves.", image: boots },
];

export type Product = {
  id: string; slug: string; name: string; category: string;
  short: string; description: string;
  price: number; originalPrice?: number;
  /** No price set yet: shows "Price on request" and an Ask on WhatsApp button. */
  priceOnRequest?: boolean;
  /** Image is an illustration until a real photo is supplied. */
  illustration?: boolean;
  image: string; images?: string[]; variants?: string[]; stock: number; sku: string;
  brand?: string;
  specs: Record<string, string>;
  featured?: boolean; sale?: boolean; isNew?: boolean;
  /** For deals: what the bundle contains. */
  includes?: string[];
};

// Products and prices from the Bargains Stationery WhatsApp catalogue.
// Stock numbers are a default of 20: update them to your real stock (0 shows "Sold out").
const p = (x: Product) => x;
export const PRODUCTS: Product[] = [
  // ── Drawing equipment ──
  p({ id: "1", slug: "gaslo-draftsman-set-609", name: "Gaslo Draftsman Set (609 Model)", brand: "Gaslo", category: "drawing-equipment",
    short: "Essential for all students taking a technical drawing unit, for easy curve drawing.",
    description: "Gaslo Draft Tech technical drawing set, model 609. Essential for all students taking a technical drawing unit, with precision compasses and instruments for easy curve drawing. Comes in a protective carry case.",
    price: 800, image: draftsman, stock: 20, sku: "BS-DE-609", specs: { Brand: "Gaslo (Draft Tech)", Model: "609", Use: "Technical drawing, curves and arcs", Case: "Hard plastic carry case" }, featured: true }),
  p({ id: "2", slug: "gaslo-set-square-35cm", name: "Gaslo 35cm Set Square (30° & 45°)", brand: "Gaslo", category: "drawing-equipment",
    short: "Both 30° and 45° set squares, 3.0mm thick, for isometric, orthographic and perspective drawing.",
    description: "A pair of 35cm Gaslo set squares (30°/60° and 45°), 3.0mm thick. Essential for technical drawing, especially isometric, orthographic and perspective drawing.",
    price: 400, image: setSquare, stock: 20, sku: "BS-DE-SS35", specs: { Brand: "Gaslo", Size: "35 cm", Thickness: "3.0 mm", Angles: "30°/60° and 45°" }, featured: true }),
  p({ id: "8", slug: "triangular-scale-ruler-30cm", name: "30cm Metric Triangular Scale Ruler", category: "drawing-equipment",
    short: "Scales 1:20–1:125 and 1:250–1:600. Essential for units that need scale measurements, like surveying.",
    description: "30cm metric triangular scale ruler with six scales covering 1:20–1:125 and 1:250–1:600. Essential for units that require scale measurements, like surveying and building drawing.",
    price: 400, image: scaleRuler, stock: 20, sku: "BS-DE-SR30", specs: { Length: "30 cm", Type: "Triangular, metric", Scales: "1:20–1:125 and 1:250–1:600", Use: "Surveying, architectural and building drawing" }, featured: true, isNew: true }),
  p({ id: "6", slug: "t-square-90cm", name: "90cm Detachable T-Square", category: "drawing-equipment",
    short: "Detachable head with a pouch for easy portability.",
    description: "90cm T-square with a detachable head and a carry pouch for easy portability. Essential for drawing on the board.",
    price: 650, image: tSquare, stock: 20, sku: "BS-DE-T90", specs: { Length: "90 cm", Head: "Detachable", Includes: "Carry pouch" }, featured: true }),
  p({ id: "3", slug: "protractor-360", name: "360° Clear Plastic Protractor", category: "drawing-equipment",
    short: "Full-circle protractor, essential for technical drawing and survey classes.",
    description: "Full-circle 360° clear plastic protractor with easy-to-read markings. Essential for technical drawing and survey classes.",
    price: 300, image: protractor, stock: 20, sku: "BS-DE-P360", specs: { Type: "Full circle, 360°", Material: "Clear plastic", Use: "Technical drawing and surveying" } }),
  p({ id: "9", slug: "staedtler-tradition-pencils", name: "Staedtler Tradition Pencils", brand: "Staedtler", category: "drawing-equipment",
    short: "Choose your grade: 4B, 2B, HB, 2H, 3H or 4H. Price per pencil.",
    description: "Staedtler Tradition drawing pencils in a full range of grades for technical drawing: soft 4B and 2B for shading, HB for general work, and hard 2H, 3H and 4H for fine construction lines. Price is per pencil.",
    price: 80, image: pencils, variants: ["4B", "2B", "HB", "2H", "3H", "4H"], stock: 20, sku: "BS-DE-STP", specs: { Brand: "Staedtler Tradition", Grades: "4B, 2B, HB, 2H, 3H, 4H", Price: "Per pencil" }, isNew: true }),
  // ── Calculators ──
  p({ id: "4", slug: "casio-fx-991ex-classwiz", name: "Casio fx-991EX ClassWiz", brand: "Casio", category: "computation",
    short: "552 functions with a high-resolution display. Essential for all engineering maths units.",
    description: "Casio fx-991EX ClassWiz scientific calculator with 552 functions, a high-resolution display and spreadsheet mode. Essential for all engineering maths units and a good long-term investment.",
    price: 2500, image: casioEx, images: [casioEx, casioEx2], stock: 20, sku: "BS-CA-991EX", specs: { Brand: "Casio", Model: "fx-991EX ClassWiz", Functions: "552", Display: "High-resolution natural textbook display" }, featured: true }),
  p({ id: "5", slug: "casio-fx-991es-plus", name: "Casio fx-991ES Plus (Black)", brand: "Casio", category: "computation",
    short: "417 functions. Essential for basic engineering calculations.",
    description: "Casio fx-991ES Plus scientific calculator in black, with 417 functions and a natural textbook display. Essential for basic engineering calculations.",
    price: 2200, image: casioEs, variants: ["Black"], stock: 20, sku: "BS-CA-991ES", specs: { Brand: "Casio", Model: "fx-991ES Plus (2nd edition)", Functions: "417", Colour: "Black" }, featured: true }),
  p({ id: "16", slug: "smp-mathematical-tables", name: "SMP Mathematical Tables", category: "computation",
    short: "Four-figure mathematical tables for maths, physics and engineering calculations.",
    description: "SMP mathematical tables with logarithms, trigonometric functions, squares, square roots and reciprocals. Ask on WhatsApp for the current price.",
    price: 0, priceOnRequest: true, image: smpTables, illustration: true, stock: 20, sku: "BS-CO-SMP", specs: { Contents: "Logs, trig functions, squares, roots, reciprocals", Use: "Maths, physics and engineering units" } }),
  // ── Engineering attire ──
  p({ id: "7", slug: "polyester-white-labcoat", name: "Polyester White Lab Coat", category: "engineering-attire",
    short: "All sizes available (S, M, L, XL). For lab sessions and as a substitute for overalls.",
    description: "White polyester lab coat, available in sizes S, M, L and XL. Essential for lab sessions and a smart substitute for overalls.",
    price: 700, image: labcoat, variants: ["S", "M", "L", "XL"], stock: 20, sku: "BS-EA-LC", specs: { Material: "Polyester", Colour: "White", Sizes: "S, M, L, XL" }, featured: true }),
  p({ id: "10", slug: "polyester-navy-overall", name: "Polyester Navy Blue Overall", category: "engineering-attire",
    short: "All sizes (S, M, L, XL). Comfortable fit with aeration openings for workshops and labs.",
    description: "Navy blue polyester overall, available in sizes S, M, L and XL. Essential for workshops and lab sessions, with a comfortable fit and aeration openings for comfort.",
    price: 1000, image: overall, variants: ["S", "M", "L", "XL"], stock: 20, sku: "BS-EA-OV", specs: { Material: "Polyester", Colour: "Navy blue", Sizes: "S, M, L, XL", Features: "Aeration openings" }, featured: true, isNew: true }),
  p({ id: "11", slug: "dust-coat", name: "Dust Coat", category: "engineering-attire",
    short: "Knee-length dust coat for workshops, stores and practical sessions.",
    description: "Royal blue knee-length dust coat that keeps your clothes clean during workshop, stores and practical sessions. Available in sizes S, M, L and XL.",
    price: 600, image: dustCoat, variants: ["S", "M", "L", "XL"], stock: 20, sku: "BS-EA-DC", specs: { Length: "Knee-length", Colour: "Royal blue", Sizes: "S, M, L, XL" } }),
  // ── Safety gear ──
  p({ id: "12", slug: "lushunda-safety-boots", name: "Lushunda Safety Boots", brand: "Lushunda", category: "safety-gear",
    short: "Essential for workshops, fieldwork and your future attachment.",
    description: "Lushunda leather safety boots, essential for workshops, fieldwork and industrial attachment. Ask on WhatsApp for your size.",
    price: 1900, image: boots, variants: ["38", "39", "40", "41", "42", "43", "44", "45"], stock: 20, sku: "BS-SG-LB", specs: { Brand: "Lushunda", Upper: "Leather", Use: "Workshops, fieldwork, attachment" }, featured: true, isNew: true }),
  p({ id: "13", slug: "reflector-vest", name: "Reflector Vest", category: "safety-gear",
    short: "High-visibility reflective vest for site visits, fieldwork and surveying.",
    description: "High-visibility reflector vest with reflective strips, for site visits, fieldwork and surveying practicals.",
    price: 250, image: vest, illustration: true, stock: 20, sku: "BS-SG-RV", specs: { Type: "High-visibility vest", Strips: "Reflective" }, featured: true }),
  p({ id: "14", slug: "safety-helmet", name: "Safety Helmet", category: "safety-gear",
    short: "Hard hat for construction sites, site visits and attachment.",
    description: "Protective hard hat for construction sites, site visits and industrial attachment. Ask on WhatsApp for available colours.",
    price: 500, image: helmet, illustration: true, stock: 20, sku: "BS-SG-HM", specs: { Type: "Hard hat", Colours: "Ask on WhatsApp" } }),
  p({ id: "15", slug: "work-gloves", name: "Working Gloves", category: "safety-gear",
    short: "Knitted gloves with a rubber-coated palm for a firm grip in workshops and fieldwork.",
    description: "Knitted cotton working gloves with a grey rubber-coated palm and fingers for a firm, protective grip in workshops, fieldwork and practical sessions.",
    price: 400, image: gloves, stock: 20, sku: "BS-SG-GL", specs: { Type: "Knitted, rubber-coated palm", Use: "Workshops and fieldwork" } }),
];

// ── Deals ──
export type Deal = {
  slug: string; name: string; tagline: string; image: string; kind: "stationery" | "safety";
  /** Paid items in the bundle. */
  items: string[];
  /** Items included free. */
  free: string[];
  /** Fixed amount off the paid items. */
  discount: number;
  /** Customer picks one of these (e.g. free pencil grade). */
  choiceLabel?: string; choices?: string[];
  note?: string;
};
export const DEALS: Deal[] = [
  { slug: "deal-stationery", kind: "stationery", name: "Stationery Deal", tagline: "Everything for technical drawing, plus a FREE protractor and a FREE pencil of your choice.",
    image: dealStationery, items: ["gaslo-draftsman-set-609", "gaslo-set-square-35cm", "triangular-scale-ruler-30cm", "t-square-90cm"], free: ["protractor-360", "staedtler-tradition-pencils"], discount: 0,
    choiceLabel: "Free pencil grade", choices: ["4B", "2B", "HB", "2H", "3H", "4H"] },
  { slug: "deal-safety", kind: "safety", name: "Safety Deal", tagline: "Boots, overall and gloves together, KES 200 off.",
    image: dealSafety, items: ["lushunda-safety-boots", "polyester-navy-overall", "work-gloves"], free: [], discount: 200,
    note: "Tell us your boot and overall sizes on WhatsApp." },
];

export const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
export const priceLabel = (pr: Product) => (pr.priceOnRequest ? "Price on request" : kes(pr.price));
export const discount = (pr: Product) => pr.originalPrice ? Math.round((1 - pr.price / pr.originalPrice) * 100) : 0;
const findProduct = (s: string) => PRODUCTS.find((x) => x.slug === s);
export const dealWorth = (d: Deal) => [...d.items, ...d.free].reduce((a, s) => a + (findProduct(s)?.price ?? 0), 0);
export const dealPrice = (d: Deal) => d.items.reduce((a, s) => a + (findProduct(s)?.price ?? 0), 0) - d.discount;
/** A deal shaped like a product, so it works in the cart and on product pages. */
export const dealAsProduct = (d: Deal): Product => ({
  id: d.slug, slug: d.slug, name: d.name, category: "deals", short: d.tagline,
  description: `${d.tagline} Includes: ${[...d.items, ...d.free].map((s) => findProduct(s)?.name).join(", ")}.${d.note ? ` ${d.note}` : ""}`,
  price: dealPrice(d), originalPrice: dealWorth(d), image: d.image, variants: d.choices, stock: 20, sku: d.slug.toUpperCase(), sale: true,
  includes: [...d.items.map((s) => findProduct(s)?.name ?? s), ...d.free.map((s) => `${findProduct(s)?.name ?? s} (FREE)`)],
  specs: Object.fromEntries([
    ...d.items.map((s) => [findProduct(s)?.name ?? s, kes(findProduct(s)?.price ?? 0)]),
    ...d.free.map((s) => [findProduct(s)?.name ?? s, "FREE"]),
    ...(d.discount ? [["Bundle discount", `− ${kes(d.discount)}`]] : []),
  ]),
});
export const DEAL_PRODUCTS = DEALS.map(dealAsProduct);
export const bySlug = (s: string) => findProduct(s) ?? DEAL_PRODUCTS.find((x) => x.slug === s);
export const categoryName = (s: string) => (s === "deals" ? "Deals" : CATEGORIES.find((c) => c.slug === s)?.name ?? s);
const SYNONYMS: Record<string, string[]> = {
  geometry: ["draftsman", "protractor", "set square"], "maths set": ["draftsman"], compass: ["draftsman"],
  calculator: ["casio"], calc: ["casio"], smp: ["smp"], tables: ["smp"], "maths tables": ["smp"], log: ["smp"], classwiz: ["classwiz"], "991": ["casio"], "draftsman": ["draftsman"], "drawing set": ["draftsman"],
  "t square": ["t square"], tsquare: ["t square"], triangle: ["set square"], labcoat: ["lab coat"], "lab coat": ["lab coat"],
  dustcoat: ["dust coat"], "dust coat": ["dust coat"], overalls: ["overall"], coat: ["coat"], angle: ["protractor", "set square"],
  pencil: ["pencils"], staedtler: ["staedtler"], stadler: ["staedtler"], scale: ["scale ruler"], ruler: ["scale ruler", "t square"],
  boots: ["boots"], boot: ["boots"], helmet: ["helmet"], "hard hat": ["helmet"], reflector: ["reflector"], vest: ["reflector"],
  gloves: ["gloves"], glove: ["gloves"], ppe: ["boots", "helmet", "reflector", "gloves"],
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

export const filterProducts = (opts: { category?: string | undefined; q?: string | undefined; sale?: boolean | undefined }) =>
  PRODUCTS.filter((x) => {
    if (opts.category && x.category !== opts.category) return false;
    if (opts.sale && !x.originalPrice) return false;
    if (opts.q && !matchesQuery(x, opts.q)) return false;
    return true;
  });
export const BARGAIN: Product = DEAL_PRODUCTS[0]!;
export const whatsappLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
