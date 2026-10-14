"""Extract consecutive reference frames at source FPS into labelled contact sheets.
Usage: python inspect-interval.py SOURCE BASE START END OUTPUT_DIR
"""
import sys,math
from pathlib import Path
import cv2
from PIL import Image,ImageDraw
source,base,start,end,output=sys.argv[1:];base,start,end=map(float,[base,start,end]);p=Path(output);p.mkdir(parents=True,exist_ok=True)
c=cv2.VideoCapture(source);fps=c.get(cv2.CAP_PROP_FPS);first=round((start-base)*fps);last=round((end-base)*fps)
assert 0<=first<last<=c.get(cv2.CAP_PROP_FRAME_COUNT),(first,last)
c.set(cv2.CAP_PROP_POS_FRAMES,first)
for batch in range(first,last,24):
 sheet=Image.new('RGB',(1600,1500));draw=ImageDraw.Draw(sheet)
 for i in range(min(24,last-batch)):
  ok,a=c.read();assert ok
  x=i%4*400;y=i//4*250;sheet.paste(Image.fromarray(cv2.cvtColor(a,cv2.COLOR_BGR2RGB)).resize((400,225)),(x,y+25));draw.text((x+5,y+5),f'{base+(batch+i)/fps:.3f}  frame {batch+i}',fill='white')
 sheet.save(p/f'dense-{base+batch/fps:.3f}.jpg',quality=94)
