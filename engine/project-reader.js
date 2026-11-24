const fs = require('fs');
const path = require('path');

class ProjectReader {
  constructor(projectName, baseDir = path.resolve(__dirname, '..')) {
    this.projectName = projectName;
    this.baseDir = baseDir;
    this.settings = this.loadSettings();
    this.projectDir = path.join(this.baseDir, 'projects', this.projectName);
  }

  loadSettings() {
    const settingsPath = path.join(this.baseDir, 'config', 'settings.json');
    if (fs.existsSync(settingsPath)) {
      return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    }
    return {};
  }

  ensureProjectStructure() {
    const subdirs = [
      'input/voiceover',
      'input/references',
      'input/assets',
      'input/assets/audio/sfx',
      'planning',
      'generated/scenes',
      'output',
      'logs'
    ];

    for (const sub of subdirs) {
      const fullPath = path.join(this.projectDir, sub);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }

    // Auto-seed default SFX pack from shared assets if project folder is empty
    const sfxDir = path.join(this.projectDir, 'input', 'assets', 'audio', 'sfx');
    const sharedSfxDir = path.join(this.baseDir, 'assets', 'audio', 'sfx');
    if (fs.existsSync(sharedSfxDir) && fs.existsSync(sfxDir)) {
      const existing = fs.readdirSync(sfxDir);
      if (existing.length === 0) {
        const sharedFiles = fs.readdirSync(sharedSfxDir);
        for (const file of sharedFiles) {
          fs.copyFileSync(path.join(sharedSfxDir, file), path.join(sfxDir, file));
        }
      }
    }
  }

  getPaths() {
    return {
      root: this.projectDir,
      input: path.join(this.projectDir, 'input'),
      voiceover: path.join(this.projectDir, 'input', 'voiceover'),
      references: path.join(this.projectDir, 'input', 'references'),
      assets: path.join(this.projectDir, 'input', 'assets'),
      sfx: path.join(this.projectDir, 'input', 'assets', 'audio', 'sfx'),
      brief: path.join(this.projectDir, 'input', 'creative-brief.md'),
      planning: path.join(this.projectDir, 'planning'),
      storyAnalysis: path.join(this.projectDir, 'planning', 'story-analysis.json'),
      scenes: path.join(this.projectDir, 'planning', 'scenes.json'),
      editingPlan: path.join(this.projectDir, 'planning', 'editing-plan.json'),
      generatedScenes: path.join(this.projectDir, 'generated', 'scenes'),
      output: path.join(this.projectDir, 'output'),
      logs: path.join(this.projectDir, 'logs')
    };
  }

  readCreativeBrief() {
    const briefPath = this.getPaths().brief;
    if (fs.existsSync(briefPath)) {
      return fs.readFileSync(briefPath, 'utf8');
    }
    return null;
  }

  readScenes() {
    const scenesPath = this.getPaths().scenes;
    if (fs.existsSync(scenesPath)) {
      return JSON.parse(fs.readFileSync(scenesPath, 'utf8'));
    }
    return [];
  }

  writeScenes(scenes) {
    const scenesPath = this.getPaths().scenes;
    fs.writeFileSync(scenesPath, JSON.stringify(scenes, null, 2), 'utf8');
  }

  updateSceneStatus(sceneId, status, details = {}) {
    const scenes = this.readScenes();
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      scene.status = status;
      scene.updatedAt = new Date().toISOString();
      Object.assign(scene, details);
      this.writeScenes(scenes);
      return scene;
    }
    return null;
  }

  readEditingPlan() {
    const planPath = this.getPaths().editingPlan;
    if (fs.existsSync(planPath)) {
      return JSON.parse(fs.readFileSync(planPath, 'utf8'));
    }
    return null;
  }

  writeEditingPlan(plan) {
    const planPath = this.getPaths().editingPlan;
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf8');
  }

  readStoryAnalysis() {
    const analysisPath = this.getPaths().storyAnalysis;
    if (fs.existsSync(analysisPath)) {
      return JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
    }
    return null;
  }

  writeStoryAnalysis(data) {
    const analysisPath = this.getPaths().storyAnalysis;
    fs.writeFileSync(analysisPath, JSON.stringify(data, null, 2), 'utf8');
  }

  listReferences() {
    const refDir = this.getPaths().references;
    if (fs.existsSync(refDir)) {
      const validExts = ['.png', '.jpg', '.jpeg', '.webp'];
      return fs.readdirSync(refDir).filter(f => validExts.includes(path.extname(f).toLowerCase()));
    }
    return [];
  }

  listVoiceoverFiles() {
    const voDir = this.getPaths().voiceover;
    if (fs.existsSync(voDir)) {
      const validExts = ['.mp3', '.wav', '.m4a', '.aac', '.flac', '.ogg'];
      return fs.readdirSync(voDir).filter(f => validExts.includes(path.extname(f).toLowerCase()));
    }
    return [];
  }

  listSFXFiles() {
    const sfxDir = this.getPaths().sfx;
    if (fs.existsSync(sfxDir)) {
      const validExts = ['.wav', '.mp3', '.ogg', '.aac', '.flac'];
      return fs.readdirSync(sfxDir).filter(f => validExts.includes(path.extname(f).toLowerCase()));
    }
    return [];
  }
}

module.exports = ProjectReader;
