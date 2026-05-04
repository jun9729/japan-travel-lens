import type { MetadataRoute } from "next";

const BASE = "https://japan-travel-lens.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: BASE, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/demo`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/japan`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/korea`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/about`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/press`, lastModified: now, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/blog/korean-menu-guide-2026`, lastModified: "2026-05-06T00:00:00Z", priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/blog/japanese-menu-reading-guide-2026`, lastModified: "2026-05-01T00:00:00Z", priority: 0.7, changeFrequency: "yearly" },
    { url: `${BASE}/blog/ilbon-menupan-irl-bbeop`, lastModified: "2026-05-02T00:00:00Z", priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/blog/menu-translation-apps-compared-2026`, lastModified: "2026-05-03T00:00:00Z", priority: 0.7, changeFrequency: "yearly" },
    { url: `${BASE}/blog/best-menu-translator-app-2026`, lastModified: "2026-05-04T00:00:00Z", priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/blog/translate-japanese-menu-iphone-2026`, lastModified: "2026-05-05T00:00:00Z", priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/legal/privacy`, lastModified: now, priority: 0.3, changeFrequency: "monthly" },
    { url: `${BASE}/legal/terms`, lastModified: now, priority: 0.3, changeFrequency: "monthly" },
    { url: `${BASE}/legal/refund`, lastModified: now, priority: 0.3, changeFrequency: "monthly" },
  ];
}
