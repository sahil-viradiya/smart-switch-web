"""
Reel 2, "A day with one touch": a customer-facing 30-second story (1080x1920, 30 fps, with sound).

A finger taps a real panel, its icons light up one by one and the room brightens: morning (curtains),
afternoon (fan), evening (dimmers), then touch / app / voice / remote, the warranty and how to buy.
The room photos are illustrations (real panel images on a sample wall) and are labelled as such on screen.
Every claim here is in claims.md. Layout rules and the ad-safe mode are in video.py.
"""
from PIL import Image, ImageDraw
import brand as b
import content as c
import lit
import video
from brand import BLACK, CARD, GOLD, IVORY, font, paste, rgba, rounded
from reel import T, eyebrow, lines, mark, prog, rise

W, H, XF, M = 1080, 1920, 0.4, 80
BEAT = video.BEAT
Q = BEAT / 4                         # a quarter of a beat: the grid every sound sits on
DUR = [6 * BEAT, 8 * BEAT, 8 * BEAT, 8 * BEAT, 7 * BEAT, 5 * BEAT, 6 * BEAT]   # 48 beats = 30 s
assert abs(sum(DUR) - 30.0) < 1e-6
START = [sum(DUR[:i]) for i in range(len(DUR))]
ease = video.ease
TAP_T = 4 * BEAT      # when the finger presses, in each device scene (on the beat)
SLUG = 'reel-2-day'
_events = []         # (global seconds, kind) collected while the scenes are defined


