import {Composition} from 'remotion';
import {BorneoMapDemo} from './BorneoMapDemo';

export const Root = () => (
  <Composition
    id="BorneoMap"
    component={BorneoMapDemo}
    width={1080}
    height={1920}
    fps={25}
    durationInFrames={425}
  />
);
