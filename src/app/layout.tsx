import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Pacifico, Poppins, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer, CartFab } from "@/components/CartDrawer";
import { PageLoader } from "@/components/PageLoader";
import { Cursor } from "@/components/Cursor";
import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/theme";
import { BUSINESS } from "@/data/business";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const SITE_URL = "https://chillandchew.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chill & Chew — Coastal Café & Eatery in Mombasa, Kenya",
    template: "%s · Chill & Chew",
  },
  description:
    "Specialty Kenyan coffee, latte art, Swahili biryani, mandazi and fresh juices at Chill & Chew — a cozy coastal café on Links Road, Nyali, Mombasa. Order online for pickup or delivery across Mombasa.",
  keywords: [
    "cafe Mombasa",
    "coffee shop Nyali",
    "Swahili food Mombasa",
    "biryani Mombasa",
    "mandazi",
    "specialty coffee Kenya",
    "breakfast Mombasa",
    "restaurant Bamburi",
    "chai masala",
    "food delivery Mombasa",
  ],
  authors: [{ name: "MahmudDesigns" }],
  creator: "MahmudDesigns",
  category: "Food & Drink",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "Chill & Chew",
    title: "Chill & Chew — Coastal Café & Eatery in Mombasa",
    description:
      "Specialty coffee, Swahili plates and good company on Links Road, Nyali. Order online, reserve a table, or walk in.",
    images: [
      {
        url: "/images/hero-cup.jpg",
        width: 1200,
        height: 1600,
        alt: "Latte art at Chill & Chew, Mombasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chill & Chew — Coastal Café, Mombasa",
    description:
      "Specialty Kenyan coffee, Swahili plates and fresh juices in Nyali, Mombasa.",
    images: ["/images/hero-cup.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

const themeInit = `(function(){try{var t=localStorage.getItem("cc_theme_v1");document.documentElement.dataset.theme=(t==="light")?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${pacifico.variable} ${poppins.variable} ${barlowCondensed.variable}`}
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <PageLoader />
        <Cursor />
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <CartFab />
          </CartProvider>
        </ThemeProvider>
        <span className="sr-only">
          {BUSINESS.name}, {BUSINESS.address.full}
        </span>
      </body>
    </html>
  );
}
