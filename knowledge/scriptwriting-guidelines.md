# 7-Stage Scriptwriting Pipeline
*From Raw Idea to Flow & FFmpeg Production*

---

## Overview

The Wakelit scriptwriting engine transforms an unformed creative impulse into a pixel-perfect, timing-synchronized production manifest. Every story passes through seven rigid quality gates:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STAGE 1    │     │   STAGE 2    │     │   STAGE 3    │     │   STAGE 4    │
│  Idea Eval   ├────►│ Deep Research├────►│Story Concept ├────►│ 12-Beat      │
│  & Title CTR │     │ & Psychology │     │ Document     │     │ Step-Outline │
└──────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                      │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐            │
│   STAGE 7    │     │   STAGE 6    │     │   STAGE 5    │            │
│  Production  │◄────┤ Quality QC   │◄────┤ Full Script  │◄───────────┘
│  Translation │     │ Review       │     │ Execution    │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Stage 1: Idea Evaluation & Title Selection
- **Objective:** Ensure the concept possesses high psychological tension and guaranteed CTR potential before investing production resources.
- **Evaluation Criteria:**
  1. Does it target a visceral pain point (Time, Comfort, Screen Addiction, Solitude, Self-Sabotage)?
  2. Can the core conflict be summarized in 5 words?
  3. Does the title generate cognitive dissonance or identity threat?
- **Deliverable:** Selected title from the 40-title dossier + target audience persona definition.

---

## Stage 2: Psychological & Thematic Research
- **Objective:** Unpack the root mechanism of the problem.
- **Process:**
  - Identify the specific cognitive distortion (e.g., "I work better under pressure", "Tomorrow I'll have more willpower").
  - Formulate the seductive lie whispered by the internal demon.
  - Determine the exact physical prop that embodies this trap (e.g., unopened running shoes, muted alarm, empty coffee cup, blue laptop screen).
- **Deliverable:** Thematic brief containing: Core Demon, Seductive Lie, Physical Manifestation, Redemption Action.

---

## Stage 3: Story Concept Document (The 1-Page Treatment)
- **Objective:** Establish the narrative arc, visual tone, and audio mode.
- **Required Fields:**
  - *Title & Tagline:* (e.g., `The Beast You Feed Every Night` — *Later is easier than now*).
  - *Production Mode:* Mode A (Philosophical Voiceover) or Mode B (Silent Visceral Pantomime).
  - *Protagonist State:* Ayo's starting posture, attire, and environment.
  - *Antagonist Presence:* The Shade's scale, behavior, and visual texture.
  - *The Climax Pivot:* The exact moment and method of awakening.
  - *The Visual Reversal:* How the final frame answers and reverses the opening frame.

---

## Stage 4: The 12-Beat Step-Outline
- **Objective:** Map the narrative onto the 150-second production timeline across 12 discrete scenes.
- **Standard Beat Structure:**
  - **Beat 1 (0:00–0:12) — The Ordinary Dark:** Establish baseline habit. The blue light, the late hour.
  - **Beat 2 (0:12–0:25) — The Latent Ambition:** Ayo looks toward the aspirational object.
  - **Beat 3 (0:25–0:38) — The Whispered Compromise:** The Shade stirs. Seductive comfort chosen over effort.
  - **Beat 4 (0:38–0:50) — The Sinking Trance:** Deep digital immersion. Time accelerates.
  - **Beat 5 (0:50–1:05) — The Physical Toll:** Ayo's eyes heavy, posture hunched. The Shade expands.
  - **Beat 6 (1:05–1:18) — The Suffocation:** The screen dominates the room. The Shade envelops the frame.
  - **Beat 7 (1:18–1:28) — The Void (0.0dB):** Sudden sensory severance. Total stillness. The mirror of truth.
  - **Beat 8 (1:28–1:42) — The Decision:** Ayo's hand trembles, then grips. The decision to break the loop.
  - **Beat 9 (1:42–1:55) — The Physical Resistance:** Shutter closes / laptop snaps shut. The Shade recoils.
  - **Beat 10 (1:55–2:08) — The Footstep:** Ayo stands up. Cold feet on hardwood. The room breathes.
  - **Beat 11 (2:08–2:20) — The Dawn Influx:** Warm amber light slices through the cold room.
  - **Beat 12 (2:20–2:30) — The Lingering Echo:** Ayo looking outward. The ghost whisper cements the lesson.

---

## Stage 5: Full Script Execution & Visual Directing
- **Objective:** Write the exact shot descriptions, prompt directives, audio stems, and dialogue/whispers.
- **For Each Scene, the Writer Defines:**
  1. `visual_action`: Character positioning, motion, lighting, and camera movement.
  2. `flow_prompt`: Synthesized Google Flow prompt adhering strictly to character anchor rules.
  3. `audio_sfx`: Primary foley cues + secondary atmospheric drone layers.
  4. `spoken_line`: Ghost whisper or voiceover phrase (with exact word count).
  5. `duration`: Precise scene duration in seconds (typically 10.0s to 14.0s).

---

## Stage 6: Quality QC Review (The Pass/Fail Gate)
- **Objective:** Evaluate the script against the `story-quality-checklist.md`.
- **Enforcement:**
  - Does it score $\ge 90/100$ on the checklist?
  - Does it contain any lecturing dialogue? (If yes, instant reject).
  - Is the turning point positioned between 50% and 60% of total duration?
  - Does it respect Ayo's character rules (`#613729` face, `#D2A23E` hoodie, no fingers/neck/ears)?
  - Is the Shade properly portrayed as internal addiction, not an alien monster?

---

## Stage 7: Production Translation (To Project JSON & Engine)
- **Objective:** Convert the validated script into a production-ready `project.json` file.
- **Automation Pipeline:**
  - The script is parsed into `scenes` array.
  - Prompts are fed through `engine/prompt-builder.js` with character anchors.
  - Audio SFX cues are mapped to `projects/{name}/input/assets/audio/sfx/`.
  - Ready for generation via `npm run flow:batch` and assembly via `npm run video:build`.
