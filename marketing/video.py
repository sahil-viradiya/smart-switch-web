"""
Shared video tools: layout modes, cross-fades, sound and the Meta-ready encode.

Two layout modes for the same reel:
  organic  Instagram / Facebook Reels and Stories. Key content stays between y=250 and y=1580
           (the app keeps the top ~250 px and bottom ~340 px for its own buttons and caption).
  ads      Reels and Stories ADS. Meta puts the call-to-action and text over the top ~14% and the
           bottom ~35%, so key content is squeezed into y=270..1248. The scene is drawn exactly as
           in organic mode, then the content band is scaled to fit and centred.

Sound is an original music bed generated in music.py (96 BPM, 12 bars = 30 s) with tap, tick, chime and whoosh
sounds, so there is no music licence to worry about. Scene cuts and taps sit on the beat grid (BEAT).
Replace it with trending audio from inside the app if you prefer.
"""
import subprocess, tempfile, wave
from functools import lru_cache
from pathlib import Path
from PIL import Image
import brand as b
import music

W, H, FPS = 1080, 1920, 30
DESIGN = (250, 1580)                      # where scenes are drawn
SAFE = {'organic': (250, 1580), 'ads': (270, 1248)}
MODE = ['organic']                        # set by the builder
_last = [0.42, 0.55]                      # glow of the scene just drawn (used to rebuild the backdrop in ads mode)


def ease(p):
    p = max(0.0, min(1.0, p))
    return 1 - (1 - p) ** 3


@lru_cache(maxsize=None)
def _stage(gy, r):
    return b.stage((W, H), (0.5, gy), r)


def base(gy=0.42, r=0.55):
    """Blank canvas for a scene: the lit backdrop (organic) or a transparent layer (ads)."""
    _last[:] = [gy, r]
    return Image.new('RGBA', (W, H), (0, 0, 0, 0)) if MODE[0] == 'ads' else _stage(gy, r).copy()


def finish(img):
    """Turn a scene's canvas into a final RGB frame for the current mode."""
    if MODE[0] != 'ads':
        return img.convert('RGB')
    top, bot = SAFE['ads']
    k = (bot - top) / (DESIGN[1] - DESIGN[0])
    bw, bh = int(W * k), bot - top
    band = img.crop((0, DESIGN[0], W, DESIGN[1])).resize((bw, bh), Image.LANCZOS)
    gy = round((top + (_last[0] * H - DESIGN[0]) * k) / H, 3)
    out = _stage(gy, round(_last[1] * k, 3)).copy()
    out.alpha_composite(band, ((W - bw) // 2, top))
    return out.convert('RGB')


def frame_at(scenes, starts, xf, t):
    """Frame at global time t, cross-fading between scenes."""
    i = max(k for k in range(len(starts)) if starts[k] <= t + 1e-9)
    cur = finish(scenes[i](t - starts[i]))
    if i > 0 and t - starts[i] < xf:
        prev = finish(scenes[i - 1](t - starts[i - 1]))
        return Image.blend(prev, cur, ease((t - starts[i]) / xf))
    return cur


# ---- sound (music.py renders it) -------------------------------------------------------------------------------
BEAT = music.BEAT   # every cut and tap is placed on this grid (96 BPM)


def write_wav(path, pcm, rate=44100):
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(rate)
        w.writeframes(pcm.tobytes())


# ---- encode --------------------------------------------------------------------------------------------------
def encode(out_mp4, frame_fn, total, events, style='bright'):
    """MP4 for Meta: 1080x1920, 30 fps, H.264 High + yuv420p (BT.709), AAC 160 kbps stereo, faststart."""
    out_mp4 = Path(out_mp4)
    out_mp4.parent.mkdir(parents=True, exist_ok=True)
    n = int(round(total * FPS))
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / 'a.wav'
        write_wav(wav, music.render(total, events, style))
        cmd = ['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', str(wav),
               '-vf', 'noise=alls=2:allf=t,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
               '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-profile:v', 'high', '-level', '4.1', '-x264-params', 'aq-mode=3',
               '-g', '60', '-maxrate', '10M', '-bufsize', '20M', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
               '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2', '-shortest', '-movflags', '+faststart', str(out_mp4)]
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for k in range(n):
            p.stdin.write(frame_fn(k / FPS).tobytes())
            if k % 300 == 0:
                print(f'  {out_mp4.name}: frame {k}/{n}', flush=True)
        p.stdin.close()
        if p.wait() != 0:
            raise SystemExit('ffmpeg failed')
    print(f'  {out_mp4.name}: {total:.0f}s, {out_mp4.stat().st_size / 1e6:.1f} MB')
