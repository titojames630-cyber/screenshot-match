import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, MessageCircle, Search, ShoppingCart } from "lucide-react";
import { whatsappLink } from "@/lib/products";
import { useStore } from "@/lib/store";

const WA_TEXT = "Hello Bargains Stationery, I have a question";

/** Floating WhatsApp button (tablet/desktop) and a sticky bottom bar on phones. */
export function MobileBar() {
  const { count } = useStore();
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.7rem] font-semibold";
  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("mobile-search")?.focus(), 250);
  };
  return (
    <>
      <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl transition hover:scale-105 md:grid">
        <MessageCircle className="h-7 w-7" aria-hidden />
      </a>
      <nav aria-label="Quick links" className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,.08)] md:hidden">
        <Link to="/" activeOptions={{ exact: true }} className={`${item} [&.active]:text-primary`}><Home className="h-5 w-5" aria-hidden />Home</Link>
        <button type="button" onClick={focusSearch} className={item}><Search className="h-5 w-5" aria-hidden />Search</button>
        <Link to="/shop" className={`${item} [&.active]:text-primary`}><LayoutGrid className="h-5 w-5" aria-hidden />Shop</Link>
        <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noreferrer" className={`${item} text-success`}><MessageCircle className="h-5 w-5" aria-hidden />WhatsApp</a>
        <Link to="/cart" className={`${item} relative [&.active]:text-primary`}>
          <ShoppingCart className="h-5 w-5" aria-hidden />Cart
          {count > 0 && <span className="absolute right-[22%] top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">{count}</span>}
        </Link>
      </nav>
    </>
  );
}
