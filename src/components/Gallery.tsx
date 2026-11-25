"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  GALLERY,
  GALLERY_FILTERS,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/format";

function Frame({
  item,
  onOpen,
  className,
}: {
  item: GalleryItem;
  onOpen: () => void;
  className?: string;
}) {
  const [src, setSrc] = useState(item.src);
  const [broken, setBroken] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border border-[var(--line)]",
        className,
      )}
      aria-label={`Open photo: ${item.caption}`}
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
        {broken ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(140deg, color-mix(in srgb, var(--flame) 30%, var(--ink)), var(--ink) 70%)",
            }}
          />
        ) : (
          <Image
            src={src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            onError={() => {
              if (item.fallback && src !== item.fallback) setSrc(item.fallback);
              else setBroken(true);
            }}
          />
        )}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,138,7,0.12) 0%, rgba(26,26,26,0.05) 40%, rgba(26,26,26,0.8) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="label text-[color-mix(in_srgb,var(--flame)_85%,var(--paper))]">
            {item.category}
          </p>
          <p className="mt-1 text-sm font-medium text-white">{item.caption}</p>
        </div>
      </div>
    </button>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [index, setIndex] = useState<number | null>(null);

  const items =
    filter === "all" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("hide-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("hide-scroll");
    };
  }, [index, close, next, prev]);

  const active = index === null ? null : items[index];

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The gallery"
            title={
              <>
                Steam, plates <span className="text-grad">&amp; light</span>
              </>
            }
            proverb="Picha za Chill & Chew — shot on Links Road"
          />
          <Reveal>
            <div className="no-bar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFilter(f.id);
                    setIndex(null);
                  }}
                  aria-pressed={filter === f.id}
                  className={cn(
                    "label shrink-0 rounded-full border px-4 py-2.5 transition-all duration-300",
                    filter === f.id
                      ? "border-transparent bg-[var(--accent)] text-[var(--ink)]"
                      : "border-[var(--line)] text-[var(--fg-muted)] hover:border-[color-mix(in_srgb,var(--flame)_55%,transparent)]",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.24) }}
                className={cn(i === 0 && "sm:col-span-2 lg:col-span-2")}
              >
                <Frame
                  item={item}
                  onOpen={() => setIndex(i)}
                  className={cn(i === 0 && "h-full")}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------------- lightbox ---------------- */}
      <AnimatePresence>
        {active && index !== null ? (
          <motion.div
            className="fixed inset-0 z-[92] flex flex-col items-center justify-center bg-[color-mix(in_srgb,var(--ink)_94%,transparent)] px-4 py-16 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            onClick={close}
            onTouchStart={(e) => {
              const x = e.touches[0]?.clientX ?? 0;
              (e.currentTarget as HTMLElement & { _x?: number })._x = x;
            }}
            onTouchEnd={(e) => {
              const host = e.currentTarget as HTMLElement & { _x?: number };
              const start = host._x ?? 0;
              const end = e.changedTouches[0]?.clientX ?? 0;
              const delta = end - start;
              if (Math.abs(delta) > 55) (delta < 0 ? next : prev)();
            }}
          >
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32 }}
              className="relative max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="mx-auto max-h-[70vh] w-auto rounded-2xl object-contain"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (active.fallback && el.src !== active.fallback) {
                    el.src = active.fallback;
                  }
                }}
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="label text-[var(--accent)]">{active.category}</p>
                  <p className="mt-1 text-sm text-[var(--fg)]">{active.caption}</p>
                </div>
                <p className="tnum label text-[var(--fg-faint)]">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
              </figcaption>
            </motion.figure>

            <div
              className="mt-6 flex items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <X size={18} />
              </button>
            </div>
            <p className="label mt-4 hidden text-[var(--fg-faint)] sm:block">
              ← → to navigate · Esc to close · swipe on mobile
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
