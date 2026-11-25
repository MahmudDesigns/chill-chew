"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ServiceMode } from "@/data/business";

/* ------------------------------- types ---------------------------------- */
export interface CartLine {
  key: string;
  itemId: string;
  name: string;
  image: string;
  size: string | null;
  addons: string[];
  unitPrice: number;
  qty: number;
}

export interface CheckoutCustomer {
  name: string;
  phone: string;
  email: string;
  notes: string;
  table: string;
  area: string;
}

export type PaymentMethod = "mpesa" | "cash" | "card";

export interface OrderRecord {
  number: string;
  createdAt: string;
  mode: ServiceMode;
  area: string;
  deliveryFee: number;
  payment: PaymentMethod;
  customer: CheckoutCustomer;
  items: CartLine[];
  subtotal: number;
  total: number;
  statusIndex: number;
}

export const ORDER_STATUSES = [
  "Received",
  "Preparing",
  "Ready",
  "On the way",
] as const;

const CART_KEY = "cc_cart_v1";
const ORDER_KEY = "cc_orders_v1";

/* ------------------------------ context --------------------------------- */
interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  hydrated: boolean;
  setOpen: (v: boolean) => void;
  addLine: (line: Omit<CartLine, "key" | "qty">, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const first = useRef(true);

  /* hydrate from localStorage */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed as CartLine[]);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setHydrated(true);
  }, []);

  /* persist */
  useEffect(() => {
    if (!hydrated) return;
    if (first.current) {
      first.current = false;
    }
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota errors */
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: Omit<CartLine, "key" | "qty">, qty: number) => {
    const key = `${line.itemId}|${line.size ?? ""}|${line.addons.slice().sort().join(",")}`;
    setLines((prev) => {
      const at = prev.findIndex((l) => l.key === key);
      if (at >= 0) {
        const next = prev.slice();
        next[at] = { ...next[at], qty: Math.min(30, next[at].qty + qty) };
        return next;
      }
      return [...prev, { ...line, key, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(30, qty) } : l)),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [lines],
  );
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count,
      subtotal,
      open,
      hydrated,
      setOpen,
      addLine,
      setQty,
      removeLine,
      clear,
    }),
    [lines, count, subtotal, open, hydrated, addLine, setQty, removeLine, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/* --------------------------- order persistence --------------------------- */
export function saveOrder(order: OrderRecord): void {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    const all: OrderRecord[] = raw ? (JSON.parse(raw) as OrderRecord[]) : [];
    const next = [order, ...all.filter((o) => o.number !== order.number)].slice(0, 20);
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function readOrder(number: string): OrderRecord | null {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const all = JSON.parse(raw) as OrderRecord[];
    return all.find((o) => o.number === number) ?? null;
  } catch {
    return null;
  }
}
