import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {blendModes, type BlendMode} from './shared/blend-modes';

type Entry = {id: BlendMode | 'background'; label: string};

const entries: Entry[] = [...blendModes, {id: 'background', label: 'Исходный фон'}];

const Tile: React.FC<{item: Entry; index: number}> = ({item, index}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 119], [-14, 14]);
  const zoom = interpolate(frame, [0, 119], [1.05, 1.1]);
  return (
    <div style={{position: 'relative', width: 640, height: 360, overflow: 'hidden', isolation: 'isolate', background: '#10151a'}}>
      <Img
        src={staticFile('plate-skyrim.jpg')}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `translateX(${drift}px) scale(${zoom})`, filter: 'brightness(.77) saturate(.82) contrast(1.06)'}}
      />
      {item.id !== 'background' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 45,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: 125,
            fontWeight: 400,
            letterSpacing: 2,
            lineHeight: 1,
            color: '#c4c7d7',
            opacity: 0.66,
            mixBlendMode: item.id,
          }}
        >
          SKYRIM
        </div>
      )}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 54, display: 'flex', gap: 12, alignItems: 'center', padding: '0 19px', color: '#fff', background: 'linear-gradient(#0d1119e8,#0d1119b0)', fontFamily: 'Arial, sans-serif'}}>
        <span style={{fontSize: 20, color: '#a8b4cd'}}>{String(index + 1).padStart(2, '0')}</span>
        <span style={{fontSize: 24, fontWeight: 700}}>{item.id}</span>
        <span style={{fontSize: 19, color: '#d0d6e2'}}>{item.label}</span>
      </div>
    </div>
  );
};

export const BlendModesGrid: React.FC<{page: 0 | 1}> = ({page}) => {
  const slice = entries.slice(page * 9, page * 9 + 9);
  return (
    <AbsoluteFill style={{display: 'grid', gridTemplateColumns: 'repeat(3, 640px)', gridTemplateRows: 'repeat(3, 360px)', background: '#080a0d'}}>
      {slice.map((item, index) => <Tile key={item.id} item={item} index={page * 9 + index} />)}
    </AbsoluteFill>
  );
};
