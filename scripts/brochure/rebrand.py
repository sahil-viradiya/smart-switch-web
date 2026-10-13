#!/usr/bin/env python3
"""
Rebrands the two supplier price lists (Color and Edge) as Euxora Digital price lists, in two price levels.

    python scripts/brochure/rebrand.py "<Color Price List.pdf>" "<Edge Price List.pdf>"

Writes four PDFs to marketing/brochures/:  Euxora-Color-Price-List-2026-B2B.pdf, ...-B2C.pdf, and the same for Edge.

What changes (and nothing else: colours, product images, layout and wording stay as they are):
  * the supplier's logo and name become the Euxora Digital logo (public/images/logo.png) and name;
  * the supplier's website, address, phone and e-mail become Euxora Digital's (from src/config/site.ts);
  * the supplier-only marks are removed: "Made in India" flag and badge, the ISO certificate line, the supplier's
    company history, and the supplier name printed on the product photos;
  * every panel price goes up by ADD (B2B +2000, B2C +5000). The printed "50% OFF" stays true: see prices.py;
  * the document properties (title, author, producer) are replaced.
Accessory prices (IR blaster, gateways, remote, custom icon) are not changed.

Needs: pip install pymupdf pillow opencv-python-headless numpy, and the Inter font files from `npm install`.
"""
import io
import re
import sys
from pathlib import Path

import cv2
import numpy as np
import pymupdf as fitz
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))
import prices  # noqa: E402

OUT = ROOT / 'marketing' / 'brochures'
FONT_DIR = ROOT / 'node_modules' / '@fontsource' / 'inter' / 'files'
SYS = Path('/System/Library/Fonts/Supplemental')
ARIAL_NARROW_BOLD = SYS / 'Arial Narrow Bold.ttf'
ARIAL_BOLD = SYS / 'Arial Bold.ttf'
LEVELS = {'B2B': 2000, 'B2C': 5000}


# ---- facts from the website's own config -----------------------------------------------------------------
def _read(rel):
    return (ROOT / 'src' / rel).read_text(encoding='utf8')


def _hex(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


_site = _read('config/site.ts')
_g = lambda k: re.search(k + r":\s*'([^']*)'", _site).group(1)
COMPANY = re.search(r"entityName:\s*'([^']*)'", _read('config/legal.ts')).group(1)
PHONE, EMAIL, TAGLINE = _g('PHONE'), _g('SALES_EMAIL'), _g('BRAND_TAGLINE')
ADDR = {k: re.search(k + r":\s*'([^']*)'", _site).group(1) for k in ('street', 'area', 'city', 'region', 'postalCode', 'country')}
ADDRESS_LINES = [ADDR['street'], f"{ADDR['area']}, {ADDR['city']}", f"{ADDR['region']} {ADDR['postalCode']}", ADDR['country']]
_colors = {k: _hex(v) for k, v in re.findall(r"^\s*(\w+):\s*'(#[0-9a-fA-F]{6})'", _read('theme/colors.ts'), re.M)}
IVORY, GOLD, GOLD_DEEP, INK = _colors['ivory'], _colors['gold'], _colors['goldDeep'], _colors['black']
ABOUT = ('Smart Switch is sold by Euxora Digital. You deal with a person, by phone, WhatsApp or email, '
         'and quotations and warranty terms are confirmed in writing.')


# ---- the new logo ----------------------------------------------------------------------------------------
def lockup(variant, height=520):
    """Emblem on the left, EUXORA over DIGITAL on the right. variant 'dark' is for dark pages, 'light' for white ones."""
    word_c, sub_c = (IVORY, GOLD) if variant == 'dark' else (INK, GOLD_DEEP)
    mark = Image.open(ROOT / 'public' / 'images' / 'logo.png').convert('RGBA').resize((height, height), Image.LANCZOS)
    f1 = ImageFont.truetype(str(FONT_DIR / 'inter-latin-600-normal.woff'), int(height * 0.40))
    f2 = ImageFont.truetype(str(FONT_DIR / 'inter-latin-500-normal.woff'), int(height * 0.255))

    def line(txt, f, fill, track):
        w = int(sum(f.getlength(c) + track for c in txt)) + 8
        lay = Image.new('RGBA', (w, int(height * 0.6)), (0, 0, 0, 0))
        d = ImageDraw.Draw(lay)
        x = 4
        for c in txt:
            d.text((x, 0), c, font=f, fill=(*fill, 255))
            x += f.getlength(c) + track
        return lay.crop(lay.getbbox()), x
    a, _ = line(COMPANY.split()[0].upper(), f1, word_c, height * 0.045)
    b, _ = line(COMPANY.split()[1].upper(), f2, sub_c, height * 0.075)
    gap, inner = int(height * 0.04), int(height * 0.075)
    text_h = a.height + inner + b.height
    W = height + int(height * 0.12) + max(a.width, b.width)
    out = Image.new('RGBA', (W, height), (0, 0, 0, 0))
    out.alpha_composite(mark, (0, 0))
    y0 = (height - text_h) // 2
    out.alpha_composite(a, (height + int(height * 0.12), y0))
    out.alpha_composite(b, (height + int(height * 0.12) + 2, y0 + a.height + inner))
    return out.crop(out.getbbox())


_png_cache = {}


def logo_png(variant):
    if variant not in _png_cache:
        buf = io.BytesIO()
        lockup(variant).save(buf, 'PNG')
        _png_cache[variant] = buf.getvalue()
    return _png_cache[variant]


def put_logo(page, rect, variant='auto', align='center'):
    """Draw the lockup inside rect, as large as fits, aligned left, centre or right.
    'auto' looks at the page behind the logo: light text on dark pages, dark text on light ones."""
    r = fitz.Rect(rect)
    if variant == 'auto':
        pix = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5), clip=r, alpha=False)
        px = list(Image.frombytes('RGB', (pix.width, pix.height), pix.samples).convert('L').getdata())
        variant = 'light' if sum(px) / len(px) > 150 else 'dark'
    im = lockup(variant)
    ratio = im.width / im.height
    h = min(r.height, r.width / ratio)
    w = h * ratio
    x = {'left': r.x0, 'right': r.x1 - w}.get(align, r.x0 + (r.width - w) / 2)
    y = r.y0 + (r.height - h) / 2
    page.insert_image(fitz.Rect(x, y, x + w, y + h), stream=logo_png(variant))


