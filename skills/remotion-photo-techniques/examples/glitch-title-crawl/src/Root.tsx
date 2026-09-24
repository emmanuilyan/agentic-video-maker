import React from "react";
import { Composition } from "remotion";
import { Demo } from "./Composition";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="glitch-title-crawl"
    component={Demo}
    width={1280}
    height={720}
    fps={60}
    durationInFrames={108}
  />
);
