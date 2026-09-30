import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {LensWarp, lensState} from '../../../assets/techniques/lens-warp';

export const LensDraft = () => {
  const frame = useCurrentFrame();
  const {height} = useVideoConfig();
  const state = lensState(frame, 90);
  const titleOpacity = interpolate(frame, [31, 39], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <>
    <LensWarp src={staticFile(frame < 35 ? 'graphic-with-title.svg' : 'graphic.svg')} durationInFrames={90} />
    {frame >= 35 ? <Img src={staticFile('title.svg')} style={{position: 'absolute', width: '100%', height: '100%', opacity: titleOpacity, clipPath: `circle(${state.radius * height}px at 50% 50%)`}} /> : null}
  </>;
};
