import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "여행 렌즈 — AI 외국어 설명",
  description:
    "카메라로 찍으면 AI가 외국어 간판·메뉴판·상품을 한국어로 설명해줍니다.",
  applicationName: "여행 렌즈",
  appleWebApp: {
    capable: true,
    title: "여행 렌즈",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b0b0f",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
