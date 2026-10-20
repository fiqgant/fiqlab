import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const runtime = "edge";
export const alt = `${personal.name} — ${personal.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const PAPER = "#FCFBF7";
const INK = "#1C1C1E";
const MUTED = "#606064";

const keywords = personal.researchInterests.map((i) => i.title).join(", ");

// Google Fonts serves TTF to unknown user agents, which Satori can read.
async function loadSerif(weight: number, italic = false): Promise<ArrayBuffer | null> {
  try {
    const family = `Source+Serif+4:ital,wght@${italic ? 1 : 0},${weight}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [regular, semibold, italic] = await Promise.all([
    loadSerif(400),
    loadSerif(600),
    loadSerif(400, true),
  ]);
  const fonts = [
    regular && { name: "Serif", data: regular, weight: 400 as const, style: "normal" as const },
    semibold && { name: "Serif", data: semibold, weight: 600 as const, style: "normal" as const },
    italic && { name: "Serif", data: italic, weight: 400 as const, style: "italic" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "72px 96px",
          background: PAPER,
          color: INK,
          fontFamily: "Serif, Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: MUTED, letterSpacing: "0.04em" }}>
          fiqlab.dev · research notebook
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 600, lineHeight: 1.05 }}>
            {personal.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontStyle: "italic", color: MUTED, marginTop: 16 }}>
            {personal.role}, {personal.institution}
          </div>
        </div>

        <div style={{ display: "flex", height: 2, background: INK, marginTop: 48 }} />

        <div style={{ display: "flex", fontSize: 28, marginTop: 28, lineHeight: 1.4 }}>
          <span style={{ fontStyle: "italic", fontWeight: 600, marginRight: 12 }}>Keywords —</span>
          <span>{keywords}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            justifyContent: "space-between",
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>Publications · Projects · Writing</span>
          <span>{personal.location}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
