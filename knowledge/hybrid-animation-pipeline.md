# HYBRID 2D ANIMATION PIPELINE SPECIFICATION [RESEARCH] [TESTED]

> **Architecture Purpose:** Establish the technical integration between Generative AI (Google Flow Omni), Programmatic 2D UI Graphics (HTML/CSS/SVG/GSAP), and Code-Driven Video Compositing (Remotion & FFmpeg).  
> **Epistemic Status:** `[RESEARCH]` pipeline architecture; `[TESTED]` Remotion React components and FFmpeg overlay pipelines.

---

## 1. The Core Problem with Pure Generative Video

Pure text-to-video / image-to-video models (such as Google Flow Omni) excel at organic character poses, fluid fabric motion, and illustrative lighting. However, they consistently fail at:
1. **Deterministic Typography:** Generative AI hallucinates illegible glyphs, warped letters, and shifting fonts.
2. **Exact Timers & Counters:** Generative models cannot count down seconds (`05:00` to `04:59`), flip calendar dates accurately, or render consistent digital LED clock faces (`2:41 AM`).
3. **Exact Brand UI & Vector Shapes:** Crisp phone notifications, battery icons, message bubbles, and high-contrast letterbox bars become muddy, noisy, or distorted when generated directly through video diffusion.

---

## 2. Division of Modular Responsibilities

To achieve world-class production quality with zero hallucinated UI, Wakelit adopts a three-tier hybrid architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   WAKELIT HYBRID ANIMATION PIPELINE                    │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 1: GENERATIVE AI PERFORMANCE LAYER (Google Flow Omni)             │
│ - Character acting & pantomime (Ayo's body language, head, gaze)      │
│ - Organic environment & lighting (cold blue screen wash, dawn rays)    │
│ - The Shade's fluid obsidian dynamics & pale-blue slit eyes            │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: DETERMINISTIC 2D UI & MOTION GRAPHICS (HTML/CSS/SVG & GSAP)    │
│ - Clean digital clocks (red/green 7-segment LED digits, exact time)    │
│ - Phone screens & notifications (social apps, message bubbles)         │
│ - Typewriter intro cards & amber keyword highlight pills               │
│ - Calendar flip montages & counter labels ("NIGHT 1", "365 DAYS")      │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: PROGRAMMATIC COMPOSITOR & MASTER ENGINE (Remotion / FFmpeg)    │
│ - Exact sub-frame timeline positioning & cut synchronization           │
│ - Multi-layer alpha masking & Screen-blend compositing                 │
│ - 2.39:1 letterbox enforcement (96px cinematic bars, zero side bars)   │
│ - Multi-track organic audio mixing (-14 LUFS, 0.0dB true silences)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Layer Implementation Workflows

### 3.1 Tier 2: Deterministic UI Rendering (HTML/CSS/SVG)
- **Laptop & Phone Screens:** Rendered via headless Chromium (Playwright or Remotion DOM) at 1920x1080 with transparent background (`alpha = 0`) or solid chroma background.
- **Message Bubbles & Timers:** SVG path definitions animated via CSS keyframes or GSAP timelines. Guarantees 100% vector sharpness at any export resolution.
- **Intro Highlight Pill:** Pure CSS flexbox layout with `border-radius: 9999px`, background `#E89D42`, dark text `#000000`, scale spring transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### 3.2 Tier 3: Compositing via Remotion & FFmpeg
1. **Screen Replacement / Device Inset:**
   - In shots where Ayo is holding a phone (Scene 001/004), Google Flow generates Ayo with a green/blank phone screen.
   - The compositor tracks or overlays the deterministic phone UI into the safe screen bounding box using Remotion `<Sequence>` or FFmpeg `overlay`.
2. **Text Overlays:**
   - Captions are rendered as transparent ASS subtitle streams or Remotion React typography components with calculated ±3px hand-drawn jitter.
3. **Master Letterboxing:**
   - Top and bottom 96px black bars (`#000000`) sit at the very top of the compositor stack (Track V6), guaranteeing that no graphic or character limb bleeds outside the 1920x888 cinematic safe area.
