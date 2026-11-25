const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('WAKELIT STUDIO — MASTER 2-TO-3 MINUTE FILM ASSEMBLY');
console.log('Target Duration: 150.00s (2m 30s) | Resolution: 1920x1080 @ 30fps');
console.log('====================================================\n');

const projectRoot = path.resolve(__dirname, '..');
const scenesDir = path.join(projectRoot, 'projects/the-beast-you-feed/generated/scenes');
const sfxDir = path.join(projectRoot, 'assets/audio/sfx');
const outputDir = path.join(projectRoot, 'projects/the-beast-you-feed/output');
const tempDir = path.join(projectRoot, 'projects/the-beast-you-feed/planning/temp_2to3min');
const captionsPath = path.join(projectRoot, 'projects/the-beast-you-feed/planning/captions_150s.srt');
const masterOutputPath = path.join(outputDir, 'the_beast_you_feed_2to3min_master.mp4');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 36-Shot Master Narrative Cut (Total Duration: exactly 150.00s)
const shots = [
  // ACT I: THE SEDUCTION & FIRST TRANCE (0.0s - 44.0s)
  { id: 'shot_01', type: 'black', duration: 2.67 },
  { id: 'shot_02', type: 'clip', file: 'scene_001.mp4', duration: 4.33 },
  { id: 'shot_03', type: 'clip', file: 'scene_002.mp4', duration: 4.50 },
  { id: 'shot_04', type: 'clip', file: 'scene_001.mp4', duration: 4.00 },
  { id: 'shot_05', type: 'clip', file: 'scene_003.mp4', duration: 4.50 },
  { id: 'shot_06', type: 'clip', file: 'scene_004.mp4', duration: 4.50 },
  { id: 'shot_07', type: 'clip', file: 'scene_003.mp4', duration: 4.50 },
  { id: 'shot_08', type: 'clip', file: 'scene_001.mp4', duration: 4.50 },
  { id: 'shot_09', type: 'clip', file: 'scene_006.mp4', duration: 4.50 },
  { id: 'shot_10', type: 'black', duration: 2.50 },
  { id: 'shot_11', type: 'clip', file: 'scene_005.mp4', duration: 3.50 },

  // ACT II: THE ESCALATION & CYCLE (44.0s - 84.0s)
  { id: 'shot_12', type: 'clip', file: 'scene_001.mp4', duration: 4.50 },
  { id: 'shot_13', type: 'clip', file: 'scene_004.mp4', duration: 4.50 },
  { id: 'shot_14', type: 'clip', file: 'scene_003.mp4', duration: 5.00 },
  { id: 'shot_15', type: 'clip', file: 'scene_002.mp4', duration: 4.50 },
  { id: 'shot_16', type: 'clip', file: 'scene_001.mp4', duration: 4.50 },
  { id: 'shot_17', type: 'clip', file: 'scene_006.mp4', duration: 4.50 },
  { id: 'shot_18', type: 'black', duration: 2.50 },
  { id: 'shot_19', type: 'clip', file: 'scene_005.mp4', duration: 4.50 },
  { id: 'shot_20', type: 'clip', file: 'scene_006.mp4', duration: 4.50 },
  { id: 'shot_21', type: 'black', duration: 1.00 },

  // ACT III: THE VOID & MORAL CONFRONTATION (84.0s - 116.0s)
  { id: 'shot_22', type: 'black', duration: 3.50 }, // THE VOID (0.0dB Dead Silence)
  { id: 'shot_23', type: 'clip', file: 'scene_008.mp4', duration: 4.50 },
  { id: 'shot_24', type: 'clip', file: 'scene_008.mp4', duration: 4.50 },
  { id: 'shot_25', type: 'black', duration: 3.00 },
  { id: 'shot_26', type: 'clip', file: 'scene_008.mp4', duration: 4.00 },
  { id: 'shot_27', type: 'clip', file: 'scene_009.mp4', duration: 4.00 },
  { id: 'shot_28', type: 'clip', file: 'scene_009.mp4', duration: 4.00 },
  { id: 'shot_29', type: 'clip', file: 'scene_003.mp4', duration: 4.50 },

  // ACT IV: THE AWAKENING & CATHARSIS (116.0s - 150.0s)
  { id: 'shot_30', type: 'clip', file: 'scene_010.mp4', duration: 4.50 },
  { id: 'shot_31', type: 'clip', file: 'scene_010.mp4', duration: 4.50 },
  { id: 'shot_32', type: 'clip', file: 'scene_011.mp4', duration: 4.50 },
  { id: 'shot_33', type: 'clip', file: 'scene_011.mp4', duration: 4.50 },
  { id: 'shot_34', type: 'clip', file: 'scene_012.mp4', duration: 5.00 },
  { id: 'shot_35', type: 'clip', file: 'scene_012.mp4', duration: 6.00 },
  { id: 'shot_36', type: 'black', duration: 5.00 }
];

