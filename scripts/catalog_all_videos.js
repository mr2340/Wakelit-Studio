const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  'projects/the-beast-you-feed/generated/scenes',
  'projects/the-beast-you-feed/output/downloaded_tiles'
];

const outFrames = 'projects/the-beast-you-feed/output/eval_frames/catalog';
if (!fs.existsSync(outFrames)) fs.mkdirSync(outFrames, { recursive: true });

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
  console.log(`\n=== Directory: ${dir} ===`);
  for (const f of files) {
    const full = path.join(dir, f);
    const size = fs.statSync(full).size;
    const frameName = `${path.basename(dir)}_${f.replace('.mp4', '.jpg')}`;
    const framePath = path.join(outFrames, frameName);
    try {
      execSync(`ffmpeg -y -ss 00:00:02 -i "${full}" -vframes 1 -q:v 2 "${framePath}"`, { stdio: 'ignore' });
      console.log(`- ${f}: ${size} bytes -> frame: ${frameName}`);
    } catch (e) {
      console.log(`- ${f}: ${size} bytes (error extracting frame)`);
    }
  }
}
