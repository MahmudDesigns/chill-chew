"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { isEmail } from "@/lib/format";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email address");
      return;
    }
    if (!isEmail(email)) {
      setError("That doesn't look like a valid email");
      return;
    }
    setError(null);
    setSent(true);
    setEmail("");
  };

  return (
    <div className={compact ? "" : "frame rounded-2xl"}>
      <div
        className={
          compact
            ? ""
            : "rounded-[15px] bg-[var(--bg)] p-6 sm:p-8"
        }
      >
        <p className="label text-[var(--accent)]">Newsletter</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug">
          Specials, new bakes and the odd secret menu item.
        </h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          One email a fortnight. Mombasa only, no spam.
        </p>

        {sent ? (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--flame)_45%,transparent)] bg-[color-mix(in_srgb,var(--flame)_10%,transparent)] px-4 py-3.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--ink)]">
              <Check size={15} strokeWidth={3} />
            </span>
            <p className="text-sm text-[var(--fg)]">
              You&apos;re on the list — see you at the counter.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5" noValidate>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@example.com"
                aria-invalid={!!error}
                className={error ? "field field-err" : "field"}
              />
              <button type="submit" className="btn btn-flame shrink-0 px-6">
                Join <ArrowRight size={15} />
              </button>
            </div>
            {error ? (
              <p className="mt-2 text-xs text-[var(--accent)]">{error}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
