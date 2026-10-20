---
format: 1080x1920
duration: 26s
message: "fiqlab.dev — a computer-vision & IoT researcher's world, explored through a terminal"
arc: Boot → Research → Edge → Writing → URL
audience: Researchers, engineers, recruiters, students discovering Taufiqurrahman's work
mode: autonomous
music: none
---

## Video direction

The entire video is one continuous shot of a **CRT terminal** — pure black
ground, cyan `#00d4ff` phosphor text with a soft glow bloom, one amber
`#ffb000` mark per frame, a full-bleed **scanline overlay** above all content,
and a **blinking block cursor**. It reads as one uninterrupted session: each
frame is the next command typed at the same prompt.

- **palette system** (from `frame.md`): ground `canvas` #000000 on a full-bleed
  background clip · all text `ink` #00d4ff · metadata / dates / host string /
  stat labels `dim` #0077cc · exactly one `amber` #ffb000 mark per frame ·
  output panels `surface` #00080d with a 1px cyan-15% border + faint outer glow.
  The one glow-heading per frame and the closing URL carry `glow.text`; body
  and output lines carry little or none. No third hue, no gradient on content.
- **motion grammar + reveal model**: there is no voiceover — reveals are paced
  to the **typing rhythm**. At each frame's t=0 only the prompt prefix is on
  screen; the command **types on** character-by-character (~34 ch/s) behind a
  trailing block cursor; on "enter" the output **prints line-by-line** (fast
  120-160ms cascade); then the one glow-heading lands with a ~180ms glow bloom.
  Curves are long-tail (`power3`), never bouncy. Only the **cursor blinks**
  (opacity 1<->0, `steps(1)`, 1s) — nothing else loops.
- **rhythm / held-frame allocation**: Frame 1 (boot) and Frame 5 (URL) are the
  **held/breather beats** — after their content types on they hold dead still on
  the blinking cursor. Frames 2-4 stay active the whole duration (command types,
  output cascades, heading blooms) so energy sits in the middle and settles at
  both ends.
- **negative list**: no non-black ground, no gradient/vignette-as-decoration
  beyond the CRT overlay, no second accent hue past amber, no lens flare, no
  floating particles/bokeh, no "AI" purple-blue haze. No slide / scale-in /
  bounce / overshoot; no motion loop except the cursor. **Not a slideshow**
  (nothing front-loads — every line waits for the one before it) and **not a
  screensaver** (nothing drifts on its own). No centered command lines; no real
  browser chrome, nav, scrollbars, or OS cursor.
- **caption band**: captions are off (silent), but keep all content in the top
  ~83% anyway for bottom-edge consistency.

## Frame 1 — Boot / whoami

- scene: A cold terminal wakes; `whoami` types and prints the identity
- duration: 5s
- transition_in: cut
- status: outline
- type: hook
- beat: identity
- src: compositions/frames/01-boot.html
- blueprint: typewriter-reveal (Adapt)
- focal: the `whoami` command line + its output block (no raster assets — pure CSS terminal)

Adapt: keep typewriter-reveal's "someone is typing this" engine and the blinking
caret; drop the collapse-to-brand-pop — instead of a logo payoff the typed
command resolves into a printed identity block. The signature move (a live caret
typing a line as a human would) is the spine.

Scene 1 (0.0-0.6s): pure-black ground on a full-bleed background clip; scanline
overlay on top; a dim `visitor@fiqlab:~$ ` prompt sits upper-left inside
`slide-pad`, block cursor blinking after it. Left-aligned, full-width strip,
upper-third. -> cursor blink `context-sensitive-cursor`.
Scene 2 (0.6-1.8s): `whoami` types on in cyan character-by-character behind the
trailing cursor. Nothing else on screen. -> type-on `discrete-text-sequence` (+
`context-sensitive-cursor`).
Scene 3 (1.8-3.4s): the command "enters" (cursor drops to next line); an
`output-block` prints line-by-line in a fast cascade — `Taufiqurrahman —
Researcher`, `computer vision · deep learning · IoT on the edge`, `fiqlab.dev`
(this last line `dim`). The word `Researcher` is the single `amber-mark`.
Layout: output block left-aligned directly under the command, ~70% width, 3
depth layers (ground / scanlines / text). -> line cascade
`dynamic-content-sequencing`.
Scene 4 (3.4-5.0s): held. Everything still; the block cursor blinks on the line
below the output. Prefer stillness — no drift. -> cursor blink
`context-sensitive-cursor`.

