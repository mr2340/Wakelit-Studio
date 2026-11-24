# Prompt Writing Guide (Google Flow Omni)

> **Purpose:** Formulaic prompt-writing rules, negative guardrails, and reference-locking conventions for Google Flow Omni.
> **Source:** `AGENT_BRIEF_01`, `AGENT_BRIEF_02`, and verified generation testing.

---

## 1. Google Flow Omni Prompt Formula
Every scene prompt submitted to Google Flow must follow this 8-part anatomy:

```
[1. Character Lock & Anchor Directive] + 
[2. Set & Stage Environment] + 
[3. Camera Discipline & Shot Scale] + 
[4. Second-by-Second Character Action & Pose] + 
[5. Eyebrow & Facial Emotion Spec] + 
[6. Lighting, Palette & Glow] + 
[7. Audio/Silence Directive] + 
[8. Negative Constraints & Avoid List]
```

---

## 2. Mandatory Prompt Directives

### Opening Anchor Directive (Always First):
> *"Use the attached character Ayo exactly as drawn in the reference image. Use the attached room as the set. 2D flat minimalist cartoon animation, flat clean shapes, thin hand-drawn outline, zero 3D shading."*

### Negative Guardrails & Avoid List (Always Last):
> *"Do NOT add new characters. No realistic human anatomy, no nose, no ears, no neck, no individual fingers, no mitten fingers, no hair on Ayo, no 3D rendering, no glossy gradients, no text, no captions, no camera shake."*

---

## 3. Example Production Prompts

### Example 1: Scene 01 — Seated Fatigue (Wide Shot)
> `Use the attached character Ayo exactly as drawn in the reference image. Sparse minimalist dark bedroom with a bed, desk, and bedside clock glowing red 01:07. Wide static camera, locked tripod, flat 2D side-on theatrical stage. Ayo sits motionless on the edge of the bed in his mustard hoodie #D2A23E and grey trousers, mitten hands resting on knees. Subtle 2% torso breathing loop, tired and worried expression with inner eyebrows raised and half-lidded black dot eyes. Dark slate navy room #1B2233 with faint cold-blue light spilling from an unseen laptop screen. No nose, no ears, no fingers, no 3D shading, no camera movement, no text.`

### Example 2: Scene 02 — Face Close-Up (Introspection)
> `Use the attached character Ayo exactly as drawn. Close-up shot on Ayo's head and mustard collar, centered horizontally. Camera locked. Ayo's deep brown round head #613729 fills 60% of frame height. His eyes are small black dots with tiny highlights. Brows are worried and slightly trembling. He blinks once slowly over 4 frames, breathing shallowly. Soft ambient dark backdrop with a subtle vignette. Flat 2D art style, thin wobbly outline, no neck, no nose, no ears, no glossy skin highlights, no background noise.`

### Example 3: Scene 03 — The Shade Peeking (Temptation Beat)
> `Use the attached character Ayo on the bed. Under the bed, a soft rounded solid-black blob (The Shade) slides out slowly, knee-high. Two thin glowing horizontal slit eyes in pale blue #9CC4FF open in the black mass. Cold blue rim light glow around the Shade's silhouette. Ayo remains sitting on the bed looking down in guilt. Flat 2D stage, camera locked, dark ink background #0B0D14. No mouth on the Shade, no fingers, no 3D elements, no realistic rendering.`

---

## 4. Drift Prevention & Recovery Protocols
- **If face drifts:** Re-attach `Character_Ayo_looking_tired_and_5ce88056_2K.jpg` and specify: *"mustard hoodie #D2A23E, brown head #613729, dot eyes, no neck"*.
- **If 3D shading appears:** Add: *"strictly flat 2D cartoon, paper cutout illustration style, unshaded solid fills"*.
- **If unwanted extra characters appear:** Add: *"only Ayo in the frame, no other people, no background crowds"*.
