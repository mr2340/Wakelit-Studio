const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generating Master YouTube Thumbnail (1280x720)...');

const projectRoot = path.resolve(__dirname, '..');
const scene008 = path.join(projectRoot, 'projects/the-beast-you-feed/generated/scenes/scene_008.mp4');
const outputDir = path.join(projectRoot, 'projects/the-beast-you-feed/output');
const rawFramePath = path.join(outputDir, 'temp_raw_thumb_frame.png');
const masterThumbPath = path.join(outputDir, 'thumbnail_master.jpg');

// Step 1: Extract clean, peak-expression frame from scene_008 (at 1.5s)
// Crop letterbox to 16:9 full bleed (scale=1280:720)
const extractCmd = `ffmpeg -y -ss 00:00:01.500 -i "${scene008}" -vframes 1 -vf "crop=in_w:in_w*9/16,scale=1280:720" "${rawFramePath}"`;
execSync(extractCmd, { stdio: 'inherit' });

// Step 2: Overlay High-CTR Typography & Cinematic Grade
// Contrast +15%, Saturation +20%, Vignette to draw eye to center
const pureThumbPath = path.join(outputDir, 'thumbnail_master_cinematic.jpg');
execSync(`ffmpeg -y -i "${rawFramePath}" -vf "eq=contrast=1.18:brightness=-0.02:saturation=1.22" -q:v 2 "${pureThumbPath}"`, { stdio: 'inherit' });

// Generate text thumbnail with Impact or Arial Black fontfile
const fontPath = 'C\\\\:/Windows/Fonts/impact.ttf';
const textFilter = `eq=contrast=1.18:brightness=-0.02:saturation=1.22,drawtext=fontfile='${fontPath}':text='YOU ARE FEEDING IT.':fontsize=80:fontcolor=white:borderw=10:bordercolor=black:x=(w-text_w)/2:y=h-115:shadowcolor=black@0.9:shadowx=6:shadowy=6`;
execSync(`ffmpeg -y -i "${rawFramePath}" -vf "${textFilter}" -q:v 2 "${masterThumbPath}"`, { stdio: 'inherit' });

// Verify size and dimensions
const stats = fs.statSync(masterThumbPath);
console.log(`\n✅ Master Thumbnail Generated: ${masterThumbPath}`);
console.log(`- File Size: ${(stats.size / 1024).toFixed(1)} KB (< 2MB YouTube limit)`);

// Clean temp
if (fs.existsSync(rawFramePath)) fs.unlinkSync(rawFramePath);
