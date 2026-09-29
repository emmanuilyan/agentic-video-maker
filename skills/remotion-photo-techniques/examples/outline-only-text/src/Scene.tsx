import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {OutlineOnlyText} from '../../../assets/techniques/outline-only-text';

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const cyanX = -340 + frame * 9.5;
  const orangeX = 1130 - frame * 5.8;

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: 'linear-gradient(115deg, #061527 0%, #0f1840 48%, #241226 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -100,
          opacity: 0.24,
          background:
            'repeating-linear-gradient(112deg, transparent 0 80px, rgba(190,224,255,.16) 82px 85px, transparent 88px 170px)',
          transform: `translateX(${frame * 1.8}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cyanX,
          top: 170,
          width: 700,
          height: 470,
          borderRadius: '50%',
          filter: 'blur(38px)',
          background: 'radial-gradient(ellipse, #48e6ec 4%, #1987b8 48%, transparent 72%)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: orangeX,
          top: 85,
          width: 540,
          height: 520,
          borderRadius: '50%',
          filter: 'blur(28px)',
          background: 'radial-gradient(ellipse, #ffb760 0%, #d34a8b 48%, transparent 73%)',
          opacity: 0.84,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -230 + frame * 4,
          top: 275,
          width: 530,
          height: 190,
          transform: 'skewX(-23deg)',
          background: 'linear-gradient(90deg, transparent, #f4df7544, transparent)',
          filter: 'blur(22px)',
        }}
      />
      <OutlineOnlyText text="КОНТУР" strokeColor="#fff5df" strokeWidth={5} fontSize={220} />
    </AbsoluteFill>
  );
};
