import type { Metadata } from "next";
import { MenuBoard } from "@/components/MenuBoard";
import { Marquee } from "@/components/Marquee";
import { HoursBadge } from "@/components/HoursBadge";
import { CATEGORIES } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu & Online Ordering",
  description:
    "Order coffee, Swahili biryani, mandazi, viazi karai, burgers, fresh juices and cakes from Chill & Chew in Mombasa. Filter by vegetarian, halal and spicy — pickup, delivery or dine-in.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu & Online Ordering · Chill & Chew Mombasa",
    description:
      "Espresso, Kenyan AA pour-over, Swahili chicken biryani, mandazi and more — order online in Mombasa.",
    url: "/menu",
    images: ["/images/biryani.jpg"],
  },
};

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(70% 90% at 90% 0%, color-mix(in srgb, var(--flame) 30%, transparent), transparent 65%),
              linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 95%, var(--flame)))`,
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-14 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="pindo-soft w-10" aria-hidden />
                <span className="label text-[var(--accent)]">
                  Order online · {CATEGORIES.length} categories
                </span>
              </div>
              <h1 className="display mt-4 text-[clamp(3rem,10vw,6.5rem)]">
                <span className="text-[var(--fg)]">The </span>
                <span className="text-grad">board</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
                Tap a line to choose sizes and add-ons, then check out for
                dine-in, pickup or delivery anywhere in Mombasa. All prices in
                Kenyan Shillings.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3">
              <HoursBadge />
              <p className="label text-[var(--fg-faint)]">
                M-Pesa · Cash · Card
              </p>
            </div>
          </div>
        </div>
        <Marquee
          items={CATEGORIES.map((c) => c.label)}
          tone="flame"
        />
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <MenuBoard />
        </div>
      </section>
    </>
  );
}
