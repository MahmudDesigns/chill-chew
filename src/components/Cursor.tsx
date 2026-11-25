"use client";

import { useEffect, useRef } from "react";

/** Custom animated cursor — desktop / fine-pointer only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    const root = document.documentElement;
    root.classList.add("cursor-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const render = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = window.requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const hot = !!target?.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor="hot"]',
      );
      ringRef.current?.classList.toggle("is-hot", hot);
    };

    if (reduce.matches) {
      const onMoveStatic = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      };
      window.addEventListener("pointermove", onMoveStatic, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMoveStatic);
        root.classList.remove("cursor-on");
      };
    }

    raf = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      root.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden />
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden />
    </>
  );
}
