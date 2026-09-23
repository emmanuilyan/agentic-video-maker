export function buildRoute(video){
  const cadence=video.jumpCadenceFrames??video.fps;
  const settle=Math.max(6,Math.round(video.fps*0.4));
  const jumpCount=Math.max(1,Math.floor((video.durationInFrames-settle)/cadence));
  const lanes=video.routeLanes??[390,665];
  const stepY=video.routeStepY??135;
  const platformWidth=video.routePlatformWidth??250;
  return Array.from({length:jumpCount+1},(_,index)=>({
    id:index?`step-${index}`:'start', frame:index*cadence, x:lanes[index%lanes.length], y:index*stepY,
    width:index===0?Math.max(platformWidth,280):platformWidth,
  }));
}

export function nearestContact(landings,frame,{includeStart=false}={}){
  const candidates=includeStart?landings:landings.slice(1);
  if(!candidates.length) throw new Error('Route has no contact candidates');
  return candidates.reduce((best,point)=>Math.abs(point.frame-frame)<Math.abs(best.frame-frame)?point:best);
}
