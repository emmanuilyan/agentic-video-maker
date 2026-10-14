import type {CSSProperties} from 'react';
import {ShortformTransition, type ShortformTransitionId} from '../../../assets/techniques/shortform-transitions';

const fill: CSSProperties = {position: 'absolute', inset: 0};

const Plate = ({variant}: {variant: 'from' | 'to'}) => {
  const first = variant === 'from';
  return (
    <div
      style={{
        ...fill,
        overflow: 'hidden',
        background: first
          ? 'linear-gradient(150deg, #1bd5c7 0%, #058482 52%, #063e56 100%)'
          : 'linear-gradient(145deg, #ffcf70 0%, #f35483 48%, #792b8e 100%)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{position: 'absolute', top: 80, left: 50, fontSize: 38, fontWeight: 800, letterSpacing: 8}}>
        {first ? 'SCENE A' : 'SCENE B'}
      </div>
      <div
        style={{
          position: 'absolute',
          left: first ? 52 : 95,
          top: first ? 225 : 265,
          width: first ? 440 : 360,
          height: first ? 440 : 360,
          borderRadius: first ? 220 : 46,
          background: first ? '#e8ff91' : '#171945',
          boxShadow: '30px 35px 0 #121c3770',
          transform: first ? 'rotate(-15deg)' : 'rotate(16deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 330,
          width: 320,
          textAlign: 'center',
          fontSize: 210,
          fontWeight: 900,
          color: first ? '#073b51' : '#ffecbf',
        }}
      >
        {first ? 'A' : 'B'}
      </div>
      <div style={{position: 'absolute', bottom: 105, left: 52, right: 52, height: 12, background: '#ffffffb3'}} />
      <div style={{position: 'absolute', bottom: 80, left: 52, width: first ? 210 : 365, height: 12, background: '#ffffffb3'}} />
    </div>
  );
};

export const Demo = ({transition}: {transition: ShortformTransitionId}) => (
  <ShortformTransition
    transition={transition}
    durationInFrames={18}
    from={<Plate variant="from" />}
    to={<Plate variant="to" />}
  />
);
