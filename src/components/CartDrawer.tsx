"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useOrderNotes } from "@/lib/notes";
import { formatKES, cn } from "@/lib/format";
import { Monogram } from "@/components/Brand";
import { BUSINESS } from "@/data/business";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, removeLine, subtotal, count } = useCart();
  const [notes, setNotes] = useOrderNotes();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("hide-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("hide-scroll");
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Your order">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_70%,transparent)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-[var(--line)] bg-[var(--bg)] sm:max-w-[440px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
              <div>
                <p className="label text-[var(--accent)]">Your order</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  {count} item{count === 1 ? "" : "s"} · KES
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="text-[var(--fg-faint)]">
                    <Monogram className="h-16 w-16" />
                  </span>
                  <p className="mt-5 font-script text-2xl">Nothing brewing yet</p>
                  <p className="mt-2 max-w-[16rem] text-sm text-[var(--fg-muted)]">
                    Add a latte, a plate of biryani, or three mandazi. We&apos;ll keep it warm.
                  </p>
                  <Link href="/menu" onClick={() => setOpen(false)} className="btn btn-flame mt-6">
                    Browse the menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="card flex gap-3 rounded-xl p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={line.image}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-sm font-semibold">{line.name}</p>
                              <button
                                type="button"
                                onClick={() => removeLine(line.key)}
                                aria-label={`Remove ${line.name}`}
                                className="shrink-0 text-[var(--fg-faint)] transition-colors hover:text-[var(--accent)]"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            {(line.size || line.addons.length > 0) && (
                              <p className="mt-0.5 truncate text-xs text-[var(--fg-faint)]">
                                {[line.size, ...line.addons].filter(Boolean).join(" · ")}
                              </p>
                            )}
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1 rounded-full border border-[var(--line)]">
                                <button
                                  type="button"
                                  onClick={() => setQty(line.key, line.qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:text-[var(--accent)]"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="tnum w-5 text-center text-sm font-semibold">
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQty(line.key, line.qty + 1)}
                                  aria-label="Increase quantity"
                                  className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:text-[var(--accent)]"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <span className="tnum text-sm font-semibold text-[var(--accent)]">
                                {formatKES(line.unitPrice * line.qty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <div className="border-t border-[var(--line)] px-5 py-4">
                <label className="label block text-[var(--fg-faint)]" htmlFor="cart-notes">
                  Order notes
                </label>
                <textarea
                  id="cart-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="No chilli, extra lime, ring the bell…"
                  className="field mt-2 resize-none text-sm"
                />

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="label text-[var(--fg-faint)]">Subtotal</p>
                    <p className="tnum mt-1 text-2xl font-semibold">
                      <span className="text-sm font-normal text-[var(--fg-muted)]">KES </span>
                      {formatKES(subtotal)}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--fg-faint)]">
                    Fees calculated at checkout
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className={cn("btn btn-ghost flex-1 px-4")}
                  >
                    Keep browsing
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="btn btn-flame flex-[1.4]"
                  >
                    Checkout <ArrowRight size={15} />
                  </Link>
                </div>

                <p className="mt-3 text-center text-[0.7rem] text-[var(--fg-faint)]">
                  M-Pesa · Cash · Card — {BUSINESS.city} only
                </p>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function CartFab() {
  const { count, setOpen } = useCart();
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="btn btn-flame fixed bottom-5 right-5 z-[60] shadow-2xl sm:hidden"
      aria-label={`Open cart, ${count} items`}
    >
      <ShoppingBag size={16} /> {count}
    </button>
  );
}
