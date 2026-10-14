import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BlendedFillText} from './shared/blended-fill-text';

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 119], [1.06, 1.12]);
  const drift = interpolate(frame, [0, 119], [-20, 16]);

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#10151a'}}>
      <Img
        src={staticFile('plate-skyrim.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translateX(${drift}px) scale(${push})`,
          filter: 'brightness(.77) saturate(.82) contrast(1.06)',
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, #09101626, transparent 48%, #09101630)'}} />
      <BlendedFillText
        text="The Elder Scrolls V"
        fontSize={68}
        letterSpacing={0.5}
        baselineY={260}
        fillColor="#e6e2dc"
        fillOpacity={0.85}
        edgeOpacity={0.22}
        edgeWidth={0.7}
        revealStartFrame={3}
        revealEndFrame={22}
        scaleFrom={0.98}
      />
      <BlendedFillText
        text="SKYRIM"
        fontSize={274}
        letterSpacing={7}
        baselineY={615}
        fillColor="#c4c7d7"
        fillOpacity={0.66}
        blendMode="screen"
        edgeOpacity={0.28}
        edgeWidth={1.5}
        revealStartFrame={10}
        revealEndFrame={34}
      />
    </AbsoluteFill>
  );
};
