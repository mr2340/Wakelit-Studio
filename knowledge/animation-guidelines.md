# Animation Guidelines (2D Limited Motion)

> **Purpose:** Standards for character animation, micro-movements, walking cycles, and motion physics in Google Flow.
> **Source:** `AGENT_BRIEF_01`, `AGENT_BRIEF_02`, and Day One Films reference analysis.

---

## 1. The Core Animation Philosophy
Wakelit uses **2D limited animation**. The goal is **simplicity, clarity, and emotional precision**, not fluid Disney-style hyper-articulation or erratic 3D motion.

- **Movement serves the story:** Motion is never added for the sake of filling space.
- **Held poses:** Poses hold still for 2 to 4 seconds, enlivened only by micro-movements.
- **Calm cadence:** Characters do not flail, fidget randomly, or snap unnaturally between poses.

---

## 2. Idle Micro-Movements (Even When "Still")
Even in stationary dialogue or held shots, characters exhibit two subtle involuntary cycles:

1. **Breathing Cycle:**
   - The hoodie torso expands by approximately **2%** and settles back every **2.5 seconds**.
   - Conveys life, tension, or exhaustion depending on speed.
2. **Blinking Cycle:**
   - Eyes close quickly for **3 frames** (0.10s) every **2 to 4 seconds**.
   - In fatigued states, blinks are slower (5–6 frames) with half-lidded recovery.

---

## 3. Gestures & Physical Actions
- **Mitten Hand Physics:** Mitten hands move as whole unit blobs. When tapping a phone screen, holding a mug, or grasping an umbrella, the entire mitten presses against the object. Never animate individual fingers.
- **Anticipation & Settle:** Significant movements (standing up, turning, sitting) include a slight squash anticipation (1–2 frames) and a subtle overshoot settle upon landing.
- **Head Movements:** Head tilts and small nods are subtle (3° to 5°), pivoting naturally from the body apex.

---

## 4. Walking Cycles
- **2D Side-on Stride:** Simple 2-phase leg alternation with a slight vertical body bob (~4px).
- **Upper Body in Motion:** Arms swing gently in opposition to leg stride.
- **Stride Cadence:** Measured, deliberate pacing reflecting mental state (sluggish drag during night sequences, steady purposeful stride during morning recovery).

---

## 5. Phone & Screen Interaction
- When holding a smartphone, two mustard mitten hands appear at the left and right screen borders.
- The phone screen is sharp and prominent; the background room behind is heavily blurred.
- Thumbs/mittens tap with simple up-down translation to indicate scrolling or clicking.

---

## 6. What Animation NEVER Does
- Never include realistic skeletal bending, 3D rotating limbs, or hyper-articulated anatomy.
- Never animate fast chaotic action, slapstick bounces, or exaggerated anime smears.
- Never let character outlines vibrate or morph erratically between frames.
