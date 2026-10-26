"""Keep one native hue as an RGBA layer over a grayscale source plate."""
from pathlib import Path
import argparse
import numpy as np
from PIL import Image

def keep_hue(image, hue=0.0, inner=28.0, outer=40.0, saturation_feather=4.0):
    if not 0 <= inner < outer <= 180 or saturation_feather <= 0:
        raise ValueError("Require 0 <= inner < outer <= 180 and positive saturation feather")
    rgb=image.convert("RGB")
    hsv=np.asarray(rgb.convert("HSV")).astype("float32")
    degrees=hsv[:,:,0]*360/255
    delta=np.abs((degrees-hue+180)%360-180)
    hue_weight=np.clip((outer-delta)/(outer-inner),0,1)
    saturation_weight=np.clip(hsv[:,:,1]/saturation_feather,0,1)
    alpha=np.rint(hue_weight*saturation_weight*255).astype("uint8")
    result=rgb.convert("RGBA")
    result.putalpha(Image.fromarray(alpha))
    return result

if __name__ == "__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input",type=Path)
    parser.add_argument("output",type=Path)
    parser.add_argument("--hue",type=float,default=0)
    parser.add_argument("--inner",type=float,default=28)
    parser.add_argument("--outer",type=float,default=40)
    parser.add_argument("--saturation-feather",type=float,default=4)
    args=parser.parse_args()
    keep_hue(Image.open(args.input),args.hue,args.inner,args.outer,args.saturation_feather).save(args.output)
