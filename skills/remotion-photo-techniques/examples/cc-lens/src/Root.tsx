import {Composition} from 'remotion';
import {LensDraft} from './LensDraft';

export const Root = () => (
  <Composition id="CCLens" component={LensDraft} width={506} height={700} fps={30} durationInFrames={90} />
);
