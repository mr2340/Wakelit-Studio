import React from 'react';
import {
  Sequence,
  Video,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate
} from 'remotion';

export const WakelitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle hand-drawn boiling wobble for shaking text (±2.5px X/Y, ±0.4 deg)
  const jitterX = Math.sin(frame * 2.3) * 2.5;
  const jitterY = Math.cos(frame * 1.9) * 2.0;
  const jitterRot = Math.sin(frame * 1.1) * 0.4;

  // Scene 1: Black Card Timing (0 - 75 frames / 0.0s - 2.5s)
  // Text typewriter reveal + Amber Pill Pop at frame 25
  const pillPop = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.4, stiffness: 140 }
  });

  const scene1FadeOut = interpolate(frame, [65, 75], [1, 0], { extrapolateRight: 'clamp' });

  // Scene 2: Visual Scene Timing (75 - 195 frames / 2.5s - 6.5s)
  const scene2Pop = spring({
    frame: frame - 78,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 120 }
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#000000',
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Comic Sans MS", "Comic Relief", cursive, sans-serif'
      }}
    >
      {/* ================= SCENE 1: BLACK BACKGROUND HOOK (0 - 75 frames / 0.0s - 2.5s) ================= */}
      <Sequence from={0} durationInFrames={75}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: scene1FadeOut
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#EDE6D6',
              textShadow: '0 0 5px #181818, -3px -3px 0 #181818, 3px -3px 0 #181818, -3px 3px 0 #181818, 3px 3px 0 #181818',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            It started with just one&nbsp;
            {frame >= 25 && (
              <span
                style={{
                  backgroundColor: '#E89D42',
                  color: '#111111',
                  padding: '4px 22px',
                  borderRadius: '9999px',
                  textShadow: 'none',
                  fontWeight: 900,
                  transform: `scale(${pillPop})`,
                  transformOrigin: 'center center',
                  display: 'inline-block'
                }}
              >
                video
              </span>
            )}
            &nbsp;.
          </div>
        </div>
      </Sequence>

      {/* ================= SCENE 2: VISUALS WITH SHAKING CAPTIONS (75 - 195 frames / 2.5s - 6.5s) ================= */}
      <Sequence from={75} durationInFrames={120}>
        {/* Letterboxed Visual Layer */}
        <div
          style={{
            position: 'absolute',
            top: 96,
            left: 0,
            width: 1920,
            height: 888,
            overflow: 'hidden'
          }}
        >
          <Video
            src={staticFile('scene_001.mp4')}
            style={{
              width: 1920,
              height: 1080,
              marginTop: -96,
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Shaking / Boiling Caption Overlay */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 125,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate(${jitterX}px, ${jitterY}px) rotate(${jitterRot}deg) scale(${scene2Pop})`,
            transformOrigin: 'center bottom',
            pointerEvents: 'none',
            zIndex: 100
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 'bold',
              color: '#EDE6D6',
              textShadow: '0 0 5px #181818, -3px -3px 0 #181818, 3px -3px 0 #181818, -3px 3px 0 #181818, 3px 3px 0 #181818'
            }}
          >
            He told himself he was just unwinding.
          </span>
        </div>
      </Sequence>

      {/* ================= CINEMATIC LETTERBOX BARS (96px) ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1920,
          height: 96,
          backgroundColor: '#000000',
          zIndex: 999
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 1920,
          height: 96,
          backgroundColor: '#000000',
          zIndex: 999
        }}
      />

      {/* ================= AUDIO: SFX & BED ================= */}
      <Audio
        src={staticFile('amb_room_tone_night.wav')}
        volume={0.4}
      />
      {[75, 105, 135, 165].map((frameOffset) => (
        <Sequence key={frameOffset} from={frameOffset} durationInFrames={30}>
          <Audio
            src={staticFile('sfx_clock_tick_60bpm.wav')}
            volume={0.6}
          />
        </Sequence>
      ))}
    </div>
  );
};
