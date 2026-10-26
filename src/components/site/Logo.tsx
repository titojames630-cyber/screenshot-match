// Temporary placeholder until the official Bargains Stationery logo is supplied.
export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-14 w-14 text-3xl" : "h-10 w-10 text-2xl";
  return (
    <span className="inline-flex items-center gap-2.5" title="Logo placeholder">
      <span className={`${box} grid place-items-center rounded-md border-2 border-dashed border-primary bg-primary font-display font-black text-primary-foreground`}>B</span>
      <span className={`font-display leading-none ${light ? "text-ink-foreground" : "text-foreground"}`}>
        <span className="block text-base font-black tracking-tight">BARGAINS</span>
        <span className="block text-[0.65rem] font-semibold tracking-[0.3em] text-primary">STATIONERY</span>
      </span>
    </span>
  );
}
