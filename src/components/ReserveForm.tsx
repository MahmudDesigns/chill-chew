"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CalendarDays, ArrowRight, MessageCircle } from "lucide-react";
import { BUSINESS, TABLE_OPTIONS } from "@/data/business";
import {
  checkKenyanPhone,
  isFutureDate,
  timeOptions,
  todayISO,
  whatsappLink,
  cn,
} from "@/lib/format";

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  notes: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const SEATING = ["Indoor", "Terrace", "No preference"];

export function ReserveForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    date: todayISO(1),
    time: "19:00",
    guests: "2",
    seating: "No preference",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please tell us your name";
    const phone = checkKenyanPhone(form.phone);
    if (!phone.valid) e.phone = phone.error;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "That email doesn't look right";
    if (!isFutureDate(form.date)) e.date = "Choose today or a future date";
    if (!form.time) e.time = "Pick a time";
    if (!form.guests) e.guests = "How many guests?";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  if (done) {
    const summary = `${form.name} · ${form.guests} guests · ${form.date} at ${form.time} · ${form.seating}`;
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="card rounded-3xl p-7 sm:p-9"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]">
          <Check size={26} strokeWidth={3} />
        </span>
        <h3 className="font-script mt-5 text-3xl">Table requested, {form.name.split(" ")[0]}!</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
          We&apos;ll confirm your booking on WhatsApp within 10 minutes during
          opening hours. Tables are held for 15 minutes past the booking time.
        </p>

        <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
          {[
            ["Guests", form.guests],
            ["Date", form.date],
            ["Time", `${form.time} EAT`],
            ["Seating", form.seating],
            ["Phone", form.phone],
            ["Notes", form.notes || "—"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 text-sm">
              <dt className="label text-[var(--fg-faint)]">{k}</dt>
              <dd className="tnum text-right text-[var(--fg)]">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappLink(
              `Reservation request — ${summary}. Notes: ${form.notes || "none"}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-flame"
          >
            <MessageCircle size={16} /> Confirm on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setDone(false)}
            className="btn btn-ghost"
          >
            Edit booking
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn("card rounded-3xl p-6 sm:p-8")}>
      <div className="flex items-center gap-3">
        <CalendarDays size={17} className="text-[var(--accent)]" />
        <p className="label text-[var(--accent)]">Table reservation</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            className={cn("field", errors.name && "field-err")}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Amina Mwangi"
            autoComplete="name"
          />
        </Field>

        <Field label="Phone (+254)" error={errors.phone}>
          <input
            className={cn("field", errors.phone && "field-err")}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+254 712 345 678"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field label="Email (optional)" error={errors.email}>
          <input
            className={cn("field", errors.email && "field-err")}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
        </Field>

        <Field label="Date" error={errors.date}>
          <input
            type="date"
            min={todayISO(0)}
            className={cn("field", errors.date && "field-err")}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </Field>

        <Field label="Time (EAT)" error={errors.time}>
          <select
            className={cn("field", errors.time && "field-err")}
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
          >
            {timeOptions(7, 21.5, 30).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Guests" error={errors.guests}>
          <select
            className={cn("field", errors.guests && "field-err")}
            value={form.guests}
            onChange={(e) => set("guests", e.target.value)}
          >
            {TABLE_OPTIONS.map((n) => (
              <option key={n} value={String(n)}>
                {n} guests
              </option>
            ))}
            <option value="10+">More than 10 — call us</option>
          </select>
        </Field>

        <Field label="Seating" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {SEATING.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set("seating", s)}
                aria-pressed={form.seating === s}
                className={cn(
                  "label rounded-full border px-4 py-2.5 transition-all duration-300",
                  form.seating === s
                    ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--flame)_16%,transparent)] text-[var(--accent)]"
                    : "border-[var(--line)] text-[var(--fg-muted)] hover:border-[color-mix(in_srgb,var(--flame)_50%,transparent)]",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Anything we should know?" className="sm:col-span-2">
          <textarea
            rows={3}
            className="field resize-none"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Birthday cake, high chair, window seat, quiet corner…"
          />
        </Field>
      </div>

      {compact ? (
        <p className="mt-4 text-xs text-[var(--fg-faint)]">{BUSINESS.reservationNotice}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-flame">
          Request this table <ArrowRight size={16} />
        </button>
        <p className="text-xs text-[var(--fg-faint)]">
          Or call {BUSINESS.phone.display}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label mb-2 block text-[var(--fg-faint)]">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-[var(--accent)]">{error}</span> : null}
    </label>
  );
}
