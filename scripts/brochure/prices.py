"""
Price step of the brochure rebrand: raises every panel price in a supplier price list.

For each panel price cell the brochure shows a struck-through "unit price", a "50% OFF" badge and a bold
"discounted price" (unit price / 2, rounded up). To keep the printed 50% true after the increase:

    new bold price  = old bold price + ADD
    new unit price  = old unit price + 2 * ADD        (so unit / 2 still rounds up to the new bold price)

The old numbers are really removed from the PDF (redacted), not just covered, so nobody can copy the
supplier prices out of the file. The new numbers use the same typeface, size, colour and centre as the old
ones, and the red strike-through line is redrawn at the same slope across the new width.
Accessory pages (IR blaster, gateways, remote, custom icon) are left alone.
"""
import re
from pathlib import Path

import pymupdf as fitz
from PIL import Image

SYS = Path('/System/Library/Fonts/Supplemental')
FONTS = {'ArialNarrow-Bold': SYS / 'Arial Narrow Bold.ttf', 'Arial-BoldMT': SYS / 'Arial Bold.ttf'}
NUM = re.compile(r'^(\d{3,6})(/{1,2}-)?$')   # one price in the Color list has a typo, "15884//-"
SKIP_WORDS = ('IR BLASTER', 'REMOTE', 'CUSTOM ICON', 'GATEWAY')
UNIT_MAX_SIZE = {'ArialNarrow-Bold': 30, 'Arial-BoldMT': 15}   # struck-through "unit" numbers are the small ones


def _sample_color(pix, rect, scale):
    """Colour of the glyphs inside rect: the pixels furthest from the background (median) colour."""
    x0, y0, x1, y1 = [int(v * scale) for v in rect]
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples).crop((x0, y0, x1, y1))
    px = list(im.getdata())
    r = sorted(p[0] for p in px)[len(px) // 2]
    g = sorted(p[1] for p in px)[len(px) // 2]
    b = sorted(p[2] for p in px)[len(px) // 2]
    far = sorted(px, key=lambda p: -((p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2))[:max(4, len(px) // 25)]
    c = tuple(sum(p[i] for p in far) / len(far) / 255 for i in range(3))
    return c


def _spans(page):
    out = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            for s in l['spans']:
                m = NUM.match(s['text'].strip())
                if m and s['font'] in FONTS:
                    out.append((s, m.group(1), m.group(2) or ''))
    return out


def reprice_page(page, add):
    """Returns a list of (old, new) pairs applied on this page."""
    text = page.get_text().upper()
    if any(w in text for w in SKIP_WORDS):
        return []
    spans = _spans(page)
    if not spans:
        return []
    scale = 3
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
    strikes = [d for d in page.get_drawings() if d['type'] == 's' and d.get('color') and d['color'][0] > 0.9 and d['color'][1] < 0.1 and d['color'][2] < 0.1]
    jobs = []
    for s, digits, suffix in spans:
        # the "50%" badge is not a price; prices are 3 or more digits
        unit = s['size'] < UNIT_MAX_SIZE[s['font']]
        old = int(digits)
        new = old + (2 * add if unit else add)
        rect = fitz.Rect(s['bbox'])
        # struck-through unit prices report their real colour; the bold prices use a gradient the parser cannot read, so measure those
        color = tuple(((s['color'] >> sh) & 255) / 255 for sh in (16, 8, 0)) if unit else _sample_color(pix, rect + (2, 2, -2, -2), scale)
        line = None
        if unit:
            for d in strikes:
                if fitz.Rect(d['rect']).intersects(rect + (-14, -6, 14, 6)):
                    line = d
                    break
        suffix = '/-' if suffix else ''
        jobs.append(dict(span=s, old=digits, suffix=suffix, new=str(new), unit=unit, rect=rect, color=color, line=line))
    # every struck price must be exactly twice its bold price (rounded up). The supplier files have a few slips
    # (a bold price equal to the struck one); those are recomputed from the struck price so the 50% stays true.
    units = [j for j in jobs if j['unit']]
    anomalies = []
    for j in jobs:
        if not j['unit']:
            near = min(units, key=lambda u: abs(u['rect'].x0 - j['rect'].x0) + abs(u['rect'].y0 - j['rect'].y0), default=None)
            if near and -(-int(near['old']) // 2) != int(j['old']):
                j['new'] = str(-(-int(near['old']) // 2) + add)
                anomalies.append((near['old'], j['old'], -(-int(near['old']) // 2)))
    for u, bo, fixed in anomalies:
        print(f"  note: page {page.number + 1}: struck {u} but bold {bo}; bold treated as {fixed} before the increase")
    # 1. remove old numbers and strike lines
    for j in jobs:
        area = j['rect']
        if j['line']:
            area = area | fitz.Rect(j['line']['rect'])
        page.add_redact_annot(area + (-0.4, -0.4, 0.4, 0.4))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
    # 2. write the new numbers
    used = {}
    for j in jobs:
        s = j['span']
        fname = 'F' + re.sub(r'\W', '', s['font'])
        if fname not in used:
            page.insert_font(fontname=fname, fontfile=str(FONTS[s['font']]))
            used[fname] = fitz.Font(fontfile=str(FONTS[s['font']]))
        font = used[fname]
        text = j['new'] + j['suffix']
        w = font.text_length(text, fontsize=s['size'])
        cx = (j['rect'].x0 + j['rect'].x1) / 2
        x = cx - w / 2
        page.insert_text((x, s['origin'][1]), text, fontname=fname, fontsize=s['size'], color=j['color'])
        if j['line']:
            (_, p1, p2) = j['line']['items'][0]
            pad_l = j['rect'].x0 - min(p1.x, p2.x)
            pad_r = max(p1.x, p2.x) - j['rect'].x1
            left_low = p1.x < p2.x and p1.y > p2.y   # which end is lower
            xa, xb = x - pad_l, x + w + pad_r
            ya, yb = (p1.y, p2.y) if p1.x < p2.x else (p2.y, p1.y)
            page.draw_line((xa, ya), (xb, yb), color=(1, 0, 0), width=j['line']['width'])
    return [(j['old'] + j['suffix'], j['new'] + j['suffix']) for j in jobs]


def reprice(doc, add):
    log = {}
    for i, page in enumerate(doc, 1):
        done = reprice_page(page, add)
        if done:
            log[i] = done
    return log
