# Wakelit Sound Design & Sound Effects (SFX) Architecture

Sound design is 50% of the emotional weight in Wakelit films. This document defines the complete sound layer hierarchy, what the automated studio synthesizes directly, what can be outsourced from curated CC0/royalty-free libraries, and the exact minimal inputs the user should provide.

---

## 1. Sound Layer Breakdown & Production Matrix

| Sound Layer | Description & Role | Origin / Source |
| :--- | :--- | :--- |
| **1. Master Clock Tick** | Steady 60 BPM dry, hollow mechanical wall-clock tick. Doubles to 120 BPM during time lapses. Softens at dawn. | **Automated Studio Synthesis** (FFmpeg / Procedural) |
| **2. Sub-Bass Drone** | 40–50 Hz low-frequency sine/saw drone. Swells with The Shade's presence. | **Automated Studio Synthesis** (FFmpeg audio filter) |
| **3. Dead Silences** | Complete audio drops (< -50 dB) at the 2.63s black time-skip card and 1.1s turning point. | **Automated Studio Post-Processing** |
| **4. Bed & Room Foley** | Mattress springs, bedsheet rustle, soft floorboard footsteps, door creak/latch. | **Curated CC0 Foley Library** (Outsourced once) |
| **5. Device Foley** | Phone haptic vibration buzz on wooden nightstand, subtle glass tap clicks, charger plug. | **Curated CC0 Foley Library** (Outsourced once) |
| **6. Environmental Ambiance** | Room tone, muffled distant city/bass through walls (temptation), morning birdsong at dawn. | **Curated CC0 Foley Library** (Outsourced once) |
| **7. Warm Dawn Pad** | Non-melodic warm ambient chord that swells during the recovery and dawn resolution. | **Curated CC0 Foley Library** (Outsourced once) |
| **8. Spoken Voice / Whispers** | The Shade's whispers (15–20 words) and Ayo's resolution line (3–5 words) — *Mode A only*. | **User Input** OR **AI Voiceover (ElevenLabs)** |

---

## 2. In-Depth: What the Automated Studio Generates ($0, No User Effort)

The studio engine (`engine/video-editor.js`) handles foundational audio generation via programmatic FFmpeg filter graphs:

1. **Procedural Clock Tick (60 BPM & 120 BPM):**
   - Clean, dry, slightly hollow clock tick synthesized at exactly 1.000s intervals (60 BPM) and 0.500s intervals (120 BPM).
   - Positioned at `-18 dB RMS` so it cuts through phone speakers without fatiguing headphone listeners.
2. **Sub-Bass Drone (45 Hz):**
   - Synthesized using `aevalsrc=sin(2*PI*45*t)` with a low-pass filter at 120 Hz.
   - Tied dynamically to scenes where The Shade is active, ducking by `-12 dB` during normal speech and dropping to `-Infinity dB` during dead silences.
3. **The Absolute Silence Recipe:**
   - On the time-skip card (`2.63s`), all audio channels are hard-cut to digital silence starting **0.70s before text fades out**, lasting until **0.07s after the next scene cut**.
   - Second silence: **1.10s pure silence** immediately preceding Ayo's turning point action.

---

## 3. What Can Be Outsourced: Curated CC0 Foley Library

Foley provides physical intimacy and grounding. Rather than recording every sound manually, the studio can maintain a curated royalty-free asset library in `input/assets/audio/sfx/`:

### Recommended Folder Structure:
```text
input/assets/audio/sfx/
├── foley_bed_creak.wav          (Mattress spring tension)
├── foley_sheets_rustle.wav      (Blanket moving as Ayo shifts)
├── foley_footstep_wood.wav      (Barefoot step on hollow floor)
├── foley_door_creak.wav         (Slow wooden door opening)
├── foley_door_latch.wav         (Door clicking shut)
├── foley_window_slide.wav       (Sash window sliding open)
├── foley_phone_buzz.wav         (Double vibration pulse on wood: bzzz... bzzz...)
├── foley_screen_tap.wav         (Light glass tap / scroll tick)
├── foley_charger_click.wav      (Lightning/USB-C click into port)
├── amb_room_tone_night.wav      (Midnight bedroom quiet hum)
├── amb_distant_bass.wav         (Muffled party bass through wall)
├── amb_morning_birds.wav        (Distant dawn birdsong)
└── amb_warm_dawn_pad.wav        (Lush warm ambient synth swell)
```

### Outsourcing Sources (100% Free / CC0):
- **Freesound.org:** The global standard for Creative Commons 0 (Public Domain) foley recordings.
- **YouTube Audio Library:** Free-to-use production sound effects and ambient beds.
- **Pixabay Sound Effects:** Commercial-use, royalty-free UI and foley packs.
- **BBC Sound Effects Archive:** High-fidelity architectural and room acoustic recordings.

---

## 4. What the User Should Provide

To keep production fast and frictionless, the user only ever needs to supply **two simple items**:

### 1. Topic & Mode Selection
- Choose the topic (e.g. *"Phone addiction before bed"*, *"The trap of infinite scrolling"*, *"Overcoming morning brain fog"*).
- Specify the format:
  - **Mode A (Voiceover-driven):** Accompanied by whisper narration.
  - **Mode B (Visual-only / Silent):** 100% told through body language, environmental props, and SFX (no spoken narration).

### 2. The Spoken Voice Tracks (Mode A Only)
If producing in Mode A, provide two short audio snippets (totaling only **18 to 25 words** per film):
- **Voice 1: The Shade (The Tempter):**
  - *Tone:* Low, breathy whisper, close-mic proximity effect, slight room reverb.
  - *Example lines:* *"Just five more minutes... You've worked hard today... Tomorrow is a fresh start... One more video won't hurt."* (15–20 words).
- **Voice 2: Ayo (The Resolution):**
  - *Tone:* Dry, calm, close, centered, zero reverb, grounded.
  - *Example line:* *"Not tonight. Every night ends."* (5 words).

*(Note: If you do not wish to record your own voice, the studio can outsource this by generating the whispers with ElevenLabs AI Voice using a whisper/breathy preset like 'Adam' or 'Antony' with elevated whisper stability).*

---

## 5. Master Mix Targets

- **Integrated Loudness:** **−14 LUFS** (YouTube optimal loudness target).
- **True Peak:** **−1.0 dBFS** max (avoids codec distortion during YouTube re-compression).
- **Vocal Separation:** Spoken whispers duck the ambient bed and clock tick by **−4 to −6 dB**.
- **Master Dynamic Range:** High dynamic range between the dense middle scenes (RMS −12 dB) and the pure black card silences (< −50 dB).
