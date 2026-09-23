import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {DoodleJump} from './Video';
import {video} from './timeline';
const Root: React.FC = () => <Composition id="DoodleJump" component={DoodleJump}
  width={video.width} height={video.height} fps={video.fps} durationInFrames={video.durationInFrames}/>;
registerRoot(Root);
