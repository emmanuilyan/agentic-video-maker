import { Composition } from "remotion";
import { PortraitCardDemo, ThreeBeatTitleDemo } from "./demo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PortraitCard" component={PortraitCardDemo} width={1280} height={720} fps={60} durationInFrames={174} />
    <Composition id="ThreeBeatTitle" component={ThreeBeatTitleDemo} width={1280} height={720} fps={60} durationInFrames={81} />
  </>
);