# ---- removing supplier items -----------------------------------------------------------------------------
def strip(page, rect, images=True):
    """Remove the vector drawings that sit entirely inside rect, and small images inside it (logos, badges)."""
    r = fitz.Rect(rect)
    # a stroked line is only "covered" if the rectangle also clears its stroke width, so pad it a little
    page.add_redact_annot(r + (-3, -3, 3, 3))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
    if images:
        for im in page.get_image_info(xrefs=True):
            b = fitz.Rect(im['bbox'])
            if im['xref'] and b.width < 500 and r.contains(b + (-2, -2, 2, 2)):
                page.delete_image(im["xref"])


def erase(page, rect, feather=3):
    """Paint out a faint leftover (a logo baked into the artwork) by filling the area from the background around it."""
    Z = 5
    r = fitz.Rect(rect)
    ctx = r + (-8, -8, 8, 8)
    pix = page.get_pixmap(matrix=fitz.Matrix(Z, Z), clip=ctx, alpha=False)
    img = np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, 3).copy()
    mask = np.zeros(img.shape[:2], np.uint8)
    m = int(8 * Z)
    mask[m:-m, m:-m] = 255
    fixed = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
    soft = cv2.GaussianBlur(mask, (feather * 2 * Z + 1, feather * 2 * Z + 1), 0)
    buf = io.BytesIO()
    Image.fromarray(np.dstack([fixed, soft]), 'RGBA').save(buf, 'PNG')
    page.insert_image(ctx, stream=buf.getvalue(), overlay=True)


def remove_marks(page, marks, thresh=5):
    """Paint out the supplier name printed on a product photo.

    The letters are lighter than the glass around them, so find everything lighter than a heavily blurred copy of the
    area (inside an ellipse around each mark, so the metal rim is left alone), grow that a little to cover the soft
    edges, and fill it from the surrounding glass.
    """
    Z = 6
    for (cx, cy, angle, rx, ry) in marks:
        r = fitz.Rect(cx - 24, cy - 16, cx + 24, cy + 16)
        pix = page.get_pixmap(matrix=fitz.Matrix(Z, Z), clip=r, alpha=False)
        img = np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, 3).copy()
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        bg = cv2.medianBlur(gray, 6 * Z * 2 + 1)
        diff = cv2.subtract(gray, bg)
        mask = (diff > thresh).astype(np.uint8) * 255
        ell = np.zeros_like(mask)
        cv2.ellipse(ell, (pix.width // 2, pix.height // 2), (int(rx * Z), int(ry * Z)), angle, 0, 360, 255, -1)
        mask = cv2.bitwise_and(mask, ell)
        mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * Z + 1, 2 * Z + 1)))
        fixed = cv2.inpaint(img, mask, 2 * Z, cv2.INPAINT_TELEA)
        alpha = cv2.GaussianBlur(mask, (Z * 2 + 1, Z * 2 + 1), 0)
        buf = io.BytesIO()
        Image.fromarray(np.dstack([fixed, alpha]), 'RGBA').save(buf, 'PNG')
        page.insert_image(r, stream=buf.getvalue(), overlay=True)


