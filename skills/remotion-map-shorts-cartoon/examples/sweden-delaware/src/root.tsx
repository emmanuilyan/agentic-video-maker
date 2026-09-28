import {Composition} from 'remotion';
import {SwedenDelaware} from './sweden-delaware';

export const Root = () => (
  <Composition
    id="SwedenDelaware"
    component={SwedenDelaware}
    durationInFrames={270}
    fps={30}
    width={1080}
    height={1920}
  />
);
