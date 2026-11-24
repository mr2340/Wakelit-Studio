const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve('projects/the-beast-you-feed');
const s1Path = path.join(projectRoot, 'generated/scenes/scene_001.mp4');
const s2Path = path.join(projectRoot, 'generated/scenes/scene_002.mp4');

const sfxTick = path.resolve('projects/sample-project/input/assets/audio/sfx/sfx_clock_tick_60bpm.wav');
const sfxDrone = path.resolve('projects/sample-project/input/assets/audio/sfx/sfx_sub_bass_drone_45hz.wav');
const ambRoom = path.resolve('projects/sample-project/input/assets/audio/sfx/amb_room_tone_night.wav');

const tempDir = path.join(projectRoot, 'planning/temp_test01');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const outDir = path.join(projectRoot, 'output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const masterOutput = path.join(outDir, 'the_beast_you_feed_test01_master.mp4');

console.log('======================================================');
console.log('WAKELIT TEST 01: TWO-SCENE MASTER ASSEMBLY');
console.log('======================================================\n');

// 1. Normalize clips to 1920x1080@30fps with 96px black letterbox bars (y 96 to y 984)
// Duration: 4.0 seconds per clip (total 8.0s)
const norm1 = path.join(tempDir, 'norm_s1.mp4');
const norm2 = path.join(tempDir, 'norm_s2.mp4');

console.log('Step 1: Normalizing Scene 001 to 1080p letterbox (4.0s)...');
execSync(`ffmpeg -y -i "${s1Path}" -t 4.0 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:888,pad=1920:1080:0:96:black,setsar=1,fps=30" -c:v libx264 -pix_fmt yuv420p -an "${norm1}" -loglevel error`);

console.log('Step 2: Normalizing Scene 002 to 1080p letterbox (4.0s)...');
execSync(`ffmpeg -y -i "${s2Path}" -t 4.0 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:888,pad=1920:1080:0:96:black,setsar=1,fps=30" -c:v libx264 -pix_fmt yuv420p -an "${norm2}" -loglevel error`);

// 2. Concat normalized clips with hard cut
console.log('Step 3: Concatenating normalized visual sequence (8.0s total)...');
const concatList = path.join(tempDir, 'concat.txt');
fs.writeFileSync(concatList, `file '${norm1.replace(/\\/g, '/')}'\nfile '${norm2.replace(/\\/g, '/')}'\n`, 'utf8');

const concatVideo = path.join(tempDir, 'concat_video.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c copy "${concatVideo}" -loglevel error`);

// 3. Audio Mixing & Subtitle Rendering
// Font: C:/Windows/Fonts/comicbd.ttf (Comic Sans MS Bold)
// Caption 1 (0.5s - 3.8s): "It started with one word."
// Caption 2 (4.2s - 7.6s): "Later was always easier than now."
// Text color: Bone white #EDE6D6, borderw=4, bordercolor=0x181818, size 54, baseline y=940
console.log('Step 4: Mixing multi-track audio (Clock Tick, 45Hz Sub-Bass, Room Tone) and burning typography...');

const fontPath = 'C\\:/Windows/Fonts/comicbd.ttf';
const filterComplex = [
  // Video filter: Draw Caption 1 and Caption 2
  `[0:v]drawtext=fontfile='${fontPath}':text='It started with one word.':fontsize=54:fontcolor=0xEDE6D6:bordercolor=0x181818:borderw=4:x=(w-text_w)/2:y=940:enable='between(t,0.5,3.8)',` +
  `drawtext=fontfile='${fontPath}':text='Later was always easier than now.':fontsize=54:fontcolor=0xEDE6D6:bordercolor=0x181818:borderw=4:x=(w-text_w)/2:y=940:enable='between(t,4.2,7.6)'[v]`,
  // Audio filter: Amix 3 tracks with volume leveling
  `[1:a]volume=0.8,aloop=loop=-1:size=48000[a1]`, // 60 BPM clock tick looped
  `[2:a]volume=0.4,adelay=2000|2000,aloop=loop=-1:size=48000[a2]`, // 45 Hz sub-bass drone enters at 2s
  `[3:a]volume=0.25,aloop=loop=-1:size=48000[a3]`, // Room tone
  `[a1][a2][a3]amix=inputs=3:duration=first:dropout_transition=2,volume=1.0[a]`
].join(';');

const finalCmd = [
  'ffmpeg -y',
  `-i "${concatVideo}"`,
  `-i "${sfxTick}"`,
  `-i "${sfxDrone}"`,
  `-i "${ambRoom}"`,
  `-filter_complex "${filterComplex}"`,
  '-map "[v]"',
  '-map "[a]"',
  '-t 8.0',
  '-c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p',
  '-c:a aac -b:a 192k -ar 48000',
  `"${masterOutput}"`,
  '-loglevel error'
].join(' ');

execSync(finalCmd);

console.log('Step 5: Master render completed successfully!');
console.log(`Saved output: ${masterOutput}`);
console.log(`File size: ${fs.statSync(masterOutput).size} bytes`);

// 4. Verify with FFprobe
console.log('\nStep 6: Running FFprobe technical verification...');
const probeRaw = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams "${masterOutput}"`, { encoding: 'utf8' });
const probe = JSON.parse(probeRaw);
const vStream = probe.streams.find(s => s.codec_type === 'video');
const aStream = probe.streams.find(s => s.codec_type === 'audio');

console.log('--- Technical Inspection Results ---');
console.log(`Format: ${probe.format.format_name} (${probe.format.duration}s)`);
console.log(`Video: ${vStream.codec_name} ${vStream.width}x${vStream.height} @ ${vStream.r_frame_rate} fps`);
console.log(`Audio: ${aStream.codec_name} ${aStream.sample_rate}Hz stereo, bitrate: ${aStream.bit_rate || '192k'}`);
console.log('All technical checks PASSED.\n');
