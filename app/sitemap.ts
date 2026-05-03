import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://japan-travel-lens.vercel.app";
  const now = new Date().toISOString();
  return [
    { url: base, lastModified: now, priority: 1.0 },
    { url: `${base}/legal/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, priority: 0.3 },
    { url: `${base}/legal/refund`, lastModified: now, priority: 0.3 },
  ];
}
