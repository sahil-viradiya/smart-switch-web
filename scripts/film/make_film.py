#!/usr/bin/env python3
"""
Builds the silent product film shown on the home and product pages.

It composes stills from the real panel renders (public/images/catalog) and room photos
(public/images/scenes), then animates them with ffmpeg (slow push-ins and soft dissolves).
No text is burned into the video: titles and captions live in the page (content/home.ts).

Requirements:  pip install pillow   and   ffmpeg on the PATH
Usage:         python scripts/film/make_film.py
Output:        public/videos/film.mp4  and  public/images/film-poster.jpg

Edit STORYBOARD to change the shots. If the length or the panels shown change, update
FILM_COPY.note in src/content/home.ts and VIDEOS.film in src/config/images.ts.
"""
import subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
IMG = ROOT / 'public' / 'images'
W, H, FPS, XFADE = 1920, 1080, 30, 0.7

# ('room', scene name, vertical centre 0..1, seconds) or ('panel', series, product id, width px, seconds)
STORYBOARD = [
    ('room', 'living', 0.40, 3.4),
    ('panel', 'color', '8m-6-switch-1-fan', 1180, 2.8),
    ('room', 'bedroom', 0.44, 3.4),
    ('panel', 'edge', '4m-4-switch', 860, 2.8),
    ('room', 'studio', 0.42, 3.4),
    ('panel', 'color', '2m-4-switch-scene-control', 640, 2.8),
    ('room', 'hall', 0.46, 3.4),
    ('panel', 'edge', '12m-12-switch', 900, 2.8),
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


def main() -> None:
    tmp = Path(tempfile.mkdtemp(prefix='film-'))
    clips = []
    for i, shot in enumerate(STORYBOARD):
        f = tmp / f'c{i:02d}.png'
        if shot[0] == 'room':
            room_still(shot[1], shot[2], f); clips.append((f, shot[3]))
        else:
            panel_still(shot[1], shot[2], shot[3], f); clips.append((f, shot[4]))

    inputs, chains = [], []
    for i, (f, d) in enumerate(clips):
        frames = int((d + XFADE) * FPS)
        inputs += ['-i', str(f)]
        if i % 2 == 0:
            z, x = f'1+0.07*on/{frames}', 'iw/2-(iw/zoom/2)-on*0.15'
        else:
            z, x = f'1.07-0.07*on/{frames}', 'iw/2-(iw/zoom/2)+on*0.15'
        chains.append(f"[{i}:v]scale={W}:{H},zoompan=z='{z}':x='{x}':y='ih/2-(ih/zoom/2)':d={frames}:s=1280x720:fps={FPS},format=yuv420p,setsar=1[v{i}]")
    cur, t = 'v0', clips[0][1]
    for i in range(1, len(clips)):
        chains.append(f'[{cur}][v{i}]xfade=transition=fade:duration={XFADE}:offset={t:.2f}[x{i}]')
        cur, t = f'x{i}', t + clips[i][1]
    total = t + XFADE
    chains.append(f'[{cur}]fade=t=in:st=0:d=0.5,fade=t=out:st={total - 0.6:.2f}:d=0.6[outv]')

    out = ROOT / 'public' / 'videos'
    out.mkdir(parents=True, exist_ok=True)
    film = out / 'film.mp4'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(chains), '-map', '[outv]', '-an',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', str(FPS), str(film)], check=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(film), '-ss', '2.0', '-frames:v', '1', '-q:v', '3', str(IMG / 'film-poster.jpg')], check=True)
    print(f'{film.relative_to(ROOT)}: {total:.1f}s, {film.stat().st_size / 1e6:.2f} MB')


if __name__ == '__main__':
    main()
