"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Plus, X, SlidersHorizontal } from "lucide-react";
import {
  CATEGORIES,
  DIET_FILTERS,
  MENU,
  type Category,
  type Diet,
  type MenuItem,
} from "@/data/menu";
import { formatKES, cn } from "@/lib/format";
import { ItemModal } from "@/components/ItemModal";
import { Reveal } from "@/components/Reveal";

const DIET_SHORT: Record<Diet, string> = {
  vegetarian: "Veg",
  halal: "Halal",
  spicy: "Spicy",
};

export function MenuBoard({ items = MENU }: { items?: MenuItem[] }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [diets, setDiets] = useState<Diet[]>([]);
  const [active, setActive] = useState<MenuItem | null>(null);
  const [preview, setPreview] = useState<MenuItem | null>(
    items.find((i) => i.popular) ?? items[0] ?? null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (diets.length && !diets.every((d) => m.diets.includes(d))) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    });
  }, [items, category, diets, query]);

  const toggleDiet = (d: Diet) =>
    setDiets((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const reset = () => {
    setCategory("all");
    setQuery("");
    setDiets([]);
  };

  const shown = preview && filtered.some((f) => f.id === preview.id) ? preview : filtered[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ---------------- controls ---------------- */}
      <div className="lg:col-span-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-faint)]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search biryani, latte, mandazi…"
                aria-label="Search the menu"
                className="field pl-11"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-faint)] hover:text-[var(--accent)]"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {DIET_FILTERS.map((d) => {
                const on = diets.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDiet(d.id)}
                    aria-pressed={on}
                    className={cn(
                      "label rounded-full border px-3.5 py-2.5 transition-all duration-300",
                      on
                        ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_16%,transparent)] text-[var(--accent)]"
                        : "border-[var(--line)] text-[var(--fg-muted)] hover:border-[color-mix(in_srgb,var(--flame)_50%,transparent)]",
                    )}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* category tabs */}
          <div className="no-bar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "label shrink-0 rounded-full border px-4 py-2.5 transition-all duration-300",
                category === "all"
                  ? "border-transparent bg-[var(--fg)] text-[var(--bg)]"
                  : "border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
              )}
            >
              Everything
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "label shrink-0 rounded-full border px-4 py-2.5 transition-all duration-300",
                  category === c.id
                    ? "border-transparent bg-[var(--fg)] text-[var(--bg)]"
                    : "border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
            <p className="label text-[var(--fg-faint)]">
              <SlidersHorizontal size={12} className="mr-2 inline align-[-1px]" />
              {filtered.length} of {items.length} items
              {category !== "all"
                ? ` · ${CATEGORIES.find((c) => c.id === category)?.note ?? ""}`
                : ""}
            </p>
            {query || diets.length || category !== "all" ? (
              <button
                type="button"
                onClick={reset}
                className="label text-[var(--accent)] underline-grow"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* ---------------- list ---------------- */}
      <div className="min-w-0 lg:col-span-7 xl:col-span-8">
        {filtered.length === 0 ? (
          <div className="card rounded-2xl px-6 py-14 text-center">
            <p className="font-script text-2xl">Nothing matches that</p>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              Try “chai”, clear the filters, or order the biryani — everyone does.
            </p>
            <button type="button" onClick={reset} className="btn btn-ghost mt-5">
              Reset the board
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--line)]">
            {filtered.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                onMouseEnter={() => setPreview(item)}
                onFocus={() => setPreview(item)}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--flame)_5%,transparent)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-xl object-cover lg:hidden"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-base font-semibold transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-lg">
                        {item.name}
                      </span>
                      {item.popular ? (
                        <span className="label rounded-full bg-[color-mix(in_srgb,var(--flame)_18%,transparent)] px-2 py-0.5 text-[0.58rem] text-[var(--accent)]">
                          Popular
                        </span>
                      ) : null}
                      <span className="leader hidden sm:block" aria-hidden />
                      <span className="tnum shrink-0 text-base font-semibold text-[var(--accent)] sm:text-lg">
                        {formatKES(item.price)}
                      </span>
                    </span>

                    <span className="mt-1 block text-sm text-[var(--fg-muted)]">
                      {item.tagline}
                    </span>

                    <span className="mt-2 flex flex-wrap items-center gap-1.5">
                      {item.diets.map((d) => (
                        <span
                          key={d}
                          className="label rounded border border-[var(--line)] px-1.5 py-0.5 text-[0.55rem] text-[var(--fg-faint)]"
                        >
                          {DIET_SHORT[d]}
                        </span>
                      ))}
                      {item.spec ? (
                        <span className="label text-[0.55rem] text-[var(--fg-faint)]">
                          {item.spec}
                        </span>
                      ) : null}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--fg-muted)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--ink)] sm:grid"
                  >
                    <Plus size={15} />
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* ---------------- sticky preview ---------------- */}
      <aside className="hidden lg:col-span-5 lg:block xl:col-span-4">
        <div className="sticky top-28">
          <AnimatePresence mode="wait">
            {shown ? (
              <motion.div
                key={shown.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="frame overflow-hidden rounded-3xl"
              >
                <div className="relative">
                  <div className="relative h-72 overflow-hidden rounded-t-[23px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shown.image}
                      alt={shown.name}
                      className="h-full w-full object-cover transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(26,26,26,0) 40%, rgba(26,26,26,0.72) 100%)",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="label text-[color-mix(in_srgb,var(--flame)_85%,var(--paper))]">
                      {shown.spec ?? CATEGORIES.find((c) => c.id === shown.category)?.label}
                    </p>
                    <p className="font-script mt-1 text-2xl text-white">{shown.name}</p>
                  </div>
                </div>
                <div className="bg-[var(--bg)] p-5">
                  <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                    {shown.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="tnum text-2xl font-semibold text-[var(--accent)]">
                      <span className="text-xs font-normal text-[var(--fg-faint)]">KES </span>
                      {formatKES(shown.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActive(shown)}
                      className="btn btn-flame px-5 py-2.5 text-[0.8rem]"
                    >
                      Add to order
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </aside>

      <ItemModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}

/* --------------------------- home preview grid --------------------------- */
export function FeaturedMenu() {
  const [active, setActive] = useState<MenuItem | null>(null);
  /* deliberately curated across all six categories */
  const featured = [
    "latte",
    "kenya-aa",
    "mandazi-chai-set",
    "swahili-biryani",
    "passion-juice",
    "coconut-cake",
  ]
    .map((id) => MENU.find((m) => m.id === id))
    .filter((m): m is MenuItem => Boolean(m));

  return (
    <>
      <Reveal>
        <ul className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {featured.map((item, i) => (
            <li key={item.id} className="group border-b border-[var(--line)]">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="flex w-full items-start gap-4 py-5 text-left"
              >
                <span className="tnum label mt-1.5 w-6 shrink-0 text-[var(--fg-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-3">
                    <span className="text-base font-semibold transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-lg">
                      {item.name}
                    </span>
                    <span className="leader" aria-hidden />
                    <span className="tnum shrink-0 font-semibold text-[var(--accent)]">
                      {formatKES(item.price)}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-[var(--fg-muted)]">
                    {item.tagline}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
      <ItemModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
