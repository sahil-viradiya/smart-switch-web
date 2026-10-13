"""
Meta (Facebook and Instagram) ad images, built from the website's own panel renders, room photo and data.

Eight creatives, each in four placements, saved under marketing/meta_ads/<placement>/<creative>.png:

    feed_1080x1350    Facebook and Instagram feed (4:5, the placement with the most room)
    square_1080x1080  Feed, carousel, Marketplace and right column (1:1)
    story_1080x1920   Stories and Reels ads (9:16): everything important sits inside y=270..1248 and the side margins
    link_1200x628     Facebook link ads (1.91:1)

Python marketing/build.py meta   rebuilds them. python marketing/check.py verifies sizes and safe zones.

No prices, certifications, superlatives or supplier details (the same rules as the rest of marketing/).
Room pictures are the website's illustrations and say so on the image.
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

import brand as b
import content as c
import specs as S
from brand import BLACK, CARD, GOLD, GOLD_LIGHT, IVORY, draw_lines, draw_text, font, paste, rgba, rounded

HERE = Path(__file__).resolve().parent
OUT = HERE / 'meta_ads'

# placement -> (size, folder, safe box (x0, y0, x1, y1), whether the call-to-action block is drawn on the image)
PLACEMENTS = {
    'feed': ((1080, 1350), 'feed_1080x1350', (80, 72, 1000, 1290), True),
    'square': ((1080, 1080), 'square_1080x1080', (72, 56, 1008, 1030), False),
    'story': ((1080, 1920), 'story_1080x1920', (S.ADS_SIDE_MARGIN + 7, S.SAFE_ADS[0] + 2, 1080 - S.ADS_SIDE_MARGIN - 7, S.SAFE_ADS[1] - 16), True),
    'link': ((1200, 628), 'link_1200x628', (56, 40, 1144, 590), True),
}
ART = (920, 600)  # every artwork is drawn on this canvas, then fitted into the space the placement leaves for it


# ---- copy ------------------------------------------------------------------------------------------------
# (id, headline lines, sub line, primary text, ad headline, ad description). Limits: 125 / 27 / 27 characters.
CREATIVES = [
    ('touch', ['Switch to touch.'], 'Glass or acrylic touch panels for your lights, fans, curtains and sockets.',
     'Glass or acrylic touch panels for lights, fans, curtains and sockets. Message us on WhatsApp for a quote.', 'Switch to touch', 'Message us for a quote'),
    ('one-wall', ['Everything on', 'one wall.'], 'Lights, fan and sockets on one panel, with curtain and dimmer panels to match.',
     'Replace a row of separate switches with one touch panel, with matching curtain and dimmer panels. Ask for a layout.', 'Everything on one wall', 'Ask for a layout'),
    ('control', ['Touch. App.', 'Voice. Remote.'], 'Four ways to control every panel, with Alexa and Google Home.',
     'Control it by touch, app, voice or a handheld remote (sold separately). Message us to ask how it works.', 'Four ways to control it', 'Message us for a quote'),
    ('series', ['Color or Edge?'], 'Two looks, the same sizes and the same functions.',
     'Color has backlit icons in colours you choose. Edge has round touch points. Ask us for specs and samples.', 'Color or Edge: pick a look', 'Ask for specs and samples'),
    ('sizes', [f'{c.N_SIZES} sizes.', f'{c.N_LAYOUTS} layouts.'], 'From a compact 2M panel to a large 12M panel, in each series.',
     f'{c.N_SIZES} sizes and {c.N_LAYOUTS} layouts in each series. Tell us about your wall box and we suggest a panel.', f'{c.N_SIZES} sizes, {c.N_LAYOUTS} layouts', 'Tell us about your room'),
    ('more', ['More than', 'switches.'], 'Sockets, scene and curtain control, dimmers, a USB charger and a doorbell.',
     'Sockets, scene control, curtain control, dimmers, a USB charger and a doorbell, all in the same touch panel style.', 'More than switches', 'Message us for a quote'),
    ('room', ['Made for the', 'wall you have.'], 'Tell us about your room and we will suggest a layout.',
     'Send us your room details on WhatsApp and we suggest the series, size and functions. Installed by your electrician.', 'Made for your wall', 'Send your room details'),
    ('connect', ['Wi-Fi or Zigbee.'], 'Every panel comes in both versions. Zigbee uses a gateway.',
     'Pick the version that suits your home: Wi-Fi, or Zigbee with a gateway. Message us and we help you choose.', 'Wi-Fi or Zigbee', 'Message us for a quote'),
]
CTA_TEXT = 'Message us on WhatsApp'
NOTE_ROOM = 'Room image is an illustration.'
NOTE_MARKS = 'Alexa and Google Home are trademarks of their owners.'
NOTES = {'room': NOTE_ROOM, 'control': NOTE_MARKS}


# ---- drawing helpers -------------------------------------------------------------------------------------
def fit(layer, box, anchor='m'):
    """Scale an RGBA layer to fit inside box (never up beyond 1.15x), centred."""
    x0, y0, x1, y1 = box
    s = min((x1 - x0) / layer.width, (y1 - y0) / layer.height, 1.15)
    lay = layer.resize((max(1, int(layer.width * s)), max(1, int(layer.height * s))), Image.LANCZOS)
    return lay, (x0 + ((x1 - x0) - lay.width) // 2, y0 + ((y1 - y0) - lay.height) // 2)


def glow(size, center, radius, color, alpha):
    lay = Image.new('RGBA', size, (0, 0, 0, 0))
    ImageDraw.Draw(lay).ellipse((center[0] - radius, center[1] - radius * 0.8, center[0] + radius, center[1] + radius * 0.8), fill=rgba(color, alpha))
    return lay.filter(ImageFilter.GaussianBlur(radius * 0.5))


def line(img, pts, color=GOLD, alpha=0.7, width=2, node=True):
    """A thin polyline with a small round node on its last point (the callout look)."""
    d = ImageDraw.Draw(img, 'RGBA')
    d.line(pts, fill=rgba(color, alpha), width=width, joint='curve')
    if node:
        x, y = pts[-1]
        d.ellipse((x - 6, y - 6, x + 6, y + 6), fill=rgba(color, alpha))
        d.ellipse((x - 11, y - 11, x + 11, y + 11), outline=rgba(color, alpha * 0.5), width=2)


def brackets(img, box, arm=34, color=GOLD, alpha=0.9, width=3):
    """Corner brackets around a box (a viewfinder or HUD look)."""
    x0, y0, x1, y1 = [int(v) for v in box]
    d = ImageDraw.Draw(img, 'RGBA')
    f = rgba(color, alpha)
    for (cx, cy, dx, dy) in ((x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)):
        d.line((cx, cy + dy * arm, cx, cy, cx + dx * arm, cy), fill=f, width=width, joint='curve')


def chip(img, center, size, name, label, sub=None, radius=22):
    """A rounded dark tile with an icon and a label under it."""
    cx, cy = center
    x0, y0 = cx - size // 2, cy - size // 2
    rounded(img, (x0, y0, x0 + size, y0 + size), radius, fill=rgba(CARD), outline=rgba(GOLD, 0.55), width=2)
    ic = b.icon(name, int(size * 0.5), GOLD)
    paste(img, ic, (cx - ic.width // 2, cy - ic.height // 2))
    draw_text(img, (cx, y0 + size + 14), label, font(500, 28), rgba(IVORY), anchor='m')
    if sub:
        draw_text(img, (cx, y0 + size + 50), sub, font(400, 22), rgba(IVORY, 0.65), anchor='m')


def node_icon(img, center, r, name, label, label_dx=0, label_dy=None, anchor='m'):
    cx, cy = center
    d = ImageDraw.Draw(img, 'RGBA')
    d.ellipse((cx - r - 10, cy - r - 10, cx + r + 10, cy + r + 10), fill=rgba(GOLD, 0.08))
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=rgba(CARD), outline=rgba(GOLD, 0.8), width=3)
    ic = b.icon(name, int(r * 1.15), GOLD)
    paste(img, ic, (cx - ic.width // 2, cy - ic.height // 2))
    draw_text(img, (cx + label_dx, cy + (r + 18 if label_dy is None else label_dy)), label, font(600, 28), rgba(IVORY), anchor=anchor)


def panel_with_glow(img, series, pid, width, center, glow_r=None):
    lay = b.panel(series, pid, width)
    pad = 400  # draw the glow on a larger canvas so its soft edge is never cut off by the artwork edge
    g = glow((img.width + pad * 2, img.height + pad * 2), (center[0] + pad, center[1] + pad), glow_r or min(int(width * 0.55), 260), GOLD, 0.2)
    img.alpha_composite(g.crop((pad, pad, pad + img.width, pad + img.height)))
    paste(img, lay, (center[0] - lay.width // 2, center[1] - lay.height // 2))
    return (center[0] - (lay.width - 140) // 2, center[1] - (lay.height - 140) // 2, center[0] + (lay.width - 140) // 2, center[1] + (lay.height - 140) // 2)


# ---- artworks (each draws on a transparent ART-sized canvas) ----------------------------------------------
def art_touch():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    box = panel_with_glow(img, 'color', '8m-6-switch-1-fan', 800, (460, 300))
    brackets(img, (box[0] - 22, box[1] - 22, box[2] + 22, box[3] + 22))
    line(img, [(box[0] + 90, box[1] - 22), (box[0] + 90, 34), (box[0] + 250, 34)])
    draw_text(img, (box[0] + 270, 14), 'Glass or acrylic', font(500, 28), rgba(IVORY))
    line(img, [(box[2] - 120, box[3] + 22), (box[2] - 120, ART[1] - 40), (box[2] - 330, ART[1] - 40)])
    draw_text(img, (box[2] - 350, ART[1] - 62), '6 switches + 1 fan control', font(500, 28), rgba(IVORY), anchor='r')
    return img


def art_one_wall():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    box = panel_with_glow(img, 'color', '4m-4-switch-1-fan', 420, (460, 300))
    items = [('bulb', 'Lights'), ('fan', 'Fan'), ('curtain', 'Curtains'), ('dimmer', 'Dimmers'), ('socket', 'Sockets'), ('scene', 'Scenes')]
    ys = (112, 300, 488)
    for i, (name, label) in enumerate(items):
        left = i < 3
        cx, cy = (112 if left else 808), ys[i % 3]
        edge_x = cx + 64 if left else cx - 64
        tx = box[0] - 26 if left else box[2] + 26
        ty = box[1] + 50 + (i % 3) * ((box[3] - box[1] - 100) / 2)
        mid = (edge_x + (tx - edge_x) * 0.35, cy)
        line(img, [(edge_x, cy), mid, (tx, ty)], alpha=0.6)
        chip(img, (cx, cy), 128, name, label)
    return img


def art_control():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    cx, cy = 460, 290
    d = ImageDraw.Draw(img, 'RGBA')
    for rx, ry, a, w in ((400, 214, 0.55, 3), (330, 176, 0.18, 2), (445, 240, 0.12, 2)):
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), outline=rgba(GOLD, a), width=w)
    panel_with_glow(img, 'color', '4m-4-switch-1-fan', 380, (cx, cy))
    for ang, name, label in ((222, 'touch', 'Touch'), (318, 'app', 'App'), (138, 'voice', 'Voice'), (42, 'remote', 'Remote')):
        x = cx + 400 * math.cos(math.radians(ang))
        y = cy + 214 * math.sin(math.radians(ang))
        node_icon(img, (x, y), 52, name, label, label_dy=(-52 - 48 if ang > 180 else None))
    return img


def art_series():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    for cx, series, pid, name, sub in ((235, 'color', '4m-4-switch-1-fan', 'COLOR', 'Backlit icons'), (685, 'edge', '4m-4-switch', 'EDGE', 'Round touch points')):
        panel_with_glow(img, series, pid, 420, (cx, 250))
        draw_text(img, (cx, 440), name, font(600, 34), rgba(GOLD), tracking=9, anchor='m')
        draw_text(img, (cx, 492), sub, font(400, 28), rgba(IVORY, 0.8), anchor='m')
    beam = Image.new('RGBA', (4, ART[1]), (0, 0, 0, 0))
    for y in range(ART[1]):
        t = 1 - abs(y - 270) / 300
        beam.putpixel((1, y), rgba(GOLD_LIGHT, max(0.0, t) * 0.9))
        beam.putpixel((2, y), rgba(GOLD_LIGHT, max(0.0, t) * 0.9))
    paste(img, beam, (458, 0))
    return img


def _grid_cards(items, cols=3, cw=290, ch=275, gap=25, label_size=34):
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    x_off = (ART[0] - (cols * cw + (cols - 1) * gap)) // 2
    for i, (series, pid, label) in enumerate(items):
        x, y = x_off + (i % cols) * (cw + gap), (i // cols) * (ch + gap)
        rounded(img, (x, y, x + cw, y + ch), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.4), width=2)
        lay = b.panel(series, pid, 560, shadow=False).crop((70, 70, 630, int(70 + 560 * b._render(series, pid).height / b._render(series, pid).width)))
        s = min((cw - 56) / lay.width, (ch - 84) / lay.height)
        lay = lay.resize((int(lay.width * s), int(lay.height * s)), Image.LANCZOS)
        paste(img, lay, (x + (cw - lay.width) // 2, y + 20 + (ch - 84 - lay.height) // 2))
        draw_text(img, (x + cw // 2, y + ch - 56), label, font(500, label_size), rgba(GOLD), anchor='m')
        brackets(img, (x + 8, y + 8, x + cw - 8, y + ch - 8), arm=16, alpha=0.5, width=2)
    return img


def art_sizes():
    return _grid_cards([('color', b.REP[m], m) for m in b.MODULES])


def art_more():
    order = ('socket', 'scene', 'curtain', 'dimmer', 'usb', 'doorbell')
    return _grid_cards([('color', b.KINDS[k][1], b.KINDS[k][0]) for k in order], label_size=30)


def art_room():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    ph = b.scene_photo('living')
    meta = (31.0, 24.4, 89.0, 41.5)  # the panel's box on the living-room photo, in percent (measured when the scene was built)
    ch = int(ph.width * ART[1] / ART[0])
    top = int((meta[1] + meta[3]) / 200 * ph.height - ch * 0.42)
    top = max(0, min(ph.height - ch, top))
    crop = ph.crop((0, top, ph.width, top + ch)).resize(ART, Image.LANCZOS).convert('RGBA')
    mask = Image.new('L', ART, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, ART[0] - 1, ART[1] - 1), 22, fill=255)
    img.paste(crop, (0, 0), mask)
    img.alpha_composite(b.vgrad(ART, (9, 11, 10, 0), (9, 11, 10, 170)))
    sx, sy = ART[0] / ph.width, ART[1] / ch
    px0, py0 = meta[0] / 100 * ph.width * sx, (meta[1] / 100 * ph.height - top) * sy
    px1, py1 = meta[2] / 100 * ph.width * sx, (meta[3] / 100 * ph.height - top) * sy
    brackets(img, (px0 - 16, py0 - 16, px1 + 16, py1 + 16), arm=30)
    ImageDraw.Draw(img, 'RGBA').rounded_rectangle((0, 0, ART[0] - 1, ART[1] - 1), 22, outline=rgba(GOLD, 0.5), width=3)
    for i, (name, label) in enumerate((('touch', 'Touch'), ('app', 'App'), ('voice', 'Voice'))):
        x = 190 + i * 270
        y = 520
        rounded(img, (x - 100, y - 38, x + 100, y + 38), 38, fill=rgba(BLACK, 0.82), outline=rgba(GOLD, 0.7), width=2)
        ic = b.icon(name, 38, GOLD)
        paste(img, ic, (x - 78, y - 19))
        draw_text(img, (x - 28, y - 18), label, font(500, 28), rgba(IVORY))
        line(img, [(x, y - 38), (x, py1 + 60), ((px0 + px1) / 2 + (i - 1) * 120, py1 + 10)], alpha=0.55)
    return img


def art_connect():
    img = Image.new('RGBA', ART, (0, 0, 0, 0))
    box = panel_with_glow(img, 'color', '4m-4-switch-1-fan', 380, (460, 270))
    for cx, name, title, sub, tx in ((140, 'wifi', 'Wi-Fi version', 'Uses your Wi-Fi', box[0] - 20), (780, 'hub', 'Zigbee version', 'Needs a gateway', box[2] + 20)):
        node_icon(img, (cx, 270), 62, name, title, label_dy=270 + 62 + 22 - 270)
        draw_text(img, (cx, 270 + 62 + 62), sub, font(400, 24), rgba(IVORY, 0.7), anchor='m')
        line(img, [(cx + (62 if cx < 460 else -62), 270), (tx, 270)], alpha=0.6)
    return img


ARTWORKS = {'touch': art_touch, 'one-wall': art_one_wall, 'control': art_control, 'series': art_series, 'sizes': art_sizes, 'more': art_more, 'room': art_room, 'connect': art_connect}


# ---- backdrop ---------------------------------------------------------------------------------------------
def backdrop(size, center, seed=3):
    """Dark gold-lit stage with a faint technical grid, concentric rings and drifting light points around `center`."""
    w, h = size
    img = b.stage(size, (center[0] / w, center[1] / h), 0.62)
    grid = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(grid)
    step = 54
    for x in range(0, w, step):
        d.line((x, 0, x, h), fill=rgba(GOLD, 0.16))
    for y in range(0, h, step):
        d.line((0, y, w, y), fill=rgba(GOLD, 0.16))
    fade = Image.new('L', size, 0)
    r = int(min(w, h) * 0.52)
    ImageDraw.Draw(fade).ellipse((center[0] - r * 1.5, center[1] - r, center[0] + r * 1.5, center[1] + r), fill=255)
    fade = fade.filter(ImageFilter.GaussianBlur(r * 0.35))
    grid.putalpha(ImageChops.multiply(grid.getchannel('A'), fade))
    img.alpha_composite(grid)
    rings = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(rings)
    for k, rad in enumerate((0.34, 0.5, 0.68)):
        rr = int(min(w, h) * rad)
        d.ellipse((center[0] - rr * 1.35, center[1] - rr, center[0] + rr * 1.35, center[1] + rr), outline=rgba(GOLD, 0.2 - k * 0.05), width=2)
    img.alpha_composite(rings)
    rnd = random.Random(seed)
    dots = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(dots)
    for _ in range(46):
        x, y = rnd.randint(30, w - 30), rnd.randint(30, h - 30)
        rr = rnd.choice((2, 2, 3, 4))
        d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=rgba(GOLD_LIGHT, rnd.uniform(0.12, 0.3)))
    img.alpha_composite(dots.filter(ImageFilter.GaussianBlur(0.8)))
    sweep = Image.new('RGBA', size, (0, 0, 0, 0))
    ImageDraw.Draw(sweep).polygon([(int(w * 0.62), 0), (int(w * 0.78), 0), (int(w * 0.30), h), (int(w * 0.14), h)], fill=rgba(GOLD_LIGHT, 0.045))
    img.alpha_composite(sweep.filter(ImageFilter.GaussianBlur(40)))
    return img


# ---- one image --------------------------------------------------------------------------------------------
def compose(cid, placement):
    (W, H), _, (x0, y0, x1, y1), with_cta = PLACEMENTS[placement]
    _, head, sub, _, _, _ = next(cr for cr in CREATIVES if cr[0] == cid)
    art = ARTWORKS[cid]()
    land = W > H
    note = NOTES.get(cid)
    f_head = font(300, 92 if H >= 1300 else (84 if not land else 64))
    f_sub = font(400, 31 if not land else 26)
    lh = int(f_head.size * 1.13)

    if land:
        tw = 560
        ly = y0
        # left column: logo, headline, sub, cta
        img = backdrop((W, H), (880, 300))
        b.logo_lockup(img, (x0, ly), 0.85)
        y = ly + 110
        for ln in head:
            draw_text(img, (x0, y), ln, f_head, rgba(IVORY) if ln is head[0] else rgba(IVORY, 0.6))
            y += lh
        rows = b.wrap(sub, f_sub, tw)
        y = draw_lines(img, (x0, y + 14), rows, f_sub, rgba(IVORY, 0.78), 38)
        if with_cta:
            b.pill_button(img, (x0, y + 22), CTA_TEXT, font(600, 26), anchor='l', pad=(34, 20))
        draw_text(img, (x0, y1 - 24), f'WhatsApp {b.PHONE}', font(500, 24), rgba(IVORY, 0.85))
        if note:
            draw_text(img, (x0, y1 + 2), note, font(400, 18), rgba(IVORY, 0.55))
        lay, pos = fit(art, (600, y0, x1 + 8, y1))
        paste(img, lay, pos)
        return img.convert('RGB')

    # portrait and square: art on top, text, call to action, footer
    footer_h = 64
    fy = y1 - footer_h
    cta_h = 0
    if with_cta:
        cta_h = 86
    head_h = len(head) * lh
    rows = b.wrap(sub, f_sub, x1 - x0)
    sub_h = len(rows) * 44
    text_h = head_h + 12 + sub_h
    cta_y = fy - 26 - cta_h
    text_y = (cta_y - 30 if with_cta else fy - 22) - text_h
    art_box = (x0, y0 + 6, x1, text_y - 26)
    lay, pos = fit(art, art_box)
    img = backdrop((W, H), (pos[0] + lay.width // 2, pos[1] + lay.height // 2))
    paste(img, lay, pos)
    y = text_y
    for ln in head:
        draw_text(img, (x0, y), ln, f_head, rgba(IVORY) if ln is head[0] else rgba(IVORY, 0.6))
        y += lh
    draw_lines(img, (x0, y + 12), rows, f_sub, rgba(IVORY, 0.78), 44)
    if with_cta:
        b.pill_button(img, (x0, cta_y), CTA_TEXT, font(600, 32), anchor='l')
    img.alpha_composite(Image.new('RGBA', (x1 - x0, 2), rgba(GOLD, 0.35)), (x0, fy - 8))
    b.logo_lockup(img, (x0, fy - 2), 0.85)
    draw_text(img, (x1, fy + 4), f'WhatsApp {b.PHONE}', font(600, 26), rgba(IVORY), anchor='r')
    draw_text(img, (x1, fy + 38), note or b.EMAIL, font(400, 20 if note else 22), rgba(IVORY, 0.6 if note else 0.7), anchor='r')
    return img.convert('RGB')


def build():
    n = 0
    for _, (_, folder, _, _) in PLACEMENTS.items():
        (OUT / folder).mkdir(parents=True, exist_ok=True)
    for cid, *_ in CREATIVES:
        for placement, (size, folder, _, _) in PLACEMENTS.items():
            im = compose(cid, placement)
            assert im.size == size
            im.save(OUT / folder / f'{cid}.png', optimize=True)
            n += 1
    print(f'meta_ads: {n} images')


def write_readme():
    ph = ', '.join(f'`{f}/`' for _, (_, f, _, _) in PLACEMENTS.items())
    rows = ['| Creative | Primary text | Headline | Description |', '| --- | --- | --- | --- |']
    for cid, head, sub, pt, hl, ds in CREATIVES:
        rows.append(f'| `{cid}` ({" ".join(head)}) | {pt} | {hl} | {ds} |')
    text = f'''# Meta ads images

{len(CREATIVES)} ad creatives, each in four sizes. Built from the website's own panel renders, room photo and data (`python marketing/build.py meta`), and checked by `python marketing/check.py`.

## Which file for which placement

| Folder | Size | Use it for |
| --- | --- | --- |
| `feed_1080x1350/` | 1080x1350 (4:5) | Facebook and Instagram feed. The largest feed format, so the first one to use. |
| `square_1080x1080/` | 1080x1080 (1:1) | Feed, carousel, Marketplace, right column. |
| `story_1080x1920/` | 1080x1920 (9:16) | Instagram and Facebook Stories and Reels ads. Everything important is inside y=270..1248 and 72 px from the sides, clear of the profile bar at the top and the button and caption at the bottom. |
| `link_1200x628/` | 1200x628 (1.91:1) | Facebook link ads. |

The image names are the same in every folder. Upload the same creative in all four sizes in one ad set and let Meta pick the placement ("Advantage+ placements"), or upload one size per placement for full control. Add the video ads from `reels/*/*-ads.mp4` next to them.

## The creatives

| Image | What it shows | Who it speaks to |
| --- | --- | --- |
| `touch` | The 8M Color panel with six switches and a fan control | Homeowners, for a first look at the product |
| `one-wall` | One panel, six functions: lights, fan, curtains, dimmers, sockets, scenes | Homeowners replacing a row of separate switches |
| `control` | Touch, app, voice and remote around a panel | Homeowners who like smart-home gadgets |
| `series` | Color and Edge side by side | Interior designers and architects choosing a look |
| `sizes` | The six sizes from 2M to 12M | Architects and electricians planning a wall box |
| `more` | Sockets, scene control, curtain control, dimmers, USB charger and doorbell panels | People who want more than light switches |
| `room` | A living-room wall with Touch, App and Voice callouts | Homeowners picturing it in their own room |
| `connect` | Wi-Fi or Zigbee versions | People comparing how it connects |

## Ad copy (paste into Ads Manager)

Limits checked by `check.py`: primary text 125, headline 27, description 27 characters. Button: **{c.AD_BUTTON}** (click-to-WhatsApp) with the number {b.PHONE}, or "Learn more" with a tracked link from `../links.md`.

{chr(10).join(rows)}

## Before you publish

- Run `python marketing/check.py`. It fails on any mention of cost, supplier details, unsupported claims, wrong sizes, and anything outside the safe zones.
- Look at every placement in the Ads Manager preview. The size and safe-zone rules come from third-party guides, because Meta's own pages were not reachable when this was built.
- Room pictures are illustrations and say so on the image. Keep that line on them. Do not remove the trademark line on the `control` creative.
- A first test: run 3 to 4 creatives (try `touch`, `one-wall`, `control` and `room`) for 3 to 5 days, then put the budget on the one that brings the most WhatsApp messages.
- Suggested audience to start with (a suggestion, not data from this project): people 25 to 55 in and around Ahmedabad and Gujarat interested in home improvement, interior design, smart home and new homes, plus a separate audience of interior designers, architects and electrical contractors for the `series`, `sizes` and `more` creatives.
'''
    (OUT / 'README.md').write_text(text, encoding='utf8')
    print('wrote meta_ads/README.md')
