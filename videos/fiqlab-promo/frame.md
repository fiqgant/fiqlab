---
version: alpha
name: FiqLab Terminal — Frame (video / frame layer)
description: >
  Frame layer for the fiqlab.dev promo. Adapted from the code-editorial preset
  (via build-frame.mjs) but re-grounded to fiqlab.dev's real design system taken
  from the site source: pure-black canvas, cyan #00d4ff voice with a soft glow
  bloom, amber #ffb000 as the scarce second accent, JetBrains Mono everywhere,
  CRT scanline overlay, a blinking block cursor, and a `> ` terminal prompt.
  The frame IS a terminal window.
unit: the frame — 1080×1920 primary (9:16); 1920×1080 / 1:1 documented
principle: the screen is a terminal · cyan is the voice · glow is the only light

colors:
  ink: "#00d4ff"          # cyan — all text, the voice
  canvas: "#000000"       # pure black ground
  dim: "#0077cc"          # dimmed cyan — secondary / metadata lines
  amber: "#ffb000"        # scarce second accent — one highlight per frame max
  panel: "#000510"        # terminal panel fill (also rgba(0,2,8,0.88) over ground)
  surface: "#00080d"      # code / output surface, one step off black
  white: "#ffffff"        # rare — inline code token only
  border: "#0a3a4a"       # solid stand-in for rgba(0,212,255,0.15) hairline

borders:
  hairline: "1px solid rgba(0,212,255,0.15)"
  hairline-strong: "1px solid rgba(0,212,255,0.40)"
glow:
  text: "0 0 12px rgba(0,212,255,0.50), 0 0 24px rgba(0,212,255,0.20)"
  text-amber: "0 0 10px rgba(255,176,0,0.60), 0 0 20px rgba(255,176,0,0.30)"
  panel: "0 0 20px rgba(0,212,255,0.08)"
  panel-hot: "0 0 30px rgba(0,212,255,0.18)"
shadows: { card: "none", none: "none" }

typography:
  # one family — JetBrains Mono — everything. Sizes in cqw against a 1080-wide 9:16 container.
  body:        { fontFamily: "JetBrains Mono", cqw: 3.2, weight: 400, lineHeight: 1.55 }
  lead:        { fontFamily: "JetBrains Mono", cqw: 4.0, weight: 400, lineHeight: 1.5 }
  prompt:      { fontFamily: "JetBrains Mono", cqw: 3.2, weight: 500, lineHeight: 1.5, tracking: "0" }
  mono-label:  { fontFamily: "JetBrains Mono", cqw: 2.6, weight: 500, tracking: "0.16em", upper: true }
  kicker:      { fontFamily: "JetBrains Mono", cqw: 2.6, weight: 500, tracking: "0.18em", upper: true }
  card-title:  { fontFamily: "JetBrains Mono", cqw: 4.6, weight: 600, lineHeight: 1.2, tracking: "-0.01em" }
  headline:    { fontFamily: "JetBrains Mono", cqw: 7.0, weight: 600, lineHeight: 1.08, tracking: "-0.02em" }
  display:     { fontFamily: "JetBrains Mono", cqw: 9.5, weight: 700, lineHeight: 1.02, tracking: "-0.03em" }
  number-hero: { fontFamily: "JetBrains Mono", cqw: 11.0, weight: 700, lineHeight: 0.95, tracking: "-0.03em" }
  number-unit: { fontFamily: "JetBrains Mono", cqw: 3.0, weight: 500, lineHeight: 1.0, tracking: "0.04em" }
  url-hero:    { fontFamily: "JetBrains Mono", cqw: 8.0, weight: 700, lineHeight: 1.0, tracking: "0" }

spacing:
  slide-pad: "7cqw"
  gap-md: "3cqw"
  gap-sm: "1.6cqw"
  hairline: "1px"
  radius-sm: "2px"
  radius-md: "3px"
  radius-lg: "4px"