# ---- Euxora text -----------------------------------------------------------------------------------------
def text(page, xy, s, size, color=(1, 1, 1), font='nb', align='left'):
    path = ARIAL_NARROW_BOLD if font == 'nb' else ARIAL_BOLD
    name = 'EuxNB' if font == 'nb' else 'EuxAB'
    page.insert_font(fontname=name, fontfile=str(path))
    f = fitz.Font(fontfile=str(path))
    w = f.text_length(s, fontsize=size)
    x = xy[0] - (w if align == 'right' else w / 2 if align == 'center' else 0)
    page.insert_text((x, xy[1]), s, fontname=name, fontsize=size, color=color)
    return w


def wrap(s, size, width, font=ARIAL_NARROW_BOLD):
    f = fitz.Font(fontfile=str(font))
    lines, cur = [], ''
    for w in s.split():
        t = (cur + ' ' + w).strip()
        if f.text_length(t, fontsize=size) <= width or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def contact_block(page, x, y, width, color=(1, 1, 1), line_color=None, align='left', size=13):
    """Heading, address, e-mail and phone, in the style the supplier block had."""
    line_color = line_color or color
    cx = x + width / 2 if align == 'center' else x
    text(page, (cx, y), COMPANY.upper(), size + 4, color, align=align)
    page.draw_line((x, y + 9), (x + width, y + 9), color=line_color, width=1)
    yy = y + 9 + 5 + size
    for ln in [', '.join(ADDRESS_LINES[:2]) + ',', ', '.join(ADDRESS_LINES[2:])]:
        text(page, (cx, yy), ln, size, color, align=align)
        yy += size + 5
    yy += 4
    text(page, (cx, yy), f'{EMAIL}    |    WhatsApp {PHONE}', size, color, align=align)
    return yy


# ---- page by page ----------------------------------------------------------------------------------------
LIFESTYLE_COLOR = (6, 8, 12, 18, 27)
LIFESTYLE_EDGE = (6, 8, 12, 18, 27)


def rebrand_color(doc):
    P = lambda n: doc[n - 1]
    # cover
    strip(P(1), (839, 49, 1145, 147)); put_logo(P(1), (850, 55, 1136, 143), 'dark', 'right')
    strip(P(1), (39, 39, 178, 91)); erase(P(1), (36, 36, 180, 94))
    strip(P(1), (470, 757, 722, 792), images=False)
    text(P(1), (474, 780), f'WhatsApp {PHONE}   |   {EMAIL}', 14, (1, 1, 1), font='ab')
    remove_marks(P(1), [(821, 329, -39, 19, 7)])      # (x, y, slope in degrees, half length, half height) in points
    # lifestyle pages and the "works with" page: the small logo in the top-left box
    for n in LIFESTYLE_COLOR + (41,):
        strip(P(n), (80, 72, 240, 130)); put_logo(P(n), (86, 80, 232, 124), 'dark')
    # terms
    strip(P(40), (66, 34, 332, 126)); put_logo(P(40), (80, 42, 313, 116), 'dark', 'left')
    # last page
    p = P(42)
    strip(p, (147, 600, 410, 684)); put_logo(p, (150, 604, 404, 680), 'light')
    strip(p, (528, 440, 1144, 775), images=False)                 # About us, company block, separator lines
    text(p, (837, 462), 'About us', 15, (1, 1, 1), align='center')
    yy = 492
    for ln in wrap(ABOUT, 13, 560):
        text(p, (837, yy), ln, 13, (1, 1, 1), align='center'); yy += 19
    contact_block(p, 548, 640, 575, align='center')
    # "Designed & Manufactured in India" badge: keep the shield and pill, say who sells it instead
    strip(p, (880, 82, 938, 118), images=False)
    strip(p, (962, 78, 1090, 130), images=False)
    for im in p.get_image_info(xrefs=True):
        if im['width'] == 72 and im['height'] == 33:
            p.delete_image(im["xref"])
    p.insert_image(fitz.Rect(889, 83, 931, 113), stream=Path(ROOT / 'public/images/logo.png').read_bytes())
    text(p, (968, 100), 'SOLD BY', 11, (1, 1, 1)); text(p, (968, 116), COMPANY, 13, (1, 1, 1))
    paragraph_color(p)


