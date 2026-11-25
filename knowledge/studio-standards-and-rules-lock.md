# WAKELIT STUDIO — LOCKED STANDARDS, CREATIVE LAWS & FAILURE AUDIT LOG
**Status:** `MANDATORY PERMANENT AGENT INSTRUCTION`  
**Tags:** `[TESTED] [MEASURED] [STUDIO-LAW] [LOCKED]`  
**Last Updated:** 2026-11-25

> **"Read this before touching any script, audio, prompt, or video editor."**  
> Every defect documented here was identified directly through production review. These rules are non-negotiable and override all prior improvised workarounds.

---

## 1. Permanent Studio Laws (Strict Quality Standard)

### LAW 1: ZERO ARTIFICIAL CLIP REPETITION
- **The Defect:** In an attempt to reach 150 seconds, scene clips were repeated 2 to 5 times in a montage. This ruined visual progression, created absurd continuity loops, and insulted the viewer's intelligence.
- **The Mandatory Rule:** **NO SCENE CLIP MAY EVER BE REPEATED.**
- Every shot in the timeline must be a distinct visual event. If the video target is 150 seconds, you must plan and generate the required volume of unique shots (or combine character action, realistic UI phone scroll inserts, friend interaction scenes, and black cards). Never loop or repeat footage to pad duration.

---

### LAW 2: MULTI-LAYERED AUDIO & VOICE/WHISPER ARCHITECTURE
- **The Defect:** The previous mix was dominated by a monotonous, repetitive clock tick ("pom pom pom") playing continuously throughout the entire video. There was zero supernatural presence for The Shade, no dynamic soundscape, and no spoken voice.
- **The Mandatory Rule:**
  1. **Clock ticks are dynamic, not relentless:** The clock tick must duck, modulate, double to 120 BPM during speed-ups, cut out during dialogue/whispers, and go completely silent during emotional turning points.
  2. **Voiceover / Whispers are Essential:** Day One Films style requires intimate, seductive whispers and internal monologue:
     - **The Shade:** Seductive, low, breathy, stereo-widened whisper: *"Just five more minutes... You worked hard today... Tomorrow is fresh."*
     - **Ayo / Narrator:** Intimate, grounded baritone voiceover reflecting midnight regret and agency.
     - **ElevenLabs Voice Integration:** The studio provides ElevenLabs voice prompts, timing sheets, and text for generation (or integrates user-provided audio).
  3. **Supernatural Ghost/Shade Sound:** When The Shade appears, an eerie sub-audible reverse reverb, smoky breath, and pitch-shifted frequency swell must play.
  4. **Tactile Foley Layering:** Every action has foley: glass phone taps, bed sheet rustles, laptop lid snapping shut, footsteps, door latch clicking.

---

### LAW 3: DAY ONE FILMS THUMBNAIL BENCHMARK
- **The Defect:** Placing standard bottom-third impact text over an unmodified video frame is NOT a Day One Films thumbnail. It lacks the visceral, psychological shock value that drives millions of clicks.
- **The Mandatory Spec (Derived from Reference Masters):**
  1. **Top-Anchored Bold Text:** Words placed across the top of the frame. Big, arched, thick bubbly/comic font in pure white (`#FFFFFF`) with heavy black stroke (12–16px) and deep drop shadow (`YOU'RE ROTTING.`, `FALLING APART.`, `1 MINUTE.`, `YOUR BRAIN IS FRIED.`).
  2. **Visceral Character Deterioration:** The character is not just sitting there. Ayo must show physical/psychological distortion:
     - Melting like hot candle wax dripping onto the pillow.
     - Clay/stone head cracked down the middle.
     - Bloodshot, dark-ringed, sunken eyes staring blankly.
  3. **Tangible Dopamine Props & Neon Glows:**
     - Glowing phone held in mitten hands illuminating the face.
     - Floating glowing neon app icons: YouTube, TikTok, Instagram, Snapchat with bright saturated neon glow.
     - Glowing red digital alarm clock on the nightstand showing `3:00 AM` or `4:12 AM`.
  4. **Background:** Pitch black or ultra-dark bedroom vignette to maximize contrast.

---

