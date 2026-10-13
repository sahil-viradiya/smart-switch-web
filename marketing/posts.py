"""Five 1080x1350 (4:5) social posts. Run through build.py."""
from PIL import Image
import brand as b
import content as c
from brand import GOLD, IVORY, BLACK, CARD, draw_text, draw_lines, font, paste, rgba, rounded

W, H = 1080, 1350
M = 80  # side margin


def footer(img, note=None, contact=True):
    """Brand and contact strip along the bottom, with an optional small print line above it."""
    y = 1236
    img.alpha_composite(Image.new('RGBA', (W - M * 2, 2), rgba(GOLD, 0.35)), (M, y))
    b.logo_lockup(img, (M, y + 34), 0.95)
    if contact:
        lines = b.contact_lines()
        draw_text(img, (W - M, y + 30), lines[0], font(600, 26), rgba(IVORY), anchor='r')
        draw_text(img, (W - M, y + 68), ' | '.join(lines[1:]), font(400, 22), rgba(IVORY, 0.7), anchor='r')
    if note:
        f = font(400, 18)
        rows = b.wrap(note, f, W - M * 2)
        draw_lines(img, (M, y - 12 - 26 * len(rows)), rows, f, rgba(IVORY, 0.55), 26)


def eyebrow(img, txt, y=84, x=M):
    img.alpha_composite(Image.new('RGBA', (44, 2), rgba(GOLD)), (x, y + 13))
    draw_text(img, (x + 62, y), txt.upper(), font(600, 22), rgba(GOLD), tracking=6)


