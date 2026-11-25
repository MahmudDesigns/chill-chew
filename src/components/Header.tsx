"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon, Phone, MapPin } from "lucide-react";
import { Brand } from "@/components/Brand";
import { HoursBadge } from "@/components/HoursBadge";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { BUSINESS } from "@/data/business";
import { cn } from "@/lib/format";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reserve" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("hide-scroll", menuOpen);
    return () => document.body.classList.remove("hide-scroll");
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] shadow-[0_18px_40px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-[color-mix(in_srgb,var(--bg)_55%,transparent)] backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label="Chill & Chew home" className="shrink-0">
            <Brand compact={scrolled} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "label relative rounded-full px-4 py-2 transition-colors duration-300",
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--flame)_14%,transparent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ShoppingBag size={17} />
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="tnum absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[var(--ink)]"
                  >
                    {count}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>

            <Link
              href="/menu"
              className="btn btn-flame hidden px-5 py-2.5 text-[0.78rem] sm:inline-flex"
            >
              Order now
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--fg)] lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        <span className="pindo block opacity-70" aria-hidden />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[80] flex flex-col bg-[var(--bg)] lg:hidden"
            data-theme={theme}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
              <Brand compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)]"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--line)] py-5"
                  >
                    <span className="label text-[var(--accent)]">0{i + 1}</span>
                    <span className="display text-[clamp(2.2rem,11vw,3.4rem)] text-[var(--fg)]">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4 px-6 pb-10">
              <HoursBadge />
              <div className="flex flex-col gap-2 text-sm text-[var(--fg-muted)]">
                <a
                  href={`tel:${BUSINESS.phone.tel}`}
                  className="flex items-center gap-2 hover:text-[var(--accent)]"
                >
                  <Phone size={15} /> {BUSINESS.phone.display}
                </a>
                <span className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  {BUSINESS.address.line1}, {BUSINESS.address.line2}
                </span>
              </div>
              <Link
                href="/menu"
                onClick={() => setMenuOpen(false)}
                className="btn btn-flame w-full"
              >
                Start an order
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
