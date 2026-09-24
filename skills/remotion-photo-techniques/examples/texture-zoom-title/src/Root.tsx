import React from "react";
import {Composition} from "remotion";
import {TextureZoomTitleDemo} from "./Composition";

export const RemotionRoot:React.FC=()=> <Composition id="texture-zoom-title" component={TextureZoomTitleDemo} width={1280} height={720} fps={60} durationInFrames={72}/>;
