const fs = require('fs');
const path = require('path');
const ProjectReader = require('./project-reader');
const PromptBuilder = require('./prompt-builder');

/**
 * Wakelit Story Developer Engine
 * Integrates deep storytelling intelligence, narrative psychology, 7-stage scriptwriting,
 * and automated quality scoring into the Wakelit production system.
 */
class StoryDeveloper {
  constructor(baseDir = path.resolve(__dirname, '..')) {
    this.baseDir = baseDir;
    this.knowledgeDir = path.join(baseDir, 'knowledge');
    this.promptBuilder = new PromptBuilder(baseDir);

    this.titleTiers = {
      tier1: [
        "The Beast You Feed Every Night.",
        "You Said Tomorrow. Yesterday.",
        "Your Phone Is Stealing Your Future.",
        "You Still Have Time.",
        "The Clock Doesn't Care About Your Excuses.",
        "What 30 Days of Absolute Silence Does to a Man.",
        "You're Not Tired. You're Overstimulated.",
        "Nobody Is Coming to Save You.",
        "DISCIPLINE | An Animated Short Film",
        "Dopamine Jail."
      ],
      tier2: [
        "Your 20s Are Quietly Disappearing.",
        "Lust Is Not Love. It's Poison.",
        "Move In The Dark.",
        "You're Not Broken. You're Just Comfortable.",
        "Perfectionism Is Just Fear in a Suit.",
        "Starve The Doubt.",
        "The Cost of Wasting Another Year.",
        "REBIRTH | An Animated Short Film",
        "Why The Dangerous Man Stays Quiet.",
        "The Monster Living In Your Head."
      ]
    };
  }

  /**
   * Stage 1: Evaluate Idea & Title
   */
  evaluateIdea(title, premise = "") {
    const cleanTitle = (title || "").trim();
    const titleLower = cleanTitle.toLowerCase();

    // Check tier
    let tier = "Tier 3: Future Opportunity";
    let estimatedCTR = "8.5% - 10.5%";

    if (this.titleTiers.tier1.some(t => t.toLowerCase() === titleLower)) {
      tier = "Tier 1: Immediate Production Winner";
      estimatedCTR = "12.0% - 15.5%";
    } else if (this.titleTiers.tier2.some(t => t.toLowerCase() === titleLower)) {
      tier = "Tier 2: Promising Concept";
      estimatedCTR = "10.0% - 12.5%";
    } else if (titleLower.includes("how to") || titleLower.includes("tips") || titleLower.includes("habits of")) {
      tier = "Tier 5: Avoid (Lecturing / Tutorial spam)";
      estimatedCTR = "< 4.0%";
    }

    // Psychological pain point classification
    let psychologicalPillar = "Identity & Awakening";
    if (titleLower.includes("time") || titleLower.includes("clock") || titleLower.includes("tomorrow") || titleLower.includes("year") || titleLower.includes("20s")) {
      psychologicalPillar = "Pillar 1: Time, Age & The Trap of Tomorrow";
    } else if (titleLower.includes("beast") || titleLower.includes("phone") || titleLower.includes("dopamine") || titleLower.includes("lust") || titleLower.includes("overstimulated")) {
      psychologicalPillar = "Pillar 2: Digital Sedation, Dopamine & The Internal Beast";
    } else if (titleLower.includes("dark") || titleLower.includes("silence") || titleLower.includes("quiet") || titleLower.includes("monk")) {
      psychologicalPillar = "Pillar 3: Solitude, Stoicism & Relentless Execution";
    } else if (titleLower.includes("comfortable") || titleLower.includes("broken") || titleLower.includes("doubt") || titleLower.includes("fear") || titleLower.includes("nobody")) {
      psychologicalPillar = "Pillar 4: Breaking Self-Sabotage & The Illusion of Rescue";
    } else if (titleLower.includes("discipline") || titleLower.includes("rebirth") || titleLower.includes("resilience")) {
      psychologicalPillar = "Pillar 5: Monolithic Stoic Cinema";
    }

    return {
      title: cleanTitle,
      tier,
      estimatedCTR,
      psychologicalPillar,
      premise,
      recommendedMode: (titleLower.includes("silence") || titleLower.includes("monk") || titleLower.includes("beast")) ? "Mode B (Visceral Pantomime)" : "Mode A (Philosophical Voiceover)"
    };
  }

