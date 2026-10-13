"""
30-second vertical reel (1080x1920, 30 fps, silent), rendered frame by frame with Pillow and encoded by ffmpeg.

Layout keeps text out of the top ~250px and bottom ~340px, which Instagram/Reels cover with their own
buttons and caption. The film is silent on purpose: add music from the app you publish in (licensed
audio is not something we can ship). Everything on screen is built from the website's own panel
renders and room photos.
"""
from functools import lru_cache
from PIL import Image
import brand as b
import content as c
import video
from brand import GOLD, IVORY, BLACK, CARD, font, paste, rgba, rounded

W, H, FPS, XF = 1080, 1920, 30, 0.45
M = 80
BEAT = video.BEAT
DUR = [6 * BEAT, 6 * BEAT, 8 * BEAT, 8 * BEAT, 8 * BEAT, 6 * BEAT, 6 * BEAT]  # scene lengths in beats (48 beats = 30 s)
assert abs(sum(DUR) - 30.0) < 1e-6
START = [sum(DUR[:i]) for i in range(len(DUR))]


ease = video.ease


def prog(t, start, dur=0.7):
    return ease((t - start) / dur)


@lru_cache(maxsize=None)
def T(txt, weight, size, fill, tracking=0):
    return b.text_layer(txt, font(weight, size), fill, tracking)


def rise(img, layer, x, y, t, start, anchor='l', dist=44, dur=0.7):
    """Fade a layer in while it slides up into place."""
    p = prog(t, start, dur)
    if p > 0:
        paste(img, layer, (x, y + (1 - p) * dist), p, anchor)


def lines(img, txt, weight, size, fill, x, y, gap, t, start, width=920, anchor='l', step=0.12):
    f = font(weight, size)
    for i, ln in enumerate(b.wrap(txt, f, width)):
        rise(img, T(ln, weight, size, fill), x, y + i * gap, t, start + i * step, anchor)


def eyebrow(img, txt, y, t, start=0.1):
    p = prog(t, start, 0.6)
    if p > 0:
        img.alpha_composite(Image.new('RGBA', (int(44 * p), 2), rgba(GOLD)), (M, y + 13))
        paste(img, T(txt.upper(), 600, 24, rgba(GOLD), 6), (M + 62, y), p)


def mark(img, t, start=0.3):
    p = prog(t, start, 0.6)
    if p > 0:
        b.logo_lockup(img, (M, 1500), 0.8, p)


@lru_cache(maxsize=None)
def bare_panel(series, pid, width):
    lay = b.panel(series, pid, width, shadow=False)
    return lay.crop((70, 70, lay.width - 70, lay.height - 70))


# ---- scenes: each returns an RGBA frame for local time t (seconds) --------------------------------------
def s1(t):
    img = video.base()
    z = 1.0 + 0.07 * min(t / 4.5, 1)
    ph = b.scene_photo('living')
    cw = 1080
    sc = cw / ph.width * z
    big = ph.resize((int(ph.width * sc), int(ph.height * sc)), Image.BICUBIC).convert('RGBA')
    ch = 1350
    x0, y0 = (big.width - cw) // 2, int((big.height - ch) * 0.35)
    card = big.crop((x0, y0, x0 + cw, y0 + ch))
    card.alpha_composite(b.vgrad((cw, 300), (9, 11, 10, 255), (9, 11, 10, 0)), (0, 0))
    card.alpha_composite(b.vgrad((cw, 720), (9, 11, 10, 0), (9, 11, 10, 255)), (0, ch - 720))
    paste(img, card, (0, 260), min(1.0, t / 0.5))
    eyebrow(img, 'Smart touch switches', 300, t, 0.5)
    rise(img, T('Control your home', 300, 94, rgba(IVORY)), M, 1290, t, 0.6)
    rise(img, T('with a touch.', 300, 94, rgba(IVORY, 0.55)), M, 1398, t, 0.85)
    return img


