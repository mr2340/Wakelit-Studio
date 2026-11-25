# Caption & Typography Guidelines (Wakelit)

> **Purpose:** Specifications for caption rendering, font, positioning, timing, subtle shake, and blend modes.
> **Source:** `captions_subtle_BLACK_screen-blend.mp4`, `AGENT_BRIEF_01`, and `AGENT_BRIEF_02`.

---

## 1. Typographic Styling
- **Typeface:** **Comic Relief** (or rounded bold Comic Sans-style).
- **Font Weight:** Bold.
- **Font Size:** **54 px** at 1080p (cards: **66 px**; counters: **76 px**).
- **Color:** Bone white (`#EDE6D6` / `#FFFFFF`).
- **Stroke / Outline:** Solid dark outline of **4 px** (`#181818`). No background box or pill container.
- **Line Length:** Strictly **one single line** of 2 to 9 words (maximum ~45 characters). Never split into awkward multi-line blocks.

---

## 2. On-Screen Coordinates (1080p Canvas)

| Caption Type | Alignment | Horizontal (X) | Vertical (Y) | Safe Margin Context |
|--------------|-----------|----------------|--------------|---------------------|
| **Bottom (Standard)** | Centered | `x = 960` | Baseline: `y ≈ 966` (Center: `y ≈ 940`) | Sits ~18 px above the bottom letterbox bar. Used in 80% of shots. |
| **Top (Close-Ups)** | Centered | `x = 960` | Top: `y ≈ 182` | Used whenever Ayo's face is centered in close-up. |
| **Phone Side-Dock** | Right-Docked | `x ≈ 1500–1850` | Center: `y ≈ 540` | In the empty space beside the vertical phone screen. |
| **Black Card Title** | Centered | `x = 960` | Center: `y ≈ 500` | Centered on full-black time skips. |
| **Counter (NIGHT n)** | Top-Left | `x ≈ 112` | Top: `y ≈ 150` | Sits top-left inside active safe area. |

---

## 3. Caption Animation & The Hand-Drawn "Shake" [MEASURED]
To match the organic hand-drawn aesthetic of the film, captions are not sterile static text; they exhibit a subtle, lively wobble:

- **Subtle Shake Spec (Default):**
  - Random position drift: **±3 px** in X and Y.
  - Random rotation: **±0.4°**.
  - Rate: New position every **3 frames** (10 changes per second).
- **Entrance Pop-In:** Scale 92% → 100% and opacity 60% → 100% over **3 frames** (0.10s).
- **Exit Fade-Out:** Opacity 100% → 0% over **3 frames**.
- **Important Exceptions:**
  - Time-skip **black cards do NOT shake** (0 px movement).
  - Top-left **counter labels (NIGHT n) do NOT shake**.

---

## 4. The Whisper Layer (The Shade's Voice)
- **Styling:** Pale blue (`#9CC4FF`), *italic*, enclosed in quotes (e.g. `"just one more."`).
- **Opacity:** Approximately **65%** (semi-translucent).
- **Font Size:** **50 px**.
- **Placement:** Placed directly beside the Shade at eye-level when on screen; otherwise in the upper right (`x ≈ 1450, y ≈ 430`).
- **Shake:** Shakes with the standard subtle ±3px wobble.

---

## 5. Screen Blend Overlay Production Method
In programmatic video editing, captions are rendered as an isolated video layer:
- White text on solid black background (`captions_subtle_BLACK_screen-blend.mp4`).
- Composited over the video track using FFmpeg `blend=all_mode='screen'` or `colorkey=black` filter.
- Guarantees zero degradation of underlying Flow visual clips.

---

## 6. The Opening Black Screen & Keyword Highlight Pill [MEASURED]
As documented in [knowledge/intro-and-caption-reference.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/intro-and-caption-reference.md):
- **Black-Screen Opening:** Begins on 2 frames of pure silence and blackness (`0.00s–0.07s`).
- **Typewriter Progression:** Types clause letter-by-letter over 0.93s (`0.07s–1.00s`).
- **Keyword Highlight Pill:** At `1.03s`, the final keyword pops in enclosed inside a warm amber pill box (`#E89D42` / `#FF7A00`) with rounded capsule corners (`border-radius: 9999px`) and pitch black text (`#000000`).
- **Hold & Fade:** The complete card holds static for 1.20s (`1.13s–2.33s`), fades out over 8 frames (`2.37s–2.60s`), holds 1 pure black frame at `2.63s`, and hard cuts into Scene 001 at `2.67s` as audio hits.
