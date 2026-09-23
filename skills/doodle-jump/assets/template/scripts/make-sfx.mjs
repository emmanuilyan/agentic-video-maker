import fs from 'node:fs';
// A finite, deterministic soft landing pop. Peak -6 dB before mix gain.
const rate=48000, length=Math.round(rate*0.15);
const pcm=Buffer.alloc(length*2);
let noise=1741;
for(let i=0;i<length;i++){
  const t=i/rate;
  noise=(Math.imul(noise,1664525)+1013904223)>>>0;
  const grain=(noise/4294967296*2-1)*Math.exp(-55*t)*0.14;
  const tone=Math.sin(2*Math.PI*(210*t-350*t*t))*Math.exp(-32*t)*0.42;
  const envelope=Math.min(1,t/0.002)*Math.max(0,Math.min(1,1-(t-0.12)/0.03));
  pcm.writeInt16LE(Math.round((tone+grain)*envelope*32767),i*2);
}
const header=Buffer.alloc(44);
header.write('RIFF'); header.writeUInt32LE(36+pcm.length,4); header.write('WAVEfmt ',8);
header.writeUInt32LE(16,16); header.writeUInt16LE(1,20); header.writeUInt16LE(1,22);
header.writeUInt32LE(rate,24); header.writeUInt32LE(rate*2,28); header.writeUInt16LE(2,32);
header.writeUInt16LE(16,34); header.write('data',36); header.writeUInt32LE(pcm.length,40);
fs.mkdirSync('public/sfx',{recursive:true});
fs.writeFileSync('public/sfx/landing.wav',Buffer.concat([header,pcm]));
console.log('Created public/sfx/landing.wav (150 ms, deterministic)');
