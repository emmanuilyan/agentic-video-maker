import React from "react";
import {Composition} from "remotion";
import {EldenRing, DoubleCaption, BoomerBand, DarkSouls} from "./Effects";

export const Root: React.FC = () => <>
  <Composition id="maxor-elden-ring-title" component={EldenRing} width={1280} height={720} fps={60} durationInFrames={54}/>
  <Composition id="maxor-caption-zoom" component={DoubleCaption} width={1280} height={720} fps={60} durationInFrames={42}/>
  <Composition id="maxor-boomer-font-cycle" component={BoomerBand} width={1280} height={720} fps={60} durationInFrames={102}/>
  <Composition id="maxor-dark-souls-overlay" component={DarkSouls} width={1280} height={720} fps={60} durationInFrames={102}/>
</>;
