# Chill & Chew — Café & Eatery, Mombasa

A premium, production-ready marketing + online-ordering site for **Chill & Chew**, a
coastal café on Links Road, Nyali, Mombasa. Built with Next.js (App Router),
TypeScript, Tailwind CSS and Framer Motion.

- **No database, no backend, no API keys, no paid services.**
- All content lives in local TypeScript files.
- Deploys to Vercel's free tier with zero configuration.

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # production build (type-checks first)
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Deploy to Vercel

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new) — framework
   **Next.js** is detected automatically.
3. Leave every environment variable blank (there are none) and click **Deploy**.

That's it. No database, no secrets, no configuration.

---

## Where to edit things

| What | File |
| --- | --- |
| Address, phone, WhatsApp, email, socials, **opening hours** | `src/data/business.ts` |
| **Delivery areas + delivery fees** | `src/data/business.ts` (`DELIVERY_AREAS`) |
| Menu items, categories, prices (KES), sizes, add-ons, dietary tags | `src/data/menu.ts` |
| Story, reviews, gallery, FAQs, marquee lines | `src/data/content.ts` |
| Colours (3 only) + gradients + textures | `src/app/globals.css` |
| Fonts (Pacifico / Poppins / Barlow Condensed) | `src/app/layout.tsx` |
| SEO metadata, Open Graph, favicon | `src/app/layout.tsx`, `src/app/icon.svg` |
| Footer copyright & credit | `src/data/business.ts` (`FOOTER_COPY`, `FOOTER_CREDIT`) |

### Your own images

Drop your files into `public/images/`:

- `public/images/cup.png` — used as the hero visual (`src/components/Hero.tsx`)
- `public/images/logo.png` — used as the header/footer logo (`src/components/Brand.tsx`)

Both fall back automatically to generated art (`public/images/hero-cup.jpg`) and to a
drawn SVG monogram if the files are missing, so nothing breaks before you add them.

### Free assets used

- Photography: generated locally in `public/images/` plus a few Unsplash URLs
  (hostname `images.unsplash.com` is allow-listed in `next.config.ts`).
- Icons: `lucide-react`.
- Fonts: `next/font/google` — Pacifico, Poppins, Barlow Condensed.

---

## Features

- Light / dark mode (dark by default), same 3-colour system
- Menu with category tabs, search, vegetarian / halal / spicy filters
- Item modal with sizes, add-ons and quantity
- Cart drawer with quantity editing, remove, order notes, live total, `localStorage` persistence
- Checkout: Dine-in / Pickup / Delivery (6 Mombasa areas, each with its own fee)
- Kenyan `+254` phone validation
- Simulated **M-Pesa** ("Enter your M-Pesa PIN on your phone"), cash and card flows
- Order confirmation page with order number + live status tracker
  (Received → Preparing → Ready → On the way)
- "Send order via WhatsApp" with a prefilled `wa.me` summary
- Table reservation form, contact form, newsletter, FAQ accordion
- Reviews slider (autoplay, pause on hover, swipe)
- Photo gallery with filters, lightbox (keyboard + swipe)
- Live "Open now / Closed" badge on Mombasa time (EAT, `Africa/Nairobi`)
- Embedded Google Map (no API key), sticky nav, mobile menu, custom cursor,
  steam animation, parallax, page-load curtain, scroll reveals
- Full SEO metadata, Open Graph, robots, sitemap, favicon and a custom 404

---

© 2026 MahmudDesigns. All rights reserved.
