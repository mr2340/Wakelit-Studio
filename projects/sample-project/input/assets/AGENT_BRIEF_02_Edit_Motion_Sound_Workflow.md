# BRIEF 02 — Edit, Motion, Sound and Production Workflow (Wakelit)

**Purpose:** teach you exactly how a Wakelit film is cut, animated, captioned, scored, checked and delivered, with numbers.
**Tags:** [MEASURED] measured on a reference video (hard spec) · [OBSERVED] seen but not measured (strong guide) · [OUR CHOICE] our own decision (rule) · [UNKNOWN] not known, test or ask.
**Read Brief 01 first.** All screen sizes and colours come from there.

---
## 1. Project and timeline settings
| Setting | Value |
|---|---|
| Canvas | 1920 × 1080, **30 fps** |
| Active picture | 1920 × 888 (y 96–984), black bars 96 px top and bottom |
| Length target | **2:45–3:20** (the reference is 3:20) [OUR CHOICE] |
| Colour | SDR, Rec.709 |
| Audio | 48 kHz stereo |

### Track layout (top to bottom)
| Track | Contents |
|---|---|
| V6 | Letterbox bars (two black rectangles, 96 px each) |
| V5 | Film grain (about 4%) and vignette (20–30%) |
| V4 | **Caption overlay** (shaking captions, Screen blend) |
| V3 | Motion-graphic inserts (timers, numbers, counters) |
| V2 | UI inserts (phone, laptop, notebook close-ups) |
| V1 | Scene clips and stills |
| A1 | Spoken whispers |
| A2 | Clock tick |
| A3 | Sub-bass and drone |
| A4 | Foley (footsteps, paper, phone, doors) |
| A5 | Ambience (room, rain, birds) |
| A6 | Pad or music (only if used; no melody by default) |

---
## 2. Rhythm [MEASURED on the reference]
| Measure | Value |
|---|---|
| Length | 3:20 (200 s) |
| Cuts | **48** |
| Average shot | **4.1 s**; median **4.0 s**; shortest 0.6 s; longest 10.1 s |
| Most common gap between cuts | **4 s** (16 times), then **3 s** (9), **2 s** (6) |
| Transition type | hard cut, or a **1–3 frame** dissolve. No wipes or flashy effects |
| Motion | something on screen moves in **30–70%** of frames in every 10 s block |

**Rules for us [OUR CHOICE]:**
- A new image, clip or insert **every 3–5 seconds**. Never hold a static image for more than 2 seconds without a small motion.
- Cut **on the clock tick** when possible.
- Use short scenes and **repeat sets** with small differences (callbacks) rather than many unique images.
- The story pace is **one caption line every 3–5 s**.

---
## 3. Transitions
- **Default:** hard cut.
- **Optional:** a 3-frame cross-dissolve. No other transition is allowed.
- **Time skips** use a **black card** (section 4).
- **Fade from black** only at the very start.
- **Never** use zooms, spins, glitches, whip pans or slide effects.

---
## 4. The black card (time-skip) [MEASURED, frame-exact on "30 minutes later..."]
This is the reference's most important editing device. Build it exactly.

| Step | Time | Frames @30 fps |
|---|---|---|
| Hard cut from the scene to **pure black** | t = 0 | — |
| **Pure black** (no text) | 0.17 s | about 4–5 |
| Text **fades in** (opacity 0 → 100%) | 0.23 s | about 7 |
| Text **holds** at 100% | about 1.97 s | about 59 |
| Text **fades out** | about 0.20–0.23 s | about 6–7 |
| **Pure black** again | about 0.10 s | about 3 |
| Hard cut to the next scene | total card ≈ **2.63 s** | about 79 |

