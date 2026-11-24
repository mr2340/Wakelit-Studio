# Editing Guidelines (Wakelit)

> **Purpose:** Executable editing rules, cut rhythm, transition timing, audio mixing, and FFmpeg assembly specs.
> **Source:** `AGENT_BRIEF_02` (Measured from Day One Films reference) and system implementation standards.

---

## 1. Project Specifications
| Parameter | Value | Reference Standard |
|-----------|-------|--------------------|
| **Canvas** | 1920 × 1080 @ 30.00 fps | Hard spec |
| **Active Area** | 1920 × 888 (Letterbox bars: 96 px top & bottom) | `[CONFIRMED]` |
| **Film Target Duration** | **2:45 to 3:20** (165s to 200s) | `[CONFIRMED]` |
| **Total Cut Count** | **~40 to 50 cuts** across ~200s | `[MEASURED: 48 cuts in 200s]` |
| **Average Shot Length** | **3.5 to 4.5 seconds** (median: 4.0s) | `[MEASURED: 4.0s]` |
| **Max Held Still** | Never hold an unchanging still longer than **2.0s** without micro-motion | `[CONFIRMED]` |

---

## 2. Transitions
- **Default Transition:** **100% Hard Cut**.
- **Optional Transition:** **1–3 frame micro-dissolve** for softer passage of time.
- **Opening:** Fade from black (10 frames) only at the very start of the film.
- **Prohibited:** Absolutely no wipes, spins, slides, glitch flashes, or whip-pans.

---

## 3. The Frame-Exact Black Card (Time-Skip) [MEASURED]
Used for narrative leaps (e.g., "30 minutes later...", "Day 30", "10 minutes later...").

| Stage | Duration | Frames @ 30fps | Technical Action |
|-------|----------|----------------|------------------|
| **1. Cut to Black** | t = 0 | — | Hard cut from preceding scene to pure `#000000` |
| **2. Initial Pure Black** | 0.17 s | 5 frames | Pure black, zero text, zero sound |
| **3. Text Fade-In** | 0.23 s | 7 frames | Opacity 0% → 100% |
| **4. Text Hold** | 1.97 s | 59 frames | Text holds at 100% opacity |
| **5. Text Fade-Out** | 0.23 s | 7 frames | Opacity 100% → 0% |
| **6. Final Pure Black** | 0.10 s | 3 frames | Pure black tail |
| **Total Card Length** | **~2.63 s** | **79 frames** | Executed frame-accurately |

### Black Card Audio Silence Rule:
- All audio must **cut to complete silence (< -50 dB) 0.70s before the text begins to fade out**.
- The silence holds through the rest of the card and continues **0.07s into the following scene** (total silence: ~1.05s).

---

## 4. Audio Mixing & Sound Architecture

### The Sound Layers (Top to Bottom):
1. **Clock Tick (A2):** Dry, close, hollow wall-clock tick at **60 BPM** (once per second). Runs from second 00:01. Doubles to 120 BPM during panic/speed montages. Softens and warms at dawn.
2. **Sub-Bass Drone (A3):** Low sine/rumble at **40–50 Hz**. Fades in whenever the Shade appears; swells with the Shade's size; cuts instantly at dead silences.
3. **Voiceover / Whispers (A1):**
   - *The Shade:* Low, breathy whisper, slight reverb, widened stereo.
   - *Ayo:* Dry, close-mic, centered, zero reverb, intimate and vulnerable.
   - Total spoken words: ~18–25 words per episode.
4. **Foley (A4):** Footsteps, paper turns, pen scratch, phone buzz on wood, door creak, bedsprings.
5. **Ambience (A5):** Subtle room hum, laptop fan, distant rain, dawn birds.
6. **Music (A6):** **No melody by default.** Warm ambient synth pad permitted only during the recovery/breakthrough.

### Loudness Targets:
- **Integrated Loudness:** **−14.0 LUFS** (±1 LUFS).
- **True Peak:** Below **−1.0 dBTP**.
- **Dead Silences:** Mute to `-inf` dB. Must occur at the time-skip card and right before the turning point ("He did the maths").
