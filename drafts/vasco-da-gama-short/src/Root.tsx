import {Composition} from 'remotion';
import {VascoDaGamaShort} from './VascoDaGamaShort';

export const Root = () => (
  <Composition
    id="VascoDaGamaShort"
    component={VascoDaGamaShort}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={810}
  />
);
