const fs = require('fs');
const path = require('path');
const ProjectReader = require('./project-reader');
const PromptBuilder = require('./prompt-builder');

class ScenePlanner {
  constructor(projectName, baseDir = path.resolve(__dirname, '..')) {
    this.projectName = projectName;
    this.reader = new ProjectReader(projectName, baseDir);
    this.promptBuilder = new PromptBuilder(baseDir);
  }

  /**
   * Plans scenes based on creative brief, audio file(s) and references.
   * If existing scenes exist, merges without overwriting completed scenes.
   */
  async planProject() {
    this.reader.ensureProjectStructure();
    const brief = this.reader.readCreativeBrief();
    const references = this.reader.listReferences();
    const voiceoverFiles = this.reader.listVoiceoverFiles();

    console.log(`[ScenePlanner] Planning project: ${this.projectName}`);
    console.log(`[ScenePlanner] Found ${references.length} references, ${voiceoverFiles.length} voiceover files.`);

    // Determine production mode based on topic/brief and available audio
    let mode = "auto";
    const briefLower = (brief || "").toLowerCase();
    if (briefLower.includes("mode b") || briefLower.includes("silent") || briefLower.includes("no voiceover") || briefLower.includes("visual only")) {
      mode = "silent";
    } else if (briefLower.includes("mode a") || briefLower.includes("voiceover") || briefLower.includes("whisper") || briefLower.includes("narration")) {
      mode = "voiceover";
    } else {
      mode = voiceoverFiles.length > 0 ? "voiceover" : "silent";
    }

    console.log(`[ScenePlanner] Production Mode selected: ${mode.toUpperCase()} (${mode === 'voiceover' ? 'Mode A: Voiceover / Whisper-driven' : 'Mode B: Silent / SFX & Visual-driven'})`);

    // Initial default story analysis
    const storyAnalysis = {
      project: this.projectName,
      plannedAt: new Date().toISOString(),
      productionMode: mode,
      theme: "Minimalist Humanoid Story",
      coreMessage: brief ? brief.slice(0, 300) : "Standard narrative production",
      pacingStyle: mode === "voiceover" 
        ? "Dynamic emotional pacing coordinated with whisper VO and clock tick" 
        : "Pure visual storytelling with heightened foley and metric pauses",
      hasVoiceover: mode === "voiceover" && voiceoverFiles.length > 0,
      references
    };
    this.reader.writeStoryAnalysis(storyAnalysis);

    const existingScenes = this.reader.readScenes();
    let scenes = [];

    if (existingScenes.length > 0) {
      console.log(`[ScenePlanner] Retaining ${existingScenes.length} existing scene definitions.`);
      scenes = existingScenes;
    } else {
      // Create initial planned scene queue template matching Section 6 requirements
      scenes = this.generateDefaultSceneQueue(references);
      this.reader.writeScenes(scenes);
    }

    // Ensure all prompts are built
    for (const scene of scenes) {
      if (!scene.prompt || scene.prompt.trim() === '') {
        scene.prompt = this.promptBuilder.buildPrompt(scene);
      }
    }
    this.reader.writeScenes(scenes);

    // Generate editing plan
    this.generateEditingPlan(scenes, voiceoverFiles);

    console.log(`[ScenePlanner] Successfully planned ${scenes.length} scenes.`);
    return { storyAnalysis, scenes };
  }

