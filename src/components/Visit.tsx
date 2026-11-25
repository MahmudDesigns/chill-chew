"use client";

import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursBadge } from "@/components/HoursBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/data/business";
import { eatClock, isToday, whatsappLink, cn } from "@/lib/format";

export function Visit() {
  const today = eatClock();

  return (
    <section id="visit" className="relative border-t border-[var(--line)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Visit us"
          title={
            <>
              Links Road, <span className="text-grad">Nyali</span>
            </>
          }
          proverb={`Currently ${today.clock} in Mombasa · East Africa Time`}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* hours */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="card rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="label text-[var(--accent)]">Opening hours</p>
                  <HoursBadge compact />
                </div>

                <ul className="mt-5 divide-y divide-[var(--line)]">
                  {BUSINESS.hours.map((h) => {
                    const todayRow = isToday(h.day);
                    return (
                      <li
                        key={h.day}
                        className={cn(
                          "flex items-center justify-between gap-4 py-3",
                          todayRow && "text-[var(--fg)]",
                        )}
                      >
                        <span className="flex items-center gap-2.5 text-sm">
                          <Clock
                            size={14}
                            className={
                              todayRow
                                ? "text-[var(--accent)]"
                                : "text-[var(--fg-faint)]"
                            }
                          />
                          <span
                            className={
                              todayRow ? "font-semibold" : "text-[var(--fg-muted)]"
                            }
                          >
                            {h.day}
                          </span>
                          {todayRow ? (
                            <span className="label rounded-full bg-[color-mix(in_srgb,var(--flame)_18%,transparent)] px-2 py-0.5 text-[0.55rem] text-[var(--accent)]">
                              Today
                            </span>
                          ) : null}
                        </span>
                        <span className="tnum text-sm text-[var(--fg-muted)]">
                          {h.open} – {h.close}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-4 text-xs text-[var(--fg-faint)]">
                  Kitchen takes its last order {BUSINESS.kitchenLastOrder}.
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={`tel:${BUSINESS.phone.tel}`}
                    className="btn btn-flame flex-1 px-4 text-[0.8rem]"
                  >
                    <Phone size={15} /> Call
                  </a>
                  <a
                    href={whatsappLink(
                      "Hello Chill & Chew! I'd like to ask about a table / an order.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost flex-1 px-4 text-[0.8rem]"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${BUSINESS.email}`}
                className="lift card flex items-start gap-3 rounded-2xl p-4"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span className="min-w-0">
                  <span className="label block text-[var(--fg-faint)]">Email</span>
                  <span className="mt-1 block break-all text-sm">{BUSINESS.email}</span>
                </span>
              </a>
              <div className="lift card flex items-start gap-3 rounded-2xl p-4">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>
                  <span className="label block text-[var(--fg-faint)]">Address</span>
                  <span className="mt-1 block text-sm leading-snug">
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.line2}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* map */}
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
