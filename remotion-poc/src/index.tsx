import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import React from 'react';
import { WakelitComposition } from './WakelitComposition';
import { PhoneScrollMockup } from './PhoneScrollMockup';
import { IntroPill } from './IntroPill';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroPill"
        component={IntroPill}
        durationInFrames={75} // 2.5 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WakelitComposition"
        component={WakelitComposition}
        durationInFrames={240} // 8.0 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PhoneScrollMockup"
        component={PhoneScrollMockup}
        durationInFrames={150} // 5.0 seconds at 30 fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