def finger(scale=1.0, press=0.0):
    """Soft translucent touch circle."""
    S, R = 4, 56
    N = (R * 2 + 12) * S
    lay = Image.new('RGBA', (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    r = R * S * (1 - 0.22 * press) * scale
    c0 = N / 2
    d.ellipse((c0 - r, c0 - r, c0 + r, c0 + r), fill=(255, 255, 255, int(70 + 60 * press)), outline=(255, 255, 255, 190), width=5 * S)
    return lay.resize((N // S, N // S), Image.LANCZOS)


def ripple(t0, t):
    dt = (t - t0) / 0.75
    if not 0 <= dt <= 1:
        return None
    R = int(40 + 150 * ease(dt))
    N = R * 2 + 16
    lay = Image.new('RGBA', (N * 3, N * 3), (0, 0, 0, 0))
    ImageDraw.Draw(lay).ellipse((N * 1.5 - R * 1.5, N * 1.5 - R * 1.5, N * 1.5 + R * 1.5, N * 1.5 + R * 1.5), outline=(*GOLD, int(200 * (1 - dt))), width=15)
    return lay.resize((N, N), Image.LANCZOS)


# Vertical centre of the wall panel in each room photo (measured from the images), as a fraction of the photo height.
PANEL_Y = {'living': 0.33, 'bedroom': 0.36, 'studio': 0.33, 'hall': 0.37}


def room_card(scene, t, bright, w=920, h=400, zoom_dur=5.0):
    ph = b.scene_photo(scene)
    z = 1.0 + 0.07 * min(t / zoom_dur, 1)
    sc = w / ph.width * z
    big = ph.resize((int(ph.width * sc), int(ph.height * sc)), Image.BICUBIC)
    my = PANEL_Y[scene]
    x0 = (big.width - w) // 2
    y0 = max(0, min(big.height - h, int(my * big.height - h / 2)))
    crop = big.crop((x0, y0, x0 + w, y0 + h))
    crop = Image.blend(Image.new('RGB', crop.size, BLACK), crop, bright).convert('RGBA')
    card = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    mask = Image.new('L', (w * 3, h * 3), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w * 3 - 1, h * 3 - 1), 42, fill=255)
    card.paste(crop, (0, 0), mask.resize((w, h), Image.LANCZOS))
    tag = T('ILLUSTRATION', 600, 17, rgba(IVORY, 0.85), 3)
    pill = Image.new('RGBA', (tag.width + 28, tag.height + 6), (0, 0, 0, 0))
    rounded(pill, (0, 0, pill.width, pill.height), 8, fill=rgba(BLACK, 0.55))
    paste(pill, tag, (14, 1))
    paste(card, pill, (w - pill.width - 16, 16))
    return card


def device(index, eyebrow_txt, title, caption, photo, series, pid, tap, panel_h=370, cy=1262):
    src = b._render(series, pid)
    pw = min(760, int(panel_h * src.width / src.height))
    lp = lit.get(series, pid, pw)
    n = len(lp.icons)
    tx, ty = lp.icons[tap].cx, lp.icons[tap].cy
    order = sorted(range(n), key=lambda i: (lp.icons[i].cx - tx) ** 2 + (lp.icons[i].cy - ty) ** 2)
    rank = {i: r for r, i in enumerate(order)}
    _events.append((START[index] + TAP_T, 'tap'))
    _events.extend((START[index] + TAP_T + Q * r, 'tick') for r in range(1, min(n, 4)))

    def scene(t):
        img = video.base(0.5, 0.55)
        eyebrow(img, eyebrow_txt, 290, t)
        for k, line in enumerate(title):
            rise(img, T(line, 300, 100, rgba(IVORY, 1 if k == 0 else 0.55)), M, 335 + k * 108, t, 0.2 + 0.2 * k)
        if photo:
            bright = 0.34 + 0.66 * ease((t - TAP_T) / 0.9)
            p = prog(t, 0.35, 0.8)
            if p > 0:
                paste(img, room_card(photo, t, bright), (M, 590 + (1 - p) * 40), p)
        levels = [ease((t - (TAP_T + Q * rank[i])) / 0.35) for i in range(n)]
        lay = lp.render(levels)
        p = prog(t, 0.7, 0.8)
        ox, oy = W // 2 - lay.width // 2, cy - lay.height // 2 + (1 - p) * 50
        paste(img, lay, (ox, oy), p)
        # finger glides in, presses, then fades
        fx, fy = ox + lp.center(tap)[0], oy + lp.center(tap)[1]
        a = ease((t - 1.1) / 0.5) * (1 - ease((t - (TAP_T + 0.9)) / 0.5))
        if a > 0.01:
            g = ease((t - 1.3) / 0.9)
            x, y = fx + 330 * (1 - g), fy + 120 * (1 - g)   # enters from the side, so it never drops into the bottom band
            press = max(0.0, 1 - abs(t - (TAP_T + 0.08)) / 0.14)
            f = finger(1.0, press)
            paste(img, f, (x - f.width / 2, y - f.height / 2), a)
        rp = ripple(TAP_T, t)
        if rp is not None:
            paste(img, rp, (fx - rp.width / 2, fy - rp.height / 2))
        lines(img, caption, 400, 38, rgba(IVORY, 0.85), M, 1480, 50, t, 1.0, 900)
        return img

    return scene


def s1(t):
    """Hook: a big panel, a tap, the icons light up."""
    global _hook
    return _hook(t)


def _build_hook():
    series, pid = 'color', '6m-6-switch-1-fan'
    lp = lit.get(series, pid, 940)
    n = len(lp.icons)
    tap = 4
    tx, ty = lp.icons[tap].cx, lp.icons[tap].cy
    order = sorted(range(n), key=lambda i: (lp.icons[i].cx - tx) ** 2 + (lp.icons[i].cy - ty) ** 2)
    rank = {i: r for r, i in enumerate(order)}
    hook_tap = 3 * BEAT
    _events.append((hook_tap, 'tap'))
    _events.extend((hook_tap + Q * r, 'tick') for r in range(1, 5))

    def scene(t):
        img = video.base(0.45, 0.6)
        eyebrow(img, 'Smart touch switches', 290, t)
        rise(img, T('One touch.', 300, 150, rgba(IVORY)), M, 340, t, 0.15)
        levels = [ease((t - (hook_tap + Q * rank[i] / 2)) / 0.35) for i in range(n)]   # 12 icons: light in half-quarter-beat steps
        lay = lp.render(levels)
        p = prog(t, 0.4, 0.8)
        cy = 960
        ox, oy = W // 2 - lay.width // 2, cy - lay.height // 2 + (1 - p) * 50
        paste(img, lay, (ox, oy), p)
        fx, fy = ox + lp.center(tap)[0], oy + lp.center(tap)[1]
        a = ease((t - 0.7) / 0.4) * (1 - ease((t - (hook_tap + 0.9)) / 0.5))
        if a > 0.01:
            g = ease((t - 0.8) / 0.8)
            x, y = fx + 330 * (1 - g), fy + 140 * (1 - g)
            f = finger(1.0, max(0.0, 1 - abs(t - (hook_tap + 0.08)) / 0.14))
            paste(img, f, (x - f.width / 2, y - f.height / 2), a)
        rp = ripple(hook_tap, t)
        if rp is not None:
            paste(img, rp, (fx - rp.width / 2, fy - rp.height / 2))
        lines(img, 'Lights, fans, curtains and sockets.', 400, 44, rgba(IVORY, 0.85), M, 1330, 56, t, 1.2, 900)
        return img

    return scene


_hook = _build_hook()


def s5(t):
    """Four ways to control: touch, app, voice, remote."""
    img = video.base(0.4, 0.55)
    eyebrow(img, 'Any time', 290, t)
    rise(img, T('Any way', 300, 112, rgba(IVORY)), M, 340, t, 0.2)
    rise(img, T('you like.', 300, 112, rgba(IVORY, 0.55)), M, 456, t, 0.4)
    tiles = [('touch', 'Touch'), ('app', 'App'), ('voice', 'Voice'), ('remote', 'Remote')]
    gap = 16
    tw = (W - M * 2 - gap * 3) // 4
    for i, (ic, name) in enumerate(tiles):
        t0 = BEAT + BEAT * i
        p = prog(t, t0, 0.5)
        if p <= 0:
            continue
        x, y = M + i * (tw + gap), 760 + (1 - p) * 40
        lit_amt = ease((t - t0 - 0.15) / 0.4)
        card = Image.new('RGBA', (tw, 330), (0, 0, 0, 0))
        rounded(card, (0, 0, tw, 330), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.25 + 0.55 * lit_amt), width=2)
        icn = b.icon(ic, 96, b.mix(b.IVORY, GOLD, lit_amt))
        paste(card, icn, ((tw - 96) // 2, 70))
        paste(card, T(name, 500, 32, rgba(IVORY, 0.7 + 0.3 * lit_amt)), (tw // 2, 220), anchor='m')
        paste(img, card, (x, y), p)
        rp = ripple(t0, t)
        if rp is not None:
            paste(img, rp, (x + tw / 2 - rp.width / 2, y + 118 - rp.height / 2), 0.8)
    lines(img, 'Touch the panel, use the app on Android or iOS, ask Alexa or Google Home, or add an IR remote.', 400, 38, rgba(IVORY, 0.85), M, 1180, 52, t, 2.2, 920)
    lines(img, c.MARKS, 400, 22, rgba(IVORY, 0.6), M, 1500, 30, t, 2.4, 920)
    return img


def s6(t):
    """Warranty."""
    img = video.base(0.5, 0.6)
    eyebrow(img, 'Built to last', 290, t)
    for k in range(3):
        d = ((t * 0.45 + k / 3) % 1.0)
        R = int(120 + 560 * d)
        ring = Image.new('RGBA', (R * 2 + 8, R * 2 + 8), (0, 0, 0, 0))
        ImageDraw.Draw(ring).ellipse((4, 4, R * 2 + 4, R * 2 + 4), outline=(*GOLD, int(110 * (1 - d))), width=3)
        paste(img, ring, (W // 2 - ring.width // 2, 880 - ring.height // 2))
    rise(img, T(f'{b.WARRANTY_YEARS}-year', 300, 190, rgba(GOLD)), W // 2, 640, t, 0.2, 'm')
    rise(img, T('warranty.', 300, 150, rgba(IVORY)), W // 2, 830, t, 0.4, 'm')
    lines(img, 'On the panels, in glass or acrylic.', 400, 40, rgba(IVORY, 0.85), W // 2, 1120, 52, t, 0.9, 900, anchor='m')
    lines(img, 'Terms are confirmed in writing when you order.', 400, 34, rgba(IVORY, 0.7), W // 2, 1200, 46, t, 1.2, 900, anchor='m')
    mark(img, t)
    return img


def s7(t):
    """How to buy."""
    img = video.base(0.3, 0.6)
    lp = lit.get('edge', '4m-4-switch', 620)
    lay = lp.render([ease((t - 0.2 - 0.12 * i) / 0.4) for i in range(len(lp.icons))])
    p = prog(t, 0.0, 0.8)
    paste(img, lay, (W // 2 - lay.width // 2, 560 - lay.height // 2 + (1 - p) * 40), p)
    rise(img, T('Ready for', 300, 100, rgba(IVORY)), M, 830, t, 0.4)
    rise(img, T('your wall?', 300, 100, rgba(GOLD)), M, 938, t, 0.55)
    lines(img, c.CTA_LONG, 400, 36, rgba(IVORY, 0.8), M, 1070, 48, t, 0.8, 900)
    p2 = prog(t, 1.1, 0.7)
    if p2 > 0:
        lay2 = Image.new('RGBA', (W, 140), (0, 0, 0, 0))
        b.pill_button(lay2, (M, 20), f'WhatsApp {b.PHONE}', font(600, 44), anchor='l', pad=(48, 28))
        paste(img, lay2, (0, 1190 + (1 - p2) * 40), p2)
    rise(img, T(b.EMAIL, 400, 40, rgba(IVORY, 0.9)), M, 1350, t, 1.4)
    p3 = prog(t, 1.8, 0.6)
    if p3 > 0:
        b.logo_lockup(img, (M, 1450), 1.1, p3)
    return img


s2 = device(1, 'Morning', ['Open the', 'curtains.'], 'Curtain control, right on the wall.', 'bedroom', 'color', '2m-dual-curtain-switch', 0)
s3 = device(2, 'Afternoon', ['Cool the', 'room.'], 'A fan control sits next to your switches.', 'living', 'color', '4m-4-switch-1-fan', 3)
s4 = device(3, 'Evening', ['Dim the', 'lights.'], 'Dimmers for softer light.', 'hall', 'edge', '2m-2-dimmer-phase-cut', 0)

SCENES = [s1, s2, s3, s4, s5, s6, s7]
EVENTS = ([(START[4] + BEAT + BEAT * i, 'tap') for i in range(4)] + [(START[5] + BEAT, 'chime'), (START[6] + 2 * BEAT, 'chime')]
          + [(START[k], 'whoosh') for k in range(1, len(START))] + _events)
STYLE = 'warm'


def build(out_root):
    out = out_root / SLUG
    out.mkdir(parents=True, exist_ok=True)
    for mode in ('organic', 'ads'):
        video.MODE[0] = mode
        video.encode(out / f'{SLUG}-{mode}.mp4', lambda t: video.frame_at(SCENES, START, XF, t), sum(DUR), EVENTS, STYLE)
    video.MODE[0] = 'organic'
    video.frame_at(SCENES, START, XF, START[1] + 3.2).save(out / f'{SLUG}-cover.jpg', quality=92)
