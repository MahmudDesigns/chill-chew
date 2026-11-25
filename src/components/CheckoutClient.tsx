"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Utensils,
  Package,
  Bike,
  Smartphone,
  CreditCard,
  Banknote,
  Check,
  Loader2,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  Lock,
} from "lucide-react";
import { useCart, saveOrder, type OrderRecord, type PaymentMethod } from "@/lib/cart";
import { useOrderNotes } from "@/lib/notes";
import {
  DELIVERY_AREAS,
  SERVICE_MODES,
  BUSINESS,
  type ServiceMode,
} from "@/data/business";
import {
  checkKenyanPhone,
  formatKES,
  isEmail,
  makeOrderNumber,
  orderEta,
  whatsappLink,
  cn,
} from "@/lib/format";

type Stage = "idle" | "sending" | "pin" | "authorising" | "confirming" | "done";

const MODE_ICON: Record<ServiceMode, typeof Utensils> = {
  "dine-in": Utensils,
  pickup: Package,
  delivery: Bike,
};

const PAYMENTS: { id: PaymentMethod; label: string; note: string; icon: typeof Utensils }[] = [
  { id: "mpesa", label: "M-Pesa", note: "Prompt sent to your phone", icon: Smartphone },
  { id: "cash", label: "Cash", note: "Pay on delivery or at the counter", icon: Banknote },
  { id: "card", label: "Card", note: "Visa / Mastercard (simulated)", icon: CreditCard },
];

const sleep = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

