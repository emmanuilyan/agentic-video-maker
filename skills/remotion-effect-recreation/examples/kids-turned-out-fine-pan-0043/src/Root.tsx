import {Composition} from 'remotion';
import {Demo} from './Demo';

export const Root = () => (
  <Composition
    id="CameraPhotoPan"
    component={Demo}
    fps={24000 / 1001}
    width={1280}
    height={720}
    durationInFrames={72}
  />
);