### LAW 4: ANIMATED CAPTIONS & SHAKING/BOILING TEXT
- **The Defect:** Subtitles were static, standard burned text placed at the bottom like movie subtitles, ignoring the specific reference tutorial.
- **The Mandatory Spec (From Reference Master & Tutorial):**
  1. **The Opening Hook (Scene 1):** Pure black screen. Subtitle appears in the **exact center of the screen**. Typewriter reveal letter-by-letter. The final keyword pops in enclosed in a **warm amber rounded pill box (`#E89D42`)** with black text (`#000000`).
  2. **The Visual Scenes (Scene 2+):** Captions overlaid onto the animation. The text must have an **organic boiling/shaking jitter** ($\pm 2\text{px}$, subtle 3-frame rotation loop) to look hand-animated and dynamic rather than sterile digital text.

---

### LAW 5: TANGIBLE STORY CONFLICT & SOCIAL MEDIA MOCKUPS
- **The Defect:** The video was vague and abstract. Ayo looked at a laptop showing nothing clear, a ghost appeared without explanation, and Ayo suddenly stood up and ran outside. The viewer had no idea what was actually stopping him.
- **The Mandatory Spec:**
  1. **Show the Actual Addiction:** The screen cannot be vague geometry or an empty desktop. The viewer must see an **actual social media feed mockup**:
     - A phone held in mitten hands showing a scrolling YouTube Shorts or TikTok feed with video thumbnails, like counters, and infinite scroll.
     - The thumb mechanically flicking up, watching another clip, trapped in the dopamine loop.
  2. **Character & Social Detachment:** Show Ayo detaching from real life:
     - A friend calling or texting ("Are you coming?"), Ayo silencing the phone or putting it face down.
     - The contrasting world of human connection vs the solitary screen trance.
  3. **The Beast / The Shade Identified:** The Beast is not a random horror monster; it is the entity fed by every avoided phone call, every skipped workout, every postponed dream, and every "one more video".

---

## 2. Audio & Voice Production Matrix (Mode A vs Mode B)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AUDIO ARCHITECTURE SYSTEM                       │
├────────────────────────────────────────────────────────────────────────┤
│ Track 1 (Vocal): ElevenLabs Voiceover / Intimate Midnight Narration    │
│ Track 2 (Entity): The Shade Breathy Whisper (Stereo Spread + Low End)   │
│ Track 3 (Foley): Phone vibration, glass taps, bed rustle, laptop slam   │
│ Track 4 (Score): Melodic dark ambient pad evolving into hopeful dawn   │
│ Track 5 (Tension): 60 BPM clock tick (soft/ducked) + 45 Hz sub drone   │
│ Track 6 (Silence): Pure 0.0dB dead silence at key turning points       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Production Failure History Log

| Date | Defect Description | Root Cause | Permanent Solution |
| :--- | :--- | :--- | :--- |
| 2026-11-24 | 42-Minute Video Export | `amix=duration=longest` in FFmpeg without output duration clamping | Added `-shortest`, `-t` duration clamp, and automated Duration QC Gate in `quality-checker.js` |
| 2026-11-25 | Repeated Clips in 150s Film | Concatenating 12 scenes 3 times to artificially stretch duration to 150s | BANNED. Every shot must be unique. Combine character story with real UI mockups, friend detachment, and unique beats. |
| 2026-11-25 | "Pom Pom Pom" Repetitive Clock Audio | Master audio filter lacked voiceover, foley, and dynamic ducking | Redesigned 6-track audio architecture with ElevenLabs whisper/narrator, organic foley, and dynamic clock ducking. |
| 2026-11-25 | Generic Bottom Subtitles | Standard libass subtitle filter used without boiling jitter or amber pill | Built Remotion/Canvas boiling text generator and centered opening amber pill reveal. |
| 2026-11-25 | Substandard Thumbnail | Bottom-third text over static frame; failed Day One reference standard | Implemented Day One standard: top bold bubbly text, melting character, floating neon app icons, red alarm clock. |
| 2026-11-25 | Abstract, Unclear Story | No recognizable dopamine source, no clear conflict, vague screen | Introduced real phone social media scrolling mockup, friend call detachment, and explicit cause-and-effect. |