const totalTargetDuration = shots.reduce((sum, s) => sum + s.duration, 0);
console.log(`Calculated shot count: ${shots.length}`);
console.log(`Calculated total timeline duration: ${totalTargetDuration.toFixed(2)} seconds\n`);

// Step 1: Normalize all shots
const normalizedShotPaths = [];
console.log('--- Step 1: Normalizing Visual & Black Shots ---');

shots.forEach((shot, idx) => {
  const normOut = path.join(tempDir, `norm_${idx.toString().padStart(2, '0')}_${shot.id}.mp4`);
  normalizedShotPaths.push(normOut);

  if (fs.existsSync(normOut) && fs.statSync(normOut).size > 1000) {
    // Already normalized
    return;
  }

  if (shot.type === 'black') {
    const cmd = `ffmpeg -y -f lavfi -i color=c=black:s=1920x1080:r=30:d=${shot.duration} -f lavfi -i anullsrc=r=48000:cl=stereo -t ${shot.duration} -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k "${normOut}"`;
    execSync(cmd, { stdio: 'ignore' });
  } else {
    const rawFile = path.join(scenesDir, shot.file);
    const filter = `scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:888,pad=1920:1080:0:96:black,setsar=1,fps=30`;
    const cmd = `ffmpeg -y -stream_loop -1 -i "${rawFile}" -t ${shot.duration} -vf "${filter}" -c:v libx264 -pix_fmt yuv420p -an "${normOut}"`;
    execSync(cmd, { stdio: 'ignore' });
  }
  process.stdout.write(`Normalized ${shot.id} (${shot.duration}s)\n`);
});