components:
  terminal-panel:
    backgroundColor: "{colors.panel} (or rgba(0,2,8,0.88) over the ground)"
    border: "{borders.hairline}"
    rounded: "{spacing.radius-md}"
    shadow: "{glow.panel}"
    description: "The window content gathers in. Sharp corners (2-4px), a 1px cyan-15% border, a faint outer cyan glow. No gradient fill, no heavy shadow."
  prompt-line:
    typography: "{typography.prompt}"
    mark: "`> ` cyan prefix (weight 700), or `visitor@fiqlab:~$ ` in {colors.dim}"
    description: "A typed command line. The prefix is cyan; the command types on character by character; a block cursor trails it."
  block-cursor:
    glyph: "block U+2588 or thick bar — {colors.ink}, {glow.text}"
    motion: "blink — opacity 1<->0, steps(1), 1s loop. Never fades, never slides."
    description: "The one persistent motion in the whole piece. Trails typed text; stands alone on the closing URL."
  output-block:
    backgroundColor: "{colors.surface}"
    border: "{borders.hairline}"
    textColor: "{colors.ink}; metadata + comments in {colors.dim}"
    rounded: "{spacing.radius-sm}"
    description: "Command output — a file listing, a whoami dump, a blog index. Left-aligned, monospace, one line per row."
  glow-heading:
    typography: "{typography.headline} or {typography.display}"
    textColor: "{colors.ink}"
    shadow: "{glow.text}"
    description: "A section title that reads like a header printed to the terminal. Cyan, glowing. One per frame."
  amber-mark:
    textColor: "{colors.amber}"
    shadow: "{glow.text-amber}"
    description: "The single scarce highlight — one word, one number, or one path per frame. Never two ambers in one frame; amber never sets a whole line."
  scanline-overlay:
    background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.22) 3px 4px)"
    plus: "a very faint rgba(0,212,255,0.02) fill and a 1px vignette"
    description: "Full-bleed, pointer-through, sits above content at low opacity. Optional 2-3% brightness flicker every few seconds. This is the CRT."
  stat-lockup:
    typography: "{typography.number-hero} figure + {typography.number-unit} label"
    description: "`14+` / `PUBLICATIONS`. Figure cyan with glow; label dim, uppercase, tracked. Used once on the research beat."
---

# FiqLab Terminal — Frame (video / frame layer)

## Brand adaptation (READ FIRST — the frontmatter is the source of truth)

