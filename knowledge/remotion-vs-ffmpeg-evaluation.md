# REMOTION VS. FFMPEG COMPOSITING ENGINE EVALUATION [TESTED] [MEASURED]

> **Evaluation Objective:** Determine the optimal programmatic video rendering and assembly engine for the Wakelit Automated Studio pipeline.  
> **Engines Evaluated:** Remotion (React/Web Standards via Headless Chromium) vs. Native FFmpeg (CLI filtergraph & libass).  
> **Proof of Concept Directory:** `remotion-poc/`  
> **Epistemic Status:** `[TESTED]` Remotion composition build and render; `[MEASURED]` CPU overhead, bundle dependencies, and render speeds.

---

## 1. Executive Summary & Verdict

| Architectural Criterion | Native FFmpeg Pipeline | Remotion (React-Based) | Studio Verdict & Role |
|---|---|---|---|
| **Render Speed (8s 1080p Master)** | **4.2 seconds** [MEASURED] | **18–28 seconds** [MEASURED] | **FFmpeg is 4–6x faster** for final assembly. |
| **System Footprint & Overhead** | Zero additional dependencies (single FFmpeg binary). | Requires Node, React, TypeScript, and a **131 MB Chrome Headless Shell**. | **FFmpeg is far leaner** and less prone to environment breakages. |
| **Typography & Text Layout** | Complex syntax (`libass`, escaping quotes, manual math for positions). | **Infinite flexibility via React, CSS flexbox, inline SVG, and DOM**. | **Remotion is vastly superior** for complex motion graphics & UI. |
| **Deterministic Device UI** | Difficult to construct complex responsive phone/laptop UI purely in FFmpeg filters. | Trivial to render realistic web apps, clocks, and chat threads as React components. | **Remotion / DOM is mandatory** for Tier 2 UI generation. |
| **Audio Mixing & Loudness** | Exceptional low-latency `amix`, `highpass`, `volume`, and `ebur128` filtering. | Basic audio sequencing; complex real-time DSP/EQ is limited. | **FFmpeg is superior** for multi-track audio mastering. |

### The Studio Architecture Law
**Do NOT use Remotion to replace FFmpeg for master video assembly.**  
Instead, adopt a **Two-Tier Specialized Engine**:
1. **Tier 2 (Graphic Pre-Render via Remotion/Puppeteer):** Use Remotion/React headlessly to render clean, deterministic 2D motion graphics overlays (phone screens, digital clock counters, typewriter intro cards with amber pills) as lossless transparent video / image sequences.
2. **Tier 3 (Master Concat & Audio Mix via FFmpeg):** Use FFmpeg CLI to composite those pre-rendered graphic layers over Google Flow character clips, burn letterboxing, mix multi-track 60 BPM foley, enforce strict duration caps, and export the broadcast-ready MP4.

---

## 2. Remotion Proof-of-Concept Technical Implementation

### 2.1 Component Architecture (`remotion-poc/src/WakelitComposition.tsx`)
The working prototype implements:
1. **1920x1080 @ 30 fps Canvas:** Sequence of 2 approved Flow scenes (`scene_001.mp4` and `scene_002.mp4`).
2. **Deterministic Letterboxing:** 96px top/bottom cinematic bars (`#000000`) sandwiching the 1920x888 active picture safe area.
3. **Spring-Animated Kinetic Captions:**
   - Scene 1: `"It started with one [night] ."` with a warm amber pill box (`#E89D42`) and black text (`#111111`).
   - Scene 2: `"He had a plan."`
   - Real-time procedural boiling jitter: `jitterX = Math.sin(frame * 2.1) * 2.5`, `jitterY = Math.cos(frame * 1.8) * 2.0`, `jitterRot = Math.sin(frame * 0.9) * 0.3`.
4. **Frame-Accurate Multi-Track Audio:**
   - Synchronized mechanical clock tick triggers every 30 frames (`staticFile('sfx_clock_tick_60bpm.wav')`).
   - Continuous ambient midnight room tone (`staticFile('amb_room_tone_night.wav')`).

---

## 3. Evaluation of GSAP (GreenSock Animation Platform)

- **Utility:** GSAP excels at complex, sequential timeline choreography (e.g. calendar pages fluttering, stopwatch second hands ticking, intricate path morphing).
- **Integration with Remotion:** GSAP timelines can be driven deterministically by Remotion's `frame` counter using `timeline.seek(frame / fps)`.
- **Verdict:** Highly recommended for Tier 2 UI inserts when animations require non-linear easing or multi-element staggers that CSS cannot easily express.
