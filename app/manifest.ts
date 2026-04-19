import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "여행 렌즈",
    short_name: "여행렌즈",
    description:
      "카메라로 찍으면 AI가 외국어 간판·메뉴판·상품을 한국어로 설명해주는 여행 도우미",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    orientation: "portrait",
    categories: ["travel", "utilities", "productivity"],
    lang: "ko",
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
