import React from "react";
import { Composition, staticFile } from "remotion";
import {
  BossTitles,
  FramedMemeSwap,
  SpeechStages,
  RgbMemePoster,
  BehindCaption,
} from "./scenes";
const items: readonly (readonly [string, React.FC, number])[] = [
  ["Boss", BossTitles, 45],
  ["Cards", FramedMemeSwap, 54],
  ["Speech", SpeechStages, 73],
  ["Poster", RgbMemePoster, 38],
  ["Behind", BehindCaption, 39],
] as const;
export const Root: React.FC = () => (
  <>
    <style>{`@font-face{font-family:Impact;src:url('${staticFile("impact.ttf")}')}`}</style>
    {items.map(([name, Scene, frames]) => {
      return (
        <React.Fragment key={name}>
          <Composition
            id={name}
            component={Scene}
            width={1280}
            height={720}
            fps={60}
            durationInFrames={frames}
          />
        </React.Fragment>
      );
    })}
  </>
);