  /**
   * Stage 3: Develop Story Concept
   */
  developStoryConcept(ideaData) {
    const isModeB = (ideaData.recommendedMode || "").includes("Mode B");

    return {
      title: ideaData.title,
      productionMode: isModeB ? "mode_b" : "mode_a",
      theme: ideaData.psychologicalPillar,
      tagline: "Every night ends.",
      character: {
        name: "Ayo",
        palette: {
          skin: "#613729",
          hoodie: "#D2A23E",
          pants: "#222222"
        },
        anatomy: "No neck, no ears, no nose, mitten hands with articulated thumb. Flat 2D minimalist cartoon animation, unshaded solid fills, thin dark outline."
      },
      antagonist: {
        name: "The Shade",
        nature: "Internal addiction, digital sedation, and avoidance externalized into a smoky obsidian presence.",
        eyes: "#9CC4FF glowing horizontal slits",
        behavior: "Seductive comfort before suffocating entrapment."
      },
      lightingDuality: {
        trap: "Cold 6500K blue screen glare (#1B2A4A, #3A5A8C)",
        salvation: "Warm 3000K amber dawn (#E89D42, #D2A23E)"
      },
      symbolicProp: "Wall clock and closed running shoes by the doorway",
      turningPoint: "Absolute silence (-50dB) at 1:18 when the illusion of 'Tomorrow' shatters",
      resolution: "Physical action taken in the cold. The Shade shrinks to a wisp. Dawn light touches the floor."
    };
  }