// Step 2: Concatenate visual track
console.log('\n--- Step 2: Concatenating 36 Shots ---');
const concatListFile = path.join(tempDir, 'concat_list.txt');
fs.writeFileSync(concatListFile, normalizedShotPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n'), 'utf8');

const rawConcatenatedVideo = path.join(tempDir, 'raw_concatenated_150s.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${rawConcatenatedVideo}"`, { stdio: 'ignore' });
console.log('Concatenation complete.');

// Step 3: Multi-Track Organic Audio Mixing (Pass 1)
console.log('\n--- Step 3: Mixing Multi-Track Audio Master (150s) ---');
const masterAudioPath = path.join(tempDir, 'master_audio_150s.wav');

const clockTickPath = path.join(sfxDir, 'sfx_clock_tick_60bpm.wav').replace(/\\/g, '/');
const subBassPath = path.join(sfxDir, 'sfx_sub_bass_drone_45hz.wav').replace(/\\/g, '/');
const roomTonePath = path.join(sfxDir, 'amb_room_tone_night.wav').replace(/\\/g, '/');
const dawnPadPath = path.join(sfxDir, 'amb_warm_dawn_pad.wav').replace(/\\/g, '/');
const morningBirdsPath = path.join(sfxDir, 'amb_morning_birds.wav').replace(/\\/g, '/');

// Audio Filtergraph:
// [0] Clock Tick (muted in void 84-87.5s, softens at dawn 116s+)
// [1] Sub-bass (swells in Act II, muted in void 84-87.5s, cuts at dawn 116s)
// [2] Midnight Room Tone (muted in void 84-87.5s)
// [3] Dawn Pad (fades in at 116s)
// [4] Morning Birds (fades in at 125s)
const audioFilter = [
  `[0:a]aloop=loop=-1:size=2e+09,volume='if(between(t,84.0,87.5),0.0,if(gt(t,116.0),0.35,0.85))':eval=frame[tick]`,
  `[1:a]aloop=loop=-1:size=2e+09,volume='if(between(t,84.0,87.5),0.0,if(gt(t,116.0),0.0,if(between(t,44.0,84.0),0.8,0.5)))':eval=frame[bass]`,
  `[2:a]aloop=loop=-1:size=2e+09,volume='if(between(t,84.0,87.5),0.0,if(gt(t,116.0),0.1,0.6))':eval=frame[room]`,
  `[3:a]aloop=loop=-1:size=2e+09,volume='if(lt(t,116.0),0.0,min(1.0,(t-116.0)/4.0)*0.75)':eval=frame[pad]`,
  `[4:a]aloop=loop=-1:size=2e+09,volume='if(lt(t,125.0),0.0,min(1.0,(t-125.0)/3.0)*0.85)':eval=frame[birds]`,
  `[tick][bass][room][pad][birds]amix=inputs=5:duration=first[amixout]`,
  `[amixout]loudnorm=I=-14:LRA=11:TP=-1.0[aout]`
].join(';');

const audioCmd = `ffmpeg -y -i "${clockTickPath}" -i "${subBassPath}" -i "${roomTonePath}" -i "${dawnPadPath}" -i "${morningBirdsPath}" -filter_complex "${audioFilter}" -map "[aout]" -t 150.0 "${masterAudioPath}"`;
execSync(audioCmd, { stdio: 'inherit' });
console.log('Master audio track rendered at -14 LUFS.');

// Step 4: Final Master Assembly with Burned Typography & Clamped 150s Duration
console.log('\n--- Step 4: Final Assembly & Caption Burn (Pass 2) ---');

const formattedCaptionsPath = captionsPath.replace(/\\/g, '/').replace(/:/g, '\\:');
const subFilter = `subtitles='${formattedCaptionsPath}':force_style='Fontname=Comic Sans MS Bold,Fontsize=22,PrimaryColour=&H00D6E6ED&,OutlineColour=&H00181818&,BorderStyle=1,Outline=2.5,Shadow=0,Alignment=2,MarginV=28'`;

const finalAssemblyCmd = `ffmpeg -y -i "${rawConcatenatedVideo}" -i "${masterAudioPath}" -vf "${subFilter}" -map 0:v -map 1:a -c:v libx264 -pix_fmt yuv420p -b:v 2500k -c:a aac -b:a 192k -t 150.0 -movflags +faststart "${masterOutputPath}"`;
execSync(finalAssemblyCmd, { stdio: 'inherit' });
console.log(`\n✅ MASTER 2-3 MINUTE FILM RENDERED: ${masterOutputPath}`);

// Verification
const probeOutput = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams "${masterOutputPath}"`, { encoding: 'utf8' });
const probe = JSON.parse(probeOutput);
const finalDuration = parseFloat(probe.format?.duration || 0);
const finalSizeMB = (fs.statSync(masterOutputPath).size / (1024 * 1024)).toFixed(2);

console.log('====================================================');
console.log(`VERIFICATION RESULT:`);
console.log(`- Duration: ${finalDuration.toFixed(3)}s (${Math.floor(finalDuration/60)}m ${Math.floor(finalDuration%60)}s)`);
console.log(`- File Size: ${finalSizeMB} MB`);
console.log(`- Target Compliance (120s - 180s): ${finalDuration >= 120 && finalDuration <= 180 ? '✅ PASS' : '❌ FAIL'}`);
console.log('====================================================');
