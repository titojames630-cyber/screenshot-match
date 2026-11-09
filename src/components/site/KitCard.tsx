import { PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { bySlug, kes, kitTotal, type Kit } from "@/lib/products";
import { useStore } from "@/lib/store";

export function KitCard({ kit }: { kit: Kit }) {
  const { add } = useStore();
  const total = kitTotal(kit);
  const addKit = () => {
    kit.items.forEach((i) => add(i.slug, i.qty, i.variant ?? bySlug(i.slug)?.variants?.[0]));
    toast.success(`${kit.name} added to cart`, { action: { label: "View cart", onClick: () => { window.location.href = "/cart"; } } });
  };
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        <img src={kit.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded bg-ink px-2.5 py-1 text-xs font-bold text-ink-foreground">{kit.audience}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-tight">{kit.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{kit.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {kit.items.map((i) => (
            <li key={i.slug} className="flex items-start gap-2">
              <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
              <span>{bySlug(i.slug)?.name}{i.variant ? ` (${i.variant})` : ""}{i.qty > 1 ? ` × ${i.qty}` : ""}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs text-muted-foreground">Kit price</p>
            <p className="font-display text-2xl font-black">{kes(total)}</p>
          </div>
          <button onClick={addKit} className="btn btn-primary">Add kit to cart</button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Sizes and colours can be changed in your cart or on WhatsApp.</p>
      </div>
    </article>
  );
}
