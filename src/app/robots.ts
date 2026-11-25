import type { MetadataRoute } from "next";

const BASE = "https://chillandchew.co.ke";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/order/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
