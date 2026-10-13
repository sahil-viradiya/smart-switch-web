#!/usr/bin/env python3
"""
Safety and platform check for the marketing material. Run it before you publish:  python marketing/check.py

WORDING: fails on prices or discounts, the supplier's details, "Tuya"/"Siri", unsupported superlatives,
certifications or origin claims, electrical ratings, and characters that are not on a normal keyboard.
It also checks the numbers against the product data.

PLATFORM (rules in specs.py): every post is 1080x1350, RGB, PNG/JPEG, under 30 MB, with text kept clear of
the Instagram grid crop. Every reel is 1080x1920, 30 fps, H.264 High, yuv420p, BT.709, AAC 128 kbps or more,
about 30 s, faststart. Frames are decoded and checked so nothing important sits where the app, or a Meta ad,
covers the screen: organic files keep content inside y=250..1580, ad files inside y=270..1248 with side
margins. Cover images are checked against the grid and feed crops. Captions: at most 5 hashtags and 2200
characters. Ad copy: primary text 125, headline 27, description 27.
"""
import json, re, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import brand as b   # noqa: E402
import content as c  # noqa: E402
import specs as S    # noqa: E402

FORBIDDEN = [
    (r'\bRs\b|\bINR\b|₹|\$|\bprice|\bdiscount|\boff\b|\bsale\b|\bcheap|\b\d{3,}\s*/-', 'price or discount wording'),
    (r'varni|vadodara|gidc|nakshatra|9978787|varnidigital', 'supplier company details'),
    (r'\btuya\b|\bsiri\b|smart life', 'platform the website does not claim'),
    (r'\bbest\b|\bno\.?\s?1\b|\bnumber one\b|\bleading\b|\bworld.?class\b|\bunmatched\b|\bguarantee', 'unsupported superlative or guarantee'),
    (r'\bcertified\b(?!\s+(electrician|elec))|\bBIS\b|\bISO\b|\bCE\b|\bUL\b|\bRoHS\b', 'certification claim (none are published)'),
    (r'made in india|make in india|manufactured in india|since 20\d\d|established', 'origin or history claim (not on the website)'),
    (r'\b(volt|voltage|230\s?v|240\s?v|ip\d\d|watt)\b', 'electrical rating not published'),
]


def strings_in(path):
    """String literals in a Python source file, so wording on the images and reel is checked too."""
    out = []
    for m in re.finditer(r"""(?<![\w"'])(['"])((?:\\.|(?!\1).)+)\1""", path.read_text(encoding='utf8')):
        s = m.group(2)
        if len(s) > 3 and ' ' in s:
            out.append(s)
    return out


