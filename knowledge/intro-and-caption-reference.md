# INTRO & CAPTION REFERENCE SPECIFICATION [TESTED] [MEASURED]

> **Empirical Reference Source:** `projects/sample-project/input/references/Lust Is Killing You..mp4` & `projects/sample-project/input/assets/captions_subtle_BLACK_screen-blend.mp4`  
> **Frame Analysis Directory:** `assets/eval_frames/lust_intro_exact/`  
> **Epistemic Status:** `[MEASURED]` frame-by-frame on reference master at 30 fps; `[TESTED]` via FFmpeg and image inspection.

---

## 1. The Opening Black Screen & Kinetic Typography Breakdown

The film does NOT fade in from black into a video scene. It begins on an intentional, high-contrast, silent black canvas that sets an intimate, confessional psychological contract with the viewer.

### 1.1 Empirical Frame-by-Frame Timeline (30 fps)

| Frame Range | Timecode (s) | Duration | Visual State | Screen Description |
|---|---|---|---|---|
| **Frame 1–2** | `0.00s – 0.07s` | 0.07s (2 frames) | Pure Black (#000000) | Absolute negative void. Zero text, zero light. Dead silence. |
| **Frame 3–30** | `0.07s – 1.00s` | 0.93s (28 frames) | Typewriter Reveal | Opening clause types out letter-by-letter: `"It started with just one "` at ~22–25 characters per second (0.040s–0.045s per glyph). |
| **Frame 31–34** | `1.03s – 1.13s` | 0.10s (4 frames) | Keyword Pop & Scale | The keyword (`"video"` in reference, `"night"` or `"tomorrow"` in Wakelit) pops in enclosed in an amber pill. Starts scaled down (~80%) and bounces up to 100%. |
| **Frame 35–71** | `1.13s – 2.33s` | 1.20s (36 frames) | Complete Line Hold | Full graphic holds static: `"It started with just one [video] ."`. Zero shake or drift on this opening card. |
| **Frame 72–79** | `2.37s – 2.60s` | 0.23s (8 frames) | Opacity Fade-Out | Linear opacity reduction from 100% to 0% across both text and highlight pill. |
| **Frame 80** | `2.60s – 2.63s` | 0.03s (1 frame) | Pure Black Beat | Single frame of total black before scene entry. |
| **Frame 81+** | `2.67s` | Cut | Scene 001 Hard Cut | Video Scene 1 appears via a crisp hard cut (basketball court / Ayo at midnight desk) as the audio bed hits. |

---

## 2. The Keyword Highlight Pill Treatment

Unlike generic subtitle burns, the opening keyword is isolated into a graphic pill box that commands focal attention.

### 2.1 Visual Geometry & Color Specs
- **Font Family:** Comic Relief / Comic Sans MS Bold (rounded, handwritten, non-corporate).
- **Base Text Styling:** Bone white (`#EDE6D6` / `#FFFFFF`), 54px font size at 1080p (36px at 720p). Thin dark outline (`#181818`, 4px width).
- **Highlight Pill Box:**
  - **Color:** Warm Amber / Orange (`#FF7A00` in reference; Wakelit Brand Amber `#E89D42`).
  - **Border Radius:** Fully rounded pill / capsule shape (`border-radius: 9999px` or corner radius 12–16px).
  - **Padding:** Horizontal padding ~14–18px, Vertical padding ~6–8px around the text.
  - **Contained Text Color:** Solid pitch black (`#000000` / `#111111`) with zero outline, creating maximum contrast against the amber fill.
- **Punctuation:** The terminal punctuation (period `.`) sits outside the pill in white with dark outline, appearing immediately upon pill settlement.

---

## 3. Screen Positioning & Staging Law

1. **Centering:** The entire composite line (`"It started with just one [night] ."`) is centered horizontally at `x = 960` (for 1920x1080 canvas).
2. **Vertical Anchor:** Vertical center sits slightly above optical center at `y ≈ 500` (within the 1920x888 active picture area, above the 96px bottom letterbox bar).
3. **No Movement / No Shake:** Black-card cards and title cards are strictly static (`shake = 0px`). Micro-shake (±3px boiling) is reserved strictly for scene narrative captions.

---

## 4. Audio Synchronization During Intro

- **0.00s – 2.60s:** Pure dead silence or single isolated mechanical wall clock tick (60 BPM). No music, no synthesized risers, no swooshes.
- **2.67s (Frame 81):** Exact timestamp where Scene 001 cuts in and the midnight room tone / 45Hz sub-bass drone enters. The audio cut is frame-accurate with the visual cut.
