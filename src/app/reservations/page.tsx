import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Users, Car, ArrowLeft } from "lucide-react";
import { ReserveForm } from "@/components/ReserveForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BUSINESS } from "@/data/business";

export const metadata: Metadata = {
  title: "Table Reservations",
  description:
    "Reserve a table at Chill & Chew, Links Road, Nyali, Mombasa. Choose your date, time, guest count and seating — confirmation on WhatsApp.",
  alternates: { canonical: "/reservations" },
  openGraph: {
    title: "Reserve a table · Chill & Chew Mombasa",
    description: "Book a table by the window, on the terrace or at the big table.",
    url: "/reservations",
    images: ["/images/interior.jpg"],
  },
};

const NOTES = [
  {
    icon: Clock,
    title: "Held for 15 minutes",
    body: "We hold your table a quarter of an hour past the booking time. Running late? A quick WhatsApp sorts it.",
  },
  {
    icon: Users,
    title: "Parties over 10",
    body: "For bigger groups, birthdays or catering platters, call us on +254 712 345 678 at least 24 hours ahead.",
  },
  {
    icon: Car,
    title: "Parking & access",
    body: "Free parking for 14 cars behind the building, step-free entrance, and the terrace is dog friendly.",
  },
];

export default function ReservationsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--line)] py-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 70% at 90% 0%, color-mix(in srgb, var(--flame) 28%, transparent), transparent 66%),
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

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Reservations"
                title={
                  <>
                    Save a seat <span className="text-grad">by the window</span>
                  </>
                }
                proverb={`${BUSINESS.address.line1} · open daily 07:00 – 22:00`}
              />
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
                Fill in the form and we&apos;ll confirm on WhatsApp within ten
                minutes during opening hours. Walk-ins are always welcome at the
                counter bar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ReserveForm />
            </div>

            <div className="space-y-4 lg:col-span-5">
              {NOTES.map((n, i) => (
                <Reveal key={n.title} delay={i * 0.07}>
                  <div className="lift card flex items-start gap-4 rounded-2xl p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--flame)_50%,transparent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)] text-[var(--accent)]">
                      <n.icon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{n.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-[var(--fg-muted)]">
                        {n.body}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
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
