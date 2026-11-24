const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ref1 = path.resolve('projects/sample-project/input/references/Lust Is Killing You..mp4');
const ref2 = path.resolve('projects/sample-project/input/references/LUST VS LOVE _ An Animated Short Film.mp4');

const outDir1 = path.resolve('knowledge/reference-analysis/lust-is-killing-you');
const outDir2 = path.resolve('knowledge/reference-analysis/lust-vs-love');

function analyzeVideo(videoPath, outDir, prefix) {
  console.log(`\n======================================================`);
  console.log(`Analyzing: ${path.basename(videoPath)}`);
  console.log(`======================================================`);

  // 1. Probe technical specs
  const probeRaw = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`, { encoding: 'utf8' });
  const probe = JSON.parse(probeRaw);
  const vStream = probe.streams.find(s => s.codec_type === 'video');
  const aStream = probe.streams.find(s => s.codec_type === 'audio');
  const duration = parseFloat(probe.format.duration);

  console.log(`Duration: ${duration.toFixed(2)}s | Resolution: ${vStream.width}x${vStream.height} | FPS: ${vStream.r_frame_rate}`);
  console.log(`Audio: ${aStream ? `${aStream.codec_name} @ ${aStream.sample_rate}Hz` : 'None'}`);

  // 2. Extract key representative frames across timeline (every 8-10 seconds for thorough coverage)
  const interval = 8;
  const numFrames = Math.floor(duration / interval);
  console.log(`Extracting ${numFrames} representative frames (1 frame every ${interval}s)...`);

  const manifest = [];

  for (let i = 0; i < numFrames; i++) {
    const timestamp = i * interval;
    const formattedTime = new Date(timestamp * 1000).toISOString().substr(14, 5);
    const frameFile = `${prefix}_frame_${i.toString().padStart(3, '0')}_${timestamp}s.jpg`;
    const framePath = path.join(outDir, frameFile);

    try {
      execSync(`ffmpeg -y -ss ${timestamp} -i "${videoPath}" -vframes 1 -q:v 2 "${framePath}" -loglevel error`);
      if (fs.existsSync(framePath)) {
        manifest.push({
          index: i,
          timestampSeconds: timestamp,
          timestampFormatted: formattedTime,
          file: frameFile
        });
      }
    } catch (e) {
      console.error(`Error extracting frame at ${timestamp}s:`, e.message);
    }
  }

  // 3. Create a 4x4 visual contact sheet
  console.log(`Building visual contact sheet...`);
  const contactSheetPath = path.join(outDir, `${prefix}_contact_sheet.jpg`);
  try {
    // Sample 16 frames uniformly across the video for the 4x4 contact sheet
    const step = Math.max(1, Math.floor(duration / 16));
    execSync(`ffmpeg -y -i "${videoPath}" -vf "fps=1/${step},scale=480:270,tile=4x4" -q:v 2 -vframes 1 "${contactSheetPath}" -loglevel error`);
    console.log(`Contact sheet created: ${contactSheetPath}`);
  } catch (err) {
    console.error('Contact sheet creation error:', err.message);
  }

  // 4. Save metadata manifest
  const manifestPath = path.join(outDir, `${prefix}_manifest.json`);
  fs.writeFileSync(manifestPath, JSON.stringify({
    video: path.basename(videoPath),
    duration,
    width: vStream.width,
    height: vStream.height,
    fps: vStream.r_frame_rate,
    frames: manifest,
    contactSheet: path.basename(contactSheetPath)
  }, null, 2), 'utf8');

  console.log(`Saved manifest to ${manifestPath} (${manifest.length} frames recorded).`);
}

analyzeVideo(ref1, outDir1, 'ref1_lust_killing_you');
analyzeVideo(ref2, outDir2, 'ref2_lust_vs_love');