  generateDefaultSceneQueue(references) {
    const masterRef = references.length > 0 
      ? `input/references/${references[0]}` 
      : 'input/references/master-character.png';

    return [
      {
        id: "scene_001",
        purpose: "Establish mood and introduce the minimalist protagonist in stillness",
        duration: 10,
        type: "visual_clip",
        character: "main_character",
        environment: "sparse modern bedroom with soft morning light through window",
        action: "sitting quietly on the edge of the bed looking forward in contemplation",
        expression: "emotionally exhausted, quiet introspection",
        camera: "slow subtle push-in, eye-level medium shot",
        lighting: "warm directional morning sunlight diffused across the floor",
        composition: "character centered in rule of thirds with empty room on the left",
        references: [masterRef],
        prompt: "",
        filename: "scene_001.mp4",
        status: "pending",
        retries: 0
      },
      {
        id: "scene_002",
        purpose: "Highlight deep personal reflection and micro-expression",
        duration: 10,
        type: "visual_clip",
        character: "main_character",
        environment: "bedroom ambient backdrop, soft blurred depth of field",
        action: "gently lowering gaze towards hands clasped in lap",
        expression: "vulnerable, subdued breathing, thoughtful",
        camera: "close-up shot on character head and shoulders, shallow depth of field",
        lighting: "soft rim light accentuating character silhouette, muted shadows",
        composition: "tight portrait framing emphasizing headspace",
        references: [masterRef],
        prompt: "",
        filename: "scene_002.mp4",
        status: "pending",
        retries: 0
      },
      {
        id: "scene_003",
        purpose: "Dramatic silence and sensory reset allowing the pivotal line to resonate",
        duration: 3,
        type: "black_screen",
        character: null,
        environment: null,
        action: null,
        expression: null,
        camera: "black screen",
        lighting: null,
        composition: null,
        references: [],
        prompt: "N/A - Black screen pause",
        filename: "scene_003.mp4",
        status: "completed", // Black screens are generated directly by FFmpeg
        retries: 0
      },
      {
        id: "scene_004",
        purpose: "Shift towards realization and determination",
        duration: 10,
        type: "visual_clip",
        character: "main_character",
        environment: "minimalist room facing an open window or doorway",
        action: "slowly standing up and turning toward the light",
        expression: "subtle transition from fatigue to renewed resolve",
        camera: "wide tracking shot following movement, slow tilt up",
        lighting: "brightening ambient daylight filling the space",
        composition: "character moving from dark interior toward bright threshold",
        references: [masterRef],
        prompt: "",
        filename: "scene_004.mp4",
        status: "pending",
        retries: 0
      },
      {
        id: "scene_005",
        purpose: "Final lingering resolution and thematic closure",
        duration: 10,
        type: "visual_clip",
        character: "main_character",
        environment: "quiet balcony or open window horizon",
        action: "standing still, looking outward at the distant horizon with gentle breeze",
        expression: "peaceful, resilient, open to the future",
        camera: "wide medium shot from behind character looking over shoulder",
        lighting: "golden hour warm horizon light with atmospheric haze",
        composition: "character on right third looking across open expanse",
        references: [masterRef],
        prompt: "",
        filename: "scene_005.mp4",
        status: "pending",
        retries: 0
      }
    ];
  }

  generateEditingPlan(scenes, voiceoverFiles) {
    const voFile = voiceoverFiles.length > 0 ? voiceoverFiles[0] : null;

    const editingPlan = {
      projectName: this.projectName,
      generatedAt: new Date().toISOString(),
      outputResolution: { width: 1920, height: 1080 },
      fps: 30,
      audio: {
        voiceoverFile: voFile ? `input/voiceover/${voFile}` : null,
        voiceoverVolume: 1.0,
        backgroundMusicFile: null,
        backgroundMusicVolume: 0.15,
        stripSourceAudio: true
      },
      timeline: scenes.map((s, idx) => ({
        index: idx + 1,
        sceneId: s.id,
        type: s.type || "visual_clip",
        clipFile: `generated/scenes/${s.filename}`,
        targetDuration: s.duration,
        transitionIn: idx === 0 ? "fade_in_1s" : "cut",
        transitionOut: idx === scenes.length - 1 ? "fade_out_1s" : "cut"
      })),
      outputFile: "output/final_video.mp4"
    };

    this.reader.writeEditingPlan(editingPlan);
  }
}

if (require.main === module) {
  const projectName = process.argv[2] || 'sample-project';
  const planner = new ScenePlanner(projectName);
  planner.planProject().catch(console.error);
}

module.exports = ScenePlanner;
