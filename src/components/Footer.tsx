import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

/* lucide v1 ships no brand icons — glyphs drawn inline instead */
function SocialGlyph({ kind }: { kind: string }) {
  if (kind === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M13.4 21v-7.6h2.6l.4-3h-3V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.35A21.2 21.2 0 0 0 14.2 4.2c-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21h3.1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M13.9 3h2.7a5.5 5.5 0 0 0 4.4 4.35v2.65a8.2 8.2 0 0 1-4.5-1.45v6.3A5.75 5.75 0 1 1 10.8 9.1v2.75a3.05 3.05 0 1 0 2.15 2.92V3Z" />
    </svg>
  );
}
import { Brand } from "@/components/Brand";
import { Newsletter } from "@/components/Newsletter";
import { HoursBadge } from "@/components/HoursBadge";
import { BUSINESS, FOOTER_COPY, FOOTER_CREDIT } from "@/data/business";
import { Marquee } from "@/components/Marquee";

const SITE_LINKS = [
  { href: "/menu", label: "Order online" },
  { href: "/reservations", label: "Table reservation" },
  { href: "/contact", label: "Contact & map" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--line)] bg-[var(--bg-2)]">
      <Marquee
        tone="flame"
        items={[
          "Chill & Chew",
          "Links Road, Nyali",
          "Open daily",
          "M-Pesa accepted",
          "Halal kitchen",
          "Free wifi",
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--fg-muted)]">
              {BUSINESS.subTagline} Roasted in small batches, cooked to order,
              served on Links Road since {BUSINESS.foundingYear}.
            </p>
            <div className="mt-5">
              <HoursBadge compact />
            </div>
            <div className="mt-5 flex gap-2">
              {BUSINESS.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--fg-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <SocialGlyph kind={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="label text-[var(--accent)]">Visit</p>
            <address className="mt-4 space-y-3 text-sm not-italic text-[var(--fg-muted)]">
              <span className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.country}
                </span>
              </span>
              <a
                href={`tel:${BUSINESS.phone.tel}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[var(--accent)]"
              >
                <Phone size={16} className="shrink-0 text-[var(--accent)]" />
                {BUSINESS.phone.display}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[var(--accent)]"
              >
                <Mail size={16} className="shrink-0 text-[var(--accent)]" />
                {BUSINESS.email}
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <p className="label text-[var(--accent)]">Hours</p>
            <ul className="mt-4 space-y-1.5 text-sm text-[var(--fg-muted)]">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Clock size={13} className="text-[var(--fg-faint)]" />
                    {h.day.slice(0, 3)}
                  </span>
                  <span className="tnum">
                    {h.open}–{h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Newsletter compact />
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="underline-grow inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--line)] py-6 sm:flex-row">
          <p className="text-xs text-[var(--fg-faint)]">{FOOTER_COPY}</p>
          <a
            href="https://github.com/mahmuddesigns"
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-1 text-[var(--fg-faint)] transition-colors hover:text-[var(--accent)]"
          >
            {FOOTER_CREDIT} <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
