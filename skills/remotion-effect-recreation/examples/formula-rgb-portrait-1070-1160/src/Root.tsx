import { Composition } from "remotion";
import { FormulaRgbPortraitDemo } from "./Demo";

export const RemotionRoot: React.FC = () => (
  <Composition id="FormulaRgbPortraitDemo" component={FormulaRgbPortraitDemo} width={1280} height={720} fps={60} durationInFrames={54} />
);
