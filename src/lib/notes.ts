"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "cc_order_notes_v1";

/** Order notes shared between the cart drawer and the checkout page. */
export function useOrderNotes(): [string, (v: string) => void] {
  const [notes, setNotesState] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setNotesState(raw);
    } catch {
      /* ignore */
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && typeof e.newValue === "string") setNotesState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setNotes = useCallback((v: string) => {
    setNotesState(v);
    try {
      window.localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
  }, []);

  return [notes, setNotes];
}
