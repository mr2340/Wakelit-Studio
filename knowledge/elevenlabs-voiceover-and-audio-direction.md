# WAKELIT — ELEVENLABS VOICEOVER & AUDIO DIRECTION SYSTEM
**Project:** The Beast You Feed Every Night  
**Purpose:** Eliminate monotonous clock ticks; provide spine-chilling voiceover, seductive whispers, and supernatural sound design.  
**Tag:** `[STUDIO-STANDARD] [LOCKED]`

---

## 1. ElevenLabs Voice Profiles & Voice Settings

| Character / Role | Recommended ElevenLabs Voice | Voice Settings | Audio Post-Processing (FFmpeg / DAW) |
| :--- | :--- | :--- | :--- |
| **The Shade (The Tempter)** | **Adam** (`pNInz6obpgDQGcFmaJgB`) or **Daniel** (`onwK4e9ZLuTAKqWW03F9`) | Stability: `0.30`<br>Similarity: `0.75`<br>Style: `0.35` | Pitch shift -1.5 semitones, stereo Haas widener (20ms L/R delay), low-pass filter at 3.5 kHz, subtle smoky reverse reverb. |
| **The Narrator / Ayo Internal Monologue** | **Josh** (`TxGEqnHWrfWFTfGW9XjX`) or **Arnold** (`VR6AewLTigWG4xSOukaG`) | Stability: `0.65`<br>Similarity: `0.85`<br>Style: `0.00` | Flat EQ, close-mic proximity effect, mild compressor (-18 dB threshold), zero reverb (intimate bedroom presence). |

---

## 2. Timed Voiceover Script (Exact Timestamp Alignment)

### ACT I: THE SEDUCTION & DETACHMENT (0:00 – 0:45)
- **0:00 – 0:03 (Black Screen):**
  - *Narrator:* `"It started with just one video."`
  - *SFX:* Pure silence.
- **0:06 – 0:12 (Desk Scene):**
  - *Narrator:* `"He told himself he was just unwinding. The running shoes stayed by the door."`
  - *SFX:* Soft 60 BPM clock tick enters at -22 dB.
- **0:18 – 0:24 (The Shade Whispers Behind Chair):**
  - *The Shade (Whisper):* *"You worked hard today... you can start fresh tomorrow."*
  - *SFX:* Sub-bass drone (45 Hz) swells by +6 dB; clock tick drops by -8 dB.
- **0:30 – 0:38 (Phone Mockup Scroll):**
  - *SFX:* Incoming text message vibration on wood (*bzzzt... bzzzt...*).
  - *Notification:* Marcus: *"Ayo we've been waiting at the track 30 mins... you coming?"*
  - *Narrator:* `"His phone buzzed. A friend waiting. He swiped it away without looking."`

---

### ACT II: THE ESCALATION & TRANCE (0:45 – 1:20)
- **0:48 – 0:54 (Bedtime Trance):**
  - *The Shade (Whisper):* *"Just five more minutes. Nobody will know."*
  - *SFX:* Phone screen tap clicks; subtle mattress spring creak.
- **0:58 – 1:08 (Macro Clock Time Jump):**
  - *Narrator:* `"Midnight became 1:00 AM. 1:00 AM became 3:00 AM."`
  - *SFX:* Clock tick doubles to 120 BPM; alarm clock faint red flicker.
- **1:10 – 1:16 (Heavy Collapse):**
  - *SFX:* Heavy thud of Ayo falling face-down onto the mattress.
  - *The Shade (Whisper):* *"Sleep now. You can try again on Monday."*

---

### ACT III: THE VOID & MORAL CLIMAX (1:20 – 1:55)
- **1:20 – 1:24 (The Void):**
  - *Audio:* **ABSOLUTE 0.0 dB DIGITAL SILENCE FOR 3.5 SECONDS.**
  - *Narrator (Soft, hollow):* `"Monday never came."`
- **1:26 – 1:36 (Bathroom Mirror Confrontation):**
  - *SFX:* Cold water splashing into ceramic sink. Ayo gasping.
  - *Narrator:* `"In the mirror, the face staring back was a stranger."`
- **1:38 – 1:44 (The Shade Looms in Mirror):**
  - *The Shade (Deep, distorted whisper):* *"Look at you. You belong to me now."*
  - *Narrator:* `"He wasn't fighting time. He was feeding it."`

---

### ACT IV: THE AWAKENING & AGENCY (1:55 – 2:30)
- **1:55 – 2:02 (Breaking the Loop):**
  - *SFX:* **LOUD, DECISIVE LAPTOP LID SLAP** or **PHONE THROWN ONTO DESK**.
  - *Narrator:* `"The loop broke the moment he stopped lying."`
- **2:05 – 2:15 (Tying Laces & Dawn Influx):**
  - *SFX:* Shoe laces tightening; wooden window sash sliding open.
  - *Narrator:* `"He laced his shoes in the dark. He didn't wait to feel ready."`
  - *Music:* Warm amber synth pad and distant morning birdsong fade in smoothly.
- **2:20 – 2:30 (Sunlit Avenue Jog):**
  - *Narrator:* `"Tomorrow doesn't exist. Today is all you have."`
  - *Music:* Uplifting resolution chord swells to -14 LUFS.

---

## 3. How to Generate These Voiceovers in ElevenLabs

If the user provides an ElevenLabs API key, the studio engine can generate these files automatically via `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`.  
Alternatively, the user can copy the exact text above into ElevenLabs web UI, download the two WAV files (`voice_shade_whispers.wav` and `voice_narrator_master.wav`), and drop them into `input/assets/audio/voiceover/`.
