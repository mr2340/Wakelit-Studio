import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate
} from 'remotion';

export const IntroPill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total duration: 75 frames (2.5 seconds at 30 fps)
  // Typewriter reveal of opening clause: "It started with just one "
  // Keyword pill pops at frame 25
  const pillPop = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.4, stiffness: 140 }
  });

  // Linear fade out in last 10 frames (65 to 75)
  const fadeOut = interpolate(frame, [65, 75], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#000000',
        width: 1920,
        height: 1080,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        fontFamily: '"Comic Sans MS", "Comic Relief", cursive, sans-serif'
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#EDE6D6',
          textShadow: '0 0 5px #181818, -3px -3px 0 #181818, 3px -3px 0 #181818, -3px 3px 0 #181818, 3px 3px 0 #181818',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
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
  );
};
