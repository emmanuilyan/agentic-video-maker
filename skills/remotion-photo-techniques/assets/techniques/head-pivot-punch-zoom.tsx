import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type HeadPivotPunchZoomProps = {
  imageSrc: string;
  frame?: number;
  text?: string;
  sourceSize?: [number, number];
  crop?: {x: number; y: number; width: number; height: number};
  anchor?: [number, number];
  outputPoint?: [number, number];
  baseScale?: number;
  zoom?: number;
  zoomStart?: number;
  zoomFrames?: number;
  turnStart?: number;
  turnFrames?: number;
  turnDegrees?: number;
  initialAngle?: number;
  textureSrc?: string;
  fontFamily?: string;
  background?: string;
};

/** Punch into a measured landmark, hold, then rotate the photo under a fixed title.
 * Default cues reproduce the approved v6 rabbit effect relative to its 33.60s preview.
 * Supply your own photo; the approved source image is not bundled with the code demo.
 */
export const HeadPivotPunchZoom: React.FC<HeadPivotPunchZoomProps> = ({
  imageSrc, frame, text = 'Спиз%или', sourceSize = [1260, 800],
  crop = {x: 364, y: 0, width: 534, height: 800}, anchor = [580, 300],
  outputPoint = [.5, 890 / 1920], baseScale = 1.44, zoom = 3.55,
  zoomStart = 35, zoomFrames = 4, turnStart = 53, turnFrames = 48,
  turnDegrees = -180, initialAngle = -3, textureSrc,
  fontFamily = 'Arial Narrow, Arial, sans-serif', background = '#e9e1cc',
}) => {
  const current = useCurrentFrame(), {width, height} = useVideoConfig();
  const f = frame ?? current;
  const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
  const close = f >= zoomStart, titled = f >= turnStart;
  const magnification = interpolate(f, [zoomStart, zoomStart + zoomFrames], [1, zoom], clamp);
  const s = baseScale * magnification * width / 1080;
  const pivotX = (anchor[0] - crop.x) * s, pivotY = (anchor[1] - crop.y) * s;
  const angle = initialAngle + interpolate(f, [turnStart, turnStart + turnFrames], [0, turnDegrees], clamp);
  return <AbsoluteFill style={{background: close ? '#222a29' : background, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: width * outputPoint[0] - pivotX,
      top: height * outputPoint[1] - pivotY, width: crop.width * s, height: crop.height * s,
      transform: `rotate(${angle}deg)`, transformOrigin: `${pivotX}px ${pivotY}px`,
      overflow: 'hidden', boxShadow: '12px 18px 22px #0005'}}>
      <Img src={imageSrc} style={{position: 'absolute', left: -crop.x * s, top: -crop.y * s,
        width: sourceSize[0] * s, height: sourceSize[1] * s,
        filter: close ? 'grayscale(1) contrast(1.25) brightness(.68)' : 'saturate(.72) sepia(.14) contrast(1.06)'}}/>
      {textureSrc && <AbsoluteFill style={{backgroundImage: `url('${textureSrc}')`,
        backgroundSize: '1080px 1080px', mixBlendMode: 'multiply', opacity: .26}}/>}
    </div>
    {titled && <div style={{position: 'absolute', left: width * 100 / 1080,
      top: height * 830 / 1920, width: width * 880 / 1080, textAlign: 'center',
      color: '#fff', fontFamily, fontSize: width * 133 / 1080, fontWeight: 700,
      letterSpacing: width * 3 / 1080, lineHeight: 1.05, textShadow: '0 3px 10px #0009'}}>
      {text}<div style={{height: width * 8 / 1080, background: '#fff',
        width: width * 590 / 1080, margin: `${width * 25 / 1080}px auto 0`}}/>
    </div>}
  </AbsoluteFill>;
};
