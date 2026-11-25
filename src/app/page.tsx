import Link from "next/link";
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { FeaturedMenu } from "@/components/MenuBoard";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { Faq } from "@/components/Faq";
import { ReserveForm } from "@/components/ReserveForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { MARQUEE_LINES } from "@/data/content";
import { BUSINESS } from "@/data/business";
import { whatsappLink } from "@/lib/format";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_LINES} />

      <Story />

      {/* ---------------- today's board ---------------- */}
      <section
        id="featured"
        className="relative border-t border-[var(--line)] py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(55% 60% at 8% 10%, color-mix(in srgb, var(--flame) 14%, transparent), transparent 70%), var(--bg-2)`,
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Today's board"
                title={
                  <>
                    Six things we&apos;d <span className="text-grad">order for you</span>
                  </>
                }
                proverb="Prices in KES · kitchen open daily"
              />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
                Everything is cooked to order and most of it can be out of the
                kitchen in under fifteen minutes. Tap any line to pick sizes and
                add-ons.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/menu" className="btn btn-flame">
                  Order the full menu <ArrowRight size={16} />
                </Link>
                <a
                  href={whatsappLink("Hi Chill & Chew! I'd like to order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FeaturedMenu />
            </div>
          </div>
        </div>
      </section>

      <Gallery />
      <Reviews />

      {/* ---------------- reservation ---------------- */}
      <section id="reserve" className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 70% at 92% 12%, color-mix(in srgb, var(--flame) 24%, transparent) 0%, transparent 65%),
              linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 96%, var(--flame)))`,
          }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-[1400px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Save a seat"
              title={
                <>
                  Book a table <span className="text-grad">by the window</span>
                </>
              }
              proverb="Karibu — walk-ins welcome at the counter"
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
              Terrace in the sun, wall bench with an outlet, or the big table at
              the back for the whole crew. Tell us what you need and we&apos;ll
              hold it for fifteen minutes.
            </p>

            <Reveal delay={0.1} className="relative mt-8">
              <div className="frame overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[29px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/exterior.jpg"
                    alt="Chill & Chew on Links Road at dusk"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(26,26,26,0.05), rgba(26,26,26,0.7))",
                    }}
                  />
                  <div className="absolute bottom-0 p-5">
                    <p className="label text-[color-mix(in_srgb,var(--flame)_85%,var(--paper))]">
                      {BUSINESS.address.line1}
                    </p>
                    <p className="font-script mt-1 text-xl text-white">
                      Open late on Fridays &amp; Saturdays
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ReserveForm />
          </div>
        </div>
      </section>

      <Visit />
      <Faq />

      {/* ---------------- closing CTA ---------------- */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-2)] py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-10">
          <p className="label text-[var(--accent)]">Hungry already?</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,6vw,4.2rem)]">
            <span className="text-grad">Chill</span>{" "}
            <span className="text-[var(--fg)]">&amp; Chew</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
            Order online for pickup or delivery across Nyali, Bamburi, Tudor,
            Mtwapa, Old Town and Likoni — or just walk in.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="btn btn-flame">
              Start an order <ArrowRight size={16} />
            </Link>
            <Link href="/reservations" className="btn btn-ghost">
              <CalendarDays size={16} /> Reserve a table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
