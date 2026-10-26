import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/products";

export function Footer() {
  const h = "mb-4 font-display text-xs font-bold uppercase tracking-widest text-primary";
  const a = "block py-1 text-sm opacity-80 hover:text-primary hover:opacity-100";
  return (
    <footer className="blueprint-dark bg-ink text-ink-foreground">
      <div className="ruler" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light size="lg" />
          <p className="mt-4 text-sm opacity-75">Engineering stationery, technical drawing equipment and construction safety attire at prices that make sense.</p>
        </div>
        <div>
          <h4 className={h}>Quick Links</h4>
          <Link to="/" className={a}>Home</Link>
          <Link to="/shop" className={a}>Shop All</Link>
          <Link to="/shop" search={{ group: "stationery" }} className={a}>Engineering Stationery</Link>
          <Link to="/shop" search={{ group: "safety" }} className={a}>Safety Attire</Link>
          <Link to="/deals" className={a}>Deals</Link>
          <Link to="/about" className={a}>About Us</Link>
          <Link to="/contact" className={a}>Contact Us</Link>
        </div>
        <div>
          <h4 className={h}>Customer Support</h4>
          <a href={whatsappLink("Hello Bargains Stationery")} className={a} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`tel:${SITE.phone}`} className={a}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className={a}>{SITE.email}</a>
          <Link to="/contact" className={a}>Delivery, returns & FAQs</Link>
        </div>
        <div>
          <h4 className={h}>Follow Us</h4>
          <a href={SITE.social.tiktok} className={a}>TikTok</a>
          <a href={SITE.social.instagram} className={a}>Instagram</a>
          <a href={SITE.social.facebook} className={a}>Facebook</a>
          <h4 className={`${h} mt-6`}>Payment</h4>
          <p className="text-sm opacity-75">Payment options confirmed on order.</p>
        </div>
      </div>
      <div className="border-t border-charcoal py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Bargains Stationery. All rights reserved.</div>
    </footer>
  );
}
