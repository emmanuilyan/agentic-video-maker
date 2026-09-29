import {Composition} from 'remotion';
import {Scene} from './Scene';

export const Root: React.FC = () => (
  <Composition id="OutlineOnlyTextDemo" component={Scene} width={1280} height={720} fps={60} durationInFrames={120} />
);