  /**
   * Stage 4: Generate 12-Beat Step Outline
   */
  generate12BeatOutline(concept) {
    const isModeB = concept.productionMode === 'mode_b';

    return [
      {
        beat: 1,
        sceneId: "scene_001",
        timeRange: "0:00 - 0:12",
        duration: 12,
        phase: "Dopamine Hook / Ordinary Dark",
        action: "Ayo sits hunched at desk in dark room, illuminated only by piercing cold blue screen glow.",
        foley: "Loud mechanical clock tick (60 BPM) + phone buzz on hollow wood",
        narration: isModeB ? "" : "It started with one word. He had a plan. He had time.",
        lighting: "Cold blue (#1B2A4A, 6500K)",
        camera: "Slow push-in from wide shot"
      },
      {
        beat: 2,
        sceneId: "scene_002",
        timeRange: "0:12 - 0:25",
        duration: 13,
        phase: "The Latent Ambition",
        action: "Ayo glances toward the shoes by the door and blank sketchbook, but finger lingers on the mouse.",
        foley: "Soft fabric rustle + faint hum of computer fan",
        narration: isModeB ? "" : "The shoes stayed by the door. The blank page stayed white.",
        lighting: "Dark shadows with blue desktop reflection",
        camera: "Medium shot, slight side angle"
      },
      {
        beat: 3,
        sceneId: "scene_003",
        timeRange: "0:25 - 0:38",
        duration: 13,
        phase: "The Whispered Compromise",
        action: "The Shade materializes behind Ayo's chair, resting soft smoky claws near his shoulders.",
        foley: "Low 40Hz sub-bass drone enters + ghostly whisper",
        whisper: "You'll feel ready tomorrow.",
        narration: isModeB ? "You'll feel ready tomorrow." : "The voice was not an enemy. It felt like a warm blanket.",
        lighting: "Cold blue rim light with smoky black tendrils",
        camera: "Over-the-shoulder medium close-up"
      },
      {
        beat: 4,
        sceneId: "scene_004",
        timeRange: "0:38 - 0:50",
        duration: 12,
        phase: "The Sinking Trance",
        action: "Rapid blue flicker on Ayo's face. Ayo's eyes glaze over. The wall clock ticks faster.",
        foley: "Accelerating clock tick + muffled digital notification pings",
        narration: isModeB ? "" : "Later was always easier than now.",
        lighting: "Deep navy and intense screen flare",
        camera: "Low-angle close-up on Ayo's face"
      },
      {
        beat: 5,
        sceneId: "scene_005",
        timeRange: "0:50 - 1:05",
        duration: 15,
        phase: "The Physical Toll",
        action: "Ayo's posture sinks deeper. The room walls feel narrower. The Shade looms taller.",
        foley: "Heavy breathing + deep resonant sub-bass swelling",
        narration: isModeB ? "" : "An hour slipped into two. Two became midnight. Midnight became 2:40 AM.",
        lighting: "Suffocating dark blue shadows",
        camera: "High-angle looking down on Ayo"
      },
      {
        beat: 6,
        sceneId: "scene_006",
        timeRange: "1:05 - 1:18",
        duration: 13,
        phase: "The Climax / Approaching The Void",
        action: "The Shade wraps entirely around Ayo's chest. Ayo reaches the breaking point of exhaustion.",
        foley: "Sub-bass peaks, heart beat thud, then SUDDEN CUT",
        narration: isModeB ? "" : "The beast never had to push. It only had to wait.",
        lighting: "Screen dominating 90% of frame",
        camera: "Extreme close-up on screen reflection in Ayo's dark eyes"
      },
      {
        beat: 7,
        sceneId: "scene_007",
        timeRange: "1:18 - 1:28",
        duration: 10,
        phase: "The Void (0.0dB Silence)",
        action: "Total sensory stop. Screen goes pitch black. Ayo freezes staring at his own dark reflection.",
        foley: "TOTAL DEAD SILENCE (-50dB / 0.0dB) for 1.2s",
        whisper: "Tomorrow has never once arrived.",
        narration: isModeB ? "Tomorrow has never once arrived." : "Tomorrow has never once arrived. Not for a year. Not for a week.",
        lighting: "Absolute black screen, faint rim contour",
        camera: "Still medium shot, zero movement"
      },
      {
        beat: 8,
        sceneId: "scene_008",
        timeRange: "1:28 - 1:42",
        duration: 14,
        phase: "The Reversal / Physical Decision",
        action: "Ayo's hand shakes, then forms a tight fist. Fingers grip the edge of the laptop screen.",
        foley: "Wood desk creak + rising cello note (Hans Zimmer style)",
        narration: isModeB ? "" : "Five minutes. Just five minutes.",
        lighting: "Edge of screen illuminating Ayo's knuckles",
        camera: "Macro close-up on Ayo's hand"
      },
      {
        beat: 9,
        sceneId: "scene_009",
        timeRange: "1:42 - 1:55",
        duration: 13,
        phase: "The Snap / Breaking the Loop",
        action: "Ayo violently snaps the laptop shut. The blue light dies instantly. The Shade recoils.",
        foley: "CRISP LOUD LAPTOP SNAP + deep atmospheric breath exhale",
        narration: isModeB ? "" : "He didn't feed it. And for the first time, it recoiled.",
        lighting: "Near pitch black room with faint moonlight through blinds",
        camera: "Medium wide shot"
      },
      {
        beat: 10,
        sceneId: "scene_010",
        timeRange: "1:55 - 2:08",
        duration: 13,
        phase: "The Physical Stand",
        action: "Ayo stands up from the chair. Bare feet touch the cold floorboards. Walks to the shoes.",
        foley: "Heavy footstep on wood + shoelace tightening pull",
        narration: isModeB ? "" : "The floor was cold. The air was sharp. But he was awake.",
        lighting: "Soft ambient pre-dawn indigo",
        camera: "Tracking shot following Ayo's feet"
      },
      {
        beat: 11,
        sceneId: "scene_011",
        timeRange: "2:08 - 2:20",
        duration: 12,
        phase: "The Dawn Influx",
        action: "Ayo reaches the window and twists the blind. A brilliant warm amber sunbeam cuts across the room.",
        foley: "Blind rattle + warm atmospheric synth swell + faint distant birdsong",
        narration: isModeB ? "" : "Every night ends. You still have time.",
        lighting: "Rich warm amber (#E89D42) flooding 70% of frame",
        camera: "Low-angle wide shot looking toward window"
      },
      {
        beat: 12,
        sceneId: "scene_012",
        timeRange: "2:20 - 2:30",
        duration: 10,
        phase: "The Cathartic Resolution",
        action: "Ayo stands tall in profile at the window, breathing calmly. The Shade is reduced to a harmless wisp in the far corner.",
        foley: "Gentle room tone + solo piano chord fading into silence",
        whisper: "Start.",
        narration: isModeB ? "Start." : "Start today.",
        lighting: "Golden morning light on Ayo's mustard hoodie (#D2A23E)",
        camera: "Slow pull-back to wide shot, then clean cut to black"
      }
    ];
  }

