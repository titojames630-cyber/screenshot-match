import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";
import { SITE, smsLink, telLink, whatsappLink } from "@/lib/products";

export function Footer() {
  const h = "mb-4 font-display text-xs font-bold uppercase tracking-widest text-primary-bright";
  const a = "flex items-center gap-2 py-1.5 text-sm text-ink-foreground/80 hover:text-primary-bright";
  return (
    <footer className="blueprint-dark bg-ink pb-20 text-ink-foreground md:pb-0">
      <div className="ruler" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="Bargains Stationery — Engineering your success" width={160} height={160} loading="lazy" className="h-32 w-32" />
          <p className="mt-4 text-sm text-ink-foreground/75">Engineering stationery, technical drawing equipment and construction safety attire at prices that make sense.</p>
        </div>
        <div>
          <h2 className={h}>Shop</h2>
          <Link to="/shop" className={a}>Shop all</Link>
          <Link to="/shop" search={{ group: "stationery" }} className={a}>Engineering stationery</Link>
          <Link to="/shop" search={{ group: "safety" }} className={a}>Safety attire</Link>
          <Link to="/kits" className={a}>Student kits</Link>
          <Link to="/deals" className={a}>Deals</Link>
          <Link to="/about" className={a}>About us</Link>
        </div>
        <div>
          <h2 className={h}>Help</h2>
          <Link to="/info/$page" params={{ page: "delivery" }} className={a}>Delivery information</Link>
          <Link to="/info/$page" params={{ page: "returns" }} className={a}>Returns &amp; refunds</Link>
          <Link to="/info/$page" params={{ page: "how-to-order" }} className={a}>How to order &amp; pay</Link>
          <Link to="/info/$page" params={{ page: "privacy" }} className={a}>Privacy policy</Link>
          <Link to="/info/$page" params={{ page: "terms" }} className={a}>Terms &amp; conditions</Link>
          <Link to="/contact" className={a}>Contact &amp; FAQs</Link>
        </div>
        <div>
          <h2 className={h}>Contact</h2>
          <a href={whatsappLink("Hello Bargains Stationery")} target="_blank" rel="noreferrer" className={a}><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp {SITE.phone}</a>
          <a href={telLink} className={a}><Phone className="h-4 w-4" aria-hidden />Call {SITE.phone}</a>
          <a href={smsLink} className={a}><MessageSquare className="h-4 w-4" aria-hidden />SMS {SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className={a}><Mail className="h-4 w-4" aria-hidden />{SITE.email}</a>
          <p className={a}><MapPin className="h-4 w-4" aria-hidden />{SITE.location}</p>
          <p className={a}><Clock className="h-4 w-4" aria-hidden />{SITE.hours}</p>
          <div className="mt-3 flex gap-3">
            <a href={SITE.social.tiktok.url} target="_blank" rel="noreferrer" aria-label={`TikTok ${SITE.social.tiktok.handle}`} className="grid h-10 w-10 place-items-center rounded-full border border-charcoal hover:border-primary-bright hover:text-primary-bright"><TikTokIcon /></a>
            <a href={SITE.social.instagram.url} target="_blank" rel="noreferrer" aria-label={`Instagram ${SITE.social.instagram.handle}`} className="grid h-10 w-10 place-items-center rounded-full border border-charcoal hover:border-primary-bright hover:text-primary-bright"><InstagramIcon /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-ink-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Bargains Stationery. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="rounded bg-success px-2 py-0.5 font-bold text-white">M-PESA</span>
            Paybill <strong className="text-ink-foreground">{SITE.payment.paybill}</strong> · Account <strong className="text-ink-foreground">{SITE.payment.account}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.6c.27 0 .53.04.77.11V9.75a5.69 5.69 0 1 0 4.91 5.65V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
