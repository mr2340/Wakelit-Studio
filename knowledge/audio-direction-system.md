# AUDIO DIRECTION SYSTEM SPECIFICATION [TESTED] [MEASURED]

> **Empirical Basis:** Audio spectral analysis of `Lust Is Killing You..mp4` (RMS: -15 to -21 dB, peak: -1 dB, silences: <-50 dB).  
> **Foley Architecture:** CC0 organic foley pack (`assets/audio/sfx/`).  
> **Epistemic Status:** `[MEASURED]` reference dynamics; `[TESTED]` multi-track FFmpeg & Remotion audio mixing.

---

## 1. Core Audio Philosophy: Sound as Storytelling Catalyst

Wakelit treats sound as an equal narrative partner to visual pantomime. Modern animated shorts fail when audio is treated as a passive background music bed. In Wakelit:
- **No Melodic Music by Default:** Traditional melodic orchestral or pop tracks distract from internal psychology and moral tension. Music is replaced by an organic, tactile soundscape of clocks, low sub-bass frequencies, domestic foley, and breathing room tone.
- **The Psychological Clock:** Time is the finite currency being stolen. The clock tick is not mere ambience; it represents the character's life slipping away second by second.
- **Auditory Contrast (Negative Space):** The most powerful moment in cinema is the complete, abrupt cessation of sound. Wakelit enforces two hard, true silences (`<-50 dB` / 0.0dB) in every film.

---

## 2. Multi-Track Layer Architecture (6 Tracks)

```
┌────────────────────────────────────────────────────────────────────────┐
│                      WAKELIT 6-TRACK AUDIO ENGINE                      │
├────────────────────────────────────────────────────────────────────────┤
│ A1: Spoken Whispers & Dialogue (Dry, Close, Stereo Panned)             │
│ A2: Mechanical Clock Tick (60 BPM Base -> 120 BPM Doubling -> Muted)   │
│ A3: Sub-Bass Drone & Sonic Weight (40–50 Hz Monolithic Low-End)        │
│ A4: Domestic Foley (Keyboards, Phone Haptics, Bed Creak, Door Latches) │
│ A5: Room Atmosphere & Ambience (Midnight Fan Hum -> Dawn Birds)        │
│ A6: Harmonic Pad (Dawn Awakening Only; Zero Melody)                    │
└────────────────────────────────────────────────────────────────────────┘
```

### Layer Specifications

1. **Track A1 — Spoken Whispers & Dialogue:**
   - **The Shade:** Low, breathy, binaural/stereo panned slightly right (+20%). Soft plate reverb (1.2s decay, 25% wet). Level: -12 dBFS RMS. Quoted lines only (`"Just five more minutes."`).
   - **Ayo:** Single spoken line per film (Scene 009 or 010). Centered (pan 0), dry, close-mic proximity effect, zero reverb. Level: -10 dBFS RMS. Communicates sudden grounded sovereignty.
2. **Track A2 — Mechanical Clock Tick (`sfx_clock_tick_60bpm.wav`):**
   - Dry, woody, slightly hollow wall clock tick.
   - Fixed at **60 BPM** (1 tick per second).
   - In time-lapse or spiraling scenes (Scene 004/005), doubles to **120 BPM** (`sfx_clock_tick_120bpm.wav`).
   - Muted during the two true silence intervals. Softens and rounds off at sunrise.
3. **Track A3 — Sub-Bass Drone (`sfx_sub_bass_drone_45hz.wav`):**
   - Pure sine/triangle fundamental at **45 Hz**.
   - Sits beneath conscious hearing as a physical pressure in the chest.
   - Swells dynamically (+6 dB) whenever The Shade increases in screen size or towers over Ayo.
   - Cut instantly to 0.0dB during the Scene 007 sensory stop.
4. **Track A4 — Domestic Foley:**
   - Physical tactile interaction: mattress compression (`foley_bed_creak.wav`), laptop snap (`foley_screen_tap.wav` / `foley_laptop_snap`), phone haptic buzz (`foley_phone_buzz.wav`), door latch (`foley_door_latch.wav`), footsteps on floorboards (`foley_footstep_wood.wav`).
5. **Track A5 — Room Tone & Dawn Atmosphere:**
   - Midnight: quiet electrical hum and computer fan air (`amb_room_tone_night.wav`).
   - Dawn: Morning air and distant birdsong (`amb_morning_birds.wav`).
6. **Track A6 — Harmonic Dawn Pad (`amb_warm_dawn_pad.wav`):**
   - Warm analogue synthesizer pad (sawtooth filtered down to 800 Hz).
   - Enters ONLY in the final recovery beats (Scene 010–012). Zero melody, pure open fifth (A-E) harmonic swell.

---

## 3. The Sensory Stop Law (True Silence Protocol)

True silences are mandatory storytelling gates:
1. **Silence Interval 1 (The Time-Skip / Mid-Film Black Card):**
   - Mutes all audio **0.7s before the black card text begins fading out** and remains at 0.0dB for **1.05s**, ending **0.07s after the next scene begins**.
2. **Silence Interval 2 (The Scene 007 Void / Sensory Stop):**
   - Pure black screen.
   - **0.0dB dead silence for exactly 3.0 seconds.**
   - All ambient room hum, sub-bass, and clock ticks are eliminated. Forces the audience's auditory cortex to recalibrate, making the subsequent mirror confrontation in Scene 008 hit with maximum psychological weight.

---

## 4. Master Mix Standards & Broadcast Loudness

- **Integrated Loudness Target:** **-14.0 LUFS** (±0.5 LUFS) conforming to YouTube loudness normalization.
- **True Peak Ceiling:** **-1.0 dBTP** (strictly preventing DAC inter-sample clipping).
- **Loudness Range (LRA):** High dynamic range (12–16 LU).
- **Verification:** Audited via FFmpeg `ebur128` filter during quality checker execution.
