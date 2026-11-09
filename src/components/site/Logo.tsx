import mark from "@/assets/logo-mark.webp";

/** Brand mark (the "B" emblem) with the wordmark set as text so it stays sharp at any size. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const h = size === "lg" ? "h-14" : "h-10 sm:h-11";
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src={mark} alt="" width={228} height={160} className={`${h} w-auto`} />
      <span className="font-display leading-none text-ink-foreground">
        <span className="block text-base font-black tracking-tight sm:text-lg">
          <span className="text-primary-bright">B</span>ARGAINS
        </span>
        <span className="block text-[0.7rem] font-bold tracking-[0.28em] text-primary-bright">STATIONERY</span>
      </span>
    </span>
  );
}
