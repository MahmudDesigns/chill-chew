"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Wifi, Leaf, Smartphone } from "lucide-react";
import { HoursBadge } from "@/components/HoursBadge";
import { BUSINESS } from "@/data/business";

const CHIPS = [
  { icon: Wifi, label: "Free fibre wifi" },
  { icon: Leaf, label: "Halal kitchen" },
  { icon: Smartphone, label: "M-Pesa accepted" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  /* the client's own /images/cup.png first, generated cup as fallback */
  const [src, setSrc] = useState("/images/cup.png");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-[var(--line)]"
      aria-label="Welcome to Chill & Chew"
    >
      {/* layered warm glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(72% 58% at 88% 8%, color-mix(in srgb, var(--flame) 34%, transparent) 0%, transparent 62%),
            radial-gradient(58% 46% at 4% 96%, color-mix(in srgb, var(--flame) 20%, transparent) 0%, transparent 66%),
            linear-gradient(180deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 94%, var(--flame)) 100%)`,
        }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-24 lg:pt-16">
        {/* ---------------- copy ---------------- */}
        <div className="lg:col-span-7 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-3"
          >
            <span className="pindo-soft w-10" aria-hidden />
            <span className="label text-[var(--accent)]">
              {BUSINESS.est} · {BUSINESS.city} coastal café
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="display mt-5 text-[clamp(3.6rem,13vw,8.5rem)]"
          >
            <span className="block text-[var(--fg)]">Chill</span>
            <span className="block pl-[0.12em] text-grad">&amp; Chew</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg"
          >
            Specialty Kenyan coffee, latte art worth photographing, and Swahili
            plates made to order — on Links Road, ten minutes from the ocean.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.68, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/menu" className="btn btn-flame">
              Order now <ArrowRight size={16} />
            </Link>
            <Link href="/reservations" className="btn btn-ghost">
              Reserve a table
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.85 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <HoursBadge />
            <span className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[var(--accent)] text-[var(--accent)]"
                />
              ))}
              <strong className="tnum font-semibold text-[var(--fg)]">4.9</strong>
              <span className="text-[var(--fg-faint)]">· 480+ reviews</span>
            </span>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
          >
            {CHIPS.map((c) => (
              <li
                key={c.label}
                className="label flex items-center gap-2 text-[var(--fg-faint)]"
              >
                <c.icon size={14} className="text-[var(--accent)]" />
                {c.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------------- cup ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.45, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative lg:col-span-5"
        >
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--flame) 40%, transparent), transparent 68%)",
            }}
            aria-hidden
          />

          <motion.div style={{ y, scale }} className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-[var(--line)] lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Latte art in a white cup at Chill & Chew"
                onError={() => {
                  if (src !== "/images/hero-cup.jpg") setSrc("/images/hero-cup.jpg");
                }}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,26,26,0.05) 0%, rgba(26,26,26,0.18) 55%, rgba(26,26,26,0.78) 100%)",
                }}
              />

              {/* steam rising off the cup */}
              <div
                className="absolute left-1/2 top-[34%] h-0 w-0 -translate-x-1/2"
                aria-hidden
              >
                <span className="steam-wisp left-[-30px]" style={{ animationDelay: "0s" }} />
                <span className="steam-wisp left-[0px]" style={{ animationDelay: "1.4s" }} />
                <span className="steam-wisp left-[30px]" style={{ animationDelay: "2.6s" }} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="label text-[color-mix(in_srgb,var(--flame)_85%,var(--paper))]">
                  Signature · Flat white
                </p>
                <p className="font-script mt-1.5 text-2xl text-white">
                  Poured by hand, every time
                </p>
              </div>
            </div>

            {/* floating price ticket */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.05 }}
              className="absolute -bottom-6 left-0 rounded-2xl border border-[color-mix(in_srgb,var(--flame)_45%,transparent)] bg-[var(--bg)] px-4 py-3 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] sm:left-4"
            >
              <p className="label text-[var(--fg-faint)]">Kenyan AA pour-over</p>
              <p className="tnum mt-1 text-xl font-semibold text-[var(--accent)]">
                KES 450
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 pb-5 sm:px-6 lg:px-10">
        <span className="label text-[var(--fg-faint)]">
          Scroll — the board is below
        </span>
        <span className="label hidden text-[var(--fg-faint)] sm:block">
          {BUSINESS.address.line1}
        </span>
      </div>
    </section>
  );
}
