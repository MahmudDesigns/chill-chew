import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  proverb?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "flame" | "plain";
}

export function SectionHeading({
  eyebrow,
  title,
  proverb,
  align = "left",
  className,
  tone = "flame",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3",
          centered && "justify-center",
        )}
      >
        <span
          className={cn(
            "label",
            tone === "flame" ? "text-[var(--accent)]" : "text-[var(--fg-muted)]",
          )}
        >
          {eyebrow}
        </span>
        <span className="pindo-soft w-16 opacity-80" aria-hidden />
      </div>

      <h2 className="mt-4 text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.05] font-semibold tracking-tight">
        {title}
      </h2>

      {proverb ? (
        <p className="label mt-4 text-[var(--fg-faint)]">{proverb}</p>
      ) : null}
    </div>
  );
}
