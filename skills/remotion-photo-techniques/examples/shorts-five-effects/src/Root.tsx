import {Composition} from 'remotion';
import {EchoDemo,GlowDemo,LensDemo,PollyDemo,TileDemo,FiveEffects,LensArtwork,BreakArtwork} from './Demos';
export const Root=()=> <>
 <Composition id="Echo" component={EchoDemo} width={360} height={640} fps={30} durationInFrames={60}/>
 <Composition id="Glow" component={GlowDemo} width={360} height={640} fps={30} durationInFrames={60}/>
 <Composition id="Lens" component={LensDemo} width={360} height={640} fps={30} durationInFrames={75}/>
 <Composition id="PixelPolly" component={PollyDemo} width={360} height={640} fps={30} durationInFrames={90}/>
 <Composition id="MotionTile" component={TileDemo} width={360} height={640} fps={30} durationInFrames={60}/>
 <Composition id="FiveEffects" component={FiveEffects} width={360} height={640} fps={30} durationInFrames={345}/>
 <Composition id="LensArtwork" component={LensArtwork} width={360} height={640} fps={30} durationInFrames={1}/>
 <Composition id="BreakArtwork" component={BreakArtwork} width={360} height={640} fps={30} durationInFrames={1}/>
</>;
