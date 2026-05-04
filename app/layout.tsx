import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://japan-travel-lens.vercel.app";

function pickLang(acceptLang: string | null): "ko" | "en" | "ja" | "zh" {
  const raw = (acceptLang ?? "").toLowerCase();
  if (raw.startsWith("ko")) return "ko";
  if (raw.startsWith("ja")) return "ja";
  if (raw.startsWith("zh")) return "zh";
  // 기본값: en (1차 타겟이 영어권 여행자 — Googlebot/Bingbot 등 대다수 영문 폴백)
  return "en";
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Travel Lens — AI explains foreign menus, signs, and product labels",
    template: "%s · Travel Lens",
  },
  description:
    "Travel Lens is an AI camera translator for travelers. Snap a foreign-language menu, sign, or product label — get the full menu as a table, plus follow-up Q&A about allergens, spice level, and recommendations. Powered by GPT-4o Vision. 10 free scans/day, no signup. $1 unlocks 24h unlimited.",
  applicationName: "Travel Lens",
  authors: [{ name: "Jun Lee", url: SITE_URL }],
  creator: "Jun Lee",
  publisher: "Travel Lens",
  keywords: [
    // EN — primary audience
    "travel translator app", "menu translator app", "AI camera translator",
    "japanese menu translator", "korean menu translator", "thai menu translator",
    "translate menu with camera", "translate sign with camera",
    "GPT-4o vision app", "foreign menu reader", "real-time translation app",
    "best travel translation app 2026", "free menu translator",
    "iphone menu translator", "android menu translator",
    "translate japanese restaurant menu", "japan travel apps 2026",
    "korea travel apps 2026", "solo travel translator",
    "google lens alternative menu", "papago alternative menu",
    "deepL camera alternative", "menu translator gpt",
    "what does this say in japanese", "what does this menu mean",
    // JA secondary
    "メニュー 翻訳", "看板 翻訳", "AI 翻訳 カメラ", "海外旅行 翻訳",
    // ZH secondary
    "菜单翻译", "招牌翻译", "AI 拍照翻译", "旅行翻译",
    // KO secondary
    "여행 번역", "메뉴판 번역", "일본 메뉴 번역", "AI 번역 앱",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      ko: `${SITE_URL}/?lang=ko`,
      en: `${SITE_URL}/?lang=en`,
      ja: `${SITE_URL}/?lang=ja`,
      "zh-CN": `${SITE_URL}/?lang=zh`,
      "x-default": SITE_URL,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Travel Lens",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Travel Lens — Snap a foreign menu, AI explains it (free)",
    description:
      "GPT-4o Vision turns any foreign-language menu into a clean table with allergen notes. Ask follow-ups: 'is this spicy?', 'vegetarian options?'. Works on Japanese, Korean, Thai, Vietnamese, Spanish menus. No signup, 10 free scans/day, $1 unlimited.",
    siteName: "Travel Lens",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN"],
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Travel Lens — AI explains foreign signs, menus, products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Lens — Snap a foreign menu, AI explains it",
    description:
      "Point camera at any foreign menu. Get the full menu as a table + ask follow-ups (allergens, spice). 10 free/day. No signup.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b0b0f",
  viewportFit: "cover",
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Travel Lens",
  alternateName: ["여행 렌즈", "トラベルレンズ", "旅行镜头"],
  applicationCategory: "TravelApplication",
  applicationSubCategory: "Translation",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-powered camera translator. Snap foreign menus, signs, and product labels — get full explanations in your language with follow-up Q&A.",
  offers: [
    {
      "@type": "Offer",
      name: "Free tier",
      price: "0",
      priceCurrency: "USD",
      description: "10 scans per day",
    },
    {
      "@type": "Offer",
      name: "24h Unlimited",
      price: "1.00",
      priceCurrency: "USD",
      description: "Unlimited scans for 24 hours, no auto-renewal",
    },
  ],
  featureList: [
    "Camera-based real-time translation",
    "Full menu transcription as table",
    "Follow-up Q&A on the same photo",
    "Auto-detects 50+ source languages",
    "UI in Korean / English / Japanese / Chinese",
    "Works without account or signup",
    "PWA — installable on iOS and Android",
  ],
  aggregateRating: undefined, // 후기 모이면 추가
  inLanguage: ["ko", "en", "ja", "zh"],
  isAccessibleForFree: true,
  author: {
    "@type": "Person",
    name: "Jun Lee",
  },
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to sign up?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Travel Lens is anonymous — no account, no email, no password required. Daily quota tracking uses a signed cookie in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the translation?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Travel Lens uses OpenAI's GPT-4o Vision model — typically more accurate than literal-word OCR translators because it understands menu context (cuisine type, allergens, common dishes).",
      },
    },
    {
      "@type": "Question",
      name: "What does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "10 scans per day are free. For 24h unlimited use, a single global price of $1 USD via PayPal — one-time payment, no auto-renewal.",
      },
    },
    {
      "@type": "Question",
      name: "What languages can it read?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Auto-detects 50+ languages including Japanese, Chinese, Korean, Thai, Vietnamese, Spanish, French, German, Arabic. UI is available in Korean, English, Japanese, and Chinese.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No — AI analysis requires internet. Recent scans are cached locally for re-viewing without network.",
      },
    },
  ],
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
      <head>
        <link rel="alternate" hrefLang="ko" href={`${SITE_URL}/?lang=ko`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/?lang=en`} />
        <link rel="alternate" hrefLang="ja" href={`${SITE_URL}/?lang=ja`} />
        <link rel="alternate" hrefLang="zh" href={`${SITE_URL}/?lang=zh`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SOFTWARE_JSONLD),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(FAQ_JSONLD),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
