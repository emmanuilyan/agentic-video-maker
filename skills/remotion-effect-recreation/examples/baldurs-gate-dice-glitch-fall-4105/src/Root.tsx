import {Composition} from 'remotion';
import {DiceGlitchQuote} from './DiceGlitchQuote';

const DiceGlitchQuoteDemo: React.FC = () => (
  <>
    <DiceGlitchQuote />
    <div
      style={{
        position: 'absolute',
        zIndex: 40,
        left: 20,
        top: 15,
        color: '#fff',
        background: '#000b',
        padding: '7px 12px',
        font: 'bold 18px Arial',
      }}
    >
      REMOTION · Dice Glitch Quote
    </div>
    <div
      style={{position: 'absolute', left: 0, top: 0, width: 3, height: 720, background: '#ece7ee', zIndex: 50}}
    />
  </>
);

export const Root: React.FC = () => (
  <Composition
    id="DiceGlitchQuote"
    component={DiceGlitchQuoteDemo}
    durationInFrames={60}
    fps={60}
    width={1280}
    height={720}
  />
);
