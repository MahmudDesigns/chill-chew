import { BUSINESS, type ServiceMode } from "@/data/business";

/* ----------------------------- class helper ----------------------------- */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------- money ---------------------------------- */
const nf = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

export function formatKES(amount: number): string {
  return nf.format(Math.round(amount));
}

export function priceLabel(amount: number): string {
  return `KES ${formatKES(amount)}`;
}

/* ------------------------------ time / hours ---------------------------- */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export interface EATClock {
  weekday: string;
  minutes: number;
  clock: string;
}

/** Current wall-clock time in East Africa Time (Africa/Nairobi, UTC+3). */
export function eatClock(now: Date = new Date()): EATClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  return {
    weekday,
    minutes: hour * 60 + minute,
    clock: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

export interface OpenStatus {
  open: boolean;
  label: string;
  detail: string;
  today: { day: string; open: string; close: string };
  closesInMinutes: number;
}

/** Live "Open now / Closed" state based on Mombasa time (EAT). */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const clock = eatClock(now);
  const idx = BUSINESS.hours.findIndex((h) => h.day === clock.weekday);
  const todayIdx = idx === -1 ? 0 : idx;
  const today = BUSINESS.hours[todayIdx];

  const opens = toMinutes(today.open);
  const closes = toMinutes(today.close);
  const isOpen = clock.minutes >= opens && clock.minutes < closes;

  const dayShort = today.day.slice(0, 3);

  if (isOpen) {
    const left = closes - clock.minutes;
    const detail =
      left <= 60
        ? `Closes at ${today.close} — ${left} min left`
        : `Kitchen open until ${today.close}`;
    return {
      open: true,
      label: "Open now",
      detail,
      today: { ...today },
      closesInMinutes: left,
    };
  }

  if (clock.minutes < opens) {
    return {
      open: false,
      label: "Closed",
      detail: `Opens today at ${today.open}`,
      today: { ...today },
      closesInMinutes: 0,
    };
  }

  const next = BUSINESS.hours[(todayIdx + 1) % BUSINESS.hours.length];
  return {
    open: false,
    label: "Closed",
    detail: `Opens ${next.day.slice(0, 3)} at ${next.open}`,
    today: { ...today },
    closesInMinutes: 0,
  };
}

export function isToday(day: string, now: Date = new Date()): boolean {
  return eatClock(now).weekday === day;
}

/* ------------------------------ validation ------------------------------ */
const KE_PHONE = /^(?:\+254|0)(7|1)\d{8}$/;

export interface PhoneCheck {
  valid: boolean;
  e164: string;
  error?: string;
}

export function checkKenyanPhone(raw: string): PhoneCheck {
  const cleaned = raw.replace(/[\s()-]/g, "");
  if (!cleaned) return { valid: false, e164: "", error: "Phone number is required" };
  if (!KE_PHONE.test(cleaned)) {
    return {
      valid: false,
      e164: "",
      error: "Use a Kenyan number, e.g. +254 712 345 678",
    };
  }
  const e164 = cleaned.startsWith("+")
    ? cleaned
    : `+254${cleaned.slice(-9)}`;
  return { valid: true, e164 };
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isFutureDate(value: string): boolean {
  if (!value) return false;
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(chosen.getTime()) && chosen >= today;
}

/* -------------------------------- orders -------------------------------- */
export function makeOrderNumber(): string {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CC-${stamp}-${rand}`;
}

export function orderEta(mode: ServiceMode, eta = "25–35 min"): string {
  if (mode === "dine-in") return "15–20 min";
  if (mode === "pickup") return "15 min";
  return eta;
}

/* ------------------------------- whatsapp ------------------------------- */
export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------ misc helpers ---------------------------- */
export function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function timeOptions(start = 7, end = 22.5, stepMinutes = 30): string[] {
  const out: string[] = [];
  for (let mins = start * 60; mins <= end * 60; mins += stepMinutes) {
    out.push(fromMinutes(mins));
  }
  return out;
}
