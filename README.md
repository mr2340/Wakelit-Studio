# GHD Automated AI Video Production Studio

A modular, local AI video production engine designed for automated story analysis, scene breakdown, prompt generation, Google Flow video generation, programmatic FFmpeg editing, and rigorous quality inspection.

---

## 1. System Overview & Technology Stack

- **Node.js (v22+)**: Main automation orchestration and engine modules.
- **Playwright**: Browser automation driving Google Flow with a persistent Chrome profile.
- **Google Chrome**: Native browser instance preserving Google account login and session state.
- **Google Flow (Omni)**: AI visual generation engine.
- **FFmpeg & FFprobe (v9.0+)**: Programmatic clip normalization, black-screen generation, multi-track audio mixing, transitions, subtitle burning, and media inspection.
- **JSON**: Structured scene queues, story analysis, and editing plans.
- **Markdown**: Living creative knowledge documents and production guidelines.

---

## 2. Directory Architecture

```
GHD-AUTOMATED-STUDIO/
├── projects/
│   └── sample-project/
│       ├── input/
│       │   ├── voiceover/          # Prepared voiceover audio files (.mp3, .wav)
│       │   ├── references/         # Character anchor sheets and visual style references
│       │   ├── assets/             # BGM, captions (.srt), sound effects
│       │   └── creative-brief.md   # Project story, mood, and visual instructions
│       ├── planning/
│       │   ├── story-analysis.json # Emotional narrative analysis & pacing strategy
│       │   ├── scenes.json         # Scene queue with prompts, status, and metadata
│       │   └── editing-plan.json   # Programmatic timeline for FFmpeg assembly
│       ├── generated/
│       │   └── scenes/             # Downloaded individual scene video clips
│       ├── output/                 # Final rendered MP4 and QC inspection reports
│       └── logs/                   # Diagnostic screenshots, DOM snapshots, error logs
│
├── engine/
│   ├── project-reader.js           # Directory & state parser
│   ├── scene-planner.js            # Narrative breakdown and scene queue generator
│   ├── prompt-builder.js           # Formulaic Google Flow prompt generator
│   ├── flow-runner.js              # Playwright automation (login, batch, diagnostics)
│   ├── download-manager.js         # Download interception, verification & storage
│   ├── video-editor.js             # Safe FFmpeg programmatic assembly
│   ├── quality-checker.js          # FFprobe analysis, frame extraction & QC reporting
│   └── project-manager.js          # Unified CLI orchestration
│
├── knowledge/
│   ├── creative-direction.md       # Core production philosophy and emotional tone matrix
│   ├── character-guidelines.md     # Master character proportions, accessories & consistency
│   ├── visual-style.md             # Camera framing, lighting, environments, and color
│   ├── prompt-writing-guide.md     # Tested prompt patterns and descriptor rules
│   ├── storytelling-guide.md       # Non-linear pacing, black screens, and silence rules
│   └── editing-guidelines.md       # FFmpeg video standards, transitions, and audio mixing
│
├── config/
│   └── settings.json               # System paths, Chrome profile, timeouts & resolutions
├── chrome-profile/                 # Persistent Chrome session data
├── test/
│   └── system-test.js              # Automated end-to-end component verification suite
├── package.json
├── DEVELOPMENT-STATUS.md
└── README.md
```

---

## 3. Getting Started & Commands

### A. One-Time Google Authentication
Launch a persistent Chrome browser to log into your Google account:
```bash
npm run flow:login
```
1. Chrome will open to `https://labs.google/flow`.
2. Sign in to your Google Account manually and complete any 2FA/security verification.
3. Return to the terminal and press `[ENTER]`. Your session is permanently saved in `./chrome-profile`.

### B. Batch Scene Generation
Once authenticated, process the scene queue automatically:
```bash
npm run flow:batch
```
- Skips scenes that are already completed.
- Tracks retries, downloads videos to `projects/<project>/generated/scenes/`.
- If Google updates its interface, captures a diagnostic screenshot and DOM snapshot to `projects/<project>/logs/`.

### C. Creative Planning
Analyze the creative brief, voiceover audio, and references to generate the scene queue:
```bash
npm run studio:plan
```
Generates `planning/story-analysis.json`, `planning/scenes.json`, and `planning/editing-plan.json`.

### D. Video Editing & Assembly
Assemble generated clips, generate black-screen pauses, mix voiceover and background music, burn captions, and export the finished MP4:
```bash
npm run studio:edit
```

### E. Quality Inspection
Run automated technical checks across all scenes and the final video:
```bash
npm run studio:check
```
Generates `output/qc-report.json` and `output/qc-report.md`, including representative thumbnail frame extractions in `output/qc_thumbs/`.

### F. View Project Status
```bash
npm run studio:status
```

### G. Run Full Pipeline
```bash
npm run studio:run
```

### H. Run Test Verification Suite
```bash
npm test
```

---

## 4. Scene Queue Schema

Each scene in `planning/scenes.json` follows this structured schema:
```json
{
  "id": "scene_001",
  "purpose": "Establish mood and introduce protagonist in stillness",
  "duration": 10,
  "type": "visual_clip",
  "character": "main_character",
  "environment": "sparse modern bedroom with soft morning light",
  "action": "sitting quietly on the edge of the bed looking forward",
  "expression": "emotionally exhausted, quiet introspection",
  "camera": "slow subtle push-in, eye-level medium shot",
  "lighting": "warm directional morning sunlight diffused across floor",
  "composition": "character centered in rule of thirds",
  "references": ["input/references/master-character.png"],
  "prompt": "Cinematic medium shot, eye-level angle. The minimalist humanoid character (main character)...",
  "filename": "scene_001.mp4",
  "status": "pending",
  "retries": 0
}
```

For dramatic black-screen moments:
```json
{
  "id": "scene_003",
  "purpose": "Dramatic silence allowing the realization to land",
  "duration": 3,
  "type": "black_screen",
  "filename": "scene_003.mp4",
  "status": "completed"
}
```

---

## 5. Creative Training & Progressive Development
The `knowledge/` directory acts as our living studio rulebook. As you provide creative references, voiceover audio, and example prompts, we will update:
- `character-guidelines.md` with your master character sheets and variation rules.
- `prompt-writing-guide.md` with tested positive/negative prompt patterns.
- `visual-style.md` with lighting, composition, and environment conventions.
- `storytelling-guide.md` with pacing and emotional timing frameworks.
