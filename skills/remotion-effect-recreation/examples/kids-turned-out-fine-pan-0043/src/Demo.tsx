import {LateralPhotoPan} from './LateralPhotoPan';

export const Demo = () => (
  <LateralPhotoPan
    photos={[
      {src: 'photo-a.jpg', width: 1.00, objectPosition: '54% center'},
      {src: 'photo-b.jpg', width: 1.10, objectPosition: 'center'},
      {src: 'photo-c.jpg', width: 1.00, objectPosition: 'center'},
    ]}
    cameraKeys={[
      {frame: 0, x: 0},
      {frame: 12, x: 0.22},
      {frame: 20, x: 0.62},
      {frame: 26, x: 0.85},
      {frame: 32, x: 0.98},
      {frame: 36, x: 1.02},
      {frame: 48, x: 1.14},
      {frame: 60, x: 1.48},
      {frame: 71, x: 2.05},
    ]}
    seamWidth={0.012}
  />
);
