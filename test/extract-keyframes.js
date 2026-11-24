const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = 'projects/sample-project/output/analysis_thumbs';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function extractFrames(videoPath, timestamps, prefix) {
  timestamps.forEach((ts, idx) => {
    const outFile = path.join(outDir, `${prefix}_t${ts.toString().replace('.', '_')}s.jpg`);
    try {
      execSync(`ffmpeg -y -ss ${ts} -i "${videoPath}" -vframes 1 -q:v 2 "${outFile}"`, { stdio: 'ignore' });
      console.log(`Extracted: ${outFile}`);
    } catch (e) {
      console.error(`Failed ${outFile}: ${e.message}`);
    }
  });
}

// 1. Ref 1: "Lust Is Killing You..mp4" (200s)
const ref1Times = [2, 10, 25, 45, 60, 85, 115.5, 126, 140, 165, 185, 195];
extractFrames('projects/sample-project/input/references/Lust Is Killing You..mp4', ref1Times, 'ref1_lust');

// 2. Ref 2: "LUST VS LOVE _ An Animated Short Film.mp4" (171s)
const ref2Times = [2, 15, 35, 55, 75, 100, 125, 145, 165];
extractFrames('projects/sample-project/input/references/LUST VS LOVE _ An Animated Short Film.mp4', ref2Times, 'ref2_love');

// 3. Caption Video: "captions_subtle_BLACK_screen-blend.mp4" (200s)
const capTimes = [1.5, 5, 20, 50, 80, 116, 135, 160, 185];
extractFrames('projects/sample-project/input/assets/captions_subtle_BLACK_screen-blend.mp4', capTimes, 'caption');

console.log('Frame extraction complete.');
