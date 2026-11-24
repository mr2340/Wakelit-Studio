const fs = require('fs');
const path = require('path');
const PromptBuilder = require('../engine/prompt-builder');

const projectRoot = path.resolve(__dirname, '../projects/the-beast-you-feed');
const promptBuilder = new PromptBuilder();

const scenes = [
  {
    id: "scene_001",
    beat: 1,
    phase: "Midnight Trance / The Hook",
    shotType: "Wide Establishing Master Shot",
    environment: "dark minimalist bedroom, cold blue light cone from monitor illuminating desk on right third, left two-thirds in deep midnight shadow",
    camera: "Wide establishing shot from side angle, locked static tripod camera with zero digital zoom",
    character: "Ayo",
    action: "Ayo sits hunched at desk staring blankly into the cold blue screen, motionless fingers resting on keyboard, slight 2% shoulder breathing, glowing digital clock on desk reads 1:07 AM",
    expression: "tired, glazed eyes, burdened with midnight avoidance",
    lighting: "Cold blue screen bounce (#1B2A4A, #6FA8FF) illuminating front of Ayo against ink slate room (#0B0D14)",
    duration: 4.0,
    type: "visual_clip",
    caption: "It started with one word.",
    captionStart: 0.5,
    captionEnd: 3.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_001.mp4"
  },
  {
    id: "scene_002",
    beat: 2,
    phase: "The Latent Ambition / Dormant Props",
    shotType: "Low-Angle Cutaway Close-Up",
    environment: "dark bedroom floor corner near closed door, pair of clean running shoes and blank unopened sketchbook resting on floorboards",
    camera: "Low angle macro close-up, locked static tripod camera with zero digital zoom",
    character: "Dormant props (shoes and sketchbook)",
    action: "A pair of clean running shoes and an unopened sketchbook sit untouched on the wooden floor under a sliver of ambient moonlight, completely still, subtle dust motes in air",
    expression: "still, dormant, untouched ambition",
    lighting: "Deep dark slate shadows (#0D121D) with a thin warm amber rim (#E89D42) on the shoe laces",
    duration: 4.0,
    type: "visual_clip",
    caption: "Later was always easier than now.",
    captionStart: 4.5,
    captionEnd: 7.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_002.mp4"
  },
  {
    id: "scene_003",
    beat: 3,
    phase: "The Whispered Compromise / The Beast Emerges",
    shotType: "Medium Close-Up Profile",
    environment: "desk area in dark bedroom, cold blue monitor glow",
    camera: "Medium profile shot, locked static tripod camera with zero digital zoom",
    character: "Ayo and The Shade",
    action: "Ayo is seated at the desk. Behind his chair, a smoky obsidian silhouette with glowing horizontal pale-blue slit eyes (#9CC4FF) rises silently from the shadows, hovering closely near his shoulder",
    expression: "Ayo looks fatigued and sedated; The Shade is calm, seductive, and shadowy",
    lighting: "Cold blue monitor light on Ayo's face, dark obsidian smoke silhouette behind with pale glowing eyes (#9CC4FF)",
    duration: 4.0,
    type: "visual_clip",
    caption: "You'll feel ready tomorrow.",
    captionStart: 8.5,
    captionEnd: 11.8,
    references: ["input/references/ayo_anchor.jpg", "input/references/the_shade_anchor.jpg"],
    filename: "scene_003.mp4"
  },
  {
    id: "scene_004",
    beat: 4,
    phase: "The Sinking Trance",
    shotType: "Over-the-Shoulder Medium Shot",
    environment: "dark room looking over Ayo's mustard hoodie shoulder into glowing monitor screen",
    camera: "Over-the-shoulder framing, locked static tripod camera with zero digital zoom",
    character: "Ayo",
    action: "Ayo sits trapped in screen trance. Flickering blue screen reflections wash over his head and mustard hoodie as his head slowly sinks lower in exhaustion",
    expression: "glazed unblinking eyes, weary slump, heavy breathing",
    lighting: "Intense flickering cold screen blue (#3A5A8C) illuminating Ayo's silhouette against deep room shadow",
    duration: 4.0,
    type: "visual_clip",
    caption: "Every excuse fed it.",
    captionStart: 12.5,
    captionEnd: 15.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_004.mp4"
  },
  {
    id: "scene_005",
    beat: 5,
    phase: "The Time Jump (2:41 AM)",
    shotType: "Extreme Close-Up Macro",
    environment: "dark bedside table surface, digital LED clock",
    camera: "Extreme close-up macro lens, locked static tripod camera with zero digital zoom",
    character: "Digital Clock",
    action: "A glowing green digital clock face displays 2:41 AM in sharp minimalist digits in the pitch black bedroom, subtle LED glow",
    expression: "unforgiving passage of midnight time",
    lighting: "Dim green LED numerals (#00E676) shining against pitch black midnight shadow (#080C14)",
    duration: 4.0,
    type: "visual_clip",
    caption: "Tomorrow was already arriving.",
    captionStart: 16.5,
    captionEnd: 19.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_005.mp4"
  },
  {
    id: "scene_006",
    beat: 6,
    phase: "The Heavy Collapse",
    shotType: "Side Profile Medium Shot",
    environment: "dark bedroom with unmade mattress bed",
    camera: "Side profile medium shot, locked static tripod camera with zero digital zoom",
    character: "Ayo and The Shade",
    action: "Ayo collapses heavily face-down onto the mattress without taking off his mustard hoodie or clothes. Above the bed, the smoky obsidian Shade drapes like a heavy dark cloud over him",
    expression: "total defeat, physical exhaustion, burdened slump",
    lighting: "Suffocating dark slate navy (#151B28) with faint residual screen bounce in distance",
    duration: 4.0,
    type: "visual_clip",
    caption: "He carried yesterday into his sleep.",
    captionStart: 20.5,
    captionEnd: 23.8,
    references: ["input/references/ayo_anchor.jpg", "input/references/the_shade_anchor.jpg"],
    filename: "scene_006.mp4"
  },
  {
    id: "scene_007",
    beat: 7,
    phase: "The Void / Sensory Stop (0.0dB Dead Silence)",
    shotType: "Programmatic Black Screen Card",
    environment: "Pure black sensory void",
    camera: "Static black screen",
    character: "None",
    action: "Total sensory stop. Pure black screen with bone white typography centered.",
    expression: "Shattering clarity",
    lighting: "0% light, pure black (#000000)",
    duration: 3.0,
    type: "black_screen",
    caption: "Tomorrow has never once arrived.",
    captionStart: 24.5,
    captionEnd: 27.0,
    references: [],
    filename: "scene_007.mp4"
  },
  {
    id: "scene_008",
    beat: 8,
    phase: "The Mirror Confrontation",
    shotType: "Two-Shot Mirror Reflection",
    environment: "bathroom mirror under cool fluorescent lighting",
    camera: "Direct eye-level frontal shot looking into mirror, locked static tripod camera with zero digital zoom",
    character: "Ayo and The Shade",
    action: "Ayo looks up into the glass with water droplets on his dark brown face. In the mirror reflection right behind his shoulder, the smoky obsidian Shade with pale glowing slit eyes looms silently",
    expression: "Ayo's eyes widen in stark realization; shock turning into fierce internal determination",
    lighting: "Cool fluorescent bathroom light (#A8BED6) on Ayo's face, deep obsidian void behind",
    duration: 4.0,
    type: "visual_clip",
    caption: "He wasn't fighting time. He was feeding it.",
    captionStart: 27.5,
    captionEnd: 30.8,
    references: ["input/references/ayo_anchor.jpg", "input/references/the_shade_anchor.jpg"],
    filename: "scene_008.mp4"
  },
  {
    id: "scene_009",
    beat: 9,
    phase: "The Snap / Breaking the Loop",
    shotType: "Medium Desk Action Shot",
    environment: "bedroom desk, open glowing laptop",
    camera: "Medium angle on desk, locked static tripod camera with zero digital zoom",
    character: "Ayo",
    action: "Ayo steps back to the desk, his mitten hands reach forward and decisively SNAP the laptop lid shut. The cold blue light instantly vanishes into darkness, leaving Ayo standing upright in room shadow",
    expression: "firm resolve, tight jaw, active agency",
    lighting: "Blue light dies instantly, switching to dim warm room ambient shadow (#1A2234)",
    duration: 4.0,
    type: "visual_clip",
    caption: "Five minutes.",
    captionStart: 31.5,
    captionEnd: 34.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_009.mp4"
  },
  {
    id: "scene_010",
    beat: 10,
    phase: "The Physical Stand & Lacing Shoes",
    shotType: "Low Angle Action Staging",
    environment: "bedroom floor near the doorway in pre-dawn light",
    camera: "Low angle looking up, locked static tripod camera with zero digital zoom",
    character: "Ayo",
    action: "Ayo bends down, mitten hands firmly pulling the laces tight on his running shoes. He stands tall, chest expanded, shoulders back, ready to move",
    expression: "calm determined breath, focused eyes",
    lighting: "Pre-dawn indigo transition into early morning amber warmth (#D2A23E, #E89D42)",
    duration: 4.0,
    type: "visual_clip",
    caption: "You have to starve it in the light.",
    captionStart: 35.5,
    captionEnd: 38.8,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_010.mp4"
  },
  {
    id: "scene_011",
    beat: 11,
    phase: "The Dawn Influx & Dissolution",
    shotType: "Wide Bedroom Window Shot",
    environment: "bedroom window with blinds",
    camera: "Wide eye-level shot, locked static tripod camera with zero digital zoom",
    character: "Ayo and The Shade",
    action: "Ayo reaches up and twists the window blinds open. A brilliant beam of warm golden morning sunlight (#E89D42) floods into the dark bedroom. In the background, The Shade violently shrinks and evaporates into thin harmless steam",
    expression: "Ayo bathed in golden sunlight, eyes peaceful and awake",
    lighting: "80% Warm Golden Dawn Sunlight (#E89D42, #F39C12, 3000K), vanishing dark shadows",
    duration: 4.0,
    type: "visual_clip",
    caption: "It only lives where you refuse to go.",
    captionStart: 39.5,
    captionEnd: 42.8,
    references: ["input/references/ayo_anchor.jpg", "input/references/the_shade_anchor.jpg"],
    filename: "scene_011.mp4"
  },
  {
    id: "scene_012",
    beat: 12,
    phase: "Resolution & Awakening (End Title)",
    shotType: "Wide Cinematic Street View",
    environment: "open city street bathed in crisp golden morning dawn",
    camera: "Wide cinematic shot looking down the avenue, locked static tripod camera with zero digital zoom",
    character: "Ayo",
    action: "Ayo in his mustard hoodie and running shoes jogs steadily down the golden sunlit avenue into the distance, moving forward with easy rhythmic pace as morning mist clears",
    expression: "peaceful agency, freedom, vitality",
    lighting: "100% Warm Golden Morning Sunrise (#F5B041, #F39C12)",
    duration: 5.0,
    type: "visual_clip",
    caption: "Wake up. It's time.",
    captionStart: 43.5,
    captionEnd: 47.5,
    references: ["input/references/ayo_anchor.jpg"],
    filename: "scene_012.mp4"
  }
];

