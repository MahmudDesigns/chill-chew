"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { checkKenyanPhone, cn, isEmail, whatsappLink } from "@/lib/format";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof ContactForm, string>>;

const SUBJECTS = [
  "General question",
  "Large order / catering",
  "Feedback",
  "Press & partnerships",
  "Working with us",
];

export function ContactForm() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof ContactForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name";
    if (!isEmail(form.email)) next.email = "Enter a valid email address";
    if (form.phone) {
      const p = checkKenyanPhone(form.phone);
      if (!p.valid) next.phone = p.error;
    }
    if (form.message.trim().length < 10)
      next.message = "Give us at least a sentence (10 characters)";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card rounded-3xl p-7 sm:p-9"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]">
          <Check size={26} strokeWidth={3} />
        </span>
        <h3 className="font-script mt-5 text-3xl">Message received</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
          Asante, {form.name.split(" ")[0]}. We reply to everything within one
          working day — usually much faster. If it&apos;s urgent, WhatsApp us.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappLink(
              `Hi Chill & Chew — regarding: ${form.subject}. ${form.message}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-flame"
          >
            Continue on WhatsApp
          </a>
          <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">
            Send another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card rounded-3xl p-6 sm:p-8">
      <p className="label text-[var(--accent)]">Send a message</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label mb-2 block text-[var(--fg-faint)]">Name</span>
          <input
            className={cn("field", errors.name && "field-err")}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name ? (
            <span className="mt-1.5 block text-xs text-[var(--accent)]">{errors.name}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="label mb-2 block text-[var(--fg-faint)]">Email</span>
          <input
            className={cn("field", errors.email && "field-err")}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
          {errors.email ? (
            <span className="mt-1.5 block text-xs text-[var(--accent)]">{errors.email}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="label mb-2 block text-[var(--fg-faint)]">Phone (optional)</span>
          <input
            className={cn("field", errors.phone && "field-err")}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+254 712 345 678"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone ? (
            <span className="mt-1.5 block text-xs text-[var(--accent)]">{errors.phone}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="label mb-2 block text-[var(--fg-faint)]">Subject</span>
          <select
            className="field"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="label mb-2 block text-[var(--fg-faint)]">Message</span>
          <textarea
            rows={5}
            className={cn("field resize-none", errors.message && "field-err")}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={`Tell us what you need — we're at ${BUSINESS.address.line1}.`}
          />
          {errors.message ? (
            <span className="mt-1.5 block text-xs text-[var(--accent)]">{errors.message}</span>
          ) : null}
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-flame">
          Send message <Send size={15} />
        </button>
        <p className="text-xs text-[var(--fg-faint)]">
          Or email {BUSINESS.email}
        </p>
      </div>
    </form>
  );
}
