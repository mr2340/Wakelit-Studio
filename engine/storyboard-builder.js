const fs = require('fs');
const path = require('path');
const ProjectReader = require('./project-reader');

/**
 * StoryboardBuilder generates comprehensive visual and structural storyboards
 * for Wakelit productions, ensuring shot variety, dynamic camera grammar,
 * composition planning, and pre-generation visual verification.
 */
class StoryboardBuilder {
  constructor(projectName = 'the-beast-you-feed', baseDir = path.resolve(__dirname, '..')) {
    this.projectName = projectName;
    this.baseDir = baseDir;
    this.reader = new ProjectReader(projectName, baseDir);
  }

  log(msg) {
    console.log(`[StoryboardBuilder ${new Date().toLocaleTimeString()}] ${msg}`);
  }

  /**
   * Generates a 12-scene visual storyboard with cinematic shot grammar
   * (Wide Master, Cutaways, Over-the-Shoulder, Medium Close-Ups, High Angle).
   */
  generateStoryboard() {
    this.log(`Generating visual storyboard for "${this.projectName}"...`);
    const paths = this.reader.getPaths();

    // Standard 12-beat storyboard for "The Beast You Feed Every Night"
    const storyboardData = {
      project: this.projectName,
      title: "The Beast You Feed Every Night",
      logline: "At 1:07 AM, a paralyzed young man repeatedly chooses comfort over his dormant ambitions, fueling an obsidian creature of avoidance until silence forces a choice.",
      aspectRatio: "2.39:1 Anamorphic (Letterboxed 1920x1080, 96px top/bottom mattes)",
      totalScenes: 12,
      targetDurationSeconds: 150,
      scenes: [
        {
          sceneNumber: 1,
          beat: "Beat 1: Midnight Trance (The Hook)",
          timecode: "00:00 - 00:08",
          duration: 8,
          shotType: "Wide Establishing Master Shot",
          cameraAngle: "Eye-level 28mm wide, locked tripod (NO digital zoom)",
          focalPoint: "Ayo hunched at desk on the right third, surrounded by dark negative space",
          compositionNotes: "Cold blue monitor glow (#1B2A4A) casts a harsh triangle of light onto Ayo. Left two-thirds of room in oppressive dark navy shadow.",
          characterAction: "Ayo sits frozen, staring unblinkingly at the blue screen. Minimal 2% chest breathing. Fingers motionless on keyboard.",
          lighting: "85% Cold Blue (#1B2A4A, 6500K), 15% Deep Midnight Shadow (#0D121D)",
          audioCue: "60 BPM mechanical clock tick enters at t=0s. 45 Hz sub-bass drone at t=2s.",
          caption: "It started with one word.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0D121D"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Window & wall -->
            <rect x="100" y="50" width="70" height="90" fill="#141E30" stroke="#1E2C44" stroke-width="2"/>
            <line x1="135" y1="50" x2="135" y2="140" stroke="#1E2C44" stroke-width="2"/>
            <!-- Desk & Monitor on right -->
            <polygon points="310,130 460,90 480,240 310,240" fill="#1B2A4A" opacity="0.35"/>
            <rect x="400" y="110" width="12" height="60" fill="#3A5A8C"/>
            <polygon points="400,110 320,135 320,185 400,170" fill="#64B5F6" opacity="0.4"/>
            <!-- Desk -->
            <rect x="290" y="170" width="150" height="8" fill="#2C3440"/>
            <line x1="310" y1="178" x2="310" y2="246" stroke="#2C3440" stroke-width="4"/>
            <line x1="420" y1="178" x2="420" y2="246" stroke="#2C3440" stroke-width="4"/>
            <!-- Ayo silhouette hunched -->
            <circle cx="340" cy="140" r="18" fill="#613729"/>
            <path d="M 320,165 Q 340,155 355,170 L 350,210 L 325,210 Z" fill="#D2A23E"/>
            <rect x="325" y="210" width="25" height="36" fill="#222222"/>
            <!-- Clock text -->
            <text x="375" y="165" font-family="monospace" font-size="9" fill="#00E676">1:07 AM</text>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"It started with one word."</text>
          </svg>`
        },
        {
          sceneNumber: 2,
          beat: "Beat 2: The Dormant Props (Cutaway Contrast)",
          timecode: "00:08 - 00:16",
          duration: 8,
          shotType: "Low-Angle Cutaway Close-Up",
          cameraAngle: "Low ground angle, 50mm macro, static camera (NO zoom)",
          focalPoint: "A pair of clean running shoes and an unopened sketchbook on the floor",
          compositionNotes: "Extreme visual contrast to Scene 1. Warm amber sliver of moonlight (#E89D42) touches the running shoe laces, surrounded by dust motes.",
          characterAction: "Cutaway prop shot: no character body visible, only Ayo's slippers resting motionless in upper frame. Running shoes untouched.",
          lighting: "60% Midnight Shadow (#0D121D), 40% Warm Amber Rim (#E89D42)",
          audioCue: "Clock tick continues at 60 BPM. Distant cold wind ambience.",
          caption: "Later was always easier than now.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0D121D"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Floor line -->
            <line x1="0" y1="210" x2="480" y2="210" stroke="#1A2234" stroke-width="2"/>
            <!-- Running shoes -->
            <ellipse cx="200" cy="190" rx="35" ry="18" fill="#E89D42" opacity="0.85"/>
            <ellipse cx="200" cy="186" rx="28" ry="12" fill="#D2A23E"/>
            <ellipse cx="250" cy="195" rx="35" ry="18" fill="#E89D42" opacity="0.95"/>
            <ellipse cx="250" cy="191" rx="28" ry="12" fill="#F4B860"/>
            <!-- Sketchbook -->
            <polygon points="100,175 160,165 175,200 115,210" fill="#EDE6D6" stroke="#C4B59D" stroke-width="2"/>
            <line x1="105" y1="180" x2="165" y2="170" stroke="#A89B85" stroke-width="1"/>
            <!-- Subtle dust motes -->
            <circle cx="180" cy="150" r="1.5" fill="#E89D42" opacity="0.6"/>
            <circle cx="230" cy="140" r="2" fill="#E89D42" opacity="0.8"/>
            <circle cx="280" cy="160" r="1.5" fill="#E89D42" opacity="0.5"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Later was always easier than now."</text>
          </svg>`
        },
        {
          sceneNumber: 3,
          beat: "Beat 3: The Rationalization (Face Tension)",
          timecode: "00:16 - 00:26",
          duration: 10,
          shotType: "Tight Medium Close-Up",
          cameraAngle: "Direct profile 50mm, steady locked camera",
          focalPoint: "Ayo's face in side profile; screen reflection flickering across dark eyes",
          compositionNotes: "Asymmetric lighting: right cheek illuminated by cold blue screen, left ear/hoodie dissolved into pitch black.",
          characterAction: "Ayo blinks slowly twice. A subtle swallow and brow furrow as rationalization occurs. Fingers tap one single key.",
          lighting: "70% Cold Blue Screen Bounce (#3A5A8C), 30% Pitch Black (#0A0E17)",
          audioCue: "Clock tick slows by 5%, keyboard tap click, sub-bass pulse.",
          caption: "Just ten more minutes.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0A0E17"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Monitor light beam from right -->
            <polygon points="480,60 480,210 270,170 270,100" fill="#64B5F6" opacity="0.15"/>
            <!-- Ayo profile close-up -->
            <ellipse cx="230" cy="130" rx="65" ry="70" fill="#613729"/>
            <!-- Hoodie hood -->
            <path d="M 160,110 Q 180,50 250,65 Q 220,140 180,190 Z" fill="#D2A23E"/>
            <path d="M 160,190 L 260,190 L 270,246 L 150,246 Z" fill="#D2A23E"/>
            <!-- Cold highlight on face edge -->
            <path d="M 280,100 Q 295,130 280,165" stroke="#90CAF9" stroke-width="4" fill="none" opacity="0.8"/>
            <!-- Eye tired -->
            <ellipse cx="265" cy="125" rx="10" ry="12" fill="#FFFFFF"/>
            <ellipse cx="268" cy="126" rx="6" ry="7" fill="#151515"/>
            <ellipse cx="270" cy="124" rx="2" ry="2" fill="#64B5F6"/>
            <!-- Tired brow -->
            <path d="M 255,108 Q 272,112 280,118" stroke="#222222" stroke-width="3" fill="none"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Just ten more minutes."</text>
          </svg>`
        },
        {
          sceneNumber: 4,
          beat: "Beat 4: The Birth of The Beast",
          timecode: "00:26 - 00:38",
          duration: 12,
          shotType: "High-Angle Wide Shot (Looking Down)",
          cameraAngle: "High 45-degree angle looking down at bedroom, static camera",
          focalPoint: "Ayo at desk, and a smoky obsidian shadow detaching from the floor behind him",
          compositionNotes: "The shadow on the floor begins curling upward into smoky tendrils with two pale horizontal slits.",
          characterAction: "Ayo continues scrolling. Behind him, the obsidian Shade rises smoothly to ceiling height.",
          lighting: "90% Cold Blue/Navy (#121927), 10% Pale Blue Slit Eyes (#9CC4FF)",
          audioCue: "Clock tick muffles (low-pass filter @ 300Hz), deep organic rumble (38 Hz).",
          caption: "Every excuse fed it.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#090D14"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Room isometric floor lines -->
            <polygon points="50,220 240,150 430,220 240,246" fill="#101724"/>
            <!-- Ayo tiny at desk -->
            <rect x="290" y="170" width="60" height="40" fill="#1E2A3C"/>
            <circle cx="310" cy="165" r="9" fill="#613729"/>
            <rect x="304" y="174" width="12" height="15" fill="#D2A23E"/>
            <!-- The Shade rising behind -->
            <path d="M 170,220 Q 150,130 190,80 Q 240,70 230,140 Q 240,190 220,220 Z" fill="#040608" opacity="0.95"/>
            <!-- Glowing slit eyes -->
            <line x1="185" y1="105" x2="200" y2="105" stroke="#9CC4FF" stroke-width="2.5"/>
            <line x1="208" y1="105" x2="223" y2="105" stroke="#9CC4FF" stroke-width="2.5"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Every excuse fed it."</text>
          </svg>`
        },
        {
          sceneNumber: 5,
          beat: "Beat 5: The Time Jump (2:41 AM)",
          timecode: "00:38 - 00:50",
          duration: 12,
          shotType: "Close-Up Digital Clock & Eye Reflection",
          cameraAngle: "Extreme Close-Up 85mm, static locked",
          focalPoint: "Digital clock numbers shifting from 1:07 to 2:41 AM",
          compositionNotes: "Green LED numbers blur into focus. Background is completely dark.",
          characterAction: "Numbers flick rapidly. Heavy tired blink.",
          lighting: "10% Neon Green (#00E676), 90% Midnight Shadow (#080C14)",
          audioCue: "Clock tick accelerates to 120 BPM for 2 seconds, then abruptly cuts back to 60 BPM.",
          caption: "Tomorrow was already arriving.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#080C14"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Digital Clock Face -->
            <rect x="140" y="80" width="200" height="100" rx="12" fill="#131B28" stroke="#1E2A3A" stroke-width="3"/>
            <text x="240" y="148" font-family="monospace" font-size="44" font-weight="bold" fill="#00E676" text-anchor="middle">2:41<tspan font-size="20"> AM</tspan></text>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Tomorrow was already arriving."</text>
          </svg>`
        },
        {
          sceneNumber: 6,
          beat: "Beat 6: The Heavy Collapse",
          timecode: "00:50 - 01:05",
          duration: 15,
          shotType: "Over-the-Shoulder Medium Shot",
          cameraAngle: "Over-the-shoulder looking down at unmade bed, static camera",
          focalPoint: "Ayo collapsing face down onto unmade mattress without changing clothes",
          compositionNotes: "The Shade hovers directly over the bed canopy like a suffocating blanket.",
          characterAction: "Ayo steps toward bed, collapses heavily. Heavy exhale.",
          lighting: "80% Dark Slate (#151B28), 20% Blue Screen Residual Bounce (#263852)",
          audioCue: "Dull mattress thud, heavy sigh, clock tick fades into distant echo.",
          caption: "He carried yesterday into his sleep.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0A0E18"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Bed -->
            <rect x="120" y="130" width="260" height="90" rx="6" fill="#1B2436"/>
            <ellipse cx="160" cy="150" rx="25" ry="15" fill="#2E3C54"/>
            <!-- Ayo collapsed -->
            <circle cx="210" cy="160" r="14" fill="#613729"/>
            <rect x="220" y="155" width="60" height="25" rx="6" fill="#D2A23E"/>
            <rect x="280" y="158" width="55" height="20" rx="4" fill="#222222"/>
            <!-- The Shade draped above -->
            <path d="M 100,100 Q 250,70 380,100 Q 300,140 200,135 Z" fill="#030508" opacity="0.9"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"He carried yesterday into his sleep."</text>
          </svg>`
        },
        {
          sceneNumber: 7,
          beat: "Beat 7: Morning Guilt (7:15 AM Alarm)",
          timecode: "01:05 - 01:18",
          duration: 13,
          shotType: "Frontal Medium Shot (Bed Level)",
          cameraAngle: "Low eye level, 35mm locked static",
          focalPoint: "Ayo's hand slapping the phone alarm, eyes bloodshot and swollen",
          compositionNotes: "Grey murky morning light (#3A4454) creeping through closed blinds. No warm dawn yet.",
          characterAction: "Hand reaches out sluggishly, silences alarm, pulls blanket back over head.",
          lighting: "70% Murky Grey (#333E4F), 30% Phone Screen Flash (#FFFFFF)",
          audioCue: "Harsh piercing smartphone alarm, abrupt silence on tap, heavy muffled groan.",
          caption: "Morning brought no clean slate.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#151C28"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Blinds grey light slats -->
            <line x1="50" y1="60" x2="160" y2="60" stroke="#333E4F" stroke-width="4"/>
            <line x1="50" y1="75" x2="160" y2="75" stroke="#333E4F" stroke-width="4"/>
            <line x1="50" y1="90" x2="160" y2="90" stroke="#333E4F" stroke-width="4"/>
            <!-- Bed & Ayo head emerging -->
            <rect x="180" y="140" width="220" height="80" fill="#202A3C"/>
            <circle cx="210" cy="140" r="16" fill="#613729"/>
            <!-- Phone on nightstand -->
            <rect x="110" y="150" width="30" height="50" rx="4" fill="#64B5F6" opacity="0.9"/>
            <!-- Hand reaching -->
            <path d="M 180,148 Q 150,152 135,160" stroke="#613729" stroke-width="10" stroke-linecap="round" fill="none"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Morning brought no clean slate."</text>
          </svg>`
        },
        {
          sceneNumber: 8,
          beat: "Beat 8: The Mirror Confrontation",
          timecode: "01:18 - 01:30",
          duration: 12,
          shotType: "Two-Shot Mirror Framing",
          cameraAngle: "Looking directly into bathroom mirror, static tripod",
          focalPoint: "Ayo staring into his own reflection, with The Shade towering behind his shoulder",
          compositionNotes: "Harsh overhead fluorescent bathroom light. Complete absence of shadows on the front; total obsidian density behind.",
          characterAction: "Ayo splashes water on face, looks up into the glass. Freezes as he sees the slit eyes behind him.",
          lighting: "80% Cold Fluorescent White (#A8BED6), 20% Deep Shadow (#0B0F16)",
          audioCue: "Faucet water dripping: drip... drip... drip... (40 BPM cadence).",
          caption: "He wasn't fighting time. He was feeding it.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#121824"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Mirror frame -->
            <rect x="140" y="45" width="200" height="165" rx="8" fill="#1C273A" stroke="#374862" stroke-width="4"/>
            <!-- Reflection of Ayo -->
            <circle cx="220" cy="125" r="24" fill="#613729"/>
            <path d="M 190,155 L 250,155 L 260,205 L 180,205 Z" fill="#D2A23E"/>
            <!-- The Shade reflection looming -->
            <path d="M 230,60 Q 280,45 300,100 Q 310,170 260,190 Z" fill="#040608"/>
            <line x1="260" y1="85" x2="275" y2="85" stroke="#9CC4FF" stroke-width="2.5"/>
            <line x1="282" y1="85" x2="297" y2="85" stroke="#9CC4FF" stroke-width="2.5"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"He wasn't fighting time. He was feeding it."</text>
          </svg>`
        },
        {
          sceneNumber: 9,
          beat: "Beat 9: The Turning Point (DEAD SILENCE)",
          timecode: "01:30 - 01:42",
          duration: 12,
          shotType: "Extreme Close-Up (Eyes & Breath)",
          cameraAngle: "Macro 100mm on Ayo's eyes, static locked",
          focalPoint: "Ayo's eyes widen slightly; pupil contracts. The realization takes hold.",
          compositionNotes: "Dead silence beat. All music, sub-bass, and clock ticks cut out completely to 0.0 dB.",
          characterAction: "Ayo stops splashing water. Complete stillness. His eyes lock onto his own pupils.",
          lighting: "50% Cold Blue Reflection (#3A5A8C), 50% Amber Dawn Ray (#E89D42)",
          audioCue: "COMPLETE DEAD SILENCE (-60 dB). Zero audio for 3.5 seconds.",
          caption: "Tomorrow has no hands.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0A0E18"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Eyes Macro Close-Up -->
            <ellipse cx="180" cy="130" rx="45" ry="32" fill="#FFFFFF"/>
            <ellipse cx="185" cy="130" rx="20" ry="22" fill="#181818"/>
            <ellipse cx="190" cy="126" rx="5" ry="5" fill="#E89D42"/>
            <ellipse cx="300" cy="130" rx="45" ry="32" fill="#FFFFFF"/>
            <ellipse cx="305" cy="130" rx="20" ry="22" fill="#181818"/>
            <ellipse cx="310" cy="126" rx="5" ry="5" fill="#E89D42"/>
            <!-- Firm brow, determined -->
            <path d="M 130,105 Q 180,95 230,105" stroke="#613729" stroke-width="6" fill="none"/>
            <path d="M 250,105 Q 300,95 350,105" stroke="#613729" stroke-width="6" fill="none"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Tomorrow has no hands."</text>
          </svg>`
        },
        {
          sceneNumber: 10,
          beat: "Beat 10: The Physical Reversal",
          timecode: "01:42 - 01:54",
          duration: 12,
          shotType: "Medium Full Shot (Action Staging)",
          cameraAngle: "Low tracking 35mm, crisp lateral profile",
          focalPoint: "Ayo bends down, laces the running shoes, snaps laptop shut",
          compositionNotes: "First dominant warm amber lighting in the entire film. Golden sunlight (#F39C12) cuts diagonally across the room.",
          characterAction: "Ayo's mitten hands firmly pull the shoe laces tight. He stands upright with shoulders back.",
          lighting: "70% Warm Amber Dawn (#F39C12, 3000K), 30% Fading Blue (#1B2A4A)",
          audioCue: "Crisp shoe lace pull, resonant mechanical laptop SNAP, warm uplifting cello swell.",
          caption: "You have to starve it in the light.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#182030"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Golden sun beam cutting across -->
            <polygon points="0,50 180,50 480,246 220,246" fill="#F39C12" opacity="0.3"/>
            <!-- Ayo tying shoes -->
            <circle cx="210" cy="120" r="18" fill="#613729"/>
            <path d="M 195,138 L 235,138 L 225,185 L 185,185 Z" fill="#D2A23E"/>
            <rect x="185" y="185" width="40" height="30" fill="#222222"/>
            <!-- Hands tying laces -->
            <circle cx="230" cy="195" r="7" fill="#613729"/>
            <circle cx="240" cy="195" r="7" fill="#613729"/>
            <!-- Shoes on feet -->
            <ellipse cx="235" cy="215" rx="20" ry="10" fill="#E89D42"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"You have to starve it in the light."</text>
          </svg>`
        },
        {
          sceneNumber: 11,
          beat: "Beat 11: The Dissolution of The Shade",
          timecode: "01:54 - 02:08",
          duration: 14,
          shotType: "Wide Wide Doorway Shot",
          cameraAngle: "Looking through open apartment doorway toward the rising morning sun",
          focalPoint: "Ayo's silhouette walking out into the sunlit street; behind him, The Shade dissolves into thin harmless steam",
          compositionNotes: "High-contrast silhouette against blinding morning sky (#FFF4E0). The Shade cannot survive warm sunlight.",
          characterAction: "Ayo walks steadily across the threshold. The front door clicks shut behind him.",
          lighting: "85% Blinding Dawn Amber (#FFF4E0, #F39C12), 15% Dissolving Obsidian Steam",
          audioCue: "Door latch click, bird chirps outside, rising triumphant brass/strings chord.",
          caption: "It only lives where you refuse to go.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#FFF4E0"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Doorway silhouette frame -->
            <rect x="0" y="24" width="160" height="222" fill="#1A2234"/>
            <rect x="320" y="24" width="160" height="222" fill="#1A2234"/>
            <rect x="160" y="24" width="160" height="30" fill="#1A2234"/>
            <!-- Ayo walking forward in golden light -->
            <circle cx="240" cy="115" r="15" fill="#222222"/>
            <rect x="230" y="130" width="20" height="35" rx="4" fill="#D2A23E"/>
            <rect x="232" y="165" width="8" height="40" fill="#222222"/>
            <rect x="242" y="165" width="8" height="38" fill="#222222"/>
            <!-- Fading smoke wisps in doorway -->
            <path d="M 180,180 Q 200,140 190,100" stroke="#8892A0" stroke-width="3" stroke-dasharray="4,4" fill="none" opacity="0.4"/>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#1A2234" text-anchor="middle">"It only lives where you refuse to go."</text>
          </svg>`
        },
        {
          sceneNumber: 12,
          beat: "Beat 12: Resolution & Awakening (End Title)",
          timecode: "02:08 - 02:30",
          duration: 22,
          shotType: "Wide Cinematic Street View $\\to$ Title Card",
          cameraAngle: "Slow locked wide looking down the quiet morning avenue",
          focalPoint: "Ayo jogging into the distance as morning mist clears. Fades to Wakelit signature.",
          compositionNotes: "Crisp morning air, golden rooftops, wide world open and waiting.",
          characterAction: "Ayo jogs with relaxed steady cadence into the golden distance. Fade to black.",
          lighting: "100% Warm Golden Dawn (#F5B041)",
          audioCue: "Footsteps crunching pavement, rhythmic breathing, peaceful acoustic guitar cadence.",
          caption: "Wake up. It's time.",
          svgSketch: `<svg viewBox="0 0 480 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="480" height="270" fill="#0C1018"/>
            <rect y="0" width="480" height="24" fill="#000000"/>
            <rect y="246" width="480" height="24" fill="#000000"/>
            <!-- Golden horizon glow -->
            <polygon points="0,170 480,170 480,246 0,246" fill="#141C2B"/>
            <polygon points="0,170 240,110 480,170" fill="#E89D42" opacity="0.4"/>
            <!-- Distant tiny Ayo running -->
            <circle cx="240" cy="155" r="4" fill="#613729"/>
            <rect x="238" y="159" width="4" height="8" fill="#D2A23E"/>
            <!-- End Title -->
            <text x="240" y="90" font-family="'Comic Sans MS', sans-serif" font-size="28" font-weight="bold" fill="#EDE6D6" text-anchor="middle">WAKELIT</text>
            <text x="240" y="112" font-family="sans-serif" font-size="11" fill="#E89D42" letter-spacing="3" text-anchor="middle">EVERY NIGHT ENDS.</text>
            <text x="240" y="260" font-family="sans-serif" font-size="11" fill="#EDE6D6" text-anchor="middle">"Wake up. It's time."</text>
          </svg>`
        }
      ]
    };

    // Save JSON
    const jsonPath = path.join(paths.planning, 'storyboard.json');
    fs.writeFileSync(jsonPath, JSON.stringify(storyboardData, null, 2), 'utf8');
    this.log(`Storyboard JSON saved to: ${jsonPath}`);

    // Generate HTML Interactive Deck
    const htmlPath = path.join(paths.planning, 'storyboard.html');
    const htmlContent = this.renderHtmlDeck(storyboardData);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    this.log(`Storyboard Interactive HTML deck saved to: ${htmlPath}`);

    // Generate Markdown representation
    const mdPath = path.join(paths.planning, 'storyboard.md');
    const mdContent = this.renderMarkdownDeck(storyboardData);
    fs.writeFileSync(mdPath, mdContent, 'utf8');
    this.log(`Storyboard Markdown documentation saved to: ${mdPath}`);

    return { jsonPath, htmlPath, mdPath, storyboardData };
  }

  renderHtmlDeck(data) {
    const cardsHtml = data.scenes.map(s => `
      <div class="scene-card" id="scene-${s.sceneNumber}">
        <div class="card-header">
          <span class="badge scene-badge">SCENE ${s.sceneNumber.toString().padStart(2, '0')}</span>
          <span class="badge duration-badge">${s.duration}s (${s.timecode})</span>
          <span class="badge shot-badge">${s.shotType}</span>
        </div>
        <div class="preview-frame">
          ${s.svgSketch}
        </div>
        <div class="card-body">
          <h3 class="beat-title">${s.beat}</h3>
          <div class="detail-row"><span class="label">Camera:</span> <span class="val">${s.cameraAngle}</span></div>
          <div class="detail-row"><span class="label">Focal Point:</span> <span class="val">${s.focalPoint}</span></div>
          <div class="detail-row"><span class="label">Action:</span> <span class="val">${s.characterAction}</span></div>
          <div class="detail-row"><span class="label">Lighting:</span> <span class="val">${s.lighting}</span></div>
          <div class="detail-row"><span class="label">Audio:</span> <span class="val">${s.audioCue}</span></div>
          <div class="caption-box">
            <span class="caption-label">Caption:</span> "${s.caption}"
          </div>
        </div>
      </div>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WAKELIT Storyboard: ${data.title}</title>
  <style>
    :root {
      --bg: #090D14;
      --card-bg: #121824;
      --border: #1E2838;
      --amber: #E89D42;
      --blue: #64B5F6;
      --text: #EDE6D6;
      --text-dim: #8A98A8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 30px 20px;
      line-height: 1.5;
    }
    .header {
      max-width: 1400px;
      margin: 0 auto 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .header h1 {
      font-size: 28px;
      color: var(--amber);
      letter-spacing: -0.5px;
    }
    .header p {
      color: var(--text-dim);
      font-size: 15px;
      margin-top: 6px;
    }
    .meta-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 15px;
      font-size: 13px;
    }
    .meta-pill {
      background: #172130;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--border);
    }
    .storyboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 25px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .scene-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: transform 0.2s, border-color 0.2s;
    }
    .scene-card:hover {
      transform: translateY(-3px);
      border-color: var(--amber);
    }
    .card-header {
      display: flex;
      gap: 8px;
      padding: 12px 14px;
      background: #0E141E;
      border-bottom: 1px solid var(--border);
    }
    .badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    .scene-badge { background: var(--amber); color: #000; }
    .duration-badge { background: #1F2A3C; color: var(--blue); }
    .shot-badge { background: #263346; color: #FFF; margin-left: auto; }
    .preview-frame {
      width: 100%;
      background: #000;
      border-bottom: 1px solid var(--border);
      line-height: 0;
    }
    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }
    .beat-title {
      font-size: 16px;
      color: #FFF;
      font-weight: 600;
    }
    .detail-row {
      font-size: 13px;
      color: var(--text-dim);
    }
    .detail-row .label {
      color: #718296;
      font-weight: 600;
      display: inline-block;
      width: 85px;
    }
    .detail-row .val {
      color: #CFD8DC;
    }
    .caption-box {
      margin-top: auto;
      padding: 10px 12px;
      background: #0B101A;
      border-radius: 6px;
      border-left: 3px solid var(--amber);
      font-size: 13px;
      font-style: italic;
      color: #FFF;
    }
    .caption-label {
      color: var(--amber);
      font-style: normal;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      margin-right: 6px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>WAKELIT MASTER STORYBOARD: ${data.title}</h1>
    <p>${data.logline}</p>
    <div class="meta-bar">
      <div class="meta-pill"><strong>Format:</strong> ${data.aspectRatio}</div>
      <div class="meta-pill"><strong>Total Scenes:</strong> ${data.totalScenes}</div>
      <div class="meta-pill"><strong>Runtime:</strong> ${data.targetDurationSeconds}s (~2.5 min)</div>
      <div class="meta-pill"><strong>Protagonist:</strong> Ayo (#613729 head, #D2A23E mustard hoodie)</div>
      <div class="meta-pill"><strong>Camera Law:</strong> Locked Static Tripod (NO artificial Ken Burns zoom)</div>
    </div>
  </div>

  <div class="storyboard-grid">
    ${cardsHtml}
  </div>
</body>
</html>`;
  }

  renderMarkdownDeck(data) {
    let md = `# WAKELIT VISUAL STORYBOARD DECK: ${data.title.toUpperCase()}\n\n`;
    md += `**Logline:** ${data.logline}\n\n`;
    md += `**Format:** ${data.aspectRatio} | **Duration:** ${data.targetDurationSeconds}s (12 Beats)\n\n`;
    md += `---\n\n`;

    data.scenes.forEach(s => {
      md += `### SCENE ${s.sceneNumber.toString().padStart(2, '0')}: ${s.beat}\n`;
      md += `- **Timecode:** ${s.timecode} (${s.duration}s)\n`;
      md += `- **Shot Type:** ${s.shotType}\n`;
      md += `- **Camera Directive:** ${s.cameraAngle}\n`;
      md += `- **Focal Point:** ${s.focalPoint}\n`;
      md += `- **Character Action:** ${s.characterAction}\n`;
      md += `- **Lighting:** ${s.lighting}\n`;
      md += `- **Audio & SFX:** ${s.audioCue}\n`;
      md += `- **Burned Caption:** *"${s.caption}"*\n\n`;
    });

    return md;
  }
}

if (require.main === module) {
  const projectName = process.argv[2] || 'the-beast-you-feed';
  const builder = new StoryboardBuilder(projectName);
  builder.generateStoryboard();
}

module.exports = StoryboardBuilder;
