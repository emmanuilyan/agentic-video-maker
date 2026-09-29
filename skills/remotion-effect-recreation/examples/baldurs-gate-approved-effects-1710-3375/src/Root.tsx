import { Composition } from "remotion";
import {
  BloodSpicyDemo,
  DndExperience,
  ElectricThreat,
  MemeBands,
} from "./standalone";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ElectricThreat"
      component={ElectricThreat}
      width={1280}
      height={720}
      fps={60}
      durationInFrames={68}
    />
    <Composition
      id="DndExperience"
      component={DndExperience}
      width={1280}
      height={720}
      fps={60}
      durationInFrames={90}
    />
    <Composition
      id="BloodSpicy"
      component={BloodSpicyDemo}
      width={1280}
      height={720}
      fps={60}
      durationInFrames={66}
    />
    <Composition
      id="MemeBands"
      component={MemeBands}
      width={1280}
      height={720}
      fps={60}
      durationInFrames={180}
    />
  </>
);
