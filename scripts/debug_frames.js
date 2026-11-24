const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.resolve('projects/the-beast-you-feed/generated/frame_debug');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

[1, 2].forEach(sceneNum => {
  const file = path.resolve(`projects/the-beast-you-feed/generated/scenes/scene_00${sceneNum}.mp4`);
  [0.5, 1.5, 2.5, 3.5].forEach(t => {
    const outImg = path.join(dir, `s${sceneNum}_t${t}.jpg`);
    execSync(`ffmpeg -y -ss ${t} -i "${file}" -vframes 1 "${outImg}" -loglevel error`);
  });
});

// Also extract from master video at 1.0, 3.0, 5.0, 7.0
const masterFile = path.resolve('projects/the-beast-you-feed/output/the_beast_you_feed_test01_master.mp4');
[1.0, 3.0, 5.0, 7.0].forEach(t => {
  const outImg = path.join(dir, `master_t${t}.jpg`);
  execSync(`ffmpeg -y -ss ${t} -i "${masterFile}" -vframes 1 "${outImg}" -loglevel error`);
});

console.log('Frames successfully extracted to:', dir);
