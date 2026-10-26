import stationery from "@/assets/stationery.jpg";
import safety from "@/assets/safety.jpg";
import measuring from "@/assets/measuring.jpg";
import hero from "@/assets/hero.jpg";

// Store settings. Replace placeholders with the business's real details.
export const SITE = {
  announcement: "ENGINEERING ESSENTIALS AT GREAT PRICES | ORDER TODAY!",
  whatsapp: "254700000000", // placeholder
  phone: "+254 700 000 000", // placeholder
  email: "hello@bargainsstationery.co.ke", // placeholder
  social: { tiktok: "#", instagram: "#", facebook: "#" },
};

export type Category = { slug: string; name: string; description: string; image: string; group: "stationery" | "safety" | "deals" };

export const CATEGORIES: Category[] = [
  { slug: "technical-drawing", name: "Technical Drawing Equipment", description: "Drawing sets, compasses and set squares.", image: stationery, group: "stationery" },
  { slug: "calculators", name: "Engineering Calculators", description: "Scientific calculators for exams and design work.", image: measuring, group: "stationery" },
  { slug: "drafting", name: "Drawing Boards & Drafting Tools", description: "Boards, T-squares and drafting accessories.", image: hero, group: "stationery" },
  { slug: "stationery", name: "Engineering Stationery", description: "Graph paper, pencils and field notebooks.", image: stationery, group: "stationery" },
  { slug: "measuring", name: "Surveying & Measuring", description: "Calipers, scale rulers and measuring tools.", image: measuring, group: "stationery" },
  { slug: "safety", name: "Construction Safety Attire", description: "Helmets, vests, boots and protective wear.", image: safety, group: "safety" },
  { slug: "student", name: "Student Essentials", description: "Everything a first-year engineer needs.", image: hero, group: "stationery" },
  { slug: "offers", name: "Special Offers", description: "Our best bargains, right now.", image: safety, group: "deals" },
];

export type Product = {
  id: string; slug: string; name: string; category: string;
  short: string; description: string;
  price: number; originalPrice?: number;
  image: string; variants?: string[]; stock: number; sku: string;
  specs: Record<string, string>;
  featured?: boolean; sale?: boolean; isNew?: boolean;
};

// NOTE: All prices are development placeholders until the owner confirms real prices.
export const PRICES_ARE_PLACEHOLDERS = true;