## Frame 2 — Research (AI & computer vision)

- scene: `ls research/` lists the fields, then a glowing header and two stats
- duration: 5.5s
- transition_in: cut
- status: outline
- type: key_feature
- beat: proof / breadth
- src: compositions/frames/02-research.html
- blueprint: prompt-type-submit-generate (Adapt)
- focal: the glow-heading `AI & COMPUTER VISION RESEARCH` + the stat lockup (no raster assets — pure CSS terminal)

Adapt: keep prompt-type-submit-generate's "type a command -> the machine
answers" loop and its status->result structure; the "generated artifact" is a
directory listing + a printed section header + stat lockup rather than a
streaming AI answer. Signature move (keyboard drives, machine responds in the
same beat) kept.

Scene 1 (0.0-0.5s): same prompt position carried from Frame 1 (continuous
session); cursor blinking. Left-aligned upper strip.
Scene 2 (0.5-1.7s): `> ls research/` types on in cyan behind the cursor. ->
type-on `discrete-text-sequence`.
Scene 3 (1.7-2.9s): output prints — one line, four dim directory names spaced
across it: `computer-vision/   deep-learning/   intelligent-systems/
edge-ai/`. Left-aligned under the command, full-width strip. -> line cascade
`dynamic-content-sequencing`.
Scene 4 (2.9-4.0s): a `glow-heading` prints per-word: `AI & COMPUTER VISION
RESEARCH`, cyan, glow bloom ramping ~180ms as it lands. Sits mid-frame, ~60%
width, dominant element (size 3:1 over the listing). -> per-word reveal
`dynamic-content-sequencing`; glow bloom inline.
Scene 5 (4.0-5.5s): a `stat-lockup` row reveals beneath it — `14+` over
`PUBLICATIONS` and `10+` over `IP RIGHTS`, figures cyan (glow), labels dim +
uppercase + tracked. The `14+` figure is the single `amber-mark`. Two columns,
lower-third of the safe area. Then holds still. -> figures print at final value
(no count-up — a terminal prints the result); reveal `dynamic-content-sequencing`.

## Frame 3 — IoT & edge

- scene: `cat iot/projects.md` prints the edge-device work
- duration: 5s
- transition_in: cut
- status: outline
- type: key_feature
- beat: breadth / hands-on
- src: compositions/frames/03-iot-edge.html
- blueprint: prompt-type-submit-generate (Adapt)
- focal: the printed device list inside the output block (no raster assets — pure CSS terminal)

Adapt: same type-a-command->machine-answers loop as Frame 2; the artifact is a
printed markdown file. Signature move kept. Vary the framing from Frame 2 — here
the output block is the dominant element (a full panel), the heading is small.

Scene 1 (0.0-0.4s): prompt + blinking cursor, carried position.
Scene 2 (0.4-1.6s): `> cat iot/projects.md` types on in cyan. -> type-on
`discrete-text-sequence`.
Scene 3 (1.6-3.4s): an `output-block` (surface #00080d, 1px cyan-15% border,
faint glow) prints line-by-line: a dim comment `# deploying models at the edge`,
then `-> raspberry pi · esp32 · microcontrollers`, `-> drones — aerial mapping
& nav`, `-> ground robots — autonomous navigation`. The word `edge` in the dim
comment is the single `amber-mark`. Panel ~78% width, centered vertically,
dominant (>=40% of canvas). -> line cascade `dynamic-content-sequencing`.
Scene 4 (3.4-4.2s): a small `glow-heading` `IOT & EDGE` prints under the panel,
cyan with glow bloom, ~35% width, secondary to the panel. -> reveal + glow bloom
`dynamic-content-sequencing`.
Scene 5 (4.2-5.0s): held still; cursor blinks below. -> `context-sensitive-cursor`.

