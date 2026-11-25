import type { MetadataRoute } from "next";

const BASE = "https://chillandchew.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/menu", priority: 0.9 },
    { path: "/reservations", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
