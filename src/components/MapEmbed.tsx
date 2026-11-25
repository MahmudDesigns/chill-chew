import { MapPin, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "@/data/business";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="frame overflow-hidden rounded-3xl">
        <div className="relative overflow-hidden rounded-[23px] bg-[var(--bg-2)]">
          <iframe
            title={`Map showing ${BUSINESS.name} in ${BUSINESS.city}`}
            src={BUSINESS.map.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full border-0 sm:h-[420px]"
            style={{ filter: "grayscale(0.35) contrast(1.05)" }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)]">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <span>
            {BUSINESS.address.line1}, {BUSINESS.address.line2}
          </span>
        </p>
        <a
          href={BUSINESS.map.link}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex items-center gap-1.5 text-[var(--accent)] underline-grow"
        >
          Open in Google Maps <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
