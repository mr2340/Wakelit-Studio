# FLOW DURATION & CREDIT ECONOMICS AUDIT [TESTED] [MEASURED]

> **Empirical Basis:** FFprobe inspection of raw generated scene files in `projects/the-beast-you-feed/generated/scenes/` and Google Flow UI telemetry.  
> **Active Model:** Google Flow Omni 1.2 Flash with Character Reference Anchor.  
> **Epistemic Status:** `[MEASURED]` raw clip durations and frame counts; `[TESTED]` generation cycle times and credit approval flows.

---

## 1. Flow Video Duration Technical Audit

### 1.1 Empirical Clip Measurements (FFprobe)
All downloaded Google Flow clips across `scene_001.mp4` through `scene_012.mp4` exhibit identical stream parameters:

| Property | Measured Value | Analysis & Technical Reality |
|---|---|---|
| **Container Duration** | `4.033333 s` | Exactly 4 seconds + 1 frame audio buffer. |
| **Video Stream Frames** | `97 frames` | Exactly 4.0416s at 24.0 fps. |
| **Native Frame Rate** | `24.000 fps` | Standard cinematic progressive scan. |
| **Native Resolution** | `1280 × 720` | Flow 720p base render (upscaling to 1080p/4K is available via submenu). |
| **Pixel Format** | `yuv420p` | Standard Rec.709 color space. |
| **Audio Stream** | Silent / Strip | Handled by automation post-production. |

### 1.2 The "4s vs 10s" Duration Findings
1. **Model Parameter:** In the active Google Flow interface, `Omni 1.2 Flash` natively generates **4-second clips** per submission.
2. **Is 10s Available?** 
   - 10-second generations in Google Flow require selecting higher-parameter foundation models (e.g. Veo 2 / standard Omni) or utilizing the interactive canvas "Extend" / "Add 4s" chaining feature.
   - For rapid 2D episodic production, **4.0s is the optimal sweet spot**. As measured in Brief 02 (`AGENT_BRIEF_02_Edit_Motion_Sound_Workflow.md` line 39), the median shot length across the reference film (`Lust Is Killing You`) is **4.0 seconds** (average 4.1s; most common cut interval: 4s [16 times], 3s [9 times]).
   - Generating 4-second discrete shots natively matches our target narrative cutting rhythm without requiring manual trimming or unnatural speed-ramping.

---

## 2. Google Flow Credit Economics & Cost Modeling

### 2.1 Unit Cost Metrics
- **Generation Cost:** 1 generation credit per submission (4.0s clip).
- **Automation Cycle Time:** 65–85 seconds per generation (including prompt injection, credit auto-approval, canvas rendering, and context menu download).
- **Rejection & Re-roll Buffer:** High-end AI animation requires budgeting for drift and hallucination. We model a realistic **30% rejection/re-roll rate** (1.3 generations per approved final cut).

### 2.2 Cost Breakdown by Film Format

| Film Scope | Approved Cuts | Generative Shots | Black/UI Shots | Estimated Generations (w/ 30% Buffer) | Credit Cost |
|---|---|---|---|---|---|
| **Test 01 (2-Scene Test)** | 2 cuts | 2 | 0 | 2 generations | **2 credits** |
| **12-Beat Master Film (48s)** | 12 cuts | 9 visual | 3 black/macro | 12 generations | **12 credits** |
| **Full Short Film (150s / 2.5m)** | ~36 cuts | 28 visual | 8 black/UI | 36–40 generations | **36–40 credits** |
| **Full Master Cut (200s / 3.3m)** | ~48 cuts | 38 visual | 10 black/UI | 50–55 generations | **50–55 credits** |

### 2.3 Monthly Studio Projections

| Monthly Output | Weekly Pace | Total Monthly Generations | Credit Consumption | Risk / Guardrail Requirements |
|---|---|---|---|---|
| **Tier A: 1 Film / Month** (2.5m) | 1 scene batch / week | 40–50 | **~50 credits** | Low risk; persistent session login verified once per month. |
| **Tier B: 2 Films / Month** | 1 film every 2 weeks | 80–100 | **~100 credits** | Medium; daily diagnostic snapshot audits. |
| **Tier C: 4 Films / Month** (Weekly) | 1 film / week | 160–200 | **~200 credits** | High; strict disk-caching to prevent duplicate generations. |
| **Tier D: 8 Films / Month** (Bi-weekly) | 2 films / week | 320–400 | **~400 credits** | High throughput; automated error alerts and batch limits. |

### 2.4 Credit Protection Protocols
To ensure credits are never squandered:
1. **Disk Check Before Submission:** If `generated/scenes/scene_XXX.mp4` exists and exceeds 10 KB, the engine skips generation automatically.
2. **Strict Generation Caps:** Batch runner enforces a hard limit of $N \le 12$ scenes per run; execution terminates immediately if 3 consecutive failures occur.
3. **No Blind Rerolls:** Prompts must pass the 100-point rubric and human approval gate before triggering `npm run flow:batch`.