def post1():
    img = b.stage((W, H), (0.5, 0.33), 0.5)
    eyebrow(img, 'Smart touch switches')
    b.place_panel(img, 'color', '8m-6-switch-1-fan', 900, (W // 2, 400))
    draw_text(img, (M, 700), 'Control your home', font(300, 98), rgba(IVORY))
    draw_text(img, (M, 810), 'with a touch.', font(300, 98), rgba(IVORY, 0.5))
    draw_lines(img, (M, 960), b.wrap('Glass or acrylic touch panels for your lights, fans, curtains and sockets.', font(400, 32), 860), font(400, 32), rgba(IVORY, 0.75), 46)
    b.pill_button(img, (M, 1076), f'{c.CTA_SHORT} on WhatsApp', font(600, 32), anchor='l')
    footer(img)
    return img


def post2():
    img = b.stage((W, H), (0.5, 0.45), 0.55)
    eyebrow(img, 'Two series')
    draw_text(img, (M, 150), 'Pick your look.', font(300, 100), rgba(IVORY))
    img.alpha_composite(Image.new('RGBA', (2, 640), rgba(GOLD, 0.25)), (W // 2 - 1, 360))
    cols = [
        (270, 'color', '4m-4-switch-1-fan', 'Color', 'Backlit icons in colours you choose'),
        (810, 'edge', '4m-4-switch', 'Edge', 'Round touch points, a simpler look'),
    ]
    for cx, series, pid, name, desc in cols:
        b.place_panel(img, series, pid, 430, (cx, 560))
        draw_text(img, (cx, 770), name.upper(), font(600, 30), rgba(GOLD), tracking=8, anchor='m')
        draw_lines(img, (cx, 826), b.wrap(desc, font(400, 30), 400), font(400, 30), rgba(IVORY, 0.8), 42, anchor='m')
    draw_text(img, (W // 2, 1040), 'Same sizes. Same functions.', font(500, 40), rgba(IVORY), anchor='m')
    b.pill_button(img, (W // 2, 1110), 'Ask for specs and samples', font(600, 30), anchor='m')
    footer(img)
    return img


def post3():
    img = b.stage((W, H), (0.5, 0.3), 0.5)
    eyebrow(img, 'Four ways to control')
    draw_text(img, (M, 150), 'Control it', font(300, 100), rgba(IVORY))
    draw_text(img, (M, 262), 'your way.', font(300, 100), rgba(IVORY, 0.5))
    items = [
        ('touch', 'Touch', 'Glass or acrylic panel'),
        ('app', 'App', 'Android and iOS'),
        ('voice', 'Voice', 'Alexa and Google Home'),
        ('remote', 'Remote', 'IR remote, sold separately'),
    ]
    cw, ch, gap = 446, 290, 28
    for i, (ic, title, sub) in enumerate(items):
        x = M + (i % 2) * (cw + gap)
        y = 430 + (i // 2) * (ch + gap)
        rounded(img, (x, y, x + cw, y + ch), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.35), width=2)
        paste(img, b.icon(ic, 84, GOLD), (x + 36, y + 36))
        draw_text(img, (x + 36, y + 142), title, font(500, 46), rgba(IVORY))
        draw_lines(img, (x + 36, y + 206), b.wrap(sub, font(400, 27), cw - 72), font(400, 27), rgba(IVORY, 0.7), 36)
    b.pill_button(img, (M, 1068), 'Ask us about your home', font(600, 30), anchor='l')
    footer(img, note=c.MARKS)
    return img


def post4():
    img = b.stage((W, H), (0.5, 0.45), 0.6)
    eyebrow(img, 'The range')
    draw_text(img, (M, 150), f'{c.N_SIZES} sizes.', font(300, 100), rgba(IVORY))
    draw_text(img, (M, 262), f'{c.N_LAYOUTS} layouts in each series.', font(400, 38), rgba(IVORY, 0.7))
    gap = 20
    cw, ch = (W - M * 2 - gap * 2) // 3, 290
    for i, mod in enumerate(b.MODULES):
        x = M + (i % 3) * (cw + gap)
        y = 350 + (i // 3) * (ch + gap)
        rounded(img, (x, y, x + cw, y + ch), 12, fill=rgba(CARD), outline=rgba(GOLD, 0.3), width=2)
        series = 'color' if i % 2 == 0 else 'edge'
        lay = b.panel(series, b.REP[mod], 560, shadow=False)
        lay = lay.crop((70, 70, lay.width - 70, lay.height - 70))  # the panel only, no margin
        s = min((cw - 56) / lay.width, (ch - 110) / lay.height)
        lay = lay.resize((int(lay.width * s), int(lay.height * s)), Image.LANCZOS)
        paste(img, lay, (x + (cw - lay.width) // 2, y + 24 + (ch - 110 - lay.height) // 2))
        draw_text(img, (x + cw // 2, y + ch - 70), mod, font(500, 38), rgba(GOLD), anchor='m')
    draw_lines(img, (M, 985), b.wrap('Switches, sockets, fan and curtain control, dimmers, a USB charger and a doorbell.', font(400, 29), 920), font(400, 29), rgba(IVORY, 0.75), 40)
    b.pill_button(img, (M, 1106), 'Tell us about your room', font(600, 30), anchor='l')
    footer(img)
    return img


def post5():
    img = Image.new('RGBA', (W, H), rgba(BLACK))
    ph = b.scene_photo('living')
    ch = int(ph.width * 640 / W)
    top = int(0.40 * ph.height - ch / 2)
    crop = ph.crop((0, top, ph.width, top + ch)).resize((W, 640), Image.LANCZOS).convert('RGBA')
    img.alpha_composite(crop, (0, 0))
    img.alpha_composite(b.vgrad((W, 260), (9, 11, 10, 0), (9, 11, 10, 255)), (0, 380))
    eyebrow(img, 'Built to last', y=690)
    draw_text(img, (M, 740), f'A {c.WARRANTY}.', font(300, 90), rgba(IVORY))
    draw_lines(img, (M, 860), b.wrap('Choose the panels, we help you plan the wall. Installed by your own licensed electrician.', font(400, 31), 900), font(400, 31), rgba(IVORY, 0.75), 44)
    x0, y0, x1, y1 = M, 970, W - M, 1170
    rounded(img, (x0, y0, x1, y1), 14, fill=rgba(CARD), outline=rgba(GOLD, 0.5), width=2)
    draw_text(img, (x0 + 40, y0 + 30), c.CTA_SHORT.upper(), font(600, 24), rgba(GOLD), tracking=6)
    draw_text(img, (x0 + 40, y0 + 72), f'WhatsApp {b.PHONE}', font(500, 44), rgba(IVORY))
    draw_text(img, (x0 + 40, y0 + 140), ' | '.join([b.EMAIL] + ([b.SITE_URL.split('//')[-1]] if b.SITE_URL else [])), font(400, 28), rgba(IVORY, 0.75))
    footer(img, note=f'{c.WARRANTY_NOTE} {c.SOLD_BY}', contact=False)
    return img


BUILDERS = [post1, post2, post3, post4, post5]


def build(out_dir):
    out_dir.mkdir(parents=True, exist_ok=True)
    for spec, fn in zip(c.POSTS, BUILDERS):
        img = fn().convert('RGB')
        img.save(out_dir / f"{spec['id']}.png", optimize=True)
        print('post', spec['id'], img.size)
