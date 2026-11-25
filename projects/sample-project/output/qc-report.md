# Quality Control Report: sample-project

- **Inspection Date:** 2026-11-25T08:55:13.152Z
- **Technical Status:** ⚠️ ISSUES DETECTED
- **Total Scenes:** 5 (Passed: 5, Failed: 0, Missing: 0)

---

## Visual Fidelity Gate
- **Style:** Flat 2D minimalist cartoon animation, unshaded solid fills, thin dark outline
- **Character Compliance:**
  - ✅ Ayo: #613729 head, #D2A23E mustard hoodie, #666668 trousers, mitten hands
  - ✅ Anatomy: strictly no neck, no ears, no nose, no fingers
  - ✅ The Shade: smoky obsidian silhouette, horizontal pale-blue slit eyes (#9CC4FF)
- **Negative Prompt Audit:** PASS - Strictly forbids 3D, CGI, Unreal Engine, Octane render, photorealism

---

## Final Output Status
- **File Present:** Yes
- **Duration:** 2520.00 seconds (Target: 11s | Delta: 2509s | Gate: ❌ FAIL)
- **Resolution:** 1920x1080
- **Audio Present:** Yes

### Issues:
- ❌ DURATION_GATE_FAILURE: Final export duration (2520.0s) deviates by 2509.0s from expected target (11.0s). Acceptable tolerance is ±2s.

---

## Scene Inspection Details
| Scene ID | Type | Expected Dur | Actual Dur | Resolution | Visual Check | Status |
|----------|------|--------------|------------|------------|--------------|--------|
| scene_001 | visual_clip | 10s | 2520.0s | 1920x1080 | Flat 2D: PASS | ✅ Pass |
| scene_002 | visual_clip | 10s | 2520.0s | 1920x1080 | Flat 2D: PASS | ✅ Pass |
| scene_003 | black_screen | 3s | N/A | N/A | Flat 2D: PASS | ✅ Pass |
| scene_004 | visual_clip | 10s | 2520.0s | 1920x1080 | Flat 2D: PASS | ✅ Pass |
| scene_005 | visual_clip | 10s | 2520.0s | 1920x1080 | Flat 2D: PASS | ✅ Pass |

---

## Creative Review (Requires Human Judgement)
- 🔍 **Review:** Visual style alignment with flat 2D hand-drawn character design (zero 3D specular shine)
- 🔍 **Review:** Ayo consistency: brown head (#613729), mustard hoodie (#D2A23E), mitten hands, no neck/ears/nose
- 🔍 **Review:** The Shade consistency: smoky obsidian silhouette, horizontal pale-blue slit eyes (#9CC4FF)
- 🔍 **Review:** Chromatic law: Cold blue (screen sedation) vs Warm amber (dawn and action)