const p = (x: Product) => x;
export const PRODUCTS: Product[] = [
  p({ id: "1", slug: "engineering-drawing-set", name: "Engineering Drawing Set", category: "technical-drawing", short: "Essential technical drawing instruments for students and draftsmen.", description: "A complete set of technical drawing instruments for engineering students and draftsmen.", price: 1800, originalPrice: 2200, image: stationery, stock: 25, sku: "BS-TD-001", specs: { Includes: "Compass, dividers, rulers, protractor (to be confirmed)" }, featured: true, sale: true }),
  p({ id: "2", slug: "scientific-calculator", name: "Scientific Calculator", category: "calculators", short: "For engineering and mathematics calculations.", description: "Scientific calculator suitable for engineering and mathematics. Exact model to be confirmed by the store.", price: 2500, image: measuring, stock: 15, sku: "BS-CA-001", specs: { Model: "To be confirmed", Power: "To be confirmed" }, featured: true }),
  p({ id: "3", slug: "mechanical-pencil-set", name: "Mechanical Pencil Set", category: "stationery", short: "Precision pencils for detailed technical work.", description: "Precision mechanical pencils for technical drawing and detailed engineering work.", price: 650, image: stationery, stock: 40, sku: "BS-ST-001", variants: ["0.3mm", "0.5mm", "0.7mm"], specs: { "Lead sizes": "0.3 / 0.5 / 0.7 mm" }, featured: true, isNew: true }),
  p({ id: "4", slug: "a3-drawing-board", name: "A3 Drawing Board", category: "drafting", short: "Drawing board for technical drawing and drafting.", description: "A3 drawing board suitable for technical drawing and drafting.", price: 3500, originalPrice: 4000, image: hero, stock: 8, sku: "BS-DR-001", specs: { Size: "A3", Accessories: "To be confirmed" }, sale: true }),
  p({ id: "5", slug: "engineering-graph-paper", name: "Engineering Graph Paper", category: "stationery", short: "Grid paper for drawings and calculations.", description: "Grid paper for technical drawings, calculations and engineering sketches.", price: 300, image: measuring, stock: 100, sku: "BS-ST-002", variants: ["A4", "A3"], specs: { Sizes: "A4 / A3" } }),
  p({ id: "6", slug: "digital-vernier-caliper", name: "Digital Vernier Caliper", category: "measuring", short: "Digital instrument for dimensional measurements.", description: "Digital measuring instrument for dimensional measurements. Range and accuracy as supplied by manufacturer.", price: 2800, originalPrice: 3400, image: measuring, stock: 6, sku: "BS-ME-001", specs: { Range: "To be confirmed", Resolution: "To be confirmed" }, featured: true, sale: true }),
  p({ id: "7", slug: "engineers-scale-ruler", name: "Engineer's Scale Ruler", category: "measuring", short: "Multi-scale ruler for plans and drawings.", description: "Multi-scale ruler for technical drawings and engineering plans.", price: 450, image: stationery, stock: 30, sku: "BS-ME-002", specs: { Length: "30 cm" } }),
  p({ id: "8", slug: "engineering-field-notebook", name: "Engineering Field Notebook", category: "student", short: "For site observations and field notes.", description: "Notebook for site observations, field measurements and engineering notes.", price: 400, image: measuring, stock: 50, sku: "BS-ST-003", specs: { Binding: "To be confirmed" }, isNew: true }),
  p({ id: "9", slug: "safety-helmet", name: "Safety Helmet", category: "safety", short: "Protective headwear for construction sites.", description: "Protective headwear for construction and industrial environments. Certifications to be confirmed by supplier.", price: 900, image: safety, stock: 20, sku: "BS-SA-001", variants: ["White", "Yellow", "Red"], specs: { Adjustment: "To be confirmed" }, featured: true }),
  p({ id: "10", slug: "reflective-safety-vest", name: "Reflective Safety Vest", category: "safety", short: "High-visibility vest for site and fieldwork.", description: "High-visibility vest for construction sites and fieldwork.", price: 500, originalPrice: 650, image: safety, stock: 60, sku: "BS-SA-002", variants: ["M", "L", "XL"], specs: { Colour: "Orange / Lime" }, featured: true, sale: true }),
  p({ id: "11", slug: "steel-toe-safety-boots", name: "Steel-Toe Safety Boots", category: "safety", short: "Protective work boots.", description: "Protective work boots for construction and industrial applications.", price: 4500, image: safety, stock: 10, sku: "BS-SA-003", variants: ["40", "41", "42", "43", "44", "45"], specs: { "Toe protection": "Steel toe" }, featured: true }),
  p({ id: "12", slug: "safety-goggles", name: "Safety Goggles", category: "safety", short: "Eye protection for site and workshop.", description: "Eye protection for suitable construction and workshop tasks.", price: 450, image: safety, stock: 35, sku: "BS-SA-004", specs: { Lens: "Clear" } }),
  p({ id: "13", slug: "protective-work-gloves", name: "Protective Work Gloves", category: "safety", short: "Grip gloves for construction work.", description: "Gloves for construction and workshop activities.", price: 350, image: safety, stock: 0, sku: "BS-SA-005", variants: ["M", "L", "XL"], specs: { Material: "To be confirmed" } }),
  p({ id: "14", slug: "engineering-overalls", name: "Engineering Overalls", category: "safety", short: "Durable workwear for site and workshop.", description: "Durable workwear for construction, workshops and fieldwork.", price: 2200, image: safety, stock: 12, sku: "BS-SA-006", variants: ["M", "L", "XL", "XXL"], specs: { Fabric: "To be confirmed" }, isNew: true }),
];

export const SAFETY = new Set(["safety"]);
export const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
export const discount = (pr: Product) => pr.originalPrice ? Math.round((1 - pr.price / pr.originalPrice) * 100) : 0;
export const bySlug = (s: string) => PRODUCTS.find((x) => x.slug === s);
export const categoryName = (s: string) => CATEGORIES.find((c) => c.slug === s)?.name ?? s;
export const filterProducts = (opts: { category?: string; group?: string; q?: string; sale?: boolean }) =>
  PRODUCTS.filter((x) => {
    if (opts.category === "offers") { if (!x.originalPrice) return false; }
    else if (opts.category && x.category !== opts.category) return false;
    if (opts.group === "safety" && x.category !== "safety") return false;
    if (opts.group === "stationery" && x.category === "safety") return false;
    if (opts.sale && !x.originalPrice) return false;
    if (opts.q && !(x.name + " " + x.short).toLowerCase().includes(opts.q.toLowerCase())) return false;
    return true;
  });
export const BARGAIN = PRODUCTS[5];
export const whatsappLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
