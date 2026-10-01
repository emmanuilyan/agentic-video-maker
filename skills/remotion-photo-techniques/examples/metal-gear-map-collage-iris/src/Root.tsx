import {Composition,useCurrentFrame} from 'remotion';
import {CircleCollage} from './Effects';
import {Comparison} from './Comparison';
const Solo=()=> <CircleCollage frame={useCurrentFrame()} duration={88}/>;
const Review=()=> <Comparison source="01-map-circle-source.mp4" label="29.467–30.933" duration={88} effect={CircleCollage}/>;
export const Root=()=> <><Composition id="MG_MAP_COLLAGE_IRIS" component={Solo} durationInFrames={88} fps={60} width={1280} height={720}/><Composition id="MapReview" component={Review} durationInFrames={88} fps={60} width={2560} height={720}/></>;
