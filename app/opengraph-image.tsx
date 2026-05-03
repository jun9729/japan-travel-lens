import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Travel Lens — AI explains foreign signs, menus, products";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2b6cff 0%, #7a3cff 55%, #ff5ab2 100%)",
          color: "#fff",
          padding: "60px",
        }}
      >
        {/* 🌏 emoji 가 fallback 폰트 부재로 깨질 수 있어 텍스트 + 큰 글자로 대체 */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-2px",
            marginBottom: 8,
          }}
        >
          ✦ Travel Lens
        </div>
        <div
          style={{
            fontSize: 30,
            opacity: 0.92,
            marginTop: 12,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Point at foreign text — AI explains it.
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.75,
            marginTop: 36,
            display: "flex",
            gap: 28,
          }}
        >
          <span>Menus</span>
          <span>·</span>
          <span>Signs</span>
          <span>·</span>
          <span>Products</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            opacity: 0.55,
          }}
        >
          japan-travel-lens.vercel.app
        </div>
      </div>
    ),
    { ...size, emoji: "twemoji" }
  );
}
