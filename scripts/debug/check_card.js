const fs = require('fs');
const html = fs.readFileSync('projects/you-said-tomorrow-yesterday/logs/diagnostic_scene_001_att1_1795538552887.html', 'utf8');

const matches = html.match(/<[^>]+(?:card|tile|item|video|media)[^>]*>/gi) || [];
console.log('Total tags with card/media/video/tile:', matches.length);

// Search for play icon or video tags
const playIdx = html.indexOf('play_circle');
if (playIdx !== -1) {
  console.log('--- Context around play_circle ---');
  console.log(html.slice(playIdx - 300, playIdx + 500));
}
