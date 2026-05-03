import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const SITE_URL = "https://japan-travel-lens.vercel.app";

function pickLang(acceptLang: string | null): string {
  const raw = (acceptLang ?? "").toLowerCase();
  if (raw.startsWith("ko")) return "ko";
  if (raw.startsWith("ja")) return "ja";
  if (raw.startsWith("zh")) return "zh";
  return "en";
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Travel Lens — AI explains foreign signs, menus, products",
    template: "%s · Travel Lens",
  },
  description:
    "Point your phone at any foreign-language sign, menu, or product label. AI translates and explains it in your language. Works with Japanese, Chinese, English, Korean, Thai, Vietnamese, Spanish, French, and more.",
  applicationName: "Travel Lens",
  keywords: [
    "travel translator",
    "menu translator",
    "japanese menu",
    "メニュー 翻訳",
    "看板 翻訳",
    "招牌翻译",
    "菜单翻译",
    "여행 번역",
    "메뉴판 번역",
    "AI camera translator",
  ],
  appleWebApp: {
    capable: true,
    title: "Travel Lens",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Travel Lens — AI explains foreign signs, menus, products",
    description:
      "Point your phone at foreign text. AI translates and explains in your language. 10 free scans/day.",
    siteName: "Travel Lens",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Lens — AI translates anything you photograph",
    description:
      "Foreign menu? Foreign sign? Snap and AI explains. Works in 4+ languages.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // 사용자 확대 허용 (접근성)
  userScalable: true,
  themeColor: "#0b0b0f",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const lang = pickLang(h.get("accept-language"));
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
