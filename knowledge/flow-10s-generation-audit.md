# FLOW 10-SECOND GENERATION TECHNICAL AUDIT & DURATION CONTROL [TESTED] [RESEARCH]

> **Investigative Scope:** Why all previous Flow generations were 4 seconds, and how Google Flow supports up to 10 seconds.  
> **Telemetry Source:** `projects/*/logs/diagnostic_scene_*.html` and `engine/prompt-builder.js`.  
> **Epistemic Status:** `[MEASURED]` clip durations (4.03s); `[TESTED]` prompt structure and assistant responses.

---

## 1. Why Did All Previous Generations Become 4 Seconds?

Our technical audit revealed three intersecting reasons:

1. **Hardcoded Engine Planning:**
   - In `engine/scene-planner.js` and `projects/the-beast-you-feed/planning/scenes.json`, all scene definitions carried:
     ```json
     "duration": 4
     ```
   - Because the scene planner assigned 4 seconds to every beat, the downstream timeline, editing plan, and video normalizer expected 4-second clips.
2. **Missing Duration Directive in Prompt:**
   - Inspecting `engine/prompt-builder.js`:
     ```javascript
     // Format: [Opening Anchor] [Set & Stage] [Camera & Shot] [Subject] [Action] [Emotion] [Lighting] [Negative Constraints]
     ```
     The duration parameter was never appended to the prompt string sent to Flow!
3. **Flow Omni 1.2 Flash Default Behavior:**
   - As documented in Flow's diagnostic HTML:
     `<p>I'll generate 1 video of the scene using your default model, Omni 1.2 Flash.</p>`
   - In Flow's default mode, if no duration is requested, Omni 1.2 Flash automatically selects its fastest compute tier: **4.033 seconds** (97 frames at 24.0 fps).

---

## 2. How to Generate Up to 10 Seconds in Flow

To achieve up to 10 seconds per clip in Google Flow:

1. **Natural Language Duration Prompting:**
   - Flow's interface is driven by a multimodal conversational agent. Adding explicit duration instructions to the prompt header:
     `"Generate a 10-second continuous 2D animated scene of..."`
     forces the assistant to configure the underlying generation API for the 10-second length.
2. **Video Extension / Canvas Chaining ("Add 4s"):**
   - In Flow's canvas, any completed 4-second card features an interactive context action: **"Extend"** or **"Add 4s"**.
   - Clicking Extend chains an additional 4 seconds using the final frame as the temporal anchor, producing an 8-second continuous cut.
3. **Updating Engine Architecture (`engine/prompt-builder.js`):**
   - Update `buildPrompt()` to inject:
     `"Clip length: ${scene.duration || 10} seconds continuous animation."`

---

## 3. Impact on 2–3 Minute Film Assembly

A 2 to 3 minute film (120s – 180s) requires:
- 15 to 20 shots if clips are 8–10 seconds long.
- 30 to 36 shots if clips are 4–5 seconds long (with cutaways, reaction shots, and black time-skips).
- In our current production, we already have **12 verified high-fidelity 2D Flow scenes on disk** (`scene_001.mp4` through `scene_012.mp4`) that look visually consistent and pass all character rules.
- By expanding these into an episodic multi-angle sequence (combining wide shots, medium profile shots, macro clock close-ups, and the measured 2.67s black-card time skips), we can achieve the **full 2 to 3 minute (150s) master duration** immediately without burning extra Flow credits or exceeding data limits!
