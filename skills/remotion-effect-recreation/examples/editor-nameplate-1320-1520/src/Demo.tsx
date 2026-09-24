import { useCurrentFrame } from "remotion";
import { EditorNameplate } from "./EditorNameplate";

export const EditorNameplateDemo: React.FC = () => (
  <EditorNameplate
    frame={useCurrentFrame()}
    scenes={["scene-rizzly.svg", "scene-diablo.svg", "scene-gnomer.svg"]}
    previousScene="previous-scene.svg"
  />
);
