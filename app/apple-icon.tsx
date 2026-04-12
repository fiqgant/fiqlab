import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/ui/BrandMark";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrandMark
          idPrefix="apple-brand"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ),
    { ...size }
  );
}
