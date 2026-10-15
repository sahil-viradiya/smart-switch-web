"""
Two voice-led video ads (1080x1920, 30 fps, about 30 s) for Meta: a spoken voice-over, big captions, a calm music bed
that dips under the voice. They are drawn for the AD safe zone (y=270..1248, with side margins) from the start, so one
file works for Reels and Stories ads and for organic posting. No music-only film: the voice carries the message.

  voice-1-one-touch   For homeowners. Hook, one touch panel, what it controls, sizes and looks, how to control it,
                      the warranty and the electrician, then WhatsApp.
  voice-2-how-to-buy  For people who are interested but unsure. Four plain steps from "message us" to "your
                      electrician fits it", the written quote, the warranty, who sells it and where.

Everything said and shown is in claims.md. The scripts are the SCRIPT lists below (also written to
meta_ads/videos/voiceover-scripts.md). To use a real voice, see voice.py. The brand name is not spoken, only shown,
because a computer voice cannot be trusted to pronounce it.
"""
import math
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw

import brand as b
import content as c
import lit
import music
import video
import voice
from brand import BLACK, CARD, GOLD, GOLD_LIGHT, IVORY, font, paste, rgba, rounded
from reel import T, lines, prog, rise
from reel2 import finger, ripple

W, H, XF, M = 1080, 1920, 0.4, 80
BEAT = video.BEAT
ease = video.ease
TOP, BOT = 300, 1226                       # content band, inside the ad safe zone (270..1248)
OUT = Path(__file__).resolve().parent / 'meta_ads' / 'videos'

SCRIPT_ONE = [
    'A wall full of switches?',
    'Replace them with one touch panel, in glass or acrylic.',
    'Lights, fan, curtains, dimmers and sockets, all in one matching style.',
    'Six sizes, two series. Pick the look that suits your home.',
    'Control it by touch, the app, your voice, or a remote.',
    'A ten year warranty, and your own licensed electrician fits it.',
    'Message us on WhatsApp for a written quote.',
]
SCRIPT_TWO = [
    'Want it in your home? Here is how it works.',
    'One. Message us on WhatsApp with your room details.',
    'Two. We suggest the series, size and layout.',
    'Three. You get a written quote, with delivery and warranty terms.',
    'Four. Your licensed electrician fits it.',
    'A ten year warranty on the panels. Based in Ahmedabad.',
    'Message us on WhatsApp today.',
]


# ---- drawing helpers -------------------------------------------------------------------------------------
def band_bg(gy=0.42, r=0.62):
    return video.base(gy, r)


def head(img, txt_lines, t, y=TOP, size=92, start=0.15):
    for k, ln in enumerate(txt_lines):
        rise(img, T(ln, 300, size, rgba(IVORY, 1 if k == 0 else 0.55)), M, y + k * int(size * 1.1), t, start + 0.18 * k)


def caption(img, txt, t, start=0.5):
    """The spoken line, as a big caption at the bottom of the content band."""
    f = font(500, 46)
    rows = b.wrap(txt, f, W - 2 * M)
    y = BOT - len(rows) * 58
    for i, ln in enumerate(rows):
        rise(img, T(ln, 500, 46, rgba(IVORY, 0.95)), M, y + i * 58, t, start + 0.1 * i, dist=24)


def tag(img, txt, t, y=TOP - 8):
    p = prog(t, 0.05, 0.5)
    if p > 0:
        img.alpha_composite(Image.new('RGBA', (int(44 * p), 2), rgba(GOLD)), (M, y + 13))
        paste(img, T(txt.upper(), 600, 24, rgba(GOLD), 6), (M + 62, y), p)


def lit_panel(series, pid, width, t, t_tap, tap, start=0.0):
    lp = lit.get(series, pid, width)
    n = len(lp.icons)
    tx, ty = lp.icons[tap].cx, lp.icons[tap].cy
    order = sorted(range(n), key=lambda i: (lp.icons[i].cx - tx) ** 2 + (lp.icons[i].cy - ty) ** 2)
    rank = {i: r for r, i in enumerate(order)}
    levels = [ease((t - (t_tap + 0.12 * rank[i])) / 0.35) for i in range(n)]
    return lp, lp.render(levels)


