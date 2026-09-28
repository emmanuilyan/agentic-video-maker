import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {borneoPath, bruneiPath, indonesiaPath, malaysiaPath} from './borneoGeometry';

const MAP_WIDTH = 2160;
const MAP_HEIGHT = 3840;
const BORNEO_ANCHOR = {x: 1090, y: 1975};
const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const subtitleCues = [
  {from: 0, to: 30, text: 'Это самый'},
  {from: 30, to: 58, text: 'необычный остров'},
  {from: 58, to: 83, text: 'в мире'},
  {from: 83, to: 115, text: 'Он называется Борнео'},
  {from: 115, to: 149, text: 'Один из самых'},
  {from: 149, to: 175, text: 'больших островов'},
  {from: 175, to: 202, text: 'на Земле'},
  {from: 202, to: 227, text: 'единственный остров,'},
  {from: 227, to: 256, text: 'разделённый'},
  {from: 256, to: 304, text: 'тремя странами'},
  {from: 304, to: 350, text: 'Смотри на границы'},
  {from: 350, to: 414, text: 'занимает Индонезия,'},
  {from: 414, to: 425, text: 'Южная часть острова'},
];

export type MapStoryProps = {
  imagery?: string;
  detailImagery?: string;
  showSubtitles?: boolean;
  accentColor?: string;
};

/** A deterministic satellite-map Short: one image and georeferenced SVG layers share one transform. */
export const MapStory: React.FC<MapStoryProps> = ({
  imagery = staticFile('borneo-nasa-base.jpg'),
  detailImagery = staticFile('borneo-nasa-detail.jpg'),
  showSubtitles = true,
  accentColor = '#e3aa16',
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const zoom = interpolate(frame, [0, 35, 105], [0.93, 1.16, 1.82], {
    ...clamp,
    easing: easeOut,
  });
  const focusX = interpolate(frame, [0, 105], [BORNEO_ANCHOR.x - 42, BORNEO_ANCHOR.x], clamp);
  const focusY = interpolate(frame, [0, 105], [BORNEO_ANCHOR.y + 25, BORNEO_ANCHOR.y], clamp);
  const screenX = interpolate(frame, [0, 105], [width * 0.44, width * 0.53], clamp);
  const left = screenX - focusX * zoom;
  const top = height * 0.485 - focusY * zoom;
  const surroundingsDim = interpolate(frame, [120, 158], [0, 0.7], clamp);
  const detailBrightness = interpolate(frame, [120, 158], [1.10, 1.35], clamp);
  const outlineOpacity = interpolate(frame, [35, 70], [0, 0.72], clamp);
  const borderOpacity = interpolate(frame, [220, 250], [0, 0.62], clamp);
  const highlightOpacity = interpolate(frame, [333, 350], [0, 0.76], clamp);
  const flagOpacity = interpolate(frame, [383, 400], [0, 1], clamp);
  const labelOpacity = interpolate(frame, [75, 95, 200, 222], [0, 1, 1, 0], clamp);
  const subtitle = subtitleCues.find((cue) => frame >= cue.from && frame < cue.to)?.text;

  return (
    <AbsoluteFill style={{backgroundColor: '#071b22', overflow: 'hidden', fontFamily: 'Arial, sans-serif'}}>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
        }}
      >
        <Img
          src={imagery}
          style={{
            position: 'absolute',
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            filter: 'brightness(0.9) saturate(0.82) hue-rotate(-35deg) contrast(1.08)',
          }}
        />
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{position: 'absolute', inset: 0, overflow: 'visible'}}
        >
          <defs>
            <clipPath id="borneo-clip">
              <path d={borneoPath} />
            </clipPath>
            <mask id="outside-borneo-mask" maskUnits="userSpaceOnUse" x={0} y={0} width={MAP_WIDTH} height={MAP_HEIGHT}>
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="white" />
              <path d={borneoPath} fill="black" />
            </mask>
            <pattern id="amber-dots" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#ffd763" opacity="0.7" />
            </pattern>
          </defs>
          <rect
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            fill="#001018"
            opacity={surroundingsDim}
            mask="url(#outside-borneo-mask)"
          />
          <image
            href={detailImagery}
            x={638.18}
            y={1476.92}
            width={834.55}
            height={1083.08}
            clipPath="url(#borneo-clip)"
            preserveAspectRatio="none"
            style={{filter: `brightness(${detailBrightness}) saturate(0.86) contrast(1.07)`}}
          />
          <path
            d={indonesiaPath}
            fill={accentColor}
            fillOpacity={highlightOpacity * 0.45}
          />
          <path
            d={indonesiaPath}
            fill="url(#amber-dots)"
            opacity={highlightOpacity}
          />
          <path
            d={borneoPath}
            fill="none"
            stroke="#d7dfdc"
            strokeWidth={1.25}
            strokeOpacity={outlineOpacity}
            vectorEffect="non-scaling-stroke"
          />
          {[indonesiaPath, malaysiaPath, bruneiPath].map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke="#e8ebe4"
              strokeWidth={0.8}
              strokeOpacity={borderOpacity}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '46.5%',
          transform: 'translate(-50%, -50%)',
          background: '#0b0d0c',
          color: '#f7f8f5',
          fontSize: 25,
          fontWeight: 700,
          padding: '2px 11px',
          letterSpacing: 0.4,
          opacity: labelOpacity,
        }}
      >
        БОРНЕО
      </div>

      {[
        {text: '1', x: 0.59, y: 0.56, from: 230},
        {text: '2', x: 0.40, y: 0.44, from: 235},
        {text: '3', x: 0.60, y: 0.33, from: 260},
      ].map((number) => (
        <div
          key={number.text}
          style={{
            position: 'absolute',
            left: width * number.x,
            top: height * number.y,
            width: 48,
            height: 48,
            background: '#050809',
            color: '#fff',
            fontSize: 33,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            clipPath: 'polygon(50% 0, 100% 26%, 100% 78%, 50% 100%, 0 77%, 0 25%)',
            opacity: interpolate(frame, [number.from, number.from + 18, 315, 345], [0, 1, 1, 0], clamp),
          }}
        >
          {number.text}
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: flagOpacity,
        }}
      >
        <div style={{width: 144, height: 106, clipPath: 'polygon(50% 0, 100% 28%, 100% 74%, 50% 100%, 0 74%, 0 28%)', background: 'linear-gradient(#ce1e27 50%, #f4f0e6 50%)', border: '3px solid #edece2'}} />
        <div style={{background: '#080a09', color: '#fff', fontSize: 28, fontWeight: 700, padding: '3px 12px', marginTop: -1}}>ИНДОНЕЗИЯ</div>
      </div>

      {showSubtitles && subtitle && (
        <div
          style={{
            position: 'absolute',
            top: height * 0.675,
            left: width * 0.06,
            width: width * 0.88,
            textAlign: 'center',
            color: '#fff',
            fontSize: 39,
            fontWeight: 500,
            lineHeight: 1.1,
            textShadow: '0 2px 2px #000, 0 0 8px #000',
          }}
        >
          {subtitle}
        </div>
      )}
      <div style={{position: 'absolute', right: 22, bottom: 22, color: 'rgba(255,255,255,0.62)', fontSize: 20}}>NASA GIBS · Natural Earth</div>
    </AbsoluteFill>
  );
};
