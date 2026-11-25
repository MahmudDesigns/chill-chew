import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursBadge } from "@/components/HoursBadge";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BUSINESS, DELIVERY_AREAS } from "@/data/business";
import { whatsappLink } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Find Chill & Chew on Links Road, Nyali, Mombasa. Call +254 712 345 678, WhatsApp us, see opening hours, delivery areas and get directions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Location · Chill & Chew Mombasa",
    description: "Links Road, opposite Nyali Centre — open daily in Mombasa.",
    url: "/contact",
    images: ["/images/exterior.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--line)] py-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 70% at 88% 0%, color-mix(in srgb, var(--flame) 28%, transparent), transparent 66%),
              linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 95%, var(--flame)))`,
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="label inline-flex items-center gap-2 text-[var(--fg-faint)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} /> Home
          </Link>

          <div className="mt-6">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Say <span className="text-grad">karibu</span>
                </>
              }
              proverb={`${BUSINESS.address.full}`}
            />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <HoursBadge />
              <a
                href={whatsappLink("Hello Chill & Chew!")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame px-5 py-2.5 text-[0.8rem]"
              >
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="space-y-4 lg:col-span-5">
              <Reveal>
                <div className="card rounded-2xl p-5">
                  <p className="label text-[var(--accent)]">Direct lines</p>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${BUSINESS.phone.tel}`}
                      className="flex items-center gap-3 text-sm transition-colors hover:text-[var(--accent)]"
                    >
                      <Phone size={16} className="text-[var(--accent)]" />
                      {BUSINESS.phone.display}
                    </a>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="flex items-center gap-3 break-all text-sm transition-colors hover:text-[var(--accent)]"
                    >
                      <Mail size={16} className="text-[var(--accent)]" />
                      {BUSINESS.email}
                    </a>
                    <p className="flex items-start gap-3 text-sm">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span>
                        {BUSINESS.address.line1}
                        <br />
                        {BUSINESS.address.line2}
                      </span>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="card rounded-2xl p-5">
                  <p className="label text-[var(--accent)]">Delivery areas & fees</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {DELIVERY_AREAS.map((a) => (
                      <li
                        key={a.id}
                        className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2 last:border-0"
                      >
                        <span className="text-[var(--fg-muted)]">{a.label}</span>
                        <span className="tnum text-[var(--fg)]">
                          KES {a.fee}{" "}
                          <span className="text-[var(--fg-faint)]">· {a.eta}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <Newsletter />
              </Reveal>

              <Reveal delay={0.16}>
                <Link href="/menu" className="btn btn-ghost w-full">
                  Order online instead
                </Link>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-14">
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