This frame layer was seeded from the **code-editorial** preset and then
**re-grounded** to fiqlab.dev's own design system (pulled from the site source:
`app/globals.css`, `tailwind.config.ts`, `components/terminal/*`). Ignore the
code-editorial doctrine (warm cream, coral, hairline-only, "no glow", "no pure
black") — it has been replaced. The YAML frontmatter above is **normative**.

The mental model: **every frame is a frame of a CRT terminal.** Black screen,
cyan phosphor text with a soft bloom, one amber highlight when something must
pop, scanlines over everything, a block cursor that blinks. Motion is typing,
blinking, and gentle glow — nothing bounces, nothing slides fast.

## The Frame

- **Primary:** 1080×1920 (9:16). Display authored in `cqw` (`px / 1080 * 100 = cqw`).
- **Also:** 1920×1080 (16:9), 1080×1080 (1:1) — re-step type above the legibility floor.
- **Safe area:** `slide-pad` ~7cqw on the short edge; the scanline overlay and any
  bottom caption band ignore it (full-bleed).
- **Container law:** every frame ground sets `container-type: size`; all
  frame-relative units are `cqw`/`cqh`, never `vw`. Border stays 1px on every ratio.

## Colors

- **Ground** is `{colors.canvas}` pure black, edge to edge, on a `class="clip"`
  background layer (never the `#root`).
- **Voice** is `{colors.ink}` cyan for every headline, command, and body line, with
  `{glow.text}` on headings and the closing URL (body copy may carry a lighter
  bloom or none).
- **Dim** `{colors.dim}` for metadata: prompts' host string, file sizes, dates,
  comment lines, stat labels.
- **Amber** `{colors.amber}` is the scarce second accent — **one moment per frame**:
  a single highlighted keyword, a count, or a path. Never a whole line, never two.
- **Panel / surface** `{colors.panel}` / `{colors.surface}` for the terminal window
  and output blocks — one step off black, 1px cyan-15% border, faint outer glow.
- **White** `{colors.white}` only for an inline `code` token, at most once.
- No second hue. No gradient on content. The only light in the system is the cyan
  glow bloom.

## Typography

One family: **JetBrains Mono** (fallback `ui-monospace, "Fira Code", Menlo, monospace`).

- **Legibility floor:** any load-bearing line >= **2.6cqw** at 9:16.
- Commands and output are **left-aligned**, never centered. Headlines and the
  closing URL may center.
- Weight 400 for body/output, 500-600 for prompts and titles, 700 for the display
  and the closing URL. Uppercase + wide tracking only for `kicker` / `mono-label`
  / stat labels.
- Sentence case for headings (they read as printed output, not posters).

## Motion register (frame-level intent; full rules in the workflow)

- **Type-on:** commands and headings appear character-by-character (or fast
  line-by-line for output blocks). ~30-45 chars/sec.
- **Blink:** the block cursor, opacity 1<->0 on `steps(1)`, 1s loop — the only
  looping motion.
- **Glow bloom:** a heading's `text-shadow` blur ramps up ~180ms as it lands.
- **Scanline flicker:** optional 2-3% brightness dip every 3-5s across the overlay.
- **Cuts:** hard cut or a fast 120ms fade-through-black between frames. No slides,
  no scale, no bounce, no easing overshoot.

## Components

- **terminal-panel** — the window content sits in. **output-block** — command
  output (listings, dumps).
- **prompt-line** — a typed command with a cyan `> ` prefix and a trailing cursor.
- **block-cursor** — the blinking block. **scanline-overlay** — the full-bleed CRT layer.
- **glow-heading** — the one cyan glowing title per frame. **amber-mark** — the one
  scarce amber highlight.
- **stat-lockup** — `14+` over `PUBLICATIONS`, used once.

## Frame Treatments

> Recipe: ground · what types on · focal · the one amber · cut.
> Every frame carries the scanline overlay. Cursor is present unless noted.

### 1 · Boot / prompt (identity · a cold terminal wakes)

**Ground** black. **Types on** `visitor@fiqlab:~$` in dim, then `whoami` in cyan,
then a short output block: `Taufiqurrahman — Researcher`, `computer vision · deep
learning · IoT on the edge`, `fiqlab.dev` (dim). **Focal** the `whoami` line + its
output. **Amber** none, or the word `Researcher`. **Cut** hard to frame 2.

### 2 · Research (AI / computer vision · `ls research/` -> glowing header + stats)

**Ground** black. **Types on** `> ls research/` then an output-block listing:
`computer-vision/  deep-learning/  intelligent-systems/  edge-ai/`. Then a
**glow-heading** prints: `AI & COMPUTER VISION RESEARCH`. Below it a **stat-lockup**
pair: `14+ PUBLICATIONS` · `10+ IP RIGHTS`. **Focal** the heading + stats.
**Amber** the `14+` figure (or `10+`), once. **Cut** hard.

### 3 · IoT / edge (`> cat iot/projects.md` -> device list)

**Ground** black. **Types on** `> cat iot/projects.md` then an output-block:
`# deploying models where the sensors are`, then lines
`-> raspberry pi · esp32 · microcontrollers`, `-> drones — aerial mapping & nav`,
`-> ground robots — autonomous navigation`. A small **glow-heading**: `IOT & EDGE`.
**Focal** the device list. **Amber** one path or the word `edge`. **Cut** hard.

### 4 · Writing (`> blog --latest` -> post index)

**Ground** black. **Types on** `> blog --latest` then an output-block of 3 rows,
each `dim date  ` + cyan title:
`2026  Deploying Computer Vision Models on IoT Edge Devices`,
`2026  Getting Started with YOLOv8`,
`2026  Detecting Plant Diseases with CNN`.
A **glow-heading**: `WRITING`. **Focal** the post list. **Amber** one tag e.g.
`[yolo]` on the YOLOv8 row. **Cut** hard.

### 5 · Close / URL (`> open fiqlab.dev` -> the URL blooms, cursor blinks)

**Ground** black. **Types on** `> open fiqlab.dev`. Then the screen clears and
**`fiqlab.dev`** prints large and centered as `url-hero`, cyan, full `{glow.text}`,
with the **block-cursor** blinking after it. One dim line under it:
`computer vision · deep learning · IoT`. **Amber** none — keep the close pure cyan.
**Hold** ~2.5s on the blinking cursor. **End.**

## Composition Rules

### Do
- Stand every frame on **pure black**; put the scanline overlay above all content.
- Set everything in **JetBrains Mono**, left-aligned for commands/output.
- Glow the **one heading** and the **closing URL**; keep body bloom subtle.
- Ration **amber to one mark per frame**.
- Let text **type on**; let only the **cursor blink**.
- Trace every command to a real fiqlab feature (`whoami`, `ls`, `cat`, `blog`,
  `open` all exist on the site).

### Don't
- No non-black ground, no gradient on content, no second accent hue beyond amber.
- No slide / scale / bounce / overshoot transitions; no motion loops except the cursor.
- No centered command lines; no uppercase headline runs except `kicker` chrome.
- No invented stats — `14+ publications`, `10+ IP rights`, `4 books`,
  `14+ community service` are the only figures; blog titles are verbatim.
- No two amber marks in one frame.

## Aspect-Ratio Behavior

| Treatment  | 9:16 (primary)              | 16:9                      | 1:1                     |
| ---------- | --------------------------- | ------------------------- | ----------------------- |
| Boot       | prompt top, output stacked  | prompt left, output right | prompt centered block   |
| Research   | heading over stacked stats  | heading left, stats right | heading top, stats row  |
| IoT/edge   | list stacked, heading below | list left, heading right  | list centered           |
| Writing    | 3 rows stacked full-width   | rows left, heading right  | rows centered           |
| Close/URL  | URL centered, cursor after  | URL centered              | URL centered            |

`slide-pad` holds on the short edge; re-step type above the 2.6cqw floor. The
scanline overlay and cursor are identical on every ratio.

## Fonts

**JetBrains Mono** is the only face — it ships with this project as a variable
woff2 under `assets/fonts/` (one file covers weights 100–800). **Every frame
HTML must inline this exact `@font-face` block** (paths are project-root
relative, never `../`):

```css
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 100 800;
  font-display: block;
  src: url(assets/fonts/jetbrains-mono-latin.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215;
}
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 100 800;
  font-display: block;
  src: url(assets/fonts/jetbrains-mono-latin-ext.woff2) format("woff2");
  unicode-range: U+0100-02BA, U+1E00-1E9F, U+2020, U+20A0-20AB, U+2C60-2C7F, U+A720-A7FF;
}
```

Fallback stack `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Monaco,
Consolas, monospace` — every fallback is monospace, so a drop never changes the
terminal read. Weights used: 400, 500, 600, 700 (all from the one variable file).

**The block cursor is CSS, not a glyph** — draw it as a `<span>` with a solid
cyan `background` (roughly `0.62em` wide × `1.05em` tall, baseline-aligned),
never the Unicode block character (it is outside the shipped subset). Blink it
with `opacity: 1 ↔ 0` on `steps(1)`, 1s.

## Numerals & Claims (hard rule)

The only figures that may appear: `14+` publications, `10+` IP rights, `4` books,
`14+` community service. Blog post titles are verbatim from the site. Dates render
as `2026`. Never invent a metric, a device, or a paper.

## Pre-Render Self-Audit

- **Squint** — one cyan glow-heading (or the URL) dominates each frame.
- **Ground** — pure black, full-bleed, on a background clip; scanline overlay on top.
- **Type** — JetBrains Mono only; commands/output left-aligned; >=2.6cqw floor.
- **Colour** — cyan voice, dim metadata, at most one amber mark; no third hue.
- **Motion** — text types on; only the cursor blinks; cuts are hard or 120ms
  fade-through-black.
- **Truth** — every command maps to a real site feature; every figure/title is real.
