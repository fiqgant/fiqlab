---
workflow: product-launch-video
flow: automation
storyboard: no
message: "fiqlab.dev — a computer-vision & IoT researcher's world, explored through a terminal"
destination: shorts
aspect: 1080x1920
language: en
audience: "Researchers, engineers, recruiters, and students discovering Taufiqurrahman's work"
length: 20-30s
angle: terminal-world-tour
---

## Intent

A 20-30s vertical promo for **fiqlab.dev**, the personal research site of
Taufiqurrahman (Researcher, Politeknik Wilmar Bisnis Indonesia). The video must
feel like the site itself: pure black, JetBrains Mono, cyan `#00d4ff` glow,
CRT scanlines, a blinking block cursor, and the site's real **terminal mode**.

Angle — "terminal-world tour": open on a boot / prompt, then typed commands
reveal the three pillars in that terminal world:
1. **AI / computer-vision research** — computer vision, deep learning, intelligent
   systems; 14+ publications, 10+ IP rights.
2. **IoT / edge projects** — AI models on embedded devices (Raspberry Pi, ESP32,
   microcontrollers), drones, robots.
3. **Blog articles** — real posts: "Deploying Computer Vision Models on IoT Edge
   Devices", "Getting Started with YOLOv8", "Detecting Plant Diseases with CNN".

Close: blinking cursor resolves to the URL **fiqlab.dev**.

Clean, minimal, dark. Motion is typed text, scanline flicker, soft glow bloom —
nothing bouncy. Silent or light ambient bed only; no voiceover.

## Assets

Design system is taken directly from the site source repo (this is fiqlab's
codebase), not scraped:
- Palette: bg `#000000`, primary `#00d4ff` (+ glow), secondary accent `#ffb000`,
  dim `#0077cc`, card `#000510` / `rgba(0,2,8,0.88)`, borders cyan @ 15%.
- Font: JetBrains Mono (mono stack).
- Signature effects: CRT scanline overlay (2px repeating gradient), text-glow
  (`0 0 12px` cyan), blinking block cursor (1s step-end), `> ` prompt prefix,
  glass panels with cyan-15% borders, faint noise texture.
- Terminal commands that exist on the real site: `help`, `whoami`, `ls`,
  `cat`, `blog`, `open`.

## Customizations

- Recreate the site's terminal aesthetic in-composition (no live screenshot
  capture needed — design tokens are authoritative from source).
- End card: `fiqlab.dev` with blinking cursor, cyan glow.

## Notes

- User typed "fiqlba.dev" in the request — that is a typo. Correct URL is
  **fiqlab.dev**.
- No bouncy / playful motion. Terminal-authentic only: type, flicker, bloom.
- Keep text large and legible for a phone screen (9:16).
