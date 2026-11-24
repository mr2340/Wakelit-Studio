const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const masterVideo = path.resolve('projects/the-beast-you-feed/output/the_beast_you_feed_full_production_master.mp4');
const evalDir = path.resolve('projects/the-beast-you-feed/output/eval_frames/master_final');
if (!fs.existsSync(evalDir)) fs.mkdirSync(evalDir, { recursive: true });

const checkPoints = [
  { t: 2, label: '01_scene_001_desk_trance' },
  { t: 6, label: '02_scene_002_dormant_props' },
  { t: 10, label: '03_scene_003_shade_emerges' },
  { t: 14, label: '04_scene_004_screen_trance' },
  { t: 18, label: '05_scene_005_digital_clock' },
  { t: 22, label: '06_scene_006_heavy_collapse' },
  { t: 25.5, label: '07_scene_007_the_void_silence' },
  { t: 29, label: '08_scene_008_mirror_reflection' },
  { t: 33, label: '09_scene_009_the_snap' },
  { t: 37, label: '10_scene_010_lacing_shoes' },
  { t: 41, label: '11_scene_011_dawn_influx' },
  { t: 45.5, label: '12_scene_012_sunlit_avenue' }
];

console.log('Extracting 12 verification frames from final master...');
for (const cp of checkPoints) {
  const outPath = path.join(evalDir, `${cp.label}.jpg`);
  execSync(`ffmpeg -y -ss ${cp.t} -i "${masterVideo}" -vframes 1 -q:v 2 "${outPath}"`, { stdio: 'ignore' });
  console.log(`- Extracted ${cp.label}.jpg at ${cp.t}s`);
}
console.log('Frame extraction complete.');
