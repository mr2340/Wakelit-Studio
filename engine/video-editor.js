const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const ProjectReader = require('./project-reader');

class VideoEditor {
  constructor(projectName = 'sample-project', baseDir = path.resolve(__dirname, '..')) {
    this.projectName = projectName;
    this.baseDir = baseDir;
    this.reader = new ProjectReader(projectName, baseDir);
    this.settings = this.reader.loadSettings();

    this.ffmpegPath = this.settings.ffmpeg?.ffmpegPath || 'ffmpeg';
    this.ffprobePath = this.settings.ffmpeg?.ffprobePath || 'ffprobe';
    this.width = this.settings.ffmpeg?.defaultResolution?.width || 1920;
    this.height = this.settings.ffmpeg?.defaultResolution?.height || 1080;
    this.fps = this.settings.ffmpeg?.fps || 30;
  }

  log(msg) {
    console.log(`[VideoEditor ${new Date().toLocaleTimeString()}] ${msg}`);
  }

  error(msg) {
    console.error(`[VideoEditor ERROR ${new Date().toLocaleTimeString()}] ${msg}`);
  }

  /**
   * Executes an FFmpeg command with safe argument array (preventing arbitrary shell injection).
   */
  runFFmpeg(args) {
    return new Promise((resolve, reject) => {
      this.log(`Spawning FFmpeg with ${args.length} arguments...`);
      const proc = spawn(this.ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });

      let stderr = '';
      proc.stderr.on('data', d => {
        stderr += d.toString();
      });

      proc.on('close', code => {
        if (code === 0) {
          resolve(true);
        } else {
          this.error(`FFmpeg process failed with exit code ${code}`);
          this.error(`FFmpeg error details: ${stderr.slice(-600)}`);
          reject(new Error(`FFmpeg exited with code ${code}: ${stderr.slice(-400)}`));
        }
      });
    });
  }

  /**
   * Generates a solid black screen video clip of specified duration.
   */
  async generateBlackScreenClip(outputPath, durationSeconds = 3) {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const args = [
      '-y',
      '-f', 'lavfi',
      '-i', `color=c=black:s=${this.width}x${this.height}:r=${this.fps}:d=${durationSeconds}`,
      '-f', 'lavfi',
      '-i', `anullsrc=r=48000:cl=stereo`,
      '-t', String(durationSeconds),
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      outputPath
    ];

    await this.runFFmpeg(args);
    return outputPath;
  }

  /**
   * Normalizes a clip: rescales to target resolution, sets standard framerate, and removes raw audio.
   * Uses force_original_aspect_ratio=increase and center crop to prevent any black side pillars (windowboxing).
   */
  async normalizeClip(inputClipPath, outputClipPath, duration = null) {
    const dir = path.dirname(outputClipPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Letterbox active safe area (1080 - 192 = 888) with 96px top/bottom bars, filling full 1920 width
    const videoFilter = `scale=${this.width}:${this.height}:force_original_aspect_ratio=increase,crop=${this.width}:${this.height - 192},pad=${this.width}:${this.height}:0:96:black,setsar=1,fps=${this.fps}`;

    const args = [
      '-y',
      '-i', inputClipPath,
      '-an', // remove audio
      '-vf', videoFilter,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p'
    ];

    if (duration) {
      args.push('-t', String(duration));
    }

    args.push(outputClipPath);
    await this.runFFmpeg(args);
    return outputClipPath;
  }

  /**
   * Builds and executes the editing plan.
   */
  async assembleVideo() {
    this.reader.ensureProjectStructure();
    const editingPlan = this.reader.readEditingPlan();
    const paths = this.reader.getPaths();

    if (!editingPlan) {
      throw new Error('No editing plan found. Please run "npm run studio:plan" first.');
    }

    this.log(`Assembling video for "${this.projectName}" according to editing plan...`);
    const tempDir = path.join(paths.root, 'planning', 'temp_assembly');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const normalizedClips = [];

    // Step 1: Process and normalize each timeline scene
    for (let i = 0; i < editingPlan.timeline.length; i++) {
      const item = editingPlan.timeline[i];
      const normPath = path.join(tempDir, `norm_scene_${i.toString().padStart(3, '0')}.mp4`);

      if (item.type === 'black_screen') {
        this.log(`Generating black screen clip for scene ${item.sceneId} (${item.targetDuration}s)...`);
        await this.generateBlackScreenClip(normPath, item.targetDuration || 3);
        normalizedClips.push(normPath);
      } else {
        const rawClipPath = path.join(paths.root, item.clipFile);
        if (!fs.existsSync(rawClipPath)) {
          throw new Error(`Missing generated video for ${item.sceneId}: ${rawClipPath}`);
        }
        this.log(`Normalizing clip ${item.sceneId} (${item.clipFile})...`);
        await this.normalizeClip(rawClipPath, normPath, item.targetDuration);
        normalizedClips.push(normPath);
      }
    }

    // Step 2: Create concat list file
    const concatListPath = path.join(tempDir, 'concat_list.txt');
    const concatContent = normalizedClips.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n');
    fs.writeFileSync(concatListPath, concatContent, 'utf8');

    // Step 3: Concat video clips
    const concatenatedVideo = path.join(tempDir, 'concatenated.mp4');
    this.log('Concatenating normalized video clips...');
    await this.runFFmpeg([
      '-y',
      '-f', 'concat',
      '-safe', '0',
      '-i', concatListPath,
      '-c', 'copy',
      concatenatedVideo
    ]);

    // Step 4: Mix audio (Voiceover + BGM) & burn subtitles if present
    const finalOutputPath = path.join(paths.root, editingPlan.outputFile || 'output/final_video.mp4');
    const outDir = path.dirname(finalOutputPath);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const finalArgs = ['-y', '-i', concatenatedVideo];

    let hasVo = false;
    let voPath = null;
    if (editingPlan.audio?.voiceoverFile) {
      voPath = path.join(paths.root, editingPlan.audio.voiceoverFile);
      if (fs.existsSync(voPath)) {
        hasVo = true;
        finalArgs.push('-i', voPath);
      }
    }

    let hasBgm = false;
    let bgmPath = null;
    if (editingPlan.audio?.backgroundMusicFile) {
      bgmPath = path.join(paths.root, editingPlan.audio.backgroundMusicFile);
      if (fs.existsSync(bgmPath)) {
        hasBgm = true;
        finalArgs.push('-i', bgmPath);
      }
    }

    // Construct filter complex for audio mixing
    if (hasVo && hasBgm) {
      const voVol = editingPlan.audio.voiceoverVolume || 1.0;
      const bgmVol = editingPlan.audio.backgroundMusicVolume || 0.15;
      finalArgs.push(
        '-filter_complex',
        `[1:a]volume=${voVol}[vo];[2:a]volume=${bgmVol}[bgm];[vo][bgm]amix=inputs=2:duration=longest[aout]`,
        '-map', '0:v',
        '-map', '[aout]'
      );
    } else if (hasVo) {
      const voVol = editingPlan.audio.voiceoverVolume || 1.0;
      finalArgs.push(
        '-filter_complex',
        `[1:a]volume=${voVol}[aout]`,
        '-map', '0:v',
        '-map', '[aout]'
      );
    } else {
      // Add silent audio track if no voiceover
      finalArgs.push(
        '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo',
        '-map', '0:v',
        '-map', '1:a',
        '-shortest'
      );
    }

    // Check for captions SRT in input/assets or planning
    const srtCandidates = [
      path.join(paths.input, 'assets', 'captions.srt'),
      path.join(paths.planning, 'captions.srt')
    ];
    for (const srt of srtCandidates) {
      if (fs.existsSync(srt)) {
        this.log(`Detected subtitle track: ${srt}. Applying subtitle burning filter.`);
        finalArgs.push('-vf', `subtitles='${srt.replace(/\\/g, '/').replace(/:/g, '\\:')}'`);
        break;
      }
    }

    finalArgs.push(
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-movflags', '+faststart',
      finalOutputPath
    );

    this.log(`Rendering final video: ${finalOutputPath}`);
    await this.runFFmpeg(finalArgs);
    this.log(`Final video rendered successfully: ${finalOutputPath}`);

    return finalOutputPath;
  }
}

if (require.main === module) {
  const projectName = process.argv[2] || 'sample-project';
  const editor = new VideoEditor(projectName);
  editor.assembleVideo().catch(console.error);
}

module.exports = VideoEditor;
