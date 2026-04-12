import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/ui/BrandMark";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrandMark
          idPrefix="favicon-brand"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    ),
    { ...size }
  );
}