def plate(size, angle=0, on=False):
    """A generic old-style switch plate (a drawing, not a product)."""
    S = 3
    lay = Image.new('RGBA', (size * S, size * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    d.rounded_rectangle((4, 4, size * S - 5, size * S - 5), 22 * S // 2, fill=(205, 203, 196, 255), outline=(150, 148, 140, 255), width=4)
    cx, cy, w, h = size * S // 2, size * S // 2, size * S * 0.20, size * S * 0.36
    d.rounded_rectangle((cx - w, cy - h, cx + w, cy + h), 10 * S, fill=(120, 118, 112, 255))
    d.rounded_rectangle((cx - w + 8, cy - h + (h * 0.1 if on else h * 1.0), cx + w - 8, cy + (h - 10 if not on else h * 0.1)), 8 * S, fill=(235, 233, 226, 255))
    lay = lay.resize((size, size), Image.LANCZOS)
    return lay.rotate(angle, expand=True, resample=Image.BICUBIC)


# ---- scenes: factories return t -> RGBA frame --------------------------------------------------------------
def hook_switches(cap, ctx):
    spots = [(110, 640, -3, 230), (370, 680, 2, 240), (640, 630, -2, 220), (150, 900, 3, 235), (440, 930, -3, 235), (720, 890, 2, 235)]

    def scene(t):
        img = band_bg(0.45, 0.5)
        tag(img, 'Smart touch switches', t)
        head(img, ['A wall full', 'of switches?'], t)
        for i, (x, y, a, s) in enumerate(spots):
            p = prog(t, 0.3 + 0.1 * i, 0.4)
            if p > 0:
                paste(img, plate(s, a), (x, y + (1 - p) * 30), p)
        return img
    return scene


def one_panel(cap, ctx):
    series, pid, tap = 'color', '8m-6-switch-1-fan', 4
    lp = lit.get(series, pid, 940)

    def scene(t):
        img = band_bg(0.5, 0.62)
        tag(img, 'One touch panel', t)
        head(img, ['One panel.', 'One touch.'], t)
        t_tap = 1.4
        _, lay = lit_panel(series, pid, 940, t, t_tap, tap)
        p = prog(t, 0.3, 0.7)
        ox, oy = W // 2 - lay.width // 2, 780 - lay.height // 2 + (1 - p) * 40
        paste(img, lay, (ox, oy), p)
        fx, fy = ox + lp.center(tap)[0], oy + lp.center(tap)[1]
        a = ease((t - 0.7) / 0.4) * (1 - ease((t - (t_tap + 0.9)) / 0.5))
        if a > 0.01:
            g = ease((t - 0.8) / 0.6)
            f = finger(1.0, max(0.0, 1 - abs(t - (t_tap + 0.08)) / 0.14))
            paste(img, f, (fx + 300 * (1 - g) - f.width / 2, fy + 110 * (1 - g) - f.height / 2), a)
        rp = ripple(t_tap, t)
        if rp is not None:
            paste(img, rp, (fx - rp.width / 2, fy - rp.height / 2))
        caption(img, cap, t, 0.6)
        return img
    return scene


def cards_scene(title, items, tagtxt):
    """3x2 grid of panel cards that pop in one by one."""
    def factory(cap, ctx):
        def scene(t):
            img = band_bg(0.5, 0.6)
            tag(img, tagtxt, t)
            head(img, title, t, size=84)
            cw, ch, gap = 290, 262, 25
            x0 = (W - (3 * cw + 2 * gap)) // 2
            for i, (series, pid, label) in enumerate(items):
                p = prog(t, 0.45 + 0.28 * i, 0.5)
                if p <= 0:
                    continue
                x, y = x0 + (i % 3) * (cw + gap), 560 + (i // 3) * (ch + gap) + (1 - p) * 24
                card = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
                rounded(card, (0, 0, cw, ch), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.45), width=2)
                src = b._render(series, pid)
                lay = b.panel(series, pid, 560, shadow=False).crop((70, 70, 630, int(70 + 560 * src.height / src.width)))
                s = min((cw - 50) / lay.width, (ch - 78) / lay.height)
                lay = lay.resize((int(lay.width * s), int(lay.height * s)), Image.LANCZOS)
                paste(card, lay, ((cw - lay.width) // 2, 18 + (ch - 78 - lay.height) // 2))
                paste(card, T(label, 500, 30, rgba(GOLD)), (cw // 2, ch - 52), anchor='m')
                paste(img, card, (x, y), p)
            caption(img, cap, t, 0.5)
            return img
        return scene
    return factory


def looks_sizes(cap, ctx):
    def scene(t):
        img = band_bg(0.5, 0.6)
        tag(img, 'Two series', t)
        head(img, ['Pick your look.'], t)
        for k, (cx, series, pid, name, sub) in enumerate(((290, 'color', '4m-4-switch-1-fan', 'COLOR', 'Backlit icons'), (790, 'edge', '4m-4-switch', 'EDGE', 'Round touch points'))):
            p = prog(t, 0.35 + 0.25 * k, 0.6)
            if p <= 0:
                continue
            lay = b.panel(series, pid, 430)
            paste(img, lay, (cx - lay.width // 2, 700 - lay.height // 2 + (1 - p) * 40), p)
            paste(img, T(name, 600, 32, rgba(GOLD), 8), (cx, 880), p, 'm')
            paste(img, T(sub, 400, 28, rgba(IVORY, 0.8)), (cx, 928), p, 'm')
        for i, m in enumerate(b.MODULES):
            p = prog(t, 1.2 + 0.18 * i, 0.4)
            if p <= 0:
                continue
            cw, gap = 138, 14
            x = (W - (6 * cw + 5 * gap)) // 2 + i * (cw + gap)
            chip = Image.new('RGBA', (cw, 84), (0, 0, 0, 0))
            rounded(chip, (0, 0, cw, 84), 12, fill=rgba(CARD), outline=rgba(GOLD, 0.5), width=2)
            paste(chip, T(m, 600, 34, rgba(GOLD)), (cw // 2, 18), anchor='m')
            paste(img, chip, (x, 1000 + (1 - p) * 16), p)
        caption(img, cap, t, 0.5)
        return img
    return scene


def four_ways(cap, ctx):
    tiles = [('touch', 'Touch'), ('app', 'App'), ('voice', 'Voice'), ('remote', 'Remote')]

    def scene(t):
        img = band_bg(0.5, 0.6)
        tag(img, 'Four ways to control', t)
        head(img, ['Control it', 'your way.'], t)
        tw, th, gap = 440, 250, 24
        for i, (ic, name) in enumerate(tiles):
            t0 = 0.7 + 0.75 * i
            p = prog(t, t0 - 0.2, 0.45)
            if p <= 0:
                continue
            x, y = M + (i % 2) * (tw + gap), 590 + (i // 2) * (th + gap) + (1 - p) * 26
            lit_amt = ease((t - t0) / 0.4)
            card = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
            rounded(card, (0, 0, tw, th), 16, fill=rgba(CARD), outline=rgba(GOLD, 0.25 + 0.6 * lit_amt), width=2)
            paste(card, b.icon(ic, 104, b.mix(IVORY, GOLD, lit_amt)), (36, (th - 104) // 2))
            paste(card, T(name, 500, 48, rgba(IVORY, 0.7 + 0.3 * lit_amt)), (170, (th - 60) // 2))
            paste(img, card, (x, y), p)
            rp = ripple(t0, t)
            if rp is not None:
                paste(img, rp, (x + 88 - rp.width / 2, y + th / 2 - rp.height / 2), 0.8)
        caption(img, cap, t, 0.5)
        return img
    return scene


def trust_warranty(cap, ctx):
    def scene(t):
        img = band_bg(0.45, 0.62)
        tag(img, 'Built to last', t)
        for k in range(3):
            d = ((t * 0.4 + k / 3) % 1.0)
            R = int(120 + 520 * d)
            ring = Image.new('RGBA', (R * 2 + 8, R * 2 + 8), (0, 0, 0, 0))
            ImageDraw.Draw(ring).ellipse((4, 4, R * 2 + 4, R * 2 + 4), outline=(*GOLD, int(100 * (1 - d))), width=3)
            paste(img, ring, (W // 2 - ring.width // 2, 640 - ring.height // 2))
        rise(img, T(f'{b.WARRANTY_YEARS}-year', 300, 190, rgba(GOLD)), W // 2, 440, t, 0.2, 'm')
        rise(img, T('warranty', 300, 150, rgba(IVORY)), W // 2, 640, t, 0.4, 'm')
        for k, (l1, l2, icon_name, t0) in enumerate((('Fitted by your own', 'licensed electrician', 'check', 1.3), (f'Sold by {b.COMPANY}', 'Ahmedabad, Gujarat', 'check', 1.8))):
            p = prog(t, t0, 0.6)
            if p > 0:
                row = Image.new('RGBA', (W - 2 * M, 140), (0, 0, 0, 0))
                rounded(row, (0, 0, row.width, 140), 16, fill=rgba(CARD), outline=rgba(GOLD, 0.5), width=2)
                paste(row, b.icon(icon_name, 64, GOLD), (36, 38))
                paste(row, T(l1, 500, 36, rgba(IVORY)), (136, 24))
                paste(row, T(l2, 500, 36, rgba(IVORY, 0.8)), (136, 72))
                paste(img, row, (M, 840 + k * 160 + (1 - p) * 24), p)
        rise(img, T('Warranty terms are confirmed in writing when you order.', 400, 26, rgba(IVORY, 0.7)), M, 1170, t, 2.3)
        return img
    return scene


def cta(cap, ctx):
    lp = lit.get('edge', '4m-4-switch', 560)

    def scene(t):
        img = band_bg(0.3, 0.6)
        lay = lp.render([ease((t - 0.2 - 0.12 * i) / 0.4) for i in range(len(lp.icons))])
        p = prog(t, 0.0, 0.8)
        paste(img, lay, (W // 2 - lay.width // 2, 520 - lay.height // 2 + (1 - p) * 40), p)
        rise(img, T('Message us on', 300, 84, rgba(IVORY)), M, 700, t, 0.4)
        rise(img, T('WhatsApp.', 300, 112, rgba(GOLD)), M, 790, t, 0.55)
        p2 = prog(t, 1.0, 0.6)
        if p2 > 0:
            lay2 = Image.new('RGBA', (W, 130), (0, 0, 0, 0))
            b.pill_button(lay2, (M, 10), b.PHONE, font(600, 52), anchor='l', pad=(52, 30))
            paste(img, lay2, (0, 930 + (1 - p2) * 30), p2)
        rise(img, T(b.EMAIL, 400, 38, rgba(IVORY, 0.9)), M, 1086, t, 1.3)
        p3 = prog(t, 1.6, 0.6)
        if p3 > 0:
            b.logo_lockup(img, (M, 1128), 0.7, p3)
        rise(img, T(b.ADDRESS_ONE_LINE, 400, 24, rgba(IVORY, 0.8)), M, 1196, t, 1.9)
        return img
    return scene


def step(n, title, art):
    """One of the four buying steps: a big number, an illustration and the line that is spoken."""
    def factory(cap, ctx):
        def scene(t):
            img = band_bg(0.45, 0.6)
            tag(img, 'How to buy', t)
            for i in range(4):
                p = prog(t, 0.1 + 0.08 * i, 0.4)
                if p > 0:
                    dot = Image.new('RGBA', (34, 34), (0, 0, 0, 0))
                    ImageDraw.Draw(dot).ellipse((1, 1, 32, 32), fill=rgba(GOLD, 0.95 if i + 1 <= n else 0.2))
                    paste(img, dot, (M + 4 + i * 56, TOP + 48), p)
            rise(img, T(str(n), 300, 320, rgba(GOLD)), M - 6, TOP + 70, t, 0.15)
            for k, ln in enumerate(title):
                rise(img, T(ln, 300, 82, rgba(IVORY, 1 if k == 0 else 0.7)), M + 230, TOP + 150 + k * 92, t, 0.3 + 0.15 * k)
            art(img, t)
            caption(img, cap, t, 0.7)
            return img
        return scene
    return factory


def art_chat(img, t):
    p = prog(t, 0.5, 0.7)
    if p <= 0:
        return
    paste(img, b.icon('chat', 300, GOLD), (W // 2 - 150, 720 + (1 - p) * 30), p)
    paste(img, T(b.PHONE, 600, 54, rgba(IVORY)), (W // 2, 1040), p, 'm')


def art_pair(img, t):
    for k, (cx, series, pid, name) in enumerate(((290, 'color', '4m-4-switch-1-fan', 'COLOR'), (790, 'edge', '4m-4-switch', 'EDGE'))):
        p = prog(t, 0.5 + 0.25 * k, 0.6)
        if p <= 0:
            continue
        lay = b.panel(series, pid, 430)
        paste(img, lay, (cx - lay.width // 2, 850 - lay.height // 2 + (1 - p) * 30), p)
        paste(img, T(name, 600, 30, rgba(GOLD), 8), (cx, 1000), p, 'm')


def art_quote(img, t):
    p = prog(t, 0.5, 0.7)
    if p <= 0:
        return
    paste(img, b.icon('doc', 250, GOLD), (110, 730 + (1 - p) * 30), p)
    for i, ln in enumerate(['Your panels', 'Delivery terms', 'Warranty terms']):
        pi = prog(t, 0.9 + 0.35 * i, 0.5)
        if pi > 0:
            paste(img, b.icon('check', 54, GOLD), (440, 760 + i * 100 + (1 - pi) * 16), pi)
            paste(img, T(ln, 500, 46, rgba(IVORY)), (520, 760 + i * 100 + (1 - pi) * 16), pi)


def art_fit(img, t):
    from reel2 import room_card
    p = prog(t, 0.4, 0.7)
    if p > 0:
        paste(img, room_card('living', t, 1.0, w=920, h=430), (M, 690 + (1 - p) * 30), p)


# ---- the two films ---------------------------------------------------------------------------------------------
KINDS_ITEMS = [('color', b.KINDS[k][1], b.KINDS[k][0]) for k in ('socket', 'scene', 'curtain', 'dimmer', 'usb', 'doorbell')]
VIDEOS = [
    {'id': 'voice-1-one-touch', 'utm': 'voice1', 'intent': 'homeowner', 'script': SCRIPT_ONE,
     'scenes': [hook_switches, one_panel, cards_scene(['More than', 'switches.'], KINDS_ITEMS, 'The range'), looks_sizes, four_ways, trust_warranty, cta],
     'ad': ('Tired of a wall full of switches? One touch panel for lights, fans, curtains and sockets. Message us for a written quote.', 'One panel for your wall', 'Message us for a quote'),
     'caption': f"A wall full of switches? Replace them with one touch panel, in glass or acrylic. Lights, fan, curtains, dimmers and sockets in one matching style, in {c.N_SIZES} sizes and two series. Control it by touch, the app, your voice or a remote. A {c.WARRANTY}, fitted by your own licensed electrician.\n\nMessage us on WhatsApp {b.PHONE} for a written quote. {c.WARRANTY_NOTE} {c.SOLD_BY}\n\n{c.MARKS}"},
    {'id': 'voice-2-how-to-buy', 'utm': 'voice2', 'intent': 'homeowner', 'script': SCRIPT_TWO,
     'scenes': [None, step(1, ['Message us', 'on WhatsApp'], art_chat), step(2, ['We suggest', 'your layout'], art_pair), step(3, ['A written', 'quote'], art_quote), step(4, ['Your electrician', 'fits it'], art_fit), trust_warranty, cta],
     'ad': ('How buying works: message us on WhatsApp, get a written quote, and your licensed electrician fits it. 10-year warranty.', 'How to buy, step by step', 'Message us on WhatsApp'),
     'caption': f"Want it in your home? Four steps: 1) message us on WhatsApp with your room details, 2) we suggest the series, size and layout, 3) you get a written quote with delivery and warranty terms, 4) your licensed electrician fits it. A {c.WARRANTY} on the panels.\n\nWhatsApp {b.PHONE}, or email {b.EMAIL}. {c.WARRANTY_NOTE} {c.SOLD_BY}"},
]


def hook_buy(cap, ctx):
    lp = lit.get('color', '4m-4-switch-1-fan', 780)

    def scene(t):
        img = band_bg(0.5, 0.62)
        tag(img, 'Smart touch switches', t)
        head(img, ['Want it in', 'your home?'], t)
        lay = lp.render([ease((t - 0.8 - 0.14 * i) / 0.4) for i in range(len(lp.icons))])
        p = prog(t, 0.3, 0.8)
        paste(img, lay, (W // 2 - lay.width // 2, 800 - lay.height // 2 + (1 - p) * 40), p)
        caption(img, cap, t, 0.6)
        return img
    return scene


VIDEOS[1]['scenes'][0] = hook_buy


def plan(spec, workdir):
    """Voice clips -> scene lengths in beats (always 48 beats = 30 s) -> start times."""
    n = len(spec['script'])
    clips = voice.prepare(spec['id'], spec['script'], workdir, max_seconds=24.0)
    beats = [max(4, math.ceil((cl[1] + 0.35 + 0.45) / BEAT)) for cl in clips]
    extra = 48 - sum(beats)
    if extra < 0:
        raise SystemExit(f"{spec['id']}: the voice-over needs {sum(beats) * BEAT:.1f}s, more than 30s. Shorten the script.")
    # spread any spare time over the scenes that carry pictures (not the first), the last one gets the rest
    take = min(extra, 6)             # let the last scene (the contact details) stay on screen longest
    beats[-1] += take
    extra -= take
    k = 0
    while extra > 0:
        beats[1 + k % (n - 2)] += 1
        extra -= 1
        k += 1
    dur = [k * BEAT for k in beats]
    start = [sum(dur[:k]) for k in range(n)]
    return clips, dur, start


def build_one(spec):
    OUT.mkdir(parents=True, exist_ok=True)
    video.MODE[0] = 'organic'  # drawn directly inside the ad safe zone, so no rescaling is needed
    with tempfile.TemporaryDirectory() as tmp:
        clips, dur, start = plan(spec, tmp)
        scenes = [mk(line, None) for mk, line in zip(spec['scenes'], spec['script'])]
        events = [(start[k], 'whoosh') for k in range(1, len(start))]
        place = [(start[k] + 0.30, clips[k][0]) for k in range(len(clips))]
        wav = voice.mix(sum(dur), place, events, Path(tmp) / 'mix.wav')
        out = OUT / f"{spec['id']}.mp4"
        video.encode(out, lambda t: video.frame_at(scenes, start, XF, t), sum(dur), events, audio=wav)
        video.frame_at(scenes, start, XF, start[2] + 2.2).save(OUT / f"{spec['id']}-cover.jpg", quality=92)
    return clips, dur


def write_scripts(info):
    rows = ['# Voice-over scripts\n',
            'One line per scene. The computer voice reads them today. To use a real voice, record each line on a phone in a quiet room, name the files `1.m4a`, `2.m4a` and so on, put them in `marketing/voice/<video id>/`, and run `python marketing/build.py ads-video`. Keep each line about as long as the time shown.\n',
            'The brand name is not spoken on purpose (a computer voice may mispronounce it). If you record the lines yourself, you may add "Euxora Digital" in the last line.\n']
    for spec in VIDEOS:
        clips, dur = info[spec['id']]
        rows += [f"\n## {spec['id']}\n", '| Scene | Say | Time |', '| --- | --- | --- |']
        for k, line in enumerate(spec['script'], 1):
            rows.append(f'| {k} | {line} | {dur[k - 1]:.1f} s |')
        rows += ['', f"Ad copy (primary text | headline | description): {spec['ad'][0]} | {spec['ad'][1]} | {spec['ad'][2]}", '', 'Caption for the post:', '```', spec['caption'], '```', '']
    (OUT / 'voiceover-scripts.md').write_text('\n'.join(rows), encoding='utf8')


def build():
    info = {spec['id']: build_one(spec) for spec in VIDEOS}
    write_scripts(info)
