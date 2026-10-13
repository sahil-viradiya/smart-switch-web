#!/usr/bin/env python3
"""
Builds the product film shown on the home and product pages.

It composes stills from the real panel renders (public/images/catalog) and room photos
(public/images/scenes), then animates them with ffmpeg (a slow push-in on every shot, and a dip
through black between shots so two panels never overlap on screen). No text is burned into the
video: titles and captions live in the page (content/home.ts).

The film has a calm original music bed, generated in code (marketing/music.py), so there is
nothing to license. Every cut lands on the beat. The page plays it muted first (browsers block
autoplay with sound) and offers a Sound button.

Requirements:  pip install pillow   and   ffmpeg on the PATH
Usage:         python scripts/film/make_film.py
Output:        public/videos/film.mp4  and  public/images/film-poster.jpg

Edit STORYBOARD to change the shots. If the panels shown change, update FILM_COPY.note in
src/content/home.ts. If the length changes, keep SHOT a whole number of beats (BEAT in music.py).
"""
import subprocess, sys, tempfile, wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'marketing'))
import music  # noqa: E402  (the shared, generated music bed)

IMG = ROOT / 'public' / 'images'
W, H, FPS = 1920, 1080, 30
SHOT = 6 * music.BEAT   # 3.75 s, six beats per shot
DIP = 0.6               # seconds of the dip between two shots (centred on the cut)

# ('room', scene name, vertical centre 0..1) or ('panel', series, product id, width px)
STORYBOARD = [
    ('room', 'living', 0.40),
    ('panel', 'color', '8m-6-switch-1-fan', 1180),
    ('room', 'bedroom', 0.44),
    ('panel', 'color', '4m-1-socket-16a-1-switch-16a', 900),
    ('room', 'studio', 0.42),
    ('panel', 'color', '2m-4-switch-scene-control', 640),
    ('room', 'hall', 0.46),
    ('panel', 'edge', '12m-12-switch', 900),
]


def stage() -> Image.Image:
    bg = Image.new('RGB', (W, H), (9, 11, 10))
    glow = Image.new('RGB', (W, H), (0, 0, 0))
    ImageDraw.Draw(glow).ellipse((380, 90, 1540, 990), fill=(78, 58, 24))
    bg = Image.blend(bg, glow.filter(ImageFilter.GaussianBlur(190)), 0.9)
    ImageDraw.Draw(bg).line((260, 250, 1660, 250), fill=(120, 92, 40), width=2)
    return bg


def panel_still(series: str, pid: str, width: int, out: Path) -> None:
    p = Image.open(IMG / 'catalog' / series / f'{pid}.webp').convert('RGBA')
    p = p.resize((width, int(p.height * width / p.width)), Image.LANCZOS)
    if p.height > 760:
        p = p.resize((int(p.width * 760 / p.height), 760), Image.LANCZOS)
    at = ((W - p.width) // 2, (H - p.height) // 2)
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 255), (at[0], at[1] + 34), p.split()[3].point(lambda v: int(v * 0.55)))
    img = Image.alpha_composite(stage().convert('RGBA'), shadow.filter(ImageFilter.GaussianBlur(26)))
    img.alpha_composite(p, at)
    img.convert('RGB').save(out)


def room_still(scene: str, cy: float, out: Path) -> None:
    im = Image.open(IMG / 'scenes' / f'{scene}.webp').convert('RGB')
    h = int(im.width * 9 / 16)
    top = max(0, min(im.height - h, int(cy * im.height - h / 2)))
    im.crop((0, top, im.width, top + h)).resize((W, H), Image.LANCZOS).save(out)


def audio(path: Path, total: float) -> None:
    """The music bed as a WAV, with a soft swell that ends on every cut."""
    cuts = [(i * SHOT, 'whoosh') for i in range(1, len(STORYBOARD))]
    pcm = music.render(total, cuts, 'warm', drums_on=False)
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(music.RATE)
        w.writeframes(pcm.tobytes())


def main() -> None:
    tmp = Path(tempfile.mkdtemp(prefix='film-'))
    n = len(STORYBOARD)
    inputs, chains = [], []
    for i, shot in enumerate(STORYBOARD):
        f = tmp / f'c{i:02d}.png'
        if shot[0] == 'room':
            room_still(shot[1], shot[2], f)
        else:
            panel_still(shot[1], shot[2], shot[3], f)
        # each clip runs half a dip longer on each side, so the cuts stay on the beat grid
        dur = SHOT + (DIP / 2 if i in (0, n - 1) else DIP)
        frames = int(dur * FPS)
        inputs += ['-i', str(f)]
        z = f'1+0.05*on/{frames}' if i % 2 == 0 else f'1.05-0.05*on/{frames}'
        chains.append(f"[{i}:v]scale={W}:{H},zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s=1280x720:fps={FPS},format=yuv420p,setsar=1[v{i}]")
    cur = 'v0'
    for i in range(1, n):
        chains.append(f'[{cur}][v{i}]xfade=transition=fadeblack:duration={DIP}:offset={i * SHOT - DIP / 2:.3f}[x{i}]')
        cur = f'x{i}'
    total = n * SHOT
    chains.append(f'[{cur}]fade=t=in:st=0:d=0.4,fade=t=out:st={total - 0.5:.2f}:d=0.5[outv]')

    wav = tmp / 'music.wav'
    audio(wav, total)

    out = ROOT / 'public' / 'videos'
    out.mkdir(parents=True, exist_ok=True)
    film = out / 'film.mp4'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-i', str(wav), '-filter_complex', ';'.join(chains), '-map', '[outv]', '-map', f'{n}:a',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-r', str(FPS),
                    '-af', 'volume=0.5', '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-t', f'{total:.3f}', '-movflags', '+faststart', str(film)], check=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(film), '-ss', '2.0', '-frames:v', '1', '-q:v', '3', str(IMG / 'film-poster.jpg')], check=True)
    print(f'{film.relative_to(ROOT)}: {total:.1f}s, {film.stat().st_size / 1e6:.2f} MB')


if __name__ == '__main__':
    main()
