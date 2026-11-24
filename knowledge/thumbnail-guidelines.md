# Wakelit Studio: YouTube Thumbnail Master Guidelines

This guide establishes the visual psychology, composition rules, color theory, and technical specifications for generating high-click-through-rate (CTR) YouTube thumbnails for Wakelit animated films, based on our analysis of **@dayonefilmsofficial** and **@MonkModeFilms**.

---

## 1. Technical Specifications

- **Canvas Dimensions:** 1280 × 720 pixels (16:9 aspect ratio).
- **Format:** JPEG / PNG, under 2 MB.
- **Color Space:** sRGB (high vibrancy, high contrast).
- **Safe Area:** Keep critical visual focal points away from the bottom-right corner (where YouTube displays the video duration timestamp pill, approx. 180×60 px).
- **Mobile Scale Test:** The thumbnail must remain instantly legible and emotionally evocative when shrunk down to **120 × 68 pixels** (mobile feed card size).

---

## 2. Channel Reference Analysis (Saved in `projects/sample-project/input/references/thumbnails/`)

We inspected and downloaded 8 master reference thumbnails from both channels:

### @dayonefilmsofficial (Emotional Confrontation & Relatability)
1. **`dayone_1_URwzQvDxKCQ_YOUR_BRAIN_IS_FRIED.jpg`**:
   - *Visual:* Protagonist slumped in darkness, harsh blue/cyan screen light illuminating the forehead/brain area.
   - *Psychological Hook:* Direct identification with mental burnout, insomnia, and cognitive fatigue.
2. **`dayone_2_exSRuLu9sxg_You_Are_Not_Broken.jpg`**:
   - *Visual:* Tiny solitary figure standing under a faint beam of light within an overwhelming dark void (85% negative space).
   - *Psychological Hook:* Deep empathy and reassurance; contrasts feelings of guilt with hope.
3. **`dayone_3_D8T891uWpiE_SELF_RESPECT.jpg`**:
   - *Visual:* Eye-level confrontation between character and a looming shadowy silhouette in a doorway.
   - *Psychological Hook:* Internal conflict, discipline vs. indulgence.
4. **`dayone_4_V_kg3pz7fIk_You_Dont_Have_Time.jpg`**:
   - *Visual:* Glowing red/amber digital clock face towering over the character sitting on a bed.
   - *Psychological Hook:* Urgency, loss of time, ticking clock of life.

### @MonkModeFilms (High-Concept Stoicism & Visual Metaphor)
1. **`monkmode_1_teiFArJ2PFo_COMFORT.jpg`**:
   - *Visual:* Character lying in what seems to be a cozy bed, but surrounded by subtle ink-black shadow tendrils.
   - *Psychological Hook:* The deceptive danger of comfort and procrastination.
2. **`monkmode_2_bGT1h4kuvbA_LOOKSMAXXING.jpg`**:
   - *Visual:* Character staring at a fractured mirror reflection. Stark white/black lighting.
   - *Psychological Hook:* Superficial modern vanity vs inner emptiness.
3. **`monkmode_3_imCsqtrWy_I_HEARTBREAK.jpg`**:
   - *Visual:* Solitary figure looking through a rain-streaked window. Deep indigo/slate palette.
   - *Psychological Hook:* Loneliness, isolation, stoic reflection.
4. **`monkmode_4_oz7dqtC3kGc_AI.jpg`**:
   - *Visual:* Minimalist human head silhouetted against glowing digital wireframe data streams.
   - *Psychological Hook:* Human agency vs algorithmic manipulation.

---

## 3. The Wakelit Thumbnail Formula

Every Wakelit thumbnail must follow this 4-pillar structure:

```
[ THE SHADOW ENTITY ] (Looming background threat / 40-50% frame)
         +
[ AYO IN BED / DESK ] (Tired expression, mustard hoodie, glowing phone)
         +
[ DUAL-LIGHT CONTRAST ] (Cold screen blue vs. Pure pitch black / Warm dawn slit)
         +
[ PUNCHY TEXT / ZERO TEXT ] (Max 2-3 words, or pure curiosity-gap visual)
```

### Pillar 1: Composition & Character Framing
- **Rule of Thirds:** Ayo occupies the left or right third, angled slightly toward the center.
- **The Threat:** The Shade looms in the opposite upper third, with its two pale-blue horizontal slit eyes (`#9CC4FF`) glowing through the pitch black.
- **Ayo's Eye Expression:** Must be clear and large enough to read at thumbnail scale:
  - Downward tilted eyebrows, faint dark circles under the eyes, looking down at the glowing screen.

### Pillar 2: The Color Law in Thumbnails
- **Dominant Tone (75%):** Deep midnight void (`#070608` to `#181822`).
- **Accent 1 (Cold Addiction Glow - 15%):** Piercing cold blue/cyan light (`#6FA8FF`, `#9CC4FF`) illuminating Ayo's face, pillow, and hands.
- **Accent 2 (Warm Hope/Time - 10%):** Glowing red/amber digital clock digits (`#D6453D` displaying `03:42 AM`) or a thin warm golden slit of dawn light at the edge of the frame.

### Pillar 3: Thumbnail Typography (When Text is Used)
- **Word Count:** 1 to 3 words maximum. Never put full sentences in thumbnails.
- **Font Style:** Ultra-bold sans-serif or distressed headline type (e.g. Impact, Montserrat Black, Bebas Neue).
- **Color:** Bone white (`#EDE6D6`) or warning amber (`#E8A33D`) with a heavy dark outer shadow/stroke for 100% legibility against any background.
- **Approved Thumbnail Text Hooks:**
  - `JUST 5 MINS`
  - `3:42 AM`
  - `NOT BROKEN`
  - `NIGHT 365`
  - `TRAPPED`
  - `WAKE UP`
- **Zero-Text Alternative (Recommended for Mode B):** Let the evocative silhouette of Ayo staring at the screen while the Shade whispers in his ear generate the ultimate "curiosity gap".

---

## 4. Prompt Template for Generating Wakelit Thumbnails

When generating thumbnails in Google Flow / image generators, use this exact prompt structure:

```text
Cinematic YouTube thumbnail, 16:9 composition, 2D flat minimalist vector animation aesthetic. 
In a pitch-black bedroom, Ayo (minimalist brown round head, no neck/ears/nose, tired dot eyes with dark under-eye circles, wearing a mustard yellow hoodie #D2A23E) sits slouched on the edge of a bed, illuminated solely by the intense cold cyan glow (#6FA8FF) of a smartphone screen held in mitten hands. 
Behind Ayo, a towering ink-black shadow monster (The Shade) looms in the darkness with two glowing pale-blue horizontal slit eyes peering over his shoulder. 
On the bedside table, a digital clock softly glows red with the numbers '03:30'. 
High contrast, deep atmospheric black shadows (#070608), clean lines, emotive and moody storytelling, 4k master quality render, no 3D realism, no photorealistic skin.
```
