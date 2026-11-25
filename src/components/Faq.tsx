"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/format";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Good questions"
              title={
                <>
                  Before you <span className="text-grad">order</span>
                </>
              }
              proverb="Everything else — just ask the counter"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
              Still stuck? Message us on WhatsApp and a human answers within a
              few minutes during opening hours.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="label shrink-0 text-[var(--fg-faint)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-base font-medium transition-colors duration-300 sm:text-lg",
                              isOpen
                                ? "text-[var(--accent)]"
                                : "text-[var(--fg)] hover:text-[var(--accent)]",
                            )}
                          >
                            {f.q}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
                              : "border-[var(--line)] text-[var(--fg-muted)]",
                          )}
                        >
                          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pl-0 text-sm leading-relaxed text-[var(--fg-muted)] sm:pl-10 sm:text-[15px]">
                            {f.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
