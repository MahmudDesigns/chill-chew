"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { REVIEWS } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/format";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);

  const go = (delta: number) => {
    setDir(delta > 0 ? 1 : -1);
    setIndex((i) => (i + delta + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  const review = REVIEWS[index];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-y border-[var(--line)] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 70% at 85% 20%, color-mix(in srgb, var(--flame) 16%, transparent), transparent 70%), var(--bg-2)`,
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Guest book"
            title={
              <>
                What the coast <span className="text-grad">says</span>
              </>
            }
            proverb="4.9 average · 480+ Google reviews"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] transition-all hover:-translate-x-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] transition-all hover:translate-x-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative mt-10 min-h-[300px] sm:min-h-[260px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, x: reduce ? 0 : dir * 42 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : dir * -42 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid gap-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-8">
                <Quote
                  size={34}
                  className="text-[var(--accent)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="mt-4 text-xl leading-relaxed text-[var(--fg)] sm:text-2xl sm:leading-[1.5]">
                  “{review.text}”
                </p>
              </div>

              <footer className="flex items-start gap-4 lg:col-span-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--flame)_55%,transparent)] bg-[color-mix(in_srgb,var(--flame)_14%,transparent)] font-script text-lg text-[var(--accent)]">
                  {review.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-[var(--fg-muted)]">{review.role}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={
                            i < review.rating
                              ? "fill-[var(--accent)] text-[var(--accent)]"
                              : "text-[var(--fg-faint)]"
                          }
                        />
                      ))}
                    </span>
                    <span className="label text-[var(--fg-faint)]">{review.when}</span>
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Reviews">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Review ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index
                  ? "w-10 bg-[var(--accent)]"
                  : "w-5 bg-[var(--line)] hover:bg-[color-mix(in_srgb,var(--flame)_50%,transparent)]",
              )}
            />
          ))}
          <span className="label ml-auto text-[var(--fg-faint)]">
            {paused ? "Paused" : "Autoplay"} · {String(index + 1).padStart(2, "0")}/
            {String(REVIEWS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
