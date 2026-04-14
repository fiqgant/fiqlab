import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, #1d4ed8 0%, #0f172a 42%, #020617 100%)",
          color: "white",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "32px",
            padding: "48px",
            background: "rgba(2, 6, 23, 0.58)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "92px",
                height: "92px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,1), rgba(20,184,166,1))",
                boxShadow: "0 20px 60px rgba(37, 99, 235, 0.35)",
                fontSize: "42px",
                fontWeight: 800,
              }}
            >
              F
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                }}
              >
                FiqLab
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "58px",
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {personal.name}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "920px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                color: "rgba(255,255,255,0.86)",
              }}
            >
              {personal.role} in Computer Vision, Deep Learning, YOLO, and IoT
            </div>
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              {["Publications", "Portfolio", "Blog", "Academic Profile"].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      padding: "12px 18px",
                      borderRadius: "999px",
                      background: "rgba(59,130,246,0.16)",
                      border: "1px solid rgba(125,211,252,0.2)",
                      fontSize: "20px",
                      color: "#dbeafe",
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
