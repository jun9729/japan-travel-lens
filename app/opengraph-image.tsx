import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        <div style={{ fontSize: 140, lineHeight: 1, marginBottom: 24 }}>🌏</div>
        <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: "-2px" }}>
          Travel Lens
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            marginTop: 16,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Point at foreign text — AI explains it
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.7,
            marginTop: 28,
            display: "flex",
            gap: 20,
          }}
        >
          <span>📋 Menus</span>
          <span>🪧 Signs</span>
          <span>📦 Products</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
