import React from "react";
import { Composition, staticFile } from "remotion";
import {
  SquidScene,
  HumanScene,
  RizzScene,
  PronounsScene,
  MemeTitleStack,
} from "./scenes";
const items = [
  ["Squid", SquidScene, 132],
  ["Human", HumanScene, 66],
  ["Meme", MemeTitleStack, 90],
  ["Rizz", RizzScene, 120],
  ["Pronouns", PronounsScene, 48],
] as const;
export const Root: React.FC = () => (
  <>
    <style>{`@font-face{font-family:Anton;src:url('${staticFile("anton.ttf")}')}@font-face{font-family:Impact;src:url('${staticFile("impact.ttf")}')}`}</style>
    {items.map(([name, Scene, duration]) => {
      return (
        <React.Fragment key={name}>
          <Composition
            id={name}
            component={Scene}
            width={1280}
            height={720}
            fps={60}
            durationInFrames={duration}
          />
        </React.Fragment>
      );
    })}
  </>
);
