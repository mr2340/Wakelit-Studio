# Wakelit Visual Production Rules

**Status:** Living production standard.  
**Classification System:**
- `[CONFIRMED]` = Mandated by user instructions and briefs.
- `[OBSERVED]` = Measured directly from reference films (`Day One Films`).
- `[RECOMMENDED]` = Technical implementation guidance for Flow & FFmpeg.
- `[PENDING APPROVAL]` = Architectural choices awaiting explicit user sign-off.

---

## 1. Core Format & Geometry

- `[CONFIRMED]` **Master Canvas:** 1920 × 1080 at 30.00 fps.
- `[CONFIRMED]` **Letterbox Bars:** Exactly 96 px black bars at top and bottom. Active image canvas is **1920 × 888** (y = 96 to y = 984).
- `[CONFIRMED]` **Safe Zone:** All characters, key props, and text MUST sit inside the active picture (y 96–984).
- `[OBSERVED]` **Stage Grounding:** Floor line sits consistently at **y ≈ 750–800** (70–75% down the screen).
- `[CONFIRMED]` **Thumbnails:** Full 16:9 canvas (1920×1080 or 1280×720), NO letterbox bars, huge chunky white text with one amber word.

---

## 2. Character Integrity & Proportions: Ayo

- `[CONFIRMED]` **Design Identity:** Ayo is a soft "bean in a hoodie". Made of simple flat shapes with thin dark wobbly outline (~2px).
- `[CONFIRMED]` **Strict Anatomy:**
  - Round ball head in deep brown (`#613729`).
  - Merged directly into mustard hoodie (`#D2A23E`). **NO neck.**
  - Hood is always DOWN around neck like a soft collar. Never up.
  - Two black dot eyes with tiny white highlights.
  - Two short curved eyebrows. **Brows carry all emotion.**
  - Small line/curve mouth.
  - **NO nose, NO ears, NO fingers, NO hair, NO 3D shading, NO gradients.**
  - Mitten hands (round blobs with small thumb bump).
  - Short thin grey legs (`#666668`) with small white shoes (`#EDEEF0`).
- `[CONFIRMED]` **Proportions:** Head is ~1/3 of total height. Hoodie body is ~1.25x head width. Legs are ~1/5 of total height.
- `[CONFIRMED]` **The Seven Approved Expressions:**
  1. `Tired / Worried`: Inner brows raised, sloping down outside; half-lidded eyes; small flat mouth.
  2. `Blank / Neutral`: Straight level brows, round open eyes, tiny straight mouth line.
  3. `Determined`: Lowered inward V-shaped brows, focused round eyes, firm mouth line.
  4. `Afraid / Shocked`: Brows raised high, enlarged eye dots (130%), tiny open "o" mouth.
  5. `Relieved / Soft Smile`: Gentle arched brows, soft lidded eyes, small upward curve mouth.
  6. `Sleeping`: No brows, two closed thin arcs for eyes, small relaxed mouth line.
  7. `Sad / Low`: Inner brows strongly raised, watery eye highlights, small downward curve mouth.
- `[CONFIRMED]` **Cast Family Resemblance:** All friends and adults use the exact same bean body, mitten hands, and dot eyes. Distinguished ONLY by head tone, clothing color, and one approved prop/hair shape. **Ayo is the ONLY character permitted to wear mustard/amber.**

---

## 3. The Antagonist: The Shade

- `[CONFIRMED]` **Visual Appearance:** Soft rounded solid-black blob (`#000000`) with wavy ink-like edges.
- `[CONFIRMED]` **Facial Details:** Two thin horizontal slit eyes in pale blue (`#9CC4FF`). When smiling, slits curve into crescents. **NO mouth ever.**
- `[CONFIRMED]` **Lighting & Aura:** Thin cold-blue rim light glow (~3px) around its silhouette, intensified towards screens.
- `[CONFIRMED]` **Feeding Scale Stages:**
  - Stage 0: Under bed, eyes only.
  - Stage 1: Knee-high (40% of seated Ayo).
  - Stage 2: Cat-sized (60%).
  - Stage 3: Bed height (100%).
  - Stage 4: "The Beast" ceiling-filling mass.
  - Stages 5–8: Shrinking across Night 1 (120%) down to Night 30 (25% coat on chair).

---

## 4. Color Hierarchy & Meaning

