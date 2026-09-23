import video from './data/video.json';
import landings from './data/landings.json';
import words from './data/captions.json';
import rawBeats from './data/beats.json';
import storyAssets from './data/story-assets.json';
import {buildCamera, criticalFrames} from './engine';
export type StoryBeat = {id: string; startFrame: number; endFrame: number; asset?: string; title?: string; date?: string;
  worldX?: number; worldY?: number; width?: number; landingId?: string};
export const beats = rawBeats as StoryBeat[];
export {video, landings, words, storyAssets};
export const camera = buildCamera(landings, video);
export const qaFrames = [...new Set([
  ...criticalFrames(landings, video.durationInFrames),
  ...beats.flatMap(beat => [beat.startFrame, beat.endFrame - 1]),
  ...video.themeChanges.flatMap(change => [change.frame - 1, change.frame, change.frame + 10]),
])].filter(frame => frame >= 0 && frame < video.durationInFrames).sort((a, b) => a - b);
const narrativeLandingIds = new Set(beats.flatMap(beat => beat.landingId ? [beat.landingId] : []));
export const landingCues = landings.slice(1)
  .filter(point => beats.length === 0 || narrativeLandingIds.has(point.id))
  .map(point => ({id: point.id, frame: point.frame}));
