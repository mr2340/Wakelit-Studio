const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ref1 = path.resolve('projects/sample-project/input/references/Lust Is Killing You..mp4');
const ref2 = path.resolve('projects/sample-project/input/references/LUST VS LOVE _ An Animated Short Film.mp4');

function detectCuts(file) {
  try {
    const out = execSync(`ffmpeg -i "${file}" -vf "select='gt(scene,0.25)',metadata=print" -f null - 2>&1`, { encoding: 'utf8', maxBuffer: 15*1024*1024 });
    const matches = out.match(/pts_time:([0-9.]+)/g) || [];
    const cuts = matches.map(m => parseFloat(m.replace('pts_time:', '')));
    return cuts;
  } catch(e) {
    return [];
  }
}

function detectFreezes(file) {
  try {
    const out = execSync(`ffmpeg -i "${file}" -vf "freezedetect=n=0.003:d=1.5" -f null - 2>&1`, { encoding: 'utf8', maxBuffer: 15*1024*1024 });
    const starts = (out.match(/freeze_start: ([0-9.]+)/g) || []).map(m => parseFloat(m.replace('freeze_start: ', '')));
    const ends = (out.match(/freeze_end: ([0-9.]+)/g) || []).map(m => parseFloat(m.replace('freeze_end: ', '')));
    return starts.map((s, idx) => ({ start: s, end: ends[idx] || s + 1.5, duration: (ends[idx] || s + 1.5) - s }));
  } catch(e) {
    return [];
  }
}

console.log('Detecting cuts and freezes for Ref 1 (Lust Is Killing You)...');
const cuts1 = detectCuts(ref1);
const freezes1 = detectFreezes(ref1);

console.log('Detecting cuts and freezes for Ref 2 (Lust vs Love)...');
const cuts2 = detectCuts(ref2);
const freezes2 = detectFreezes(ref2);

const results = {
  ref1: {
    video: 'Lust Is Killing You..mp4',
    cutsCount: cuts1.length,
    cutsTimestamps: cuts1,
    freezesCount: freezes1.length,
    freezes: freezes1
  },
  ref2: {
    video: 'LUST VS LOVE _ An Animated Short Film.mp4',
    cutsCount: cuts2.length,
    cutsTimestamps: cuts2,
    freezesCount: freezes2.length,
    freezes: freezes2
  }
};

fs.writeFileSync('knowledge/reference-analysis/motion_metrics.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Motion metrics saved to knowledge/reference-analysis/motion_metrics.json');
console.log('Ref 1: Cuts =', cuts1.length, 'Freezes =', freezes1.length);
console.log('Ref 2: Cuts =', cuts2.length, 'Freezes =', freezes2.length);
