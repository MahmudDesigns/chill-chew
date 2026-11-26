"use client";

import { useState } from "react";
import { cn } from "@/lib/format";

/** Hand-drawn fallback mark — used whenever /public/images/logo.png is missing. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Chill & Chew monogram"
      className={cn("h-9 w-9", className)}
      fill="none"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <path
        d="M17 28h24v8c0 7.2-5.4 12.6-12 12.6S17 43.2 17 36v-8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 31.5c4.4 0 6.8 2.2 6.8 5.6 0 3.4-2.6 5.6-6.6 5.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 52.5h33"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M25 22.5c2.6-2.4 0-4.6 1.4-7.4M32.5 21c2.8-2.8 0-5.2 1.6-8.4M40 22.5c2.4-2.2 0-4.2 1.3-6.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * Brand lockup. Tries the client-supplied /images/logo.png first and falls
 * back to the drawn monogram + script wordmark if the file is missing.
 */
export function Brand({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {imgFailed ? (
        <span className="text-[var(--accent)]">
          <Monogram className={compact ? "h-8 w-8" : "h-9 w-9"} />
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/logo.png"
          alt="Chill & Chew"
          width={50}
          height={50}
          className={cn("object-contain", compact ? "h-8 w-8" : "h-9 w-9")}
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-script text-[var(--fg)]",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          Chill &amp; Chew
        </span>
        <span className="label mt-1 text-[0.6rem] text-[var(--fg-faint)]">
          Mombasa · Kenya
        </span>
      </span>
    </span>
  );
}
