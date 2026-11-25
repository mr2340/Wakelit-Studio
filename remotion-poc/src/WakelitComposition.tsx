import React from 'react';
import {
  Sequence,
  Video,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring
} from 'remotion';

export const WakelitComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle hand-drawn boiling wobble (±2.5px X/Y, ±0.3 deg)
  const jitterX = Math.sin(frame * 2.1) * 2.5;
  const jitterY = Math.cos(frame * 1.8) * 2.0;
  const jitterRot = Math.sin(frame * 0.9) * 0.3;

  // Scene 1 Spring Pop Entrance (0 - 15 frames)
  const scene1Pop = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 120 }
  });

  // Scene 2 Spring Pop Entrance (120 - 135 frames)
  const scene2Pop = spring({
    frame: frame - 120,
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
        fontFamily: '"Comic Relief", "Comic Sans MS", cursive, sans-serif'
      }}
    >
      {/* ================= V1: SCENE VIDEO LAYERS ================= */}
      {/* Scene 1: Midnight Trance (Frames 0 to 120 / 4.0s) */}
      <Sequence from={0} durationInFrames={120}>
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
      </Sequence>

      {/* Scene 2: Latent Ambition / Running Shoes (Frames 120 to 240 / 4.0s) */}
      <Sequence from={120} durationInFrames={120}>
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
            src={staticFile('scene_002.mp4')}
            style={{
              width: 1920,
              height: 1080,
              marginTop: -96,
              objectFit: 'cover'
            }}
          />
        </div>
      </Sequence>

      {/* ================= V4: KINETIC CAPTIONS LAYER ================= */}
      {/* Scene 1 Caption: "It started with one [night] ." */}
      <Sequence from={0} durationInFrames={115}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate(${jitterX}px, ${jitterY}px) rotate(${jitterRot}deg) scale(${scene1Pop})`,
            transformOrigin: 'center bottom',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 'bold',
              color: '#EDE6D6',
              textShadow: '0 0 4px #181818, -3px -3px 0 #181818, 3px -3px 0 #181818, -3px 3px 0 #181818, 3px 3px 0 #181818',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            It started with one&nbsp;
            <span
              style={{
                backgroundColor: '#E89D42',
                color: '#111111',
                padding: '2px 16px',
                borderRadius: '9999px',
                textShadow: 'none',
                fontWeight: 900,
                display: 'inline-block'
              }}
            >
              night
            </span>
            &nbsp;.
          </span>
        </div>
      </Sequence>

      {/* Scene 2 Caption: "He had a plan." */}
      <Sequence from={120} durationInFrames={115}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate(${jitterX}px, ${jitterY}px) rotate(${jitterRot}deg) scale(${scene2Pop})`,
            transformOrigin: 'center bottom',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 'bold',
              color: '#EDE6D6',
              textShadow: '0 0 4px #181818, -3px -3px 0 #181818, 3px -3px 0 #181818, -3px 3px 0 #181818, 3px 3px 0 #181818'
            }}
          >
            He had a plan.
          </span>
        </div>
      </Sequence>

      {/* ================= V6: CINEMATIC LETTERBOX BARS (96px) ================= */}
      {/* Top Bar */}
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
      {/* Bottom Bar */}
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

      {/* ================= AUDIO TRACKS ================= */}
      {/* Room Tone Ambience Bed */}
      <Audio
        src={staticFile('amb_room_tone_night.wav')}
        volume={0.5}
      />

      {/* Mechanical Clock Ticks (60 BPM = tick every 30 frames) */}
      {[0, 30, 60, 90, 120, 150, 180, 210].map((frameOffset) => (
        <Sequence key={frameOffset} from={frameOffset} durationInFrames={30}>
          <Audio
            src={staticFile('sfx_clock_tick_60bpm.wav')}
            volume={0.8}
          />
        </Sequence>
      ))}
    </div>
  );
};