- `[CONFIRMED]` **Dual Color Philosophy:**
  - **Cold Blue (`#6FA8FF`, `#9CC4FF`):** Represents temptation, screen addiction, late-night isolation, the Shade.
  - **Warm Amber (`#E8A33D`, `#ECD8B7`):** Represents human connection, morning dawn, recovery, progress, open doors.
  - Rule: Never mix cold blue and warm amber at full strength on the same object. They meet only at the turning point (door opening).
- `[CONFIRMED]` **Background Colors:** Ink black (`#0B0D14`), Slate navy (`#1B2233`), near-black shadows.

---

## 5. Editing, Timing & FFmpeg Assembly

- `[CONFIRMED]` **Target Duration:** 2:45 to 3:20 (165s to 200s).
- `[CONFIRMED]` **Pacing Spec:** New shot or visual movement every **3 to 5 seconds**. Median shot length: **4.0 seconds**. Never hold a frozen still longer than 2.0s without micro-movement.
- `[CONFIRMED]` **Transitions:** 100% hard cuts (or 1–3 frame micro-dissolves). Absolutely zero wipes, zooms, spins, or whip-pans.
- `[CONFIRMED]` **Time-Skip Black Cards:** Built frame-accurately:
  - Total duration: **2.63 seconds** (79 frames @ 30fps).
  - Fade-in: 7 frames; Hold: 59 frames; Fade-out: 7 frames.
  - Text: Bold rounded Comic Relief, ~66px, centered at `y ≈ 500`.
  - Audio: Complete silence starting 0.7s before fade-out and ending 0.07s after cut to next scene.
- `[CONFIRMED]` **True Silences:** Every film must have at least two deliberate dead silences (< -50 dB):
  1. The end of the time-skip black card (~1.05s).
  2. Right before the turning point beat (~1.1s before "He did the maths").

---

## 6. Captions & Typography

- `[CONFIRMED]` **Font:** Bold rounded Comic-style (Comic Relief / Comic Sans bold).
- `[CONFIRMED]` **Color & Stroke:** Bone white (`#EDE6D6` / `#FFFFFF`), 4px dark shadow outline (`#181818`), no background box.
- `[CONFIRMED]` **Size & Placement:**
  - Standard Bottom: 54px, centered at `x = 960`, baseline at `y ≈ 966` (~18px above letterbox bar).
  - Top (Close-ups): 54px, centered at `x = 960`, top at `y ≈ 182`.
  - Phone Side: 54px, docked right of phone screen (`x ≈ 1500–1850`).
  - Black Card: 66px, centered at `x = 960, y ≈ 500`.
  - Counters (`NIGHT n`): 76px, top-left at `x ≈ 112, y ≈ 150`.
- `[CONFIRMED]` **Animation & Shake:**
  - Subtle random position wobble: `±3px` in X/Y, rotation `±0.4°`, shifting every 3 frames (10 fps).
  - Pop-in: Scale 92% → 100%, opacity 60% → 100% over 3 frames.
  - Black cards and counters do NOT shake.
- `[CONFIRMED]` **The Whisper Layer:** Pale blue (`#9CC4FF`), italic, ~50px, opacity ~65%, placed beside the Shade at eye level.

---

## 7. Dual Production Modes

- `[CONFIRMED]` **Mode A (Voiceover-Driven):** Script written with narration voiceover. Visuals, cuts, and captions synchronize with spoken cadence.
- `[CONFIRMED]` **Mode B (Visual-Only):** Zero spoken dialogue. Narrative carried purely by on-screen caption progression, character micro-acting, HUD counters, ambient sound design, and music.

---

## 8. Open Questions & Recommendations Requiring User Approval

1. `[PENDING APPROVAL]` **Default Production Mode:** For our upcoming production tests, should we default to Mode A (with voiceover whispers) or Mode B (visual + captions only)?
2. `[PENDING APPROVAL]` **Ayo Anchor Placement:** Should we copy `Character_Ayo_looking_tired_and_5ce88056_2K.jpg` into `knowledge/assets/ayo_anchor.png` as our permanent global lock asset?
3. `[RECOMMENDED]` **FFmpeg Subtitle Generation:** We should compile an automated ASS/SRT generator in `video-editor.js` using the exact `Comic Relief` style and coordinates from Brief 02.
