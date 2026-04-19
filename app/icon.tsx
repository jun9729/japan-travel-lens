import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2b6cff 0%, #7a3cff 55%, #ff5ab2 100%)",
          fontSize: 120,
          lineHeight: 1,
        }}
      >
        🌏
      </div>
    ),
    { ...size }
  );
}
