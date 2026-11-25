import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Chill & Chew order — dine-in, pickup or delivery across Mombasa. Pay with M-Pesa, cash or card (simulated).",
  robots: { index: false, follow: true },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 92% 0%, color-mix(in srgb, var(--flame) 22%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Link
          href="/menu"
          className="label inline-flex items-center gap-2 text-[var(--fg-faint)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Back to the board
        </Link>

        <h1 className="display mt-5 text-[clamp(2.6rem,8vw,5rem)]">
          <span className="text-[var(--fg)]">Check</span>{" "}
          <span className="text-grad">out</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)]">
          Three steps: how you want it, who you are, and how you&apos;ll pay.
          Delivery across Nyali, Bamburi, Tudor, Mtwapa, Old Town and Likoni.
        </p>

        <div className="mt-10">
          <CheckoutClient />
        </div>
      </div>
    </section>
  );
}
