# START.md — WAKELIT MASTER STARTUP SYSTEM & OPERATING MANUAL

> **"Every night ends."**  
> *Official Entry Point, Navigation Map, and Operating Standards for the Wakelit Automated AI Animation Studio.*

---

## 1. What is Wakelit?

**Wakelit** is an automated, narrative-driven AI animated production studio designed to produce world-class, emotionally resonant, psychologically astute short-form animated cinematic films (150–210 seconds / 2.5–3.5 minutes).

### 1.1 Creative Mission & Brand Identity
- **The Core Problem We Address:** Modern life is plagued by quiet, solitary despair—doomscrolling, procrastination, digital sedation, isolation, creative paralysis, and the trap of "tomorrow".
- **The Brand Position:** Wakelit does not preach, lecture, or offer superficial life hacks. Instead, Wakelit acts as a **cinematic parabolic mirror**. We reflect the viewer's private midnight shame with unflinching empathy, dignity, and visual beauty, transforming internal conflict into hard-won redemption.
- **The Target Experience:** High-retention, visceral cinematic storytelling combining tangible 3D vinyl/clay stylized character animation, atmospheric lighting, meticulous sound design, negative auditory space, and earned catharsis.

### 1.2 Core Universe Lore & Rules
- **The Protagonist:** **Ayo** (`#613729` skin, `#D2A23E` mustard ochre hoodie, `#222222` pants). Stylized anatomy: no neck, no ears, no nose, mitten hands with articulated thumbs. Expressive dark specular eyes. Ayo represents universal human resilience under pressure.
- **The Antagonist:** **The Shade**. Non-biological smoky obsidian silhouette with glowing horizontal pale-blue slit eyes (`#9CC4FF`). Seductive rather than aggressive; the physical manifestation of addiction, avoidance, and comfort.
- **The Chromatic Law:** 
  - Cold Blue (`#1B2A4A`, `#3A5A8C`, 6500K) = Screen trance, digital sedation, avoidance.
  - Warm Amber (`#E89D42`, `#D2A23E`, 3000K) = Dawn, human agency, physical action, awakening.

---

## 2. Production Architecture & Working Automation

Wakelit couples generative AI video generation with programmatic desktop post-production:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WAKELIT ENGINE PIPELINE                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Story & Narrative Architecture (engine/story-developer.js)          │
│    - Idea evaluation, 12-beat step outline, 100-pt QC gate.            │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Prompt Synthesis & Visual Direction (engine/prompt-builder.js)       │
│    - Character anchor locking, 2.39:1 anamorphic prompts.              │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Automated Video Generation (engine/flow-runner.js via Playwright)   │
│    - Google Flow automation with persistent profile (chrome-profile/). │
│    - Auto credit approval & context menu download interceptor.         │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Programmatic Video Editing (engine/video-editor.js via FFmpeg)      │
│    - 1080p letterbox normalization, crossfades, black-card insertion.   │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Sound Design & Foley Mixing (engine/sfx-generator.js + Foley Pack)  │
│    - 15-piece CC0 organic foley, 40Hz sub-bass, 0.0dB dead silence.    │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Automated Quality Control (engine/quality-checker.js)               │
│    - Validates audio streams, frame integrity, duration, and output.   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Knowledge Base Navigation & Source Register

All production standards are maintained in the `knowledge/` directory. Consult the dedicated documents before making creative or technical decisions:

| Domain | Knowledge Document Path | Scope & Content |
|---|---|---|
| **Operating Manual** | [START.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/START.md) | Studio entry point, system architecture, operating rules. |
| **Development Status** | [DEVELOPMENT-STATUS.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/DEVELOPMENT-STATUS.md) | Verified features, technical history, roadmap, test logs. |
| **Story Theory** | [knowledge/storytelling-research.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/storytelling-research.md) | Pixar rules, Harmon circle, McKee, Vogler, Source Register. |
| **Narrative Psychology** | [knowledge/narrative-psychology.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/narrative-psychology.md) | Neurochemical retention loop, parabolic mirror, cognitive bias. |
| **Story Framework** | [knowledge/story-development-framework.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/story-development-framework.md) | 14 narrative pillars, Mode A vs Mode B blueprints. |
| **Scriptwriting Pipeline** | [knowledge/scriptwriting-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/scriptwriting-guidelines.md) | 7-stage scriptwriting pipeline from concept to manifest. |
| **Hooks & Retention** | [knowledge/hooks-and-retention.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/hooks-and-retention.md) | 15-second gate, visual curiosity gaps, 30s audio shifts. |
| **Emotional Storytelling** | [knowledge/emotional-storytelling.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/emotional-storytelling.md) | Empathy, character vulnerability, prop callbacks, catharsis. |
| **Visual Storytelling** | [knowledge/visual-storytelling.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/visual-storytelling.md) | Pantomime, stage lines, framing, color psychology. |
| **QC Checklist** | [knowledge/story-quality-checklist.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/story-quality-checklist.md) | 100-point rubric, instant reject conditions. |
| **Title Strategy** | [knowledge/title-research-and-evaluation.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/title-research-and-evaluation.md) | 40-title dossier, 5 tiers, CTR formulas. |
| **Original Identity** | [knowledge/original-storytelling-principles.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/original-storytelling-principles.md) | Anti-plagiarism rules, universe lore, original voice. |
| **Primary Channel Data**| [knowledge/reference-channel-analysis.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/reference-channel-analysis.md) | 24-video catalog, 12 case studies, retention curves. |
| **Video Case Studies** | [knowledge/reference-video-analysis.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/reference-video-analysis.md) | Detailed metrics for Lust Is Killing You & Lust vs Love. |
| **Visual Storyboard Deck**| [projects/the-beast-you-feed/planning/storyboard.html](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/projects/the-beast-you-feed/planning/storyboard.html) | Interactive 12-scene visual storyboard deck with SVG shot previews. |
| **Motion Dynamics Analysis** | [knowledge/reference-motion-analysis.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/reference-motion-analysis.md) | Motion hierarchy, micro-movement, locked camera discipline. |
| **Visual Breakdown & Staging** | [knowledge/reference-video-visual-breakdown.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/reference-video-visual-breakdown.md) | Scene-by-scene framing, lighting duality, Wakelit adoption rules. |
| **Character Design** | [knowledge/character-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/character-guidelines.md) | Ayo anatomy specs, color codes, clothing rules. |
| **Visual Style** | [knowledge/visual-style.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/visual-style.md) | Tangible clay/vinyl textures, lighting, 2.39:1 framing. |
| **Animation Specs** | [knowledge/animation-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/animation-guidelines.md) | 2D limited animation, micro-motion, camera tracking. |
| **Scene Composition** | [knowledge/scene-composition.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/scene-composition.md) | Rule of thirds, psychological staging, negative space. |
| **Editing Guidelines** | [knowledge/editing-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/editing-guidelines.md) | 12-scene pacing, 2.63s black time-skips, cuts on audio. |
| **Caption Rules** | [knowledge/caption-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/caption-guidelines.md) | Typewriter captions, Comic Relief font, screen blend. |
| **Sound & SFX** | [knowledge/sound-design-and-sfx.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/sound-design-and-sfx.md) | Foley specifications, 60 BPM clock, sub-bass, -50dB drop. |
| **Thumbnail Rules** | [knowledge/thumbnail-guidelines.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/thumbnail-guidelines.md) | High-contrast focal hierarchy, rim glow, text minimalism. |
| **Prompt Engineering** | [knowledge/prompt-writing-guide.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/prompt-writing-guide.md) | Standardized Google Flow Omni prompt formulas. |

