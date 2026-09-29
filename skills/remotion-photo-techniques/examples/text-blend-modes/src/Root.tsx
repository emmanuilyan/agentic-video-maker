import {Composition} from 'remotion';
import {Scene} from './Scene';
import {BlendModesGrid} from './BlendModesGrid';
import {PremiereBlendStillDemo} from './PremiereBlendStillDemo';

const ModesA: React.FC = () => <BlendModesGrid page={0} />;
const ModesB: React.FC = () => <BlendModesGrid page={1} />;

export const Root: React.FC = () => <>
  <Composition id="BlendedFillTextDemo" component={Scene} width={1280} height={720} fps={60} durationInFrames={120} />
  <Composition id="PremiereBlendStillDemo" component={PremiereBlendStillDemo} width={1280} height={720} fps={60} durationInFrames={1} />
  <Composition id="BlendModesA" component={ModesA} width={1920} height={1080} fps={60} durationInFrames={120} />
  <Composition id="BlendModesB" component={ModesB} width={1920} height={1080} fps={60} durationInFrames={120} />
</>;
