"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Page-load curtain: charcoal panel lifting off the wordmark. */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wait = reduce ? 120 : 1250;
    const t = window.setTimeout(() => setDone(true), wait);
    const safety = window.setTimeout(() => setDone(true), 3200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(safety);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="curtain"
          data-theme="dark"
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[var(--ink)]"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: reduce ? 0.15 : 0.95, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="display text-grad text-[clamp(2.6rem,10vw,5.5rem)]">
              Chill &amp; Chew
            </span>
            <span className="pindo mt-6 w-56" />
            <span className="label mt-4 text-[var(--fg-faint)]">
              Mombasa · Kenya · Est. 2019
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