def main():
    texts = {}
    for f in ('captions.md', 'links.md'):
        texts[f] = [(HERE / f).read_text(encoding='utf8')]
    for f in ('content.py', 'posts.py', 'reel.py', 'reel2.py', 'meta_ads.py'):
        texts[f] = strings_in(HERE / f)
    problems = []
    for name, chunks in texts.items():
        for t in chunks:
            for pat, why in FORBIDDEN:
                for m in re.finditer(pat, t, re.I):
                    problems.append(f'{name}: "{m.group(0)}" ({why})')
            bad = sorted({ch for ch in t if ord(ch) > 126 or (ord(ch) < 32 and ch not in '\n\t')})
            if bad:
                problems.append(f'{name}: non-keyboard characters {bad!r}')

    # numbers against the data
    caps = (HERE / 'captions.md').read_text(encoding='utf8')
    if f'{c.N_LAYOUTS} layouts' not in caps or f'{c.N_SIZES} sizes' not in caps:
        problems.append('captions.md: size or layout count does not match the data')
    for n in re.findall(r'(\d+)[- ]layouts?', caps):
        if int(n) != c.N_LAYOUTS:
            problems.append(f'captions.md: {n} layouts, data says {c.N_LAYOUTS}')
    for n in re.findall(r'(\d+)-year', caps):
        if int(n) != b.WARRANTY_YEARS:
            problems.append(f'captions.md: {n}-year warranty, config says {b.WARRANTY_YEARS}')
    if b.PHONE not in caps or b.EMAIL not in caps:
        problems.append('captions.md: contact details missing')
    if 'Euxora' not in caps and b.COMPANY != b.BRAND:
        problems.append('captions.md: seller name missing')
    # ---- captions and ad copy ------------------------------------------------------------------------
    for spec in list(c.POSTS) + list(c.REELS):
        cap = spec['caption'] + '\n' + c.HASHTAGS
        tags = re.findall(r'#\w+', cap)
        if len(tags) > S.MAX_HASHTAGS:
            problems.append(f"{spec['id']}: {len(tags)} hashtags (Instagram allows {S.MAX_HASHTAGS})")
        if len(cap) > S.CAPTION_MAX:
            problems.append(f"{spec['id']}: caption is {len(cap)} characters (limit {S.CAPTION_MAX})")
    for key, (pt, hl, ds) in c.ADS.items():
        for label, val, lim in (('primary text', pt, S.AD_PRIMARY_MAX), ('headline', hl, S.AD_HEADLINE_MAX), ('description', ds, S.AD_DESCRIPTION_MAX)):
            if len(val) > lim:
                problems.append(f'ads {key}: {label} is {len(val)} characters (recommended limit {lim})')
            for pat, why in FORBIDDEN:
                if re.search(pat, val, re.I):
                    problems.append(f'ads {key}: {label} contains {why}')
    ads_md = (HERE / 'ads.md').read_text(encoding='utf8')
    if any(ord(ch) > 126 for ch in ads_md):
        problems.append('ads.md: non-keyboard characters')

    # ---- images ----------------------------------------------------------------------------------------
    from PIL import Image
    import posts as P
    if P.M < S.POST_MIN_MARGIN or P.M < S.GRID_SIDE_CROP:
        problems.append(f'posts: side margin {P.M}px is inside the Instagram grid crop ({S.GRID_SIDE_CROP}px)')
    n_img = 0
    for spec in c.POSTS:
        f = HERE / 'posts' / f"{spec['id']}.png"
        if not f.exists():
            problems.append(f'posts: {f.name} missing'); continue
        im = Image.open(f)
        n_img += 1
        if im.size != S.POST_SIZE:
            problems.append(f'{f.name}: {im.size[0]}x{im.size[1]}, needs {S.POST_SIZE[0]}x{S.POST_SIZE[1]} (4:5)')
        if im.format not in S.POST_FORMATS:
            problems.append(f'{f.name}: format {im.format}')
        if im.mode != 'RGB':
            problems.append(f'{f.name}: colour mode {im.mode}, needs RGB without transparency')
        if f.stat().st_size > S.IMAGE_MAX_BYTES:
            problems.append(f'{f.name}: {f.stat().st_size / 1e6:.1f} MB (limit 30 MB)')

    # ---- Meta ad images (meta_ads/) ---------------------------------------------------------------------
    import meta_ads as M
    n_ads = 0
    ids = [cr[0] for cr in M.CREATIVES]
    for cid, head, sub, pt, hl, ds in M.CREATIVES:
        for label, val, lim in (('primary text', pt, S.AD_PRIMARY_MAX), ('headline', hl, S.AD_HEADLINE_MAX), ('description', ds, S.AD_DESCRIPTION_MAX)):
            if len(val) > lim:
                problems.append(f'meta_ads {cid}: {label} is {len(val)} characters (recommended limit {lim})')
        for val in (pt, hl, ds, sub, *head):
            for pat, why in FORBIDDEN:
                if re.search(pat, val, re.I):
                    problems.append(f'meta_ads {cid}: "{val}" contains {why}')
    readme = (HERE / 'meta_ads' / 'README.md')
    if not readme.exists():
        problems.append('meta_ads/README.md missing')
    else:
        rt = readme.read_text(encoding='utf8')
        if any(ord(ch) > 126 for ch in rt):
            problems.append('meta_ads/README.md: non-keyboard characters')
        for pat, why in FORBIDDEN:
            for m in re.finditer(pat, rt, re.I):
                problems.append(f'meta_ads/README.md: "{m.group(0)}" ({why})')
    for folder, size in S.AD_IMAGE_SIZES.items():
        for cid in ids:
            f = HERE / 'meta_ads' / folder / f'{cid}.png'
            if not f.exists():
                problems.append(f'meta_ads/{folder}/{cid}.png missing'); continue
            n_ads += 1
            im = Image.open(f)
            nm = f'meta_ads/{folder}/{cid}.png'
            if im.size != size:
                problems.append(f'{nm}: {im.size[0]}x{im.size[1]}, needs {size[0]}x{size[1]}')
            if im.mode != 'RGB' or im.format not in S.POST_FORMATS:
                problems.append(f'{nm}: needs RGB PNG or JPEG without transparency, got {im.format} {im.mode}')
            if f.stat().st_size > S.IMAGE_MAX_BYTES:
                problems.append(f'{nm}: {f.stat().st_size / 1e6:.1f} MB (limit 30 MB)')
            g = im.convert('L')
            Wd, Hd = im.size
            m = S.AD_IMAGE_MARGIN
            edges = [(0, 0, m, Hd), (Wd - m, 0, Wd, Hd)]
            if folder.startswith('story'):
                edges += [(0, 0, Wd, S.SAFE_ADS[0]), (0, S.SAFE_ADS[1], Wd, Hd), (0, 0, S.ADS_SIDE_MARGIN, Hd), (Wd - S.ADS_SIDE_MARGIN, 0, Wd, Hd)]
            for bx in edges:
                if g.crop(bx).getextrema()[1] > S.DARK:
                    problems.append(f'{nm}: content found outside the safe area {bx}'); break

    # ---- video -----------------------------------------------------------------------------------------
    def probe(path):
        out = subprocess.run(['ffprobe', '-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', str(path)], capture_output=True, text=True, check=True).stdout
        return json.loads(out)

    def bright_outside(path, top, bottom, sides=0, fps=2):
        """Largest brightness found outside the safe band (and side margins) across sampled frames."""
        W, H = S.VIDEO_SIZE
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-vf', f'fps={fps},format=gray', '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
        size = W * H
        worst = 0
        for k in range(len(raw) // size):
            fr = Image.frombytes('L', (W, H), raw[k * size:(k + 1) * size])
            boxes = [(0, 0, W, top), (0, bottom, W, H)]
            if sides:
                boxes += [(0, top, sides, bottom), (W - sides, top, W, bottom)]
            for bx in boxes:
                worst = max(worst, fr.crop(bx).getextrema()[1])
        return worst

    def measure(path, pre=''):
        err = subprocess.run(['ffmpeg', '-v', 'info', '-i', str(path), '-af', f'{pre}ebur128=peak=true', '-vn', '-f', 'null', '-'], capture_output=True, text=True).stderr
        i = float(re.findall(r'\n\s+I:\s+(-?[\d.]+) LUFS', err)[-1])
        pk = float(re.findall(r'\n\s+Peak:\s+(-?[\d.]+) dBFS', err)[-1])
        return i, pk

    def silence(path):
        err = subprocess.run(['ffmpeg', '-v', 'info', '-i', str(path), '-af', 'silencedetect=n=-50dB:d=0.5', '-vn', '-f', 'null', '-'], capture_output=True, text=True).stderr
        return [float(x) for x in re.findall(r'silence_start: (-?[\d.]+)', err)]

    # picture and sound lock: every tap, tick, chime and scene cut sits on the quarter-beat grid
    import reel, reel2, video
    q = video.BEAT / 4
    for mod in (reel, reel2):
        for tt, kind in mod.EVENTS:
            if kind != 'whoosh' and abs(tt / q - round(tt / q)) * q > S.AUDIO_SYNC_TOLERANCE:
                problems.append(f'{mod.__name__}: {kind} at {tt:.3f}s is off the beat grid')
        for st in mod.START:
            if abs(st / q - round(st / q)) * q > S.AUDIO_SYNC_TOLERANCE:
                problems.append(f'{mod.__name__}: scene starts at {st:.3f}s, off the beat grid')

    n_vid = 0
    for r in c.REELS:
        d = HERE / 'reels' / r['id']
        for mode in ('organic', 'ads'):
            f = d / f"{r['id']}-{mode}.mp4"
            if not f.exists():
                problems.append(f'reels: {f.name} missing'); continue
            n_vid += 1
            info = probe(f)
            v = next((x for x in info['streams'] if x['codec_type'] == 'video'), None)
            a = next((x for x in info['streams'] if x['codec_type'] == 'audio'), None)
            nm = f.name
            if not v:
                problems.append(f'{nm}: no video stream'); continue
            if (v['width'], v['height']) != S.VIDEO_SIZE:
                problems.append(f"{nm}: {v['width']}x{v['height']}, needs {S.VIDEO_SIZE[0]}x{S.VIDEO_SIZE[1]} (9:16)")
            num, den = v['r_frame_rate'].split('/')
            if round(int(num) / int(den)) != S.VIDEO_FPS:
                problems.append(f"{nm}: {v['r_frame_rate']} fps, needs {S.VIDEO_FPS}")
            if v['codec_name'] != 'h264' or v.get('profile') != 'High' or v['pix_fmt'] != 'yuv420p':
                problems.append(f"{nm}: needs H.264 High yuv420p, got {v['codec_name']} {v.get('profile')} {v['pix_fmt']}")
            if v.get('color_space') != 'bt709':
                problems.append(f"{nm}: colour space {v.get('color_space')}, needs bt709")
            dur = float(info['format']['duration'])
            if not S.VIDEO_SECONDS[0] <= dur <= S.VIDEO_SECONDS[1]:
                problems.append(f'{nm}: {dur:.1f}s, expected about 30s')
            if int(info['format']['size']) > S.VIDEO_MAX_BYTES:
                problems.append(f'{nm}: file too large')
            if not a:
                problems.append(f'{nm}: no audio track (Meta recommends AAC audio)')
            else:
                if a['codec_name'] != 'aac' or int(a.get('bit_rate', 0)) < S.AUDIO_MIN_KBPS * 1000 or a.get('channels', 0) < 2:
                    problems.append(f"{nm}: audio needs AAC stereo at {S.AUDIO_MIN_KBPS} kbps or more, got {a['codec_name']} {a.get('bit_rate')} {a.get('channels')}ch")
            if a:
                if abs(float(a['duration']) - float(v['duration'])) > 0.1:
                    problems.append(f"{nm}: audio is {a['duration']}s but video is {v['duration']}s")
                lufs, peak = measure(f)
                if not S.AUDIO_LUFS[0] <= lufs <= S.AUDIO_LUFS[1]:
                    problems.append(f'{nm}: loudness {lufs:.1f} LUFS, expected {S.AUDIO_LUFS[0]} to {S.AUDIO_LUFS[1]}')
                if peak > S.AUDIO_MAX_PEAK:
                    problems.append(f'{nm}: peak {peak:.1f} dBFS, would clip (limit {S.AUDIO_MAX_PEAK})')
                hp, _ = measure(f, 'highpass=f=300,')
                if hp < S.AUDIO_PRESENCE_MIN:
                    problems.append(f'{nm}: only {hp:.1f} LUFS above 300 Hz. It is a low hum that phone speakers cannot play (needs {S.AUDIO_PRESENCE_MIN} or more)')
                gaps = silence(f)
                if gaps:
                    problems.append(f'{nm}: silent for 0.5s or more at {gaps[:3]}')
            head = f.read_bytes()[:200000]
            if head.find(b'moov') == -1 or (head.find(b'mdat') != -1 and head.find(b'mdat') < head.find(b'moov')):
                problems.append(f'{nm}: not optimised for streaming (moov atom is not at the start)')
            top, bottom = S.SAFE_ORGANIC if mode == 'organic' else S.SAFE_ADS
            worst = bright_outside(f, top, bottom, S.ADS_SIDE_MARGIN if mode == 'ads' else 0)
            if worst > S.DARK:
                problems.append(f'{nm}: content found outside the safe zone y={top}..{bottom}' + (f' / {S.ADS_SIDE_MARGIN}px sides' if mode == 'ads' else '') + f' (brightness {worst})')
        cover = d / f"{r['id']}-cover.jpg"
        if not cover.exists():
            problems.append(f"{cover.name} missing")
        else:
            ci = Image.open(cover)
            if ci.size != S.VIDEO_SIZE:
                problems.append(f'{cover.name}: {ci.size}, needs {S.VIDEO_SIZE}')
            g = ci.convert('L')
            if max(g.crop((0, 0, 1080, S.COVER_VISIBLE[0])).getextrema()[1], g.crop((0, S.COVER_VISIBLE[1], 1080, 1920)).getextrema()[1]) > S.DARK:
                problems.append(f'{cover.name}: text sits outside the part of the cover the feed shows (y={S.COVER_VISIBLE[0]}..{S.COVER_VISIBLE[1]})')

    if problems:
        print('MARKETING CHECK FAILED:')
        print('\n'.join(' - ' + p for p in sorted(set(problems))))
        sys.exit(1)
    print(f'MARKETING CHECK OK: {n_img} posts, {n_ads} Meta ad images and {n_vid} videos meet the platform specs (sizes, formats, safe zones, audio, hashtags, ad copy limits). '
          f'Wording: no prices, no supplier details, no unsupported claims, ASCII only. {c.N_SIZES} sizes, {c.N_LAYOUTS} layouts per series, {b.WARRANTY_YEARS}-year warranty match the data.')


if __name__ == '__main__':
    main()
