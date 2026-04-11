import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 120,
            fontWeight: 800,
            fontFamily: "sans-serif",
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          T
        </span>
      </div>
    ),
    { ...size }
  );
}
