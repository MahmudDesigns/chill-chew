"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Check } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { formatKES, cn } from "@/lib/format";
import { useCart } from "@/lib/cart";

const DIET_LABEL: Record<string, string> = {
  vegetarian: "Vegetarian",
  halal: "Halal",
  spicy: "Spicy",
};

export function ItemModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { addLine } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const sizes = item?.sizes ?? [];
  const size = sizes[sizeIdx];

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    const base = item.price + (size?.delta ?? 0);
    const extra = (item.addons ?? [])
      .filter((a) => addons.includes(a.label))
      .reduce((s, a) => s + a.price, 0);
    return base + extra;
  }, [item, size, addons]);

  useEffect(() => {
    setSizeIdx(0);
    setAddons([]);
    setQty(1);
    setAdded(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("hide-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("hide-scroll");
    };
  }, [item, onClose]);

  const toggleAddon = (label: string) =>
    setAddons((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label],
    );

  const submit = () => {
    if (!item) return;
    addLine(
      {
        itemId: item.id,
        name: item.name,
        image: item.image,
        size: size ? `${size.label}` : null,
        addons,
        unitPrice,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
    }, 750);
  };

  return (
    <AnimatePresence>
      {item ? (
        <div
          className="fixed inset-0 z-[88] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          <motion.button
            type="button"
            aria-label="Close item details"
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_72%,transparent)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-[var(--line)] bg-[var(--bg)] sm:max-w-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="relative h-52 w-full overflow-hidden sm:h-64">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.55) 55%, var(--bg) 100%)",
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[color-mix(in_srgb,var(--ink)_75%,transparent)] text-white backdrop-blur transition-transform hover:scale-105"
              >
                <X size={18} />
              </button>
              {item.spec ? (
                <span className="label absolute bottom-4 left-5 text-[color-mix(in_srgb,var(--flame)_85%,var(--paper))]">
                  {item.spec}
                </span>
              ) : null}
            </div>

            <div className="px-5 pb-6 pt-4 sm:px-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-script text-3xl leading-tight">{item.name}</h2>
                  <p className="mt-1 text-sm italic text-[var(--fg-muted)]">
                    {item.tagline}
                  </p>
                </div>
                <p className="tnum shrink-0 text-2xl font-semibold text-[var(--accent)]">
                  <span className="text-xs font-normal text-[var(--fg-faint)]">KES </span>
                  {formatKES(item.price)}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.diets.map((d) => (
                  <span
                    key={d}
                    className="label rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.62rem] text-[var(--fg-muted)]"
                  >
                    {DIET_LABEL[d]}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
                {item.description}
              </p>

              {sizes.length > 0 ? (
                <div className="mt-6">
                  <p className="label text-[var(--fg-faint)]">Choose a size</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSizeIdx(i)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                          i === sizeIdx
                            ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_16%,transparent)] text-[var(--accent)]"
                            : "border-[var(--line)] text-[var(--fg-muted)] hover:border-[color-mix(in_srgb,var(--flame)_50%,transparent)]",
                        )}
                      >
                        {s.label}
                        {s.delta !== 0 ? (
                          <span className="tnum ml-1.5 text-xs opacity-80">
                            {s.delta > 0 ? "+" : "−"}
                            {formatKES(Math.abs(s.delta))}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {item.addons && item.addons.length > 0 ? (
                <div className="mt-6">
                  <p className="label text-[var(--fg-faint)]">Add-ons</p>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {item.addons.map((a) => {
                      const on = addons.includes(a.label);
                      return (
                        <button
                          key={a.label}
                          type="button"
                          onClick={() => toggleAddon(a.label)}
                          aria-pressed={on}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all duration-300",
                            on
                              ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)]"
                              : "border-[var(--line)] hover:border-[color-mix(in_srgb,var(--flame)_45%,transparent)]",
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "grid h-4.5 w-4.5 place-items-center rounded border",
                                on
                                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
                                  : "border-[var(--line)]",
                              )}
                            >
                              {on ? <Check size={11} strokeWidth={4} /> : null}
                            </span>
                            {a.label}
                          </span>
                          <span className="tnum text-xs text-[var(--fg-muted)]">
                            +{formatKES(a.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-1 rounded-full border border-[var(--line)] px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-[var(--accent)]"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="tnum w-7 text-center font-semibold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(30, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-[var(--accent)]"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={submit}
                  className="btn btn-flame flex-1"
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <Check size={16} strokeWidth={3} /> Added to order
                    </>
                  ) : (
                    <>
                      Add · {formatKES(unitPrice * qty)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
