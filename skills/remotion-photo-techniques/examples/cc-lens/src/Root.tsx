import {Composition} from 'remotion';
import {LensDraft} from './LensDraft';

export const Root = () => (
  <Composition id="CCLens" component={LensDraft} width={360} height={640} fps={30} durationInFrames={75} />
);
