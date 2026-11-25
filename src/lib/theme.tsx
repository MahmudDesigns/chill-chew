"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";

interface ThemeValue {
  theme: ThemeMode;
  toggle: () => void;
  setTheme: (t: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);
const KEY = "cc_theme_v1";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
        document.documentElement.dataset.theme = stored;
      } else {
        document.documentElement.dataset.theme = "dark";
      }
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  }, []);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try {
      window.localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeValue>(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
