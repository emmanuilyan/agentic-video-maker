import {AbsoluteFill, staticFile} from 'remotion';
import {PremiereBlendStillText} from './shared/premiere-blend-still-text';

export const PremiereBlendStillDemo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#10151a'}}>
    <PremiereBlendStillText
      backgroundSrc={staticFile('plate-skyrim.jpg')}
      text="SKYRIM"
      mode="linear-dodge"
      fillColor="#c4c7d7"
      opacity={0.66}
      filter="brightness(.77) saturate(.82) contrast(1.06)"
      fontSize={274}
      baselineY={615}
    />
  </AbsoluteFill>
);