**Text:** white (about 245 brightness), bold rounded Comic-style, about **66 px at 1080p**, **centred horizontally**, **vertical centre at about y = 500** (slightly above the centre of the picture). Single line. **No shake** on cards (the measured text did not move more than 1 px).
**Sound on the card [MEASURED]:** all audio **stops completely about 0.7 s before the text starts fading out** and stays silent for **about 1.05 s**, ending **just after the next scene begins** (about 0.07 s). In other words: **the last second of the card and the first instant of the next scene are silent**.
**Opening card [MEASURED]:** the video begins on a black card **2.63 s** long with a **typed** line (see 5.6).

---
## 5. Captions and text animation

### 5.1 Style [MEASURED size and position; font is OUR CHOICE]
| Item | Value |
|---|---|
| Font | **Comic Relief** (or any Comic Sans-style rounded font), **bold** |
| Size | **54 px** at 1080p (reference: about 36 px at 720p) |
| Colour | Bone/white, with a **dark outline 4 px** (#181818), no box |
| Alignment | centred on the screen's vertical centre line (x = 960) |
| Lines | **one line**, 2–9 words, max about 45 characters |
| Letter-spacing | normal |

### 5.2 Positions [MEASURED]
| Where | When | Exact position at 1080p |
|---|---|---|
| **Bottom** (default) | most wide scenes | centred, text sits about **18 px above the bottom of the active picture** (baseline about y = 966; centre about y = 940) |
| **Top** | face close-ups and some bedroom shots | centred, text top about **86 px below the top of the picture** (about y = 182) |
| **Side** | phone close-ups | in the empty space to the right of the phone, middle-height (about x = 1500–1850) |
| **Centre card** | black cards | centre x = 960, y ≈ 500 |
| **Top-left label** | "NIGHT 1" counters | top-left, **x ≈ 112**, top at **y ≈ 163** |
Never put a caption over a character's face.

### 5.3 Timing
- Each caption stays **3–4 seconds**. **One caption at a time** on the narrator layer.
- Captions start **on the same frame as the new scene** or within 0.2 s of it.
- Leave **0.2–0.5 s** of empty screen between captions when you want a pause.

### 5.4 The shake [MEASURED]
- On the lines measured, the text **drifts about 1–3 px at 720p** (about **2–5 px at 1080p**) over a second or two. It is a gentle wobble, like a hand-drawn line "boiling", not a violent shake. On a phone it reads as shaking.
- **Our settings [OUR CHOICE]:**
  - **Subtle (default):** random offset **±3 px** in x and y, rotation **±0.4°**, new offset every **3 frames** (10 per second).
  - **Strong (for emphasis):** offset **±7 px**, rotation **±1.3°**, new offset every **2 frames** (15 per second).
- **Cards do not shake.** Labels (NIGHT n) do not shake.

### 5.5 Entrance and exit
- **Cards:** fade in 7 frames, fade out 6–7 frames (section 4).
- **Counter labels (NIGHT n) [MEASURED]:** pop in over **4 frames (about 0.13 s)**: opacity 50% → 100%, scale 80% → 100%. Hold. Fade out about 3 frames.
- **Ordinary captions:** [UNKNOWN] how the reference enters them frame by frame. **Our rule:** scale 92% → 100% and opacity 60% → 100% over 3 frames, hold, then 3-frame fade out.

### 5.6 The typed opening line [OBSERVED]
The first caption is **typed letter by letter on a black card**, left-aligned inside a centred block (the final text is centred; the letters appear from the left). **Our speed:** one letter every **0.045 s** (about 22 letters per second), starting 0.3 s after the video starts.

### 5.7 The whisper layer (the Shade's voice) [OUR CHOICE, from the reference's second caption layer]
- The reference has a **second layer of faint, quoted lines** for the tempter (grey, low opacity; near the tempter it is red).
- **Ours:** pale blue **#9CC4FF**, **italic**, **opacity about 65%**, in quotes, **50 px**, placed **beside the Shade at eye level** when it's visible, otherwise at the **upper right (about x = 1450, y = 430)**. It shakes like the narrator layer.
- Ayo's own spoken line is **white, not italic, not faint**, at the bottom, because it is *his* voice.

### 5.8 Speech bubbles [OBSERVED]
Near-black rounded box, white Comic-style text, 1–2 words, with a small tail pointing to the speaker. A bubble stays **1–2 seconds**. Bubbles do not shake.

### 5.9 The ending [OBSERVED]
1. **CTA card** ("If this hit, like and subscribe."): white text near the top-centre, a **Like** button (dark pill) and a **Subscribe** button (red pill) below it, a **cursor** that moves to the Subscribe button and **clicks** it, and a small character at the bottom. About 3–5 s.
2. **End card:** a question headline ("Want to turn your nights around?"), a one-line pitch, a **pill-shaped link box** with the community URL, a small thank-you line, and a small character below. About 8–10 s.
3. The channel name and the link must match the real channel and community.

### 5.10 How we produce the captions
We render **one overlay video** for the whole film (white text on black, **Screen** blend mode) from a subtitle file with these styles, then drop it on V4.
**ASS styles used:**
```
Style: Narr,Comic Relief,54,&H00FFFFFF,&H00FFFFFF,&H00181818,&H00000000,-1,0,0,0,100,100,0,0,1,4,0,5,0,0,0,1
Style: Whis,Comic Relief,50,&H00FFC49C,&H00FFC49C,&H00181818,&H00000000,0,-1,0,0,100,100,0,0,1,3,0,5,0,0,0,1
Style: Card,Comic Relief,66,&H00FFFFFF,&H00FFFFFF,&H00181818,&H00000000,-1,0,0,0,100,100,0,0,1,4,0,5,0,0,0,1
Style: Night,Comic Relief,76,&H00D8D8D8,&H00D8D8D8,&H00181818,&H00000000,-1,0,0,0,100,100,0,0,1,4,0,7,0,0,0,1
```
**Event rules:** narrator captions at `\pos(960,940)`; split each caption into 3-frame events, each with a random `\pos` offset of ±3 px and `\frz` of ±0.4°; first event `\fscx92\fscy92\alpha&H99&`; last event `\alpha&H99&`. Cards at `\pos(960,500)` with `\fad(230,230)` starting 0.17 s after the cut to black. Night labels at `\pos(112,150)` with a 130 ms scale-up from 80% to 100%.
**Important:** the overlay is **time-locked**. If the cut changes, **re-render the overlay** from the updated caption file. In CapCut, the same look can be built from text layers with Loop animations.

---
## 6. Motion graphics (small, clean, consistent)
| Device | Spec |
|---|---|
| **Message bubble pop** | scale 90% → 100% over 6 frames with a tiny bounce; incoming bubbles slate grey, outgoing amber |
| **Typing dots** | three dots bouncing one after another, about 0.12 s apart |
| **Digital clock** | red digits #D6453D with a soft glow; numbers change on cuts or with a quick flicker; times must follow the story |
| **Timer** | amber digits "05:00" counting down once per second, pop-in with a small bounce |
| **Big number ("365")** | glowing pale amber, scale 80% → 100% with a soft pulse, fades after about 2 s |
| **Calendar flip** | one page every 1.2–1.3 s, with a paper flutter and slight motion blur |
| **Thought bubble** [OBSERVED] | a rounded rectangle with a small trail of 3 dots, holding small icons of what the character is thinking about |
| **NIGHT counter** | see 5.5 |
Use **only these devices**. Do not add new motion graphics without approval.

---
## 7. Camera and movement
- **Clips (Flow video):** camera locked. Movement is in the characters and objects.
- **Stills (backup):** slow push-in 100% → 106–108% over the shot, or a very small pan. No other camera moves.
- **Phone and laptop close-ups [OBSERVED]:** the screen is sharp, the background is a **blurred** dark room.
- **Never** use camera shake, handheld looks, rotations or zoom punches.

---
## 8. Look in post
- **Vignette** 20–30%, **grain** about 4%, a soft **bloom** on light sources only.
- Keep blacks deep (near **#070608**). Do not lift the shadows.
- Colour grade: slightly cool overall; amber only where the light is amber.
- Letterbox bars on top of everything except the overlay's safe area.

---
## 9. Sound design

### 9.1 The reference's sound [MEASURED]
- **Level:** mostly **−15 to −21 dB RMS**, a steady bed that swells and releases. Loudest part at about **55–65 s** (RMS about −9 to −11 dB, peaks about −1 dB). Quietest parts about −22 to −23 dB RMS.
- **True silences (below −50 dB):** **115.25–116.3 s** (end of the time-skip card) and **124.9–126.0 s** (just before the emotional turn), plus very short gaps at 134.5 s and 149.7–150.1 s, and at the very end.
- **Low-frequency weight:** strong energy below 300 Hz in most blocks (a heavy bass bed).
- **Stereo:** mostly centred (side/mid about −18 dB). Not a wide, binaural mix.
- [UNKNOWN] whether the narrator lines are spoken or only written. Spoken words (the tempter) are about 20 words.

### 9.2 Wakelit sound layers [OUR CHOICE]
| Layer | Spec |
|---|---|
| **Clock tick** | dry, close, slightly hollow wall-clock tick, **60 BPM** (once per second), present from the first second; doubles to 120 BPM for 3–4 s when time speeds up (calendar flips, "a year of nights"); becomes **warmer and softer** at dawn |
| **Sub-bass drone** | around **40–50 Hz**, very low level; fades in when the Shade appears; rises with the Shade's size; drops out at the silences |
| **Room tone** | quiet laptop fan hum when the laptop is on |
| **Foley** | footsteps, paper flips, pen scratch, phone buzz on hollow wood, door handle and creak, laptop lid click, shoe scuff, bed springs |
| **Pad** | none until the recovery; then a **warm soft pad with no melody** |
| **Birds / dawn** | appear when the door opens and grow through the recovery |
| **Music** | **no melody by default.** If music is added in the editor it must be approved |

### 9.3 Voices
- **The Shade's whispers:** low, breathy, a little reverb, slight widening to the right; spoken only in quotes in the script.
- **Ayo's own line:** dry, close, centred, calm, **no reverb**, so it sounds different from the Shade.
- **Total spoken words per film: about 18–25.**

### 9.4 Silence recipe
1. On the time-skip card, mute **all tracks** from **0.7 s before the text begins to fade out** until **0.07 s after the next scene begins**.
2. Place a second short silence (about **1.1 s**) **immediately before the turning point** (before "He did the maths").
3. Use a real mute (delete the audio), not just a volume drop.
4. Bring sound back with the tick first.

### 9.4b Cue-sheet template
`time | track | sound | level | notes` for every sound event; include the loudest section, the silences and the release.

### 9.5 Mix targets
- **−14 LUFS integrated**, **true peak below −1 dB**.
- Whispers audible over the bed by about 6–8 dB.
- Bed ducked 3–6 dB under whispers.
- Check on phone speakers **and** headphones.

---
## 10. Production workflow (every episode)
| # | Step | Output | Gate (must pass) |
|---|---|---|---|
| 1 | Script lock | script with captions, whispers, callbacks | one caption per 3–5 s; one flipped callback; a failed-attempt beat |
| 2 | Cut sheet | table: time, caption, whisper, scene ID, motion, sound | every row 3–5 s; silences marked |
| 3 | Asset list | list of unique scenes and start frames | all scenes use the master room and the lock kit |
| 4 | Stills | approved start frames | Ayo test + visual QC (Brief 01, section 9) |
| 5 | Clips | Flow clips named `C01_keep.mp4` | no drift; correct Shade size |
| 6 | Voice | whispers recorded or generated | correct words, two voices |
| 7 | Rough cut | clips on V1 in order, trimmed to the cut sheet | average shot 3–5 s |
| 8 | Captions | overlay rendered and placed on V4 | timings match; safe area OK |
| 9 | Sound | all A tracks and silences | matches cue sheet; −14 LUFS |
| 10 | Post | vignette, grain, bars | black levels OK |
| 11 | QC | QC report | every item PASS |
| 12 | Export | final file, thumbnail, title, description | see section 12 |
| 13 | Review | analytics notes | what to change next |

### Time budget [OUR CHOICE]
80 minutes a day. **Day 1:** script, cut sheet, assets list. **Day 2:** stills and approvals. **Day 3:** Flow clips (6 a day, so this stage may take 3–4 days for a full film). **Day 4:** edit, captions, sound, QC, upload. The first film will take longer than later ones.

### Flow clip prompt anatomy
Every clip prompt has: (1) *Use the attached Ayo and the attached start frame*, (2) *start frame description*, (3) *length (max 10 s)*, (4) *style and camera lock*, (5) *second-by-second animation*, (6) *screens, light and motion graphics*, (7) *sound*, (8) *avoid list*. Full examples are in the project's clip-prompt file.

### Clip handling rules
- Keep 2–3 versions; choose the one with **no drift**.
- **Chain** scenes by using the last frame of one clip as the start frame of the next.
- **Fallback:** if a clip fails twice, use the still with a slow push-in.
- Trim clips to the cut-sheet length; do not stretch their speed.
- If Flow adds music or voices you did not ask for, remove that audio.

---
## 11. Final QC checklist (report PASS or FAIL for each)
**Picture**
- [ ] 1920×1080, 30 fps; letterbox bars 96 px
- [ ] Every shot passes the Brief 01 visual QC
- [ ] Ayo and the cast look consistent; the Shade is the right size in each shot
- [ ] Cuts: average shot **3–5 s**; no static image longer than 2 s without motion
**Text**
- [ ] Captions inside the safe area, never over a face
- [ ] Font, size, colours and positions as in section 5
- [ ] Shake is **subtle** by default; cards and labels do not shake
- [ ] Opening typed line works; black cards match section 4 timings
- [ ] No spelling mistakes
**Sound**
- [ ] Clock tick present from the first second
- [ ] **Two real silences** (card end and before the turn)
- [ ] Loudest section sits at the story's peak
- [ ] Whispers clear; Ayo's voice dry, the Shade's voice reverbed
- [ ] −14 LUFS integrated, true peak below −1 dB
**Story**
- [ ] A callback with a flipped outcome
- [ ] A failed attempt and a time-skip card
- [ ] A counter montage
- [ ] The last line is a rule, not a lecture
**Originality**
- [ ] No copied characters, scenes, scripts or branding
- [ ] The thumbnail and title are original

---
## 12. Export and upload
- **Video:** H.264, 1920×1080, 30 fps, about **12–16 Mbps**, MP4.
- **Audio:** AAC, 48 kHz, 320 kbps, **−14 LUFS**.
- **Captions file:** upload an `.srt` as subtitles.
- **Thumbnail:** 1280×720 (or 1920×1080), under 2 MB, readable at about 150 px wide, huge white chunky text with **one amber word**, one character face, one prop.
- **Title:** under about 50 characters; **description** from the channel template; **3 hashtags max**.
- **Disclosure:** answer YouTube's altered/synthetic content question honestly after checking the current policy.

---
## 13. Troubleshooting
| Problem | Likely cause | Fix |
|---|---|---|
| The film feels slow | shots too long | cut to 3–5 s and add inserts |
| It feels flat | no silence or no build | add the two silences; make the Shade's growth match the sound |
| Captions look pasted on | no shake, wrong blend | use the overlay in Screen blend; subtle shake |
| Captions don't match | the cut changed | re-render the overlay |
| Ayo drifts | too much text in the prompt or too many changes | shorter prompt, attach the right expression, composite if needed |
| Sound is muddy | too many layers | remove the pad, keep tick + bass + whispers |
| The black card feels wrong | timing | rebuild it with the frame recipe in section 4 |
