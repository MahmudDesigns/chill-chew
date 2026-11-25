import { cn } from "@/lib/format";

export function Marquee({
  items,
  reverse = false,
  className,
  tone = "dark",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  tone?: "dark" | "flame";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-wrap relative overflow-hidden",
        tone === "flame"
          ? "bg-[var(--accent)] text-[var(--ink)]"
          : "border-y border-[var(--line)] bg-[var(--bg-2)] text-[var(--fg)]",
        className,
      )}
      aria-hidden
    >
      <div className={cn("marquee-track", reverse && "marquee-rev")}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span
              className={cn(
                "label py-3.5 whitespace-nowrap",
                tone === "flame" ? "text-[var(--ink)]" : "text-[var(--fg-muted)]",
              )}
            >
              {item}
            </span>
            <span
              className={cn(
                "mx-5 inline-block h-1.5 w-1.5 rotate-45",
                tone === "flame" ? "bg-[var(--ink)]" : "bg-[var(--accent)]",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
