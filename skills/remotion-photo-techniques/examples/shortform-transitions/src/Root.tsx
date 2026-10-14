import {Composition} from 'remotion';
import {SHORTFORM_TRANSITION_IDS} from '../../../assets/techniques/shortform-transitions';
import {Demo} from './Demo';

export const Root = () => (
  <>
    {SHORTFORM_TRANSITION_IDS.map((transition) => (
      <Composition
        key={transition}
        id={transition.replaceAll('_', '-')}
        component={Demo}
        defaultProps={{transition}}
        width={540}
        height={960}
        fps={30}
        durationInFrames={18}
      />
    ))}
  </>
);
