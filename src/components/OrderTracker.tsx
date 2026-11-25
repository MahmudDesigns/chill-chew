"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  MessageCircle,
  ArrowRight,
  Clock,
  Bike,
  Package,
  Utensils,
} from "lucide-react";
import {
  readOrder,
  saveOrder,
  ORDER_STATUSES,
  type OrderRecord,
} from "@/lib/cart";
import { formatKES, orderEta, whatsappLink, cn } from "@/lib/format";
import { BUSINESS } from "@/data/business";

const MODE_ICON = { delivery: Bike, pickup: Package, "dine-in": Utensils };

function labelsFor(order: OrderRecord): string[] {
  if (order.mode === "delivery") return [...ORDER_STATUSES];
  if (order.mode === "pickup")
    return ["Received", "Preparing", "Ready", "Ready for pickup"];
  return ["Received", "Preparing", "Ready", "Served"];
}

export function OrderTracker({ number }: { number: string }) {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "missing">("loading");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = readOrder(number);
    if (!found) {
      setPhase("missing");
      return;
    }
    setOrder(found);
    setIndex(found.statusIndex ?? 0);
    setPhase("ready");
  }, [number]);

  useEffect(() => {
    if (phase !== "ready" || !order || index >= 3) return;
    const t = window.setTimeout(() => {
      const next = Math.min(3, index + 1);
      const updated: OrderRecord = { ...order, statusIndex: next };
      setOrder(updated);
      setIndex(next);
      saveOrder(updated);
    }, 7000);
    return () => window.clearTimeout(t);
  }, [phase, order, index]);

  if (phase === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
        <p className="label mt-5 text-[var(--fg-faint)]">Finding your order…</p>
      </div>
    );
  }

  if (phase === "missing" || !order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="label text-[var(--accent)]">Order {number}</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,7vw,4rem)]">
          We can&apos;t find that order
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
          Orders live in this browser only (there&apos;s no backend in this demo).
          Place a new order and the tracker will appear straight away.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/menu" className="btn btn-flame">
            Start an order <ArrowRight size={16} />
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const labels = labelsFor(order);
  const area = DELIVERY_LABEL(order);
  const eta = orderEta(order.mode);
  const ModeIcon = MODE_ICON[order.mode];

  const summary = [
    `Order ${order.number} — ${BUSINESS.name}`,
    `Name: ${order.customer.name}`,
    `Type: ${area}`,
    `Phone: ${order.customer.phone}`,
    "",
    ...order.items.map(
      (l) =>
        `• ${l.qty}× ${l.name}${l.size ? ` (${l.size})` : ""} — KES ${formatKES(l.unitPrice * l.qty)}`,
    ),
    "",
    `Subtotal: KES ${formatKES(order.subtotal)}`,
    order.deliveryFee
      ? `Delivery: KES ${formatKES(order.deliveryFee)}`
      : "Delivery: free",
    `Total: KES ${formatKES(order.total)}`,
    `Payment: ${order.payment.toUpperCase()}`,
    order.customer.notes ? `Notes: ${order.customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(65% 55% at 88% 4%, color-mix(in srgb, var(--flame) 26%, transparent), transparent 68%),
            linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 96%, var(--flame)))`,
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="pindo-soft w-10" aria-hidden />
              <span className="label text-[var(--accent)]">Order confirmed</span>
            </div>
            <h1 className="display mt-4 text-[clamp(2.4rem,7vw,4.4rem)]">
              <span className="text-[var(--fg)]">Karibu,</span>{" "}
              <span className="text-grad">{order.customer.name.split(" ")[0]}</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
              The kitchen has your ticket. Watch it move through the four stages
              below — we&apos;ll be ready in about {eta}.
            </p>
          </div>

          <button
            type="button"
            onClick={copy}
            className="card flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:border-[var(--accent)]"
          >
            <span>
              <span className="label block text-[var(--fg-faint)]">Order number</span>
              <span className="tnum mt-1 block text-sm font-semibold text-[var(--accent)]">
                {order.number}
              </span>
            </span>
            {copied ? <Check size={15} className="text-[var(--accent)]" /> : <Copy size={15} />}
          </button>
        </div>

        {/* stepper */}
        <div className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--bg-2)] p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="label flex items-center gap-2 text-[var(--fg-faint)]">
              <ModeIcon size={14} className="text-[var(--accent)]" /> {area}
            </p>
            <p className="label flex items-center gap-2 text-[var(--accent)]">
              <Clock size={14} /> {eta}
            </p>
          </div>

          {/* progress rail */}
          <div className="relative mt-7 h-1 w-full rounded-full bg-[var(--line)]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--flame) 55%, transparent), var(--flame))",
              }}
              initial={{ width: `${(index / 3) * 100}%` }}
              animate={{ width: `${(index / 3) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>

          <ol className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {labels.map((label, i) => {
              const done = i <= index;
              const current = i === index;
              return (
                <li key={label} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors duration-500",
                      done
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
                        : "border-[var(--line)] text-[var(--fg-faint)]",
                    )}
                  >
                    {done ? <Check size={15} strokeWidth={3} /> : i + 1}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-sm font-semibold leading-tight",
                        done ? "text-[var(--fg)]" : "text-[var(--fg-faint)]",
                      )}
                    >
                      {label}
                    </span>
                    <span className="label mt-1 block text-[0.55rem] text-[var(--fg-faint)]">
                      {current ? "In progress" : done ? "Done" : "Pending"}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex items-center gap-2.5 border-t border-[var(--line)] pt-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <p className="text-xs text-[var(--fg-muted)]">
              {index >= 3
                ? order.mode === "delivery"
                  ? "The rider has left the café — see you shortly."
                  : "All done. Enjoy, and asante for ordering."
                : "Live status · updates automatically every few seconds"}
            </p>
          </div>
        </div>

        {/* details */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="card rounded-3xl p-5 sm:p-6">
            <p className="label text-[var(--accent)]">Order summary</p>
            <ul className="mt-4 space-y-3">
              {order.items.map((l) => (
                <li key={l.key} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="tnum mr-2 text-[var(--accent)]">{l.qty}×</span>
                    <span className="font-medium">{l.name}</span>
                    {l.size || l.addons.length ? (
                      <span className="mt-0.5 block truncate text-xs text-[var(--fg-faint)]">
                        {[l.size, ...l.addons].filter(Boolean).join(" · ")}
                      </span>
                    ) : null}
                  </span>
                  <span className="tnum shrink-0 text-[var(--fg-muted)]">
                    {formatKES(l.unitPrice * l.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-[var(--line)] pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-[var(--fg-muted)]">Subtotal</dt>
                <dd className="tnum">KES {formatKES(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--fg-muted)]">Delivery fee</dt>
                <dd className="tnum">
                  {order.deliveryFee ? `KES ${formatKES(order.deliveryFee)}` : "Free"}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-[var(--line)] pt-3">
                <dt className="label text-[var(--fg-faint)]">Total paid</dt>
                <dd className="tnum text-2xl font-semibold text-[var(--accent)]">
                  <span className="text-xs font-normal text-[var(--fg-faint)]">KES </span>
                  {formatKES(order.total)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="card rounded-3xl p-5 sm:p-6">
            <p className="label text-[var(--accent)]">Details</p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Name", order.customer.name],
                ["Phone", order.customer.phone],
                ["Type", area],
                ["Payment", order.payment === "mpesa" ? "M-Pesa" : order.payment === "cash" ? "Cash" : "Card"],
                ["Placed", new Date(order.createdAt).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })],
                ["Table note", order.customer.table || "—"],
                ["Notes", order.customer.notes || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-[var(--line)] pb-2.5">
                  <dt className="label text-[var(--fg-faint)]">{k}</dt>
                  <dd className="text-right text-[var(--fg)]">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={whatsappLink(summary)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame w-full"
              >
                <MessageCircle size={16} /> Send order via WhatsApp
              </a>
              <Link href="/menu" className="btn btn-ghost w-full">
                Order something else
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {index >= 3 ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center font-script text-2xl text-[var(--accent)]"
            >
              Asante — see you again tomorrow
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function DELIVERY_LABEL(order: OrderRecord): string {
  if (order.mode === "delivery") return `Delivery · ${order.area || "Mombasa"}`;
  if (order.mode === "pickup") return "Pickup · Links Road";
  return "Dine-in · Chill & Chew";
}
