import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const PhoneScrollMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scroll animation: scroll Y moves smoothly up
  // Frame 0-30: Video 1 static
  // Frame 30-60: Swipe up to Video 2
  // Frame 60-90: Video 2 static + Notification arrives
  // Frame 90-120: Swipe up to Video 3 (dismisses notification)
  const scrollY = interpolate(
    frame,
    [0, 25, 45, 80, 105, 140],
    [0, 0, -480, -480, -960, -960],
    { extrapolateRight: 'clamp' }
  );

  // Notification slide down at frame 50, slide up at frame 90
  const notifY = interpolate(
    frame,
    [50, 60, 90, 98],
    [-120, 15, 15, -120],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#0A0E17',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Bedroom Screen Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 60%, rgba(27, 42, 74, 0.7) 0%, rgba(5, 7, 12, 0.95) 75%)'
        }}
      />

      {/* ================= THE SMARTPHONE CHASSIS ================= */}
      <div
        style={{
          width: 440,
          height: 820,
          backgroundColor: '#000000',
          borderRadius: 48,
          border: '10px solid #222226',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 150, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 5
        }}
      >
        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 110,
            height: 26,
            backgroundColor: '#000000',
            borderRadius: 20,
            zIndex: 100
          }}
        />

        {/* ================= SCROLLING SOCIAL MEDIA FEED ================= */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${scrollY}px)`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Card 1: Endless Motivation Shorts */}
          <div
            style={{
              width: 420,
              height: 480,
              backgroundColor: '#1E1B2E',
              position: 'relative',
              borderBottom: '2px solid #111',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(30,27,46,0.3) 100%)'
            }}
          >
            <div style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>
              @mindset_hustle • 3.2M views
            </div>
            <div style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 25 }}>
              "Tomorrow you will wake up with the same excuses..." ⚡
            </div>
          </div>

          {/* Card 2: Brain-Rot Gaming Clip */}
          <div
            style={{
              width: 420,
              height: 480,
              backgroundColor: '#2A1B1E',
              position: 'relative',
              borderBottom: '2px solid #111',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(42,27,30,0.3) 100%)'
            }}
          >
            <div style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>
              @infinite_scroll • 890K views
            </div>
            <div style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 25 }}>
              Wait till the end... you won't believe what happened! 😱🔥
            </div>
          </div>

          {/* Card 3: Another Dopamine Trap */}
          <div
            style={{
              width: 420,
              height: 480,
              backgroundColor: '#1B272E',
              position: 'relative',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(27,39,46,0.3) 100%)'
            }}
          >
            <div style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>
              @dopamine_drops • 1.4M views
            </div>
            <div style={{ color: '#E0E0E0', fontSize: 16, marginBottom: 25 }}>
              Just one more video before bed... 😴💤
            </div>
          </div>
        </div>

        {/* Right Action Bar (Heart, Comments, Share) */}
        <div
          style={{
            position: 'absolute',
            right: 14,
            bottom: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
            zIndex: 30
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>❤️</div>
            <div style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>421K</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>💬</div>
            <div style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>8.2K</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>↗️</div>
            <div style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>Share</div>
          </div>
        </div>

        {/* Incoming Friend Notification */}
        <div
          style={{
            position: 'absolute',
            top: notifY,
            left: 15,
            right: 15,
            backgroundColor: 'rgba(30, 32, 40, 0.94)',
            backdropFilter: 'blur(16px)',
            borderRadius: 20,
            padding: '12px 16px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#34C759',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20
            }}
          >
            💬
          </div>
          <div>
            <div style={{ color: '#FFF', fontSize: 13, fontWeight: 'bold' }}>
              Marcus • now
            </div>
            <div style={{ color: '#CCC', fontSize: 12 }}>
              Ayo, we've been waiting at the track 30 mins... you coming?
            </div>
          </div>
        </div>
      </div>

      {/* ================= AYO'S MITTEN HANDS HOLDING PHONE ================= */}
      {/* Left Hand & Hoodie Sleeve */}
      <div
        style={{
          position: 'absolute',
          left: 620,
          bottom: 120,
          width: 140,
          height: 180,
          backgroundColor: '#D2A23E', // Mustard Hoodie
          borderRadius: '50px 0 0 50px',
          zIndex: 4
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 690,
          bottom: 240,
          width: 80,
          height: 110,
          backgroundColor: '#613729', // Ayo Skin Mitten Hand
          borderRadius: '30px 0 0 30px',
          boxShadow: '-5px 5px 15px rgba(0,0,0,0.5)',
          zIndex: 6
        }}
      />

      {/* Right Hand & Thumb Swiping */}
      <div
        style={{
          position: 'absolute',
          right: 620,
          bottom: 120,
          width: 140,
          height: 180,
          backgroundColor: '#D2A23E', // Mustard Hoodie
          borderRadius: '0 50px 50px 0',
          zIndex: 4
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 690,
          bottom: 240,
          width: 80,
          height: 110,
          backgroundColor: '#613729', // Ayo Skin Mitten Hand
          borderRadius: '0 30px 30px 0',
          boxShadow: '5px 5px 15px rgba(0,0,0,0.5)',
          zIndex: 6
        }}
      />
      {/* Thumb reaching over screen */}
      <div
        style={{
          position: 'absolute',
          right: 740,
          bottom: 300,
          width: 45,
          height: 70,
          backgroundColor: '#613729',
          borderRadius: '25px',
          transform: 'rotate(-25deg)',
          zIndex: 20,
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
        }}
      />
    </div>
  );
};
