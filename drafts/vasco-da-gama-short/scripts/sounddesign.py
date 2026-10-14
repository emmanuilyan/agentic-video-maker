"""Deterministic ambience and timed effects. Requires numpy and FFmpeg."""
from pathlib import Path
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
N = SR * 27
rng = np.random.default_rng(20260929)
timeline = np.arange(N) / SR
bed = np.zeros(N)

def noise(seconds, low, high):
    count = round(seconds * SR)
    spectrum = np.fft.rfft(rng.normal(size=count))
    freq = np.fft.rfftfreq(count, 1 / SR)
    spectrum *= np.exp(-(freq / high) ** 4) * (1 - np.exp(-(freq / low) ** 4))
    result = np.fft.irfft(spectrum, n=count)
    return result / max(1e-9, np.sqrt(np.mean(result ** 2)))

def place(signal, start, level):
    offset = round(start * SR)
    if offset < 0:
        signal = signal[-offset:]
        offset = 0
    count = min(len(signal), N - offset)
    if count > 0:
        bed[offset:offset + count] += signal[:count] * level

def source(name):
    data = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(ROOT / 'public/sfx' / name),
                                   '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'])
    signal = np.frombuffer(data, np.float32).astype(float)
    return signal / max(1e-9, np.max(np.abs(signal)))

sea = noise(27, 90, 1800) * (0.65 + 0.35 * np.sin(timeline * 1.8) ** 2)
sea_level = np.interp(timeline, [0, .2, 8.3, 9.1, 14, 14.3, 25, 26.7, 27],
                      [0, .003, .003, 0, 0, .003, .0035, .0035, 0])
bed += sea * sea_level

# A diffuse, nonverbal plaza murmur, kept far below the voice.
crowd = noise(5.1, 220, 900)
crowd *= np.sin(np.linspace(0, np.pi, len(crowd))) ** 2
place(crowd, 9.1, .002)

for start in [.9, 3.8, 20.2]:
    t = np.arange(round(.65 * SR)) / SR
    creak = np.sin(2 * np.pi * (170 * t + 48 * t ** 2)) + .3 * np.sin(2 * np.pi * 390 * t)
    creak *= np.sin(np.linspace(0, np.pi, len(t))) ** 2
    place(creak, start, .003)

whoosh = source('whoosh.wav')
peak = np.argmax(np.abs(whoosh)) / SR
for beat, level in [(0.65,.012),(3.5,.022),(4.8,.035),(6.35,.016),(6.93,.02),
                    (9.1,.025),(10.7,.015),(12.95,.015),(14.16,.023),
                    (22.7,.013),(25.06,.024),(26.25,.012)]:
    place(whoosh, beat - peak, level)
impact = source('impact.wav')
place(impact, 4.8 - np.argmax(np.abs(impact)) / SR, .075)
whip = source('whip.wav')
place(whip, 11.87 - np.argmax(np.abs(whip)) / SR, .065)

t = np.arange(round(1.1 * SR)) / SR
splash = noise(1.1, 130, 6000) * (1 - np.exp(-t * 65)) * np.exp(-t * 5)
splash += .3 * np.sin(2 * np.pi * (170 * t - 50 * t ** 2)) * np.exp(-t * 9)
splash /= np.max(np.abs(splash))
place(splash, 17.38, .045)

# Silence the supporting sounds around «Твоя жена?».
bed *= np.interp(timeline, [0,8.32,8.42,9.0,9.08,27], [1,1,0,0,1,1])
bed *= np.clip((27 - timeline) / .15, 0, 1)
stereo = np.column_stack([bed, bed * .97])
with wave.open(str(ROOT / 'public/sounddesign.wav'), 'wb') as output:
    output.setnchannels(2)
    output.setsampwidth(2)
    output.setframerate(SR)
    output.writeframes((np.clip(stereo, -.98, .98) * 32767).astype('<i2').tobytes())
print(f'SFX peak: {20*np.log10(np.max(np.abs(bed))):.1f} dBFS')