export function CheckoutClient() {
  const router = useRouter();
  const { lines, subtotal, count, clear, hydrated } = useCart();
  const [notes, setNotes] = useOrderNotes();

  const [mode, setMode] = useState<ServiceMode>("delivery");
  const [area, setArea] = useState(DELIVERY_AREAS[2].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [table, setTable] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("mpesa");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("idle");

  const alive = useRef(true);
  useEffect(() => () => {
    alive.current = false;
  }, []);

  const areaObj = DELIVERY_AREAS.find((a) => a.id === area);
  const deliveryFee = mode === "delivery" ? (areaObj?.fee ?? 0) : 0;
  const total = subtotal + deliveryFee;
  const eta = orderEta(mode, areaObj?.eta);

  const whatsappSummary = () => {
    const items = lines
      .map((l) => `• ${l.qty}× ${l.name}${l.size ? ` (${l.size})` : ""} — KES ${formatKES(l.unitPrice * l.qty)}`)
      .join("\n");
    return [
      `Order — ${BUSINESS.name}`,
      `Name: ${name || "—"}`,
      `Type: ${SERVICE_MODES.find((m) => m.id === mode)?.label}${
        mode === "delivery" && areaObj ? ` — ${areaObj.label}` : ""
      }`,
      `Phone: ${phone || "—"}`,
      "",
      items,
      "",
      `Subtotal: KES ${formatKES(subtotal)}`,
      deliveryFee ? `Delivery: KES ${formatKES(deliveryFee)}` : "Delivery: free",
      `Total: KES ${formatKES(total)}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (count === 0) e.cart = "Your cart is empty";
    if (name.trim().length < 2) e.name = "Please enter your full name";
    const p = checkKenyanPhone(phone);
    if (!p.valid) e.phone = p.error ?? "Invalid phone number";
    if (email && !isEmail(email)) e.email = "That email doesn't look right";
    if (mode === "delivery" && !area) e.area = "Choose a delivery area";
    if (payment === "mpesa" && !p.valid) e.phone = "M-Pesa needs a valid Kenyan number";
    if (payment === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (digits.length < 16 || !/^\d+$/.test(digits))
        e.cardNumber = "Enter a 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Use MM/YY";
      if (!/^\d{3}$/.test(card.cvv)) e.cvv = "3 digits";
    }
    return e;
  };

  const runPayment = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      if (payment === "mpesa") {
        setStage("sending");
        await sleep(1500);
        if (!alive.current) return;
        setStage("pin");
        await sleep(3600);
      } else if (payment === "card") {
        setStage("authorising");
        await sleep(2400);
      } else {
        setStage("confirming");
        await sleep(1400);
      }
      if (!alive.current) return;
      setStage("done");
      await sleep(1100);
      if (!alive.current) return;

      const order: OrderRecord = {
        number: makeOrderNumber(),
        createdAt: new Date().toISOString(),
        mode,
        area:
          mode === "delivery"
            ? areaObj?.label ?? ""
            : mode === "pickup"
              ? "Pickup — Links Road"
              : "Dine-in — Chill & Chew",
        deliveryFee,
        payment,
        customer: { name: name.trim(), phone, email: email.trim(), notes, table, area },
        items: lines,
        subtotal,
        total,
        statusIndex: 0,
      };
      saveOrder(order);
      clear();
      setNotes("");
      router.push(`/order/${order.number}`);
    } catch {
      if (alive.current) setStage("idle");
    }
  };

  /* --------------------------- hydrating state --------------------------- */
  if (!hydrated) {
    return (
      <div className="card rounded-3xl px-6 py-24 text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
        <p className="label mt-5 text-[var(--fg-faint)]">Loading your order…</p>
      </div>
    );
  }

  /* ----------------------------- empty cart ----------------------------- */
  if (count === 0 && stage === "idle") {
    return (
      <div className="card rounded-3xl px-6 py-16 text-center">
        <ShoppingBag size={34} className="mx-auto text-[var(--accent)]" />
        <h2 className="font-script mt-4 text-3xl">Nothing to check out yet</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--fg-muted)]">
          Add a latte and a plate of biryani and we&apos;ll get the kitchen moving.
        </p>
        <Link href="/menu" className="btn btn-flame mt-6">
          Browse the menu <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ------------------------------ form ------------------------------ */}
      <div className="space-y-8 lg:col-span-7">
        {/* service mode */}
        <section className="card rounded-3xl p-5 sm:p-7">
          <p className="label text-[var(--accent)]">1 · How would you like it?</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SERVICE_MODES.map((m) => {
              const Icon = MODE_ICON[m.id];
              const on = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-300",
                    on
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)]"
                      : "border-[var(--line)] hover:border-[color-mix(in_srgb,var(--flame)_45%,transparent)]",
                  )}
                >
                  <Icon
                    size={19}
                    className={on ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"}
                  />
                  <p className="mt-3 text-sm font-semibold">{m.label}</p>
                  <p className="mt-1 text-xs text-[var(--fg-faint)]">{m.note}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {mode === "delivery" ? (
              <motion.div
                key="areas"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="mt-5 border-t border-[var(--line)] pt-5">
                  <p className="label text-[var(--fg-faint)]">Delivery area</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {DELIVERY_AREAS.map((a) => {
                      const on = area === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setArea(a.id)}
                          aria-pressed={on}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-sm transition-all duration-300",
                            on
                              ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)] text-[var(--fg)]"
                              : "border-[var(--line)] text-[var(--fg-muted)]",
                          )}
                        >
                          <span>{a.label}</span>
                          <span className="tnum text-xs text-[var(--accent)]">
                            {formatKES(a.fee)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-[var(--fg-faint)]">
                    Estimated {areaObj?.eta} from the {BUSINESS.address.line1} kitchen.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        {/* details */}
        <section className="card rounded-3xl p-5 sm:p-7">
          <p className="label text-[var(--accent)]">2 · Your details</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="label mb-2 block text-[var(--fg-faint)]">Full name</span>
              <input
                className={cn("field", errors.name && "field-err")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((x) => ({ ...x, name: "" }));
                }}
                placeholder="Amina Mwangi"
                autoComplete="name"
              />
              {errors.name ? <Err msg={errors.name} /> : null}
            </label>

            <label className="block">
              <span className="label mb-2 block text-[var(--fg-faint)]">
                Phone (+254)
              </span>
              <input
                className={cn("field", errors.phone && "field-err")}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((x) => ({ ...x, phone: "" }));
                }}
                placeholder="+254 712 345 678"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.phone ? <Err msg={errors.phone} /> : null}
            </label>

            <label className="block">
              <span className="label mb-2 block text-[var(--fg-faint)]">
                Email (optional)
              </span>
              <input
                className={cn("field", errors.email && "field-err")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((x) => ({ ...x, email: "" }));
                }}
                placeholder="you@example.com"
                inputMode="email"
                autoComplete="email"
              />
              {errors.email ? <Err msg={errors.email} /> : null}
            </label>

            {mode === "dine-in" ? (
              <label className="block">
                <span className="label mb-2 block text-[var(--fg-faint)]">
                  Table / sitting note
                </span>
                <input
                  className="field"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  placeholder="e.g. Terrace, table 4"
                />
              </label>
            ) : (
              <label className="block">
                <span className="label mb-2 block text-[var(--fg-faint)]">
                  Order notes
                </span>
                <input
                  className="field"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="No chilli, extra lime…"
                />
              </label>
            )}

            <label className="block sm:col-span-2">
              <span className="label mb-2 block text-[var(--fg-faint)]">
                Order notes
              </span>
              <textarea
                rows={3}
                className="field resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Allergies, timing, parking instructions…"
              />
            </label>
          </div>
        </section>

        {/* payment */}
        <section className="card rounded-3xl p-5 sm:p-7">
          <p className="label text-[var(--accent)]">3 · Payment</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {PAYMENTS.map((p) => {
              const on = payment === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPayment(p.id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all duration-300",
                    on
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_12%,transparent)]"
                      : "border-[var(--line)] hover:border-[color-mix(in_srgb,var(--flame)_45%,transparent)]",
                  )}
                >
                  <Icon
                    size={19}
                    className={on ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"}
                  />
                  <p className="mt-3 text-sm font-semibold">{p.label}</p>
                  <p className="mt-1 text-xs text-[var(--fg-faint)]">{p.note}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {payment === "mpesa" ? (
              <motion.p
                key="mpesa-note"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden text-xs leading-relaxed text-[var(--fg-muted)]"
              >
                You&apos;ll receive an M-Pesa prompt on {phone || "your phone"}.
                Enter your PIN to approve <strong>KES {formatKES(total)}</strong>.
                This demo simulates the flow — no real payment is taken.
              </motion.p>
            ) : null}

            {payment === "card" ? (
              <motion.div
                key="card-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block sm:col-span-3">
                    <span className="label mb-2 block text-[var(--fg-faint)]">
                      Card number
                    </span>
                    <input
                      className={cn("field tnum", errors.cardNumber && "field-err")}
                      value={card.number}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        setCard({
                          ...card,
                          number: digits.replace(/(\d{4})(?=\d)/g, "$1 "),
                        });
                        setErrors((x) => ({ ...x, cardNumber: "" }));
                      }}
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                    />
                    {errors.cardNumber ? <Err msg={errors.cardNumber} /> : null}
                  </label>
                  <label className="block">
                    <span className="label mb-2 block text-[var(--fg-faint)]">Expiry</span>
                    <input
                      className={cn("field tnum", errors.expiry && "field-err")}
                      value={card.expiry}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setCard({
                          ...card,
                          expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
                        });
                        setErrors((x) => ({ ...x, expiry: "" }));
                      }}
                      placeholder="MM/YY"
                      inputMode="numeric"
                    />
                    {errors.expiry ? <Err msg={errors.expiry} /> : null}
                  </label>
                  <label className="block">
                    <span className="label mb-2 block text-[var(--fg-faint)]">CVV</span>
                    <input
                      className={cn("field tnum", errors.cvv && "field-err")}
                      value={card.cvv}
                      onChange={(e) => {
                        setCard({
                          ...card,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        });
                        setErrors((x) => ({ ...x, cvv: "" }));
                      }}
                      placeholder="123"
                      inputMode="numeric"
                    />
                    {errors.cvv ? <Err msg={errors.cvv} /> : null}
                  </label>
                  <p className="flex items-center gap-2 text-xs text-[var(--fg-faint)] sm:col-span-3">
                    <Lock size={13} className="text-[var(--accent)]" />
                    Simulated checkout — no card data leaves your browser.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </div>

      {/* ------------------------------ summary ------------------------------ */}
      <aside className="lg:col-span-5">
        <div className="sticky top-28 space-y-4">
          <div className="frame overflow-hidden rounded-3xl">
            <div className="rounded-[23px] bg-[var(--bg)] p-5 sm:p-6">
              <div className="flex items-baseline justify-between">
                <p className="label text-[var(--accent)]">Your order</p>
                <Link href="/menu" className="label text-[var(--fg-faint)] underline-grow">
                  Edit
                </Link>
              </div>

              <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
                {lines.map((l) => (
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
                  <dd className="tnum">KES {formatKES(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--fg-muted)]">
                    {mode === "delivery"
                      ? `Delivery · ${areaObj?.label ?? ""}`
                      : mode === "pickup"
                        ? "Pickup"
                        : "Dine-in"}
                  </dt>
                  <dd className="tnum">
                    {deliveryFee ? `KES ${formatKES(deliveryFee)}` : "Free"}
                  </dd>
                </div>
                <div className="flex items-end justify-between border-t border-[var(--line)] pt-3">
                  <dt className="label text-[var(--fg-faint)]">Total</dt>
                  <dd className="tnum text-2xl font-semibold text-[var(--accent)]">
                    <span className="text-xs font-normal text-[var(--fg-faint)]">KES </span>
                    {formatKES(total)}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-[var(--fg-faint)]">
                Ready in about {eta} · pay with {PAYMENTS.find((p) => p.id === payment)?.label}
              </p>

              <button
                type="button"
                onClick={runPayment}
                disabled={stage !== "idle"}
                className="btn btn-flame mt-5 w-full"
              >
                {stage === "idle" ? (
                  <>
                    Place order · KES {formatKES(total)} <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing…
                  </>
                )}
              </button>

              <a
                href={whatsappLink(whatsappSummary())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-3 w-full"
              >
                <MessageCircle size={16} /> Send order via WhatsApp
              </a>

              <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-[var(--fg-faint)]">
                By ordering you agree to our kitchen &amp; allergy notice. Prices
                include VAT.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* --------------------------- payment overlay --------------------------- */}
      <AnimatePresence>
        {stage !== "idle" ? (
          <motion.div
            className="fixed inset-0 z-[93] flex items-center justify-center px-5"
            data-theme="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alertdialog"
            aria-live="assertive"
            aria-label="Payment in progress"
          >
            <div
              className="absolute inset-0 bg-[var(--ink)]/95 backdrop-blur"
              aria-hidden
            />
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-[color-mix(in_srgb,var(--flame)_40%,transparent)] bg-[var(--bg-2)] p-7 text-center"
            >
              <AnimatePresence mode="wait">
                {stage === "sending" ? (
                  <motion.div key="s" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Loader2 size={40} className="mx-auto animate-spin text-[var(--accent)]" />
                    <h3 className="font-script mt-5 text-2xl">Sending request…</h3>
                    <p className="mt-2 text-sm text-[var(--fg-muted)]">
                      Talking to {BUSINESS.name} on M-Pesa.
                    </p>
                  </motion.div>
                ) : null}

                {stage === "pin" ? (
                  <motion.div key="p" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="relative mx-auto h-24 w-24">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[color-mix(in_srgb,var(--flame)_30%,transparent)]" />
                      <span className="relative grid h-24 w-24 place-items-center rounded-full border border-[var(--accent)] bg-[var(--bg)]">
                        <Smartphone size={34} className="text-[var(--accent)]" />
                      </span>
                    </div>
                    <h3 className="font-script mt-6 text-2xl">
                      Enter your M-Pesa PIN on your phone
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                      A prompt for <strong className="tnum text-[var(--fg)]">KES {formatKES(total)}</strong> was
                      sent to {phone}. Approve it to complete the order.
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-[var(--accent)]"
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    <p className="label mt-4 text-[var(--fg-faint)]">
                      Waiting for confirmation…
                    </p>
                  </motion.div>
                ) : null}

                {stage === "authorising" ? (
                  <motion.div key="a" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Loader2 size={40} className="mx-auto animate-spin text-[var(--accent)]" />
                    <h3 className="font-script mt-5 text-2xl">Authorising card</h3>
                    <p className="mt-2 text-sm text-[var(--fg-muted)]">
                      Secure simulated authorisation with your bank.
                    </p>
                  </motion.div>
                ) : null}

                {stage === "confirming" ? (
                  <motion.div key="c" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Loader2 size={40} className="mx-auto animate-spin text-[var(--accent)]" />
                    <h3 className="font-script mt-5 text-2xl">Confirming cash order</h3>
                    <p className="mt-2 text-sm text-[var(--fg-muted)]">
                      Nothing to pay now — settle up at the counter or with the rider.
                    </p>
                  </motion.div>
                ) : null}

                {stage === "done" ? (
                  <motion.div key="d" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]"
                    >
                      <Check size={38} strokeWidth={3} />
                    </motion.span>
                    <h3 className="font-script mt-5 text-2xl">
                      {payment === "mpesa" ? "Payment received" : "Order confirmed"}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--fg-muted)]">
                      Taking you to your live order tracker…
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Err({ msg }: { msg: string }) {
  return <span className="mt-1.5 block text-xs text-[var(--accent)]">{msg}</span>;
}
