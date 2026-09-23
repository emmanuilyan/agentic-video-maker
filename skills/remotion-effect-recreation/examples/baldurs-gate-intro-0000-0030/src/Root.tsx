import "./index.css";
import { Composition } from "remotion";
import { IntroEffectsReel } from "./Composition";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ReviewIntroEffects"
    component={IntroEffectsReel}
    width={1280}
    height={720}
    fps={30}
    durationInFrames={900}
  />
);