// Build standardized prompts for each scene using promptBuilder
const fullScenesManifest = scenes.map(s => {
  const generatedPrompt = promptBuilder.buildPrompt({
    environment: s.environment,
    camera: s.camera,
    action: s.action,
    expression: s.expression,
    lighting: s.lighting
  });

  return {
    id: s.id,
    beat: s.beat,
    phase: s.phase,
    shotType: s.shotType,
    duration: s.duration,
    type: s.type,
    character: s.character,
    environment: s.environment,
    action: s.action,
    expression: s.expression,
    camera: s.camera,
    lighting: s.lighting,
    caption: s.caption,
    captionStart: s.captionStart,
    captionEnd: s.captionEnd,
    references: s.references,
    prompt: s.type === 'black_screen' ? '' : generatedPrompt,
    filename: s.filename,
    status: s.type === 'black_screen' ? 'VERIFIED' : 'PENDING'
  };
});

// Write scenes.json
const scenesPath = path.join(projectRoot, 'planning/scenes.json');
fs.writeFileSync(scenesPath, JSON.stringify(fullScenesManifest, null, 2), 'utf8');
console.log(`Successfully generated full 12-scene manifest: ${scenesPath}`);

// Build complete editing plan
const totalDur = fullScenesManifest.reduce((acc, s) => acc + s.duration, 0);
const editingPlan = {
  project: "the-beast-you-feed",
  title: "The Beast You Feed Every Night - Full Production Master",
  generatedAt: new Date().toISOString(),
  targetCanvas: {
    width: 1920,
    height: 1080,
    fps: 30,
    letterboxBarsY: 96,
    activePictureHeight: 888
  },
  audio: {
    clockTick: "input/assets/audio/sfx/sfx_clock_tick_60bpm.wav",
    subBass: "input/assets/audio/sfx/sfx_sub_bass_drone_45hz.wav",
    roomTone: "input/assets/audio/sfx/amb_room_tone_night.wav",
    dawnPad: "input/assets/audio/sfx/amb_warm_dawn_pad.wav",
    birds: "input/assets/audio/sfx/amb_morning_birds.wav"
  },
  captions: fullScenesManifest.map(s => ({
    sceneId: s.id,
    start: s.captionStart,
    end: s.captionEnd,
    text: s.caption
  })),
  timeline: fullScenesManifest.map(s => ({
    sceneId: s.id,
    type: s.type,
    clipFile: `generated/scenes/${s.filename}`,
    targetDuration: s.duration,
    transitionToNext: s.id === 'scene_006' ? 'fade_to_black' : (s.id === 'scene_007' ? 'hard_cut' : 'hard_cut')
  })),
  totalDurationSeconds: totalDur,
  outputFile: "output/the_beast_you_feed_full_production_master.mp4"
};

const editingPlanPath = path.join(projectRoot, 'planning/editing-plan.json');
fs.writeFileSync(editingPlanPath, JSON.stringify(editingPlan, null, 2), 'utf8');
console.log(`Successfully generated full editing plan: ${editingPlanPath}`);
console.log(`Total film duration: ${totalDur} seconds across 12 narrative scenes.`);