def paragraph_color(p):
    """The left card paragraph, without the line that calls the product the best in India."""
    strip(p, (62, 296, 490, 540), images=False)
    body = ('Color is the latest in Home automation technology. With its sleek design and advanced functionality, '
            'Color is a game-changer in the world of home automation with RGB colors to customize your Touch switch. '
            'You can adjust the saturation and brightness of any color to create your perfect shade. '
            'And with the ability to set cool icons for your switches, you can truly make it your own.')
    y = 308
    for ln in wrap(body, 13.5, 395):
        text(p, (74, y), ln, 13.5, (0, 0, 0)); y += 25


def rebrand_edge(doc):
    P = lambda n: doc[n - 1]
    strip(P(1), (895, 40, 1150, 130)); put_logo(P(1), (900, 48, 1142, 124), 'auto', 'right')
    strip(P(1), (40, 40, 195, 105))
    remove_marks(P(1), [(354, 441, -12, 25, 7), (754, 300, -15, 20, 7), (682, 511, -15, 21, 7), (1090, 351, -20, 20, 8)])
    for n in LIFESTYLE_EDGE:
        strip(P(n), (895, 38, 1152, 130)); put_logo(P(n), (905, 42, 1148, 118), 'auto', 'right')
    for n in (40, 41):
        strip(P(n), (40, 40, 300, 125)); put_logo(P(n), (51, 50, 293, 120), 'dark', 'left')
    p = P(42)
    strip(p, (460, 55, 735, 148)); put_logo(p, (468, 62, 724, 140), 'dark')
    strip(p, (500, 170, 690, 208), images=False)                   # ISO line
    strip(p, (40, 225, 570, 715), images=False)                    # About us, mission, vision
    text(p, (306, 420), 'About us', 20, (1, 1, 1), align='center')
    yy = 456
    for ln in wrap(ABOUT, 17, 440):
        text(p, (306, yy), ln, 17, (1, 1, 1), align='center'); yy += 27
    strip(p, (610, 560, 1160, 720), images=False)                  # company block
    contact_block(p, 640, 592, 480, align='center', size=13)
    # "Designed & Manufactured in India" badge: keep the shield and pill, say who sells it instead
    strip(p, (911, 246, 972, 288), images=False)
    strip(p, (996, 244, 1092, 296), images=False)
    for im in p.get_image_info(xrefs=True):
        if im['width'] == 72 and im['height'] == 33:
            p.delete_image(im["xref"])
    p.insert_image(fitz.Rect(921, 246, 960, 285), stream=Path(ROOT / 'public/images/logo.png').read_bytes())
    text(p, (1001, 262), 'SOLD BY', 11, (0.28, 0.28, 0.27)); text(p, (1001, 280), COMPANY, 14, (0.28, 0.28, 0.27))


def finish(doc, series, level):
    doc.set_metadata({'title': f'{COMPANY} {series} Price List 2026 ({level})', 'author': COMPANY, 'subject': f'{series} series price list, {level}',
                      'keywords': '', 'creator': COMPANY, 'producer': COMPANY})
    doc.del_xml_metadata()


def build(color_pdf, edge_pdf):
    OUT.mkdir(exist_ok=True)
    for series, src, fn in (('Color', color_pdf, rebrand_color), ('Edge', edge_pdf, rebrand_edge)):
        for level, add in LEVELS.items():
            doc = fitz.open(src)
            log = prices.reprice(doc, add)
            fn(doc)
            finish(doc, series, level)
            out = OUT / f'Euxora-{series}-Price-List-2026-{level}.pdf'
            doc.save(out, garbage=4, deflate=True, clean=True)
            print(f'{out.name}: {sum(len(v) for v in log.values())} prices on {len(log)} pages (+{add})')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    build(sys.argv[1], sys.argv[2])
