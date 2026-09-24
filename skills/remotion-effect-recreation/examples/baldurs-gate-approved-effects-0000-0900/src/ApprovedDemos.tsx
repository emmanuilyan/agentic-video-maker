import { AbsoluteFill, Img, Sequence, useCurrentFrame, staticFile } from "remotion";
import { PortraitTitleCard, ThreeBeatSerifTitle } from "./approved-effects";
import { ActionSteps, KobeImpactCaption, ReactionWindow } from "./approved-effects-next";

const CardDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <PortraitTitleCard frame={frame} fps={60} portraitContent={<MovingPortrait frame={frame} />} />;
};

const MovingPortrait: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ width: "100%", height: "100%", transform: `translateY(${Math.sin(frame / 8) * 5}px) scale(${1 + Math.sin(frame / 19) * 0.025})` }}>
    <Img src={staticFile("portrait-motion.svg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

const TitleDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 55% 40%, #c84d81, #29172e 74%)" }}><ThreeBeatSerifTitle frame={frame} fps={60} /></AbsoluteFill>;
};

const ReactionDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill><ActionSteps /><ReactionWindow frame={frame} fps={60} /></AbsoluteFill>;
};

const KobeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill><ActionSteps /><KobeImpactCaption frame={frame} fps={60} /></AbsoluteFill>;
};

/** A contact reel; every technique also has its own composition in Root.tsx. */
export const ApprovedEffectsReel: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180}><CardDemo /></Sequence>
      <Sequence from={180} durationInFrames={90}><TitleDemo /></Sequence>
      <Sequence from={270} durationInFrames={48}><ReactionDemo /></Sequence>
      <Sequence from={318} durationInFrames={39}><KobeDemo /></Sequence>
    </AbsoluteFill>
  );
};

export { CardDemo, TitleDemo, ReactionDemo, KobeDemo };
