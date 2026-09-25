import { useCurrentFrame } from "remotion";
import { ThreatCard } from "./electric-threat";
import {
  BloodSpicy,
  DndExperienceEffect,
  MemeScene,
} from "./next-batch";

export const ElectricThreat: React.FC = () => (
  <ThreatCard frame={useCurrentFrame()} />
);

export const DndExperience: React.FC = () => (
  <DndExperienceEffect frame={useCurrentFrame()} />
);

export const BloodSpicyDemo: React.FC = () => (
  <BloodSpicy frame={useCurrentFrame()} />
);

export const MemeBands: React.FC = () => (
  <MemeScene frame={useCurrentFrame()} />
);