def s2(t):
    img = video.base(0.5)
    eyebrow(img, 'The panels', 290, t)
    rise(img, T('Glass or', 300, 124, rgba(IVORY)), M, 350, t, 0.2)
    rise(img, T('acrylic.', 300, 124, rgba(IVORY, 0.55)), M, 485, t, 0.4)
    p = prog(t, 0.3, 1.0)
    sc = 0.94 + 0.12 * min(t / 4.0, 1)
    b.place_panel(img, 'color', '8m-6-switch-1-fan', 940, (W // 2, 1010 + int((1 - p) * 40)), p, sc)
    lines(img, 'Touch panels for your lights, fans, curtains and sockets.', 400, 38, rgba(IVORY, 0.8), M, 1290, 52, t, 1.2, 900)
    mark(img, t)
    return img


def s3(t):
    img = video.base(0.5)
    eyebrow(img, 'Two series', 290, t)
    rise(img, T('Pick your look.', 300, 100, rgba(IVORY)), M, 340, t, 0.2)
    for k, (series, pid, name, desc, cy, t0) in enumerate([
        ('color', '4m-4-switch-1-fan', 'COLOR', 'Backlit icons in colours you choose', 660, 0.7),
        ('edge', '4m-4-switch', 'EDGE', 'Round touch points, a simpler look', 1175, 1.9),
    ]):
        p = prog(t, t0, 0.9)
        b.place_panel(img, series, pid, 500, (W // 2, cy + int((1 - p) * 50)), p)
        rise(img, T(name, 600, 34, rgba(GOLD), 10), W // 2, cy + 195, t, t0 + 0.3, 'm')
        rise(img, T(desc, 400, 36, rgba(IVORY, 0.85)), W // 2, cy + 248, t, t0 + 0.45, 'm')
    mark(img, t)
    return img


def s4(t):
    img = video.base(0.55)
    eyebrow(img, 'The range', 290, t)
    rise(img, T(f'{c.N_SIZES} sizes.', 300, 118, rgba(IVORY)), M, 330, t, 0.2)
    gap = 24
    cw, ch = (W - M * 2 - gap) // 2, 296
    for i, mod in enumerate(b.MODULES):
        x = M + (i % 2) * (cw + gap)
        y = 500 + (i // 2) * (ch + gap)
        p = prog(t, 0.6 + 0.32 * i, 0.6)
        if p <= 0:
            continue
        card = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
        rounded(card, (0, 0, cw, ch), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.35), width=2)
        pn = bare_panel('color' if i % 2 == 0 else 'edge', b.REP[mod], 700)
        s = min((cw - 70) / pn.width, (ch - 110) / pn.height)
        pn = pn.resize((int(pn.width * s), int(pn.height * s)), Image.LANCZOS)
        card.alpha_composite(pn, ((cw - pn.width) // 2, 24 + (ch - 110 - pn.height) // 2))
        paste(card, T(mod, 500, 40, rgba(GOLD)), (cw // 2, ch - 68), anchor='m')
        paste(img, card, (x, y + (1 - p) * 40), p)
    rise(img, T(f'{c.N_LAYOUTS} layouts in each series', 400, 34, rgba(IVORY, 0.8)), M, 1500, t, 3.2)
    return img


def s5(t):
    img = video.base(0.3, 0.5)
    eyebrow(img, 'Four ways to control', 290, t)
    rise(img, T('Control it', 300, 108, rgba(IVORY)), M, 335, t, 0.2)
    rise(img, T('your way.', 300, 108, rgba(IVORY, 0.55)), M, 452, t, 0.4)
    rows = [('touch', 'Touch', 'Glass or acrylic panel'), ('app', 'App', 'Android and iOS'),
            ('voice', 'Voice', 'Alexa and Google Home'), ('remote', 'Remote', 'IR remote, sold separately')]
    for i, (ic, title, sub) in enumerate(rows):
        y = 640 + i * 205
        t0 = 0.9 + i * 0.8
        p = prog(t, t0, 0.6)
        if p <= 0:
            continue
        img.alpha_composite(Image.new('RGBA', (int((W - M * 2) * p), 2), rgba(GOLD, 0.3)), (M, y - 14))
        paste(img, b.icon(ic, 100, GOLD), (M, y + 20 + (1 - p) * 30), p)
        paste(img, T(title, 500, 56, rgba(IVORY)), (M + 150, y + 14 + (1 - p) * 30), p)
        paste(img, T(sub, 400, 34, rgba(IVORY, 0.72)), (M + 150, y + 90 + (1 - p) * 30), p)
    lines(img, c.MARKS, 400, 22, rgba(IVORY, 0.6), M, 1500, 30, t, 3.6, 920)
    return img


def s6(t):
    img = video.base(0.3)
    p = prog(t, 0.1, 1.0)
    sc = 0.95 + 0.07 * min(t / 4.0, 1)
    b.place_panel(img, 'edge', '12m-12-switch', 680, (W // 2, 590 + int((1 - p) * 40)), p, sc)
    rise(img, T('Wi-Fi or Zigbee', 300, 98, rgba(IVORY)), M, 940, t, 0.6)
    lines(img, 'Every panel comes in both versions.', 400, 36, rgba(IVORY, 0.75), M, 1060, 48, t, 0.9, 900)
    q = prog(t, 1.6, 0.8)
    if q > 0:
        img.alpha_composite(Image.new('RGBA', (int((W - M * 2) * q), 2), rgba(GOLD, 0.4)), (M, 1170))
    rise(img, T(c.WARRANTY.capitalize(), 300, 98, rgba(GOLD)), M, 1204, t, 1.8)
    lines(img, 'On the panels. Terms are confirmed in writing when you order.', 400, 34, rgba(IVORY, 0.75), M, 1326, 46, t, 2.1, 900)
    mark(img, t)
    return img


def s7(t):
    img = video.base(0.3, 0.6)
    p = prog(t, 0.0, 0.9)
    b.place_panel(img, 'color', '6m-6-switch-1-fan', 760, (W // 2, 560 + int((1 - p) * 40)), p, 0.96 + 0.05 * min(t / 4.0, 1))
    rise(img, T(f'{c.CTA_SHORT}.', 300, 112, rgba(IVORY)), M, 820, t, 0.5)
    lines(img, c.CTA_LONG, 400, 38, rgba(IVORY, 0.8), M, 965, 52, t, 0.8, 900)
    p2 = prog(t, 1.2, 0.7)
    if p2 > 0:
        lay = Image.new('RGBA', (W, 140), (0, 0, 0, 0))
        b.pill_button(lay, (M, 20), f'WhatsApp {b.PHONE}', font(600, 44), anchor='l', pad=(48, 28))
        paste(img, lay, (0, 1090 + (1 - p2) * 40), p2)
    rise(img, T(b.EMAIL, 400, 40, rgba(IVORY, 0.9)), M, 1250, t, 1.6)
    if b.SITE_URL:
        rise(img, T(b.SITE_URL.split('//')[-1], 400, 36, rgba(IVORY, 0.7)), M, 1310, t, 1.8)
    p3 = prog(t, 2.0, 0.7)
    if p3 > 0:
        b.logo_lockup(img, (M, 1440), 1.2, p3)
    return img


SCENES = [s1, s2, s3, s4, s5, s6, s7]


EVENTS = [(BEAT, 'tick')] + [(START[k], 'whoosh') for k in range(1, len(START))] + [(START[k], 'tick') for k in range(1, len(START))] + [(START[6] + 2 * BEAT, 'chime')]
STYLE = 'bright'
SLUG = 'reel-1-features'


def build(out_root):
    """Writes the organic and the ads version plus a cover. Returns nothing; files go in out_root/<slug>/."""
    out = out_root / SLUG
    out.mkdir(parents=True, exist_ok=True)
    for mode in ('organic', 'ads'):
        video.MODE[0] = mode
        video.encode(out / f'{SLUG}-{mode}.mp4', lambda t: video.frame_at(SCENES, START, XF, t), sum(DUR), EVENTS, STYLE)
    video.MODE[0] = 'organic'
    video.frame_at(SCENES, START, XF, START[0] + 3.4).save(out / f'{SLUG}-cover.jpg', quality=92)
