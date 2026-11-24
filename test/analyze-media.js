const { execSync } = require('child_process');
const fs = require('fs');

function probe(file) {
  try {
    const raw = execSync(`ffprobe -v quiet -print_format json -show_format -show_streams "${file}"`, { encoding: 'utf8' });
    const data = JSON.parse(raw);
    const vStream = data.streams.find(s => s.codec_type === 'video') || {};
    const aStream = data.streams.find(s => s.codec_type === 'audio') || {};
    return {
      filename: file,
      duration: parseFloat(data.format?.duration || 0),
      sizeMb: (parseFloat(data.format?.size || 0) / (1024 * 1024)).toFixed(2),
      bitrateKbps: Math.round(parseFloat(data.format?.bit_rate || 0) / 1000),
      video: {
        codec: vStream.codec_name,
        width: vStream.width,
        height: vStream.height,
        fps: vStream.r_frame_rate,
        pixFmt: vStream.pix_fmt
      },
      audio: {
        hasAudio: !!aStream.codec_name,
        codec: aStream.codec_name,
        sampleRate: aStream.sample_rate,
        channels: aStream.channels
      }
    };
  } catch (err) {
    return { error: err.message };
  }
}

const files = [
  'projects/sample-project/input/references/Lust Is Killing You..mp4',
  'projects/sample-project/input/references/LUST VS LOVE _ An Animated Short Film.mp4',
  'projects/sample-project/input/assets/captions_subtle_BLACK_screen-blend.mp4'
];

const results = files.map(probe);
console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('test/probed_media_summary.json', JSON.stringify(results, null, 2));
