import React from 'react';

export type IconName = 'move' | 'select' | 'lasso' | 'wand' | 'crop' | 'brush' | 'stamp' | 'eraser' | 'bucket' | 'dropper' | 'type' | 'hand' | 'zoom' | 'eye' | 'folder';
const paths: Record<IconName, React.ReactNode> = {
  move: <><path d="M12 2v20M2 12h20M8 6l4-4 4 4M8 18l4 4 4-4M6 8l-4 4 4 4M18 8l4 4-4 4" /></>,
  select: <rect x="3" y="4" width="18" height="16" strokeDasharray="3 2" />,
  lasso: <><path d="M19 16c8-13-11-18-16-6s18 13 14 5C12 9 7 17 10 22" /></>,
  wand: <><path d="m4 21 12-12M15 3v3M20 8h3M19 4l2-2M7 4v4M5 6h4" /><path d="m13 10 3 3" /></>,
  crop: <><path d="M5 1v18h18M1 5h18v18M5 5l14 14" /></>,
  brush: <><path d="m10 14 9-12 3 3-11 10M10 14c-8-3-3 7-9 8 8 2 14-2 10-7" /></>,
  stamp: <><path d="M3 21h18v-5H3zM8 15l2-7a4 4 0 1 1 4 0l2 7" /></>,
  eraser: <><path d="m2 15 11-12 9 8-10 11H8zM7 10l10 8" /></>,
  bucket: <><path d="m3 12 9-9 9 9-9 9zM7 1l8 9M2 12h19M21 15q-5 6 0 7 5-1 0-7" /></>,
  dropper: <><path d="m16 2 6 6-4 4-6-6zM14 9 3 20l-1 3 4-2L17 12" /></>,
  type: <><path d="M3 3h18M12 3v19M7 22h10M3 3v4M21 3v4" /></>,
  hand: <><path d="M6 13V6q2-3 3 0v5-8q2-3 3 0v8-7q3-3 3 1v7-5q3-2 3 2v5l2-3q3-1 2 2l-5 9H9L2 15q-1-5 4-2Z" /></>,
  zoom: <><circle cx="10" cy="10" r="7"/><path d="m16 16 7 7M7 10h6M10 7v6" /></>,
  eye: <><path d="M1 12Q12 0 23 12Q12 24 1 12Z"/><circle cx="12" cy="12" r="4" fill="currentColor" /></>,
  folder: <path d="M2 5h8l3 3h9v13H2z" />,
};

export const Icon = ({name, size = 27, color = '#1c1c1c'}: {name: IconName; size?: number; color?: string}) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" style={{color, display: 'block'}}>{paths[name]}</svg>;
