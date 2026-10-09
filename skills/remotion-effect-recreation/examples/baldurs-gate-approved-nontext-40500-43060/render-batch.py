import json,subprocess
from pathlib import Path
p=Path(__file__).parent
for x in json.loads((p/'candidates.json').read_text()):
 subprocess.run(['npx','remotion','render','src/index.tsx',x['comp'],str(p/'out'/(x['id']+'.mp4')),'--concurrency=2','--log=error'],cwd=p,check=True)
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(p/'review'/(x['id']+'-original.mp4')),'-i',str(p/'out'/(x['id']+'.mp4')),'-filter_complex','[0:v][1:v]hstack=inputs=2[v]','-map','[v]','-an','-c:v','libx264','-crf','18',str(p/'review'/(x['id']+'-comparison.mp4'))],check=True)
 print(x['id'],flush=True)
