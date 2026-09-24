import "./index.css";
import { Composition } from "remotion";
import { ApprovedEffectsReel, CardDemo, KobeDemo, ReactionDemo, TitleDemo } from "./ApprovedDemos";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ApprovedEffectsReel" component={ApprovedEffectsReel} width={1280} height={720} fps={60} durationInFrames={357} />
    <Composition id="PortraitTitleCard" component={CardDemo} width={1280} height={720} fps={60} durationInFrames={180} />
    <Composition id="ThreeBeatSerifTitle" component={TitleDemo} width={1280} height={720} fps={60} durationInFrames={90} />
    <Composition id="PurpleReactionWindow" component={ReactionDemo} width={1280} height={720} fps={60} durationInFrames={48} />
    <Composition id="KobeImpactCaption" component={KobeDemo} width={1280} height={720} fps={60} durationInFrames={39} />
  </>
);
