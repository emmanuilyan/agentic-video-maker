import { Composition } from "remotion";
import { EditorNameplateDemo } from "./Demo";

export const RemotionRoot: React.FC = () => (
  <Composition id="EditorNameplateDemo" component={EditorNameplateDemo} width={1280} height={720} fps={60} durationInFrames={120} />
);
