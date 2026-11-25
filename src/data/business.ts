/* ==========================================================================
   ALL BUSINESS DETAILS LIVE HERE — edit this one file to change the
   address, phone numbers, WhatsApp, opening hours, delivery areas & fees.
   ========================================================================== */

export const BUSINESS = {
  name: "Chill & Chew",
  legalName: "Chill & Chew Café & Eatery",
  tagline: "Coastal café · Mombasa",
  subTagline: "Specialty coffee, Swahili plates & good company on the coast.",
  est: "EST. 2019",
  city: "Mombasa",
  country: "Kenya",
  currency: "KES",
  foundingYear: 2019,

  address: {
    line1: "Links Road, opposite Nyali Centre",
    line2: "Nyali, Mombasa 80100",
    country: "Kenya",
    full: "Links Road, opposite Nyali Centre, Nyali, Mombasa 80100, Kenya",
  },

  phone: {
    display: "+254 712 345 678",
    raw: "+254712345678",
    tel: "+254712345678",
  },
  whatsapp: {
    display: "+254 712 345 678",
    /* digits only, country code first — used for wa.me/<number> */
    raw: "254712345678",
  },
  email: "hello@chillandchew.co.ke",
  reservationsEmail: "book@chillandchew.co.ke",

  map: {
    embed:
      "https://www.google.com/maps?q=Nyali%20Centre%2C%20Mombasa%2C%20Kenya&z=14&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Nyali+Centre+Mombasa+Kenya",
    lat: -4.0625,
    lng: 39.665,
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/chillandchewmombasa" },
    { label: "Facebook", href: "https://facebook.com/chillandchewmombasa" },
    { label: "TikTok", href: "https://tiktok.com/@chillandchewmombasa" },
  ] as const,

  /* Opening hours — 24h, minutes from midnight are derived automatically.
     Day order below is Monday → Sunday. */
  hours: [
    { day: "Monday", open: "07:00", close: "22:00" },
    { day: "Tuesday", open: "07:00", close: "22:00" },
    { day: "Wednesday", open: "07:00", close: "22:00" },
    { day: "Thursday", open: "07:00", close: "22:00" },
    { day: "Friday", open: "07:00", close: "23:30" },
    { day: "Saturday", open: "08:00", close: "23:30" },
    { day: "Sunday", open: "08:00", close: "21:00" },
  ] as const,

  kitchenLastOrder: "30 minutes before close",
  reservationNotice:
    "Tables are held for 15 minutes past the booking time. For parties over 10, call us.",
} as const;

export type ServiceMode = "dine-in" | "pickup" | "delivery";

export const SERVICE_MODES: {
  id: ServiceMode;
  label: string;
  note: string;
  fee: number;
}[] = [
  { id: "dine-in", label: "Dine-in", note: "Table at Chill & Chew, Nyali", fee: 0 },
  { id: "pickup", label: "Pickup", note: "Ready in ~15 minutes", fee: 0 },
  { id: "delivery", label: "Delivery", note: "Within Mombasa areas", fee: 0 },
];

export const DELIVERY_AREAS: {
  id: string;
  label: string;
  fee: number;
  eta: string;
}[] = [
  { id: "old-town", label: "Old Town", fee: 100, eta: "25–35 min" },
  { id: "tudor", label: "Tudor", fee: 150, eta: "25–40 min" },
  { id: "nyali", label: "Nyali", fee: 150, eta: "20–30 min" },
  { id: "bamburi", label: "Bamburi", fee: 200, eta: "30–45 min" },
  { id: "likoni", label: "Likoni", fee: 250, eta: "40–55 min" },
  { id: "mtwapa", label: "Mtwapa", fee: 300, eta: "45–60 min" },
];

export const TABLE_OPTIONS = [2, 4, 6, 8, 10] as const;

export const FOOTER_COPY = "© 2026 MahmudDesigns. All rights reserved.";
export const FOOTER_CREDIT = "Designed by MahmudDesigns";
