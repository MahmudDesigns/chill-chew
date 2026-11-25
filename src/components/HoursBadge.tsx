"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, cn } from "@/lib/format";

export function HoursBadge({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [status, setStatus] = useState(() => getOpenStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5",
        status.open
          ? "border-[color-mix(in_srgb,var(--flame)_55%,transparent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)]"
          : "border-[var(--line)] bg-[var(--bg-2)]",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full",
            status.open ? "animate-ping bg-[var(--accent)] opacity-70" : "bg-[var(--fg-faint)]",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            status.open ? "bg-[var(--accent)]" : "bg-[var(--fg-faint)]",
          )}
        />
      </span>
      <span
        className={cn(
          "label",
          status.open ? "text-[var(--accent)]" : "text-[var(--fg-muted)]",
        )}
      >
        {status.label}
      </span>
      {!compact ? (
        <span className="text-xs text-[var(--fg-faint)]">{status.detail}</span>
      ) : null}
    </div>
  );
}
