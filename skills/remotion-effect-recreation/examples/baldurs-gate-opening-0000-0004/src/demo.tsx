import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FantasyBackdrop } from "./artwork";
import { PortraitTitleCard, ThreeBeatSerifTitle } from "./effects";

export const PortraitCardDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <PortraitTitleCard frame={frame} fps={60} />;
};

export const ThreeBeatTitleDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <FantasyBackdrop scene="knight" frame={frame + 174} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #e64d7a9c, #d84b7b50 70%, transparent)", mixBlendMode: "screen" }} />
      <ThreeBeatSerifTitle frame={frame} fps={60} />
    </AbsoluteFill>
  );
};
