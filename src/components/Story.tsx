"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { STORY } from "@/data/content";
import { BUSINESS } from "@/data/business";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, reduce ? 0 : 40]);

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" ref={ref}>
            <motion.div style={{ y }} className="relative">
              <div className="frame overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[29px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/interior.jpg"
                    alt="Inside the Chill & Chew café at golden hour"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(200deg, rgba(245,138,7,0.16) 0%, rgba(26,26,26,0) 45%, rgba(26,26,26,0.6) 100%)",
                    }}
                  />
                </div>
              </div>

              <div className="absolute -bottom-7 right-2 w-44 rounded-2xl border border-[color-mix(in_srgb,var(--flame)_45%,transparent)] bg-[var(--bg)] p-4 shadow-[0_28px_60px_-34px_rgba(0,0,0,0.9)] sm:right-6">
                <p className="label text-[var(--accent)]">Since</p>
                <p className="tnum mt-1 text-3xl font-semibold">
                  {BUSINESS.foundingYear}
                </p>
                <p className="mt-1 text-xs leading-snug text-[var(--fg-muted)]">
                  One machine, one counter, one very stubborn standard.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={STORY.eyebrow}
              title={
                <>
                  A coastal café that
                  <br />
                  <span className="text-grad">tastes like Mombasa</span>
                </>
              }
              proverb={STORY.proverb}
            />

            <div className="mt-7 max-w-2xl space-y-4 text-[15px] leading-relaxed text-[var(--fg-muted)] sm:text-base">
              {STORY.body.map((p) => (
                <Reveal key={p.slice(0, 24)}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {STORY.stats.map((s) => (
                <div key={s.label} className="border-t border-[var(--line)] pt-4">
                  <p className="tnum text-3xl font-semibold text-[var(--accent)] sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="label mt-2 text-[0.62rem] text-[var(--fg-faint)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-flame">
                See the full menu <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Find us
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