## Frame 4 — Writing (blog)

- scene: `blog --latest` prints the three most recent posts
- duration: 5.5s
- transition_in: cut
- status: outline
- type: key_feature
- beat: it's all written down
- src: compositions/frames/04-writing.html
- blueprint: prompt-type-submit-generate (Adapt)
- focal: the three-row post index (no raster assets — pure CSS terminal)

Adapt: same command->answer loop; the artifact is a blog index. Signature move
kept. Framing: three full-width rows stacked — a list, distinct from Frame 3's
single panel and Frame 2's heading+stats.

Scene 1 (0.0-0.4s): prompt + cursor, carried position.
Scene 2 (0.4-1.5s): `> blog --latest` types on in cyan. -> type-on
`discrete-text-sequence`.
Scene 3 (1.5-3.6s): output prints three rows in a staggered cascade, each row =
dim `2026` + two-space gap + cyan title:
`2026   Deploying Computer Vision Models on IoT Edge Devices`
`2026   Getting Started with YOLOv8`
`2026   Detecting Plant Diseases with CNN`
Left-aligned, full-width strips, stacked in the upper-mid safe area. On row 2 an
amber tag `[yolo]` prints at the end of the line — the single `amber-mark`. ->
staggered rows `dynamic-content-sequencing`.
Scene 4 (3.6-4.6s): a `glow-heading` `WRITING` prints beneath the list, cyan
with glow bloom, ~30% width. -> reveal + glow bloom `dynamic-content-sequencing`.
Scene 5 (4.6-5.5s): held; cursor blinks on the next line. ->
`context-sensitive-cursor`.

## Frame 5 — Close / open fiqlab.dev

- scene: `open fiqlab.dev` types, the screen clears, the URL blooms large with a blinking cursor
- duration: 5s
- transition_in: cut
- status: outline
- type: cta
- beat: go there
- src: compositions/frames/05-close-url.html
- blueprint: typewriter-reveal (Adapt)
- focal: the `fiqlab.dev` url-hero + trailing block cursor (no raster assets — pure CSS terminal)

Adapt: this is typewriter-reveal in its Brand_Outro shape — a typed line
resolves into the final ask. Keep the caret engine and the clear-to-payoff
move; the payoff is the URL as type, not a logo. Signature move (live caret
typing) kept; the "collapse then spring-pop" becomes a clean clear-and-print
(no spring — a terminal doesn't bounce).

Scene 1 (0.0-0.4s): prompt + cursor, carried position, upper-left.
Scene 2 (0.4-1.5s): `> open fiqlab.dev` types on in cyan behind the cursor. ->
type-on `discrete-text-sequence`.
Scene 3 (1.5-2.0s): screen clears — all prior lines cut to black in one 120ms
fade-through-black (not a slide). -> clear via `scale-swap-transition` (fade
out only, no incoming scale).
Scene 4 (2.0-2.6s): `fiqlab.dev` lands centered as `url-hero` (cyan, weight
700, full `glow.text` bloom) with the glow bloom ramping ~200ms. A dim sub-line
prints under it: `computer vision · deep learning · IoT`. Centered, ~70% width,
dominant. -> reveal + glow bloom `dynamic-content-sequencing`.
Scene 5 (2.6-5.0s): the block cursor blinks steadily just after `fiqlab.dev`.
Everything else dead still. Hold to end. This is the final frame's real hold. ->
cursor blink `context-sensitive-cursor`.
