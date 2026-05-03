import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    // 한국이 1차 시장이지만 글로벌 사용자 홈화면에서 브랜드 인식 가능하도록 영문 병기
    name: "Travel Lens · 여행 렌즈",
    short_name: "Travel Lens",
    description:
      "Point your phone at any foreign-language sign, menu, or product. AI explains it in your language. 카메라로 외국어를 찍으면 AI가 풀어줘요.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    orientation: "portrait",
    categories: ["travel", "utilities", "productivity"],
    lang: "ko",
    dir: "ltr",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png", purpose: "any" },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
