import React from "react";
import {Composition} from "remotion";
import {Comparison, type ComparisonId} from "./Composition";

const entries: Array<{id: ComparisonId; name: string; frames: number; source: string; clean: string; cleanIsVideo?: boolean; sourceRange: string}> = [
  {id: "mosaic", name: "RedMosaicReview", frames: 144, source: "01_red-mosaic.mp4", clean: "assets/clean-face.jpg", sourceRange: "00:13.0–00:15.4"},
  {id: "crt", name: "CrtPortraitReview", frames: 108, source: "02_crt-scanline.mp4", clean: "assets/clean-face.jpg", sourceRange: "00:17.0–00:18.8"},
  {id: "logo", name: "SplitLogoReview", frames: 192, source: "03_logo-build.mp4", clean: "assets/clean-logo-bg.png", sourceRange: "01:16.8–01:20.0"},
  {id: "neon", name: "CyanNeonReview", frames: 90, source: "04_neon-sync.mp4", clean: "assets/neon-backdrop-start.png", sourceRange: "02:48.0–02:49.5"},
];

export const RemotionRoot: React.FC = () => (
  <>
    {entries.map((entry) => (
      <Composition
        key={entry.id}
        id={entry.name}
        component={Comparison}
        durationInFrames={entry.frames}
        fps={60}
        width={2560}
        height={720}
        defaultProps={entry}
      />
    ))}
  </>
);
