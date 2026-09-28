import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FlatMap} from './flat-map';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(0.2, 0.8, 0.2, 1);

const SailSticker = ({frame}: {frame: number}) => {
  const {fps} = useVideoConfig();
  const entrance = spring({frame, fps, config: {damping: 12, stiffness: 180}});
  const drift = Math.sin(frame / 11) * 8;
  return (
    <div style={{position: 'absolute', left: 310, top: 620, width: 460, height: 470, transform: `translateY(${(1 - entrance) * 180 + drift}px) rotate(${-7 + entrance * 7}deg) scale(${0.6 + entrance * 0.4})`, filter: 'drop-shadow(10px 18px 0 rgba(0,38,73,.25))'}}>
      <svg viewBox="0 0 460 470" width="460" height="470">
        <path d="M219 34 219 322 M218 48 80 278 218 278 Z M238 92 371 278 238 278 Z" fill="#f7d160" stroke="white" strokeWidth="24" strokeLinejoin="round" />
        <path d="M66 325 Q233 370 396 325 L340 419 Q222 452 116 413 Z" fill="#124b80" stroke="white" strokeWidth="25" strokeLinejoin="round" />
        <path d="M79 327 Q218 356 382 328" fill="none" stroke="#f7d160" strokeWidth="19" strokeLinecap="round" />
        <path d="M219 41 V321" stroke="#562f25" strokeWidth="21" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const Caption = ({text, frame, start}: {text: string; frame: number; start: number}) => {
  const opacity = interpolate(frame, [start, start + 5, start + 38, start + 45], [0, 1, 1, 0], clamp);
  const rise = interpolate(frame, [start, start + 8], [35, 0], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', left: 45, right: 45, top: 1320, textAlign: 'center', opacity, transform: `translateY(${rise}px)`, fontFamily: 'Arial, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: 88, lineHeight: 1.06, letterSpacing: -3, color: '#fff', WebkitTextStroke: '8px #071526', paintOrder: 'stroke fill', textShadow: '0 9px 0 rgba(0,0,0,.24)'}}>{text}</div>
  );
};

export const SwedenDelaware = () => {
  const frame = useCurrentFrame();
  const swedenClose = frame < 60;
  const delaware = frame >= 210;
  const closeZoom = interpolate(frame, [0, 59], [1.18, 1.02], {...clamp, easing: ease});
  const wideZoom = interpolate(frame, [60, 209], [1.12, 0.98], {...clamp, easing: ease});
  const delawareZoom = interpolate(frame, [210, 269], [1.18, 1], {...clamp, easing: ease});

  return (
    <AbsoluteFill style={{backgroundColor: '#a9c4d9', overflow: 'hidden'}}>
      {swedenClose && <FlatMap center={[18, 63]} scale={3100} highlightIds={['752']} cameraZoom={closeZoom} />}
      {frame >= 60 && frame < 210 && <FlatMap center={[18, 62]} scale={1950} highlightIds={['752']} cameraZoom={wideZoom} />}
      {delaware && <FlatMap center={[-75.2, 39.7]} scale={18000} marker={[-75.55, 39.75]} markerLabel="NEW SWEDEN" cameraZoom={delawareZoom} />}

      {frame < 210 && <SailSticker frame={frame} />}
      {delaware && <div style={{position: 'absolute', top: 240, left: 100, right: 100, color: '#07558a', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 86}}>1638</div>}

      {frame < 45 && <Caption text="SWEDEN LOOKED OUTWARD" frame={frame} start={0} />}
      {frame >= 45 && frame < 90 && <Caption text="BEYOND EUROPE" frame={frame} start={45} />}
      {frame >= 90 && frame < 135 && <Caption text="IT PLANNED A COLONY" frame={frame} start={90} />}
      {frame >= 135 && frame < 180 && <Caption text="ACROSS THE SEA" frame={frame} start={135} />}
      {frame >= 180 && frame < 225 && <Caption text="IN 1638" frame={frame} start={180} />}
      {frame >= 225 && <Caption text="NEW SWEDEN BEGAN HERE" frame={frame} start={225} />}
      <div style={{position: 'absolute', bottom: 46, left: 55, color: '#1a4560', font: '600 26px Arial, sans-serif', opacity: 0.7}}>Map data: Natural Earth</div>
    </AbsoluteFill>
  );
};
