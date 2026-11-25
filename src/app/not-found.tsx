import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { Marquee } from "@/components/Marquee";

export default function NotFound() {
  return (
    <>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(60% 70% at 82% 10%, color-mix(in srgb, var(--flame) 30%, transparent), transparent 66%),
              linear-gradient(180deg, var(--bg), color-mix(in srgb, var(--bg) 94%, var(--flame)))`,
          }}
          aria-hidden
        />
        <div className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
          <p className="label text-[var(--accent)]">Error 404</p>
          <h1 className="display mt-5 text-[clamp(3.4rem,14vw,9rem)] leading-[1.04]">
            <span className="text-grad">Wrong</span>
            <br />
            <span className="text-[var(--fg)]">table</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
            This page isn&apos;t on the board. Maybe it was never plated, or
            someone ate the link. The coffee is still where you left it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-flame">
              <Home size={16} /> Back home
            </Link>
            <Link href="/menu" className="btn btn-ghost">
              <Search size={16} /> See the menu
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              <ArrowRight size={16} /> Contact us
            </Link>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "404",
          "Page not found",
          "Order anyway",
          "Mandazi is still warm",
          "Chill & Chew",
        ]}
      />
    </>
  );
}