---

## 4. How to Start a Working Session

When opening a new session:
1. **Read START.md (this document)** to recalibrate on studio identity, universe rules, and engine design.
2. **Review [DEVELOPMENT-STATUS.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/DEVELOPMENT-STATUS.md)** to identify the current production phase and recent commits.
3. **Inspect the Active Project:** Look inside `projects/<active-project>/` to determine the exact state:
   - Does `input/creative-brief.md` exist?
   - Has `planning/scenes.json` been generated?
   - Are scenes generated in `generated/scenes/`?
   - Has the final cut been assembled in `output/`?
4. **Run Verification:** Run `npm test` to ensure all 25 system and story assertions pass before altering code or generating media.

---

## 5. Preservation of Approved Decisions & Creative Governance

To prevent regressions, hallucinations, and unauthorized modifications:

- **Rule 1: Never Break Working Code.** Do not rewrite working modules (`flow-runner.js`, `video-editor.js`, `scene-planner.js`) without explicit instruction and regression testing.
- **Rule 2: Respect Character Integrity.** Ayo never gets fingers, ears, a nose, or a neck. Ayo's skin is `#613729`, hoodie is `#D2A23E`. The Shade is never an alien or gore monster.
- **Rule 3: Enforce Quality Gates.** Every script outline must score $\ge 90$ on the 100-point rubric in [knowledge/story-quality-checklist.md](file:///c:/Users/USER/OneDrive/Documents/projects/wakelit%20production/knowledge/story-quality-checklist.md).
- **Rule 4: Zero Plagiarism.** Learn techniques, pacing, and retention science from reference channels; never copy character designs, scripts, titles, or catchphrases.

---

## 6. Knowledge Maintenance & Update Protocol

To ensure the knowledge base grows in precision rather than becoming cluttered or contradictory:

### 6.1 Epistemic Tagging Standards
Every factual claim, specification, or guideline added to any knowledge document must carry an explicit epistemic status tag:
1. `[TESTED]`: Verified through direct software execution, terminal testing, or script output.
2. `[MEASURED]`: Quantitatively measured from empirical reference files (e.g. video dimensions, audio loudness, cut counts).
3. `[BRIEF]`: Specified as an official requirement in a client creative brief.
4. `[RESEARCH]`: Supported by external screenwriting, psychological, or algorithmic research.
5. `[RECOMMENDED]`: A creative or architectural recommendation made by the AI studio engine.
6. `[ASSUMPTION]`: An unverified hypothesis currently requiring human or empirical validation.

### 6.2 Knowledge Update Procedure
1. When a new technique, metric, or prompt formula is discovered, update the dedicated file in `knowledge/`.
2. Do not append loose notes to `START.md` or `README.md`.
3. If an old assumption is disproven by testing, update the tag to `[TESTED]` and note the date of revision.

---

## 7. Pre-Generation Checklist (Credit Protection Protocol)

Google Flow generation consumes non-refundable credits and API compute. **NEVER run `npm run flow:batch` until ALL of the following conditions are met:**

- [ ] Script and 12-beat outline approved by human creative director.
- [ ] QC Scorecard evaluated and passed ($\ge 90/100$).
- [ ] Character reference image locked and present in `input/references/`.
- [ ] Prompts generated and verified via `npm run studio:plan`.
- [ ] Persistent Chrome profile (`chrome-profile/`) verified via `npm run flow:login`.
- [ ] Diagnostic screenshots/HTML folder clean.
- [ ] Explicit human confirmation received: *"Proceed with Flow generation."*

---

## 8. Reporting Problems, Limitations & Uncertainty

Antigravity operates with radical transparency:
- If a generation fails or a selector breaks, report the exact DOM selector, timestamp, and path to the diagnostic HTML/screenshot.
- If a creative concept has an audience retention risk, state the risk clearly and quantify the uncertainty rather than fabricating confidence.
- Distinguish between verified technical metrics and creative recommendations.