  /**
   * Stage 6: Quality QC Review (100-Point Rubric)
   */
  reviewScript(script) {
    let score = 100;
    const failures = [];
    const passes = [];

    // Check Instant Reject Conditions
    const allText = JSON.stringify(script).toLowerCase();
    
    // Check 1: Lecturing
    if (allText.includes("you should") || allText.includes("make sure to") || allText.includes("here are tips")) {
      return {
        passed: false,
        score: 0,
        instantReject: "Lethal Condition 1: Contains explicit lecturing or moralizing advice."
      };
    }

    // Check 2: Scene count
    if (!Array.isArray(script) || script.length !== 12) {
      score -= 10;
      failures.push(`Scene count is ${script ? script.length : 0}, expected 12 scenes for 150s film.`);
    } else {
      passes.push("Exactly 12 scenes mapped to 150s narrative arc.");
    }

    // Check 3: The Void / Dead Silence at 50-65%
    const midpointScene = script && script[6];
    if (midpointScene && (JSON.stringify(midpointScene).toLowerCase().includes("silence") || JSON.stringify(midpointScene).toLowerCase().includes("0.0db") || JSON.stringify(midpointScene).toLowerCase().includes("-50db"))) {
      passes.push("The Void (-50dB / 0.0dB dead silence) positioned at Scene 7 (1:18 - 1:28).");
    } else {
      score -= 15;
      failures.push("Missing or mispositioned Dead Silence turning point around Scene 7.");
    }

    // Check 4: Lighting duality
    const firstSceneStr = JSON.stringify(script[0] || "").toLowerCase();
    const lastSceneStr = JSON.stringify(script[11] || "").toLowerCase();
    if (firstSceneStr.includes("blue") && (lastSceneStr.includes("amber") || lastSceneStr.includes("sun") || lastSceneStr.includes("dawn"))) {
      passes.push("Chromatic progression strictly adheres to Cold Blue -> Warm Amber law.");
    } else {
      score -= 10;
      failures.push("Failed visual chromatic law (Act 1 must be Cold Blue, Act 3 must be Warm Amber).");
    }

    // Check 5: Physical action turning point
    const act3Str = JSON.stringify(script.slice(7)).toLowerCase();
    if (act3Str.includes("shut") || act3Str.includes("stand") || act3Str.includes("feet") || act3Str.includes("shoes") || act3Str.includes("window")) {
      passes.push("Protagonist overcomes inertia via tangible physical micro-actions.");
    } else {
      score -= 15;
      failures.push("Resolution lacks physical micro-action (relies on passive thought).");
    }

    return {
      passed: score >= 90,
      score,
      instantReject: null,
      passes,
      failures
    };
  }

  /**
   * Stage 7: Export Story to Project
   */
  exportToProject(outline, projectName) {
    const projectDir = path.join(this.baseDir, 'projects', projectName);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    const reader = new ProjectReader(projectName, this.baseDir);
    reader.ensureProjectStructure();

    // Map outline to scenes array
    const scenes = outline.map(item => {
      const sceneObj = {
        id: item.sceneId,
        purpose: item.phase,
        duration: item.duration,
        type: "visual_clip",
        character: "Ayo",
        environment: "Minimalist nocturnal bedroom/studio",
        action: item.action,
        lighting: item.lighting,
        camera: item.camera,
        foley: item.foley,
        dialogue: item.whisper || item.narration || "",
        references: ["input/references/ayo_anchor.jpg"],
        prompt: ""
      };
      sceneObj.prompt = this.promptBuilder.buildPrompt(sceneObj);
      return sceneObj;
    });

    reader.writeScenes(scenes);

    const storyAnalysis = {
      project: projectName,
      plannedAt: new Date().toISOString(),
      productionMode: outline[0].narration ? "voiceover" : "silent",
      theme: "Wakelit Psychological Cinematic Film",
      framework: "Dan Harmon Story Circle & Neurochemical Retention Loop",
      scenesCount: scenes.length,
      totalDuration: scenes.reduce((acc, s) => acc + s.duration, 0)
    };
    reader.writeStoryAnalysis(storyAnalysis);

    return {
      projectDir,
      scenesCount: scenes.length,
      totalDuration: storyAnalysis.totalDuration
    };
  }
}

module.exports = StoryDeveloper;
