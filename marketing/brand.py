"""
Brand facts and drawing helpers for the marketing builder.

Nothing is typed twice: colours come from src/theme/colors.ts, contact details from src/config/site.ts,
the warranty from src/config/specs.ts, the company name from src/config/legal.ts, and the product counts
from src/content/catalog/products.data.ts. Change them there and rebuild.
"""
import os, re
from functools import lru_cache
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
IMG = ROOT / 'public' / 'images'
FONT_DIR = ROOT / 'node_modules' / '@fontsource' / 'inter' / 'files'


def _read(rel: str) -> str:
    return (SRC / rel).read_text(encoding='utf8')


def _hex(h: str):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


# ---- facts read from the site's own config ---------------------------------------------------------------
COLORS = {k: _hex(v) for k, v in re.findall(r"^\s*(\w+):\s*'(#[0-9a-fA-F]{6})'", _read('theme/colors.ts'), re.M)}
_site = _read('config/site.ts')
_grab = lambda key: re.search(key + r":\s*'([^']*)'", _site).group(1)
BRAND = _grab('BRAND_NAME')
TAGLINE = _grab('BRAND_TAGLINE')
PHONE = _grab('PHONE')
EMAIL = _grab('SALES_EMAIL')
WHATSAPP = _grab('WHATSAPP_NUMBER')
COMPANY = re.search(r"entityName:\s*'([^']*)'", _read('config/legal.ts')).group(1) or BRAND
ADDR = {k: re.search(k + r":\s*'([^']*)'", _site).group(1) for k in ('street', 'area', 'city', 'region', 'postalCode', 'country')}
ADDRESS_ONE_LINE = f"{ADDR['street']}, {ADDR['area']}, {ADDR['city']} {ADDR['postalCode']}"
WARRANTY_YEARS = int(re.search(r"warrantyYears:\s*(\d+)", _read('config/specs.ts')).group(1))
_env_url = os.environ.get('NEXT_PUBLIC_SITE_URL', '')
SITE_URL = _env_url.rstrip('/') if _env_url and 'localhost' not in _env_url else ''  # shown on images only once it is real

_rows = re.findall(r"id: '([^']+)', module: '(\w+)'.*?(color: \[[\d, ]+\])?(?:, (edge: \[[\d, ]+\]))?\s*\},?\s*$", _read('content/catalog/products.data.ts'), re.M)
ROWS = [(i, m, bool(c), bool(e)) for i, m, c, e in _rows]
MODULES = sorted({m for _, m, _, _ in ROWS}, key=lambda m: int(m[:-1]))
LAYOUTS_PER_SERIES = {'color': sum(1 for r in ROWS if r[2]), 'edge': sum(1 for r in ROWS if r[3])}
LAYOUTS_TOTAL = len(ROWS)
KINDS = {k: (label, art) for k, label, art in re.findall(r"id: '(\w+)', label: '([^']+)', blurb: (?:'[^']*'|`[^`]*`), art: '([^']+)'", _read('content/catalog/options.ts'))}
REP = dict(re.findall(r"'(\d+M)':\s*'([^']+)'", _read('content/catalog/options.ts')))

# ---- colours ---------------------------------------------------------------------------------------------
BLACK, SOFT, CARD = COLORS['black'], COLORS['blackSoft'], COLORS['cardDark']
GOLD, GOLD_LIGHT, GOLD_DEEP = COLORS['gold'], COLORS['goldLight'], COLORS['goldDeep']
IVORY, WHITE, PAPER, GLOW = COLORS['ivory'], COLORS['white'], COLORS['paper'], COLORS['glow']
STAGE_GLOW = (78, 58, 24)  # warm glow behind a panel (same as the website film)


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rgba(c, a=1.0):
    return (*c, int(255 * a))


# ---- fonts and text --------------------------------------------------------------------------------------
@lru_cache(maxsize=None)
def font(weight: int, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / f'inter-latin-{weight}-normal.woff'), size)


def text_width(txt, f, tracking=0):
    return f.getlength(txt) + tracking * max(len(txt) - 1, 0)


def text_layer(txt, f, fill, tracking=0):
    """Transparent image holding one line of text (so it can be faded and moved)."""
    w = int(text_width(txt, f, tracking)) + 8
    asc, desc = f.getmetrics()
    lay = Image.new('RGBA', (w, asc + desc + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    if tracking == 0:
        d.text((4, 4), txt, font=f, fill=fill)
    else:
        x = 4
        for ch in txt:
            d.text((x, 4), ch, font=f, fill=fill)
            x += f.getlength(ch) + tracking
    return lay


def wrap(txt, f, max_w):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if text_width(t, f) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines


def paste(base: Image.Image, layer: Image.Image, xy, opacity=1.0, anchor='l'):
    """Alpha-composite `layer` onto RGBA/RGB `base`. anchor l/m/r positions xy[0] at the layer's left/middle/right."""
    x, y = int(xy[0]), int(xy[1])
    if anchor == 'm':
        x -= layer.width // 2
    elif anchor == 'r':
        x -= layer.width
    if opacity < 1.0:
        layer = layer.copy()
        layer.putalpha(layer.getchannel('A').point(lambda v: int(v * opacity)))
    base.alpha_composite(layer, (x, y)) if base.mode == 'RGBA' else base.paste(layer, (x, y), layer)


def draw_text(base, xy, txt, f, fill, tracking=0, anchor='l', opacity=1.0):
    paste(base, text_layer(txt, f, fill, tracking), (xy[0], xy[1]), opacity, anchor)


def draw_lines(base, xy, lines, f, fill, gap, anchor='l', opacity=1.0, tracking=0):
    y = xy[1]
    for ln in lines:
        draw_text(base, (xy[0], y), ln, f, fill, tracking, anchor, opacity)
        y += gap
    return y


# ---- shapes ----------------------------------------------------------------------------------------------
def rounded(base, box, radius, fill=None, outline=None, width=1):
    """Anti-aliased rounded rectangle (drawn 3x then reduced)."""
    x0, y0, x1, y1 = [int(v) for v in box]
    w, h, s = x1 - x0, y1 - y0, 3
    lay = Image.new('RGBA', (w * s, h * s), (0, 0, 0, 0))
    ImageDraw.Draw(lay).rounded_rectangle((0, 0, w * s - 1, h * s - 1), radius * s, fill=fill, outline=outline, width=width * s)
    paste(base, lay.resize((w, h), Image.LANCZOS), (x0, y0))


def pill_button(base, xy, label, f, anchor='m', opacity=1.0, pad=(46, 26)):
    """Gold call-to-action block (an image, not a link)."""
    tl = text_layer(label, f, rgba(BLACK))
    w, h = tl.width + pad[0] * 2, tl.height + pad[1] * 2 - 8
    lay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    rounded(lay, (0, 0, w, h), 12, fill=rgba(GOLD))
    paste(lay, tl, (pad[0], (h - tl.height) // 2))
    paste(base, lay, xy, opacity, anchor)
    return w, h


def stage(size, glow_center=(0.5, 0.42), glow_r=0.42):
    """Dark gold-lit backdrop, the same look as the website product stage."""
    w, h = size
    bg = Image.new('RGB', size, BLACK)
    g = Image.new('RGB', size, (0, 0, 0))
    cx, cy, r = int(w * glow_center[0]), int(h * glow_center[1]), int(min(w, h) * glow_r)
    ImageDraw.Draw(g).ellipse((cx - r, cy - int(r * 0.8), cx + r, cy + int(r * 0.8)), fill=STAGE_GLOW)
    g = g.filter(ImageFilter.GaussianBlur(r * 0.45))
    bg = Image.blend(bg, g, 0.9)
    return bg.convert('RGBA')


# ---- icons (drawn 4x then reduced so edges stay smooth) -------------------------------------------------
def icon(name, size, color, width=6):
    S = 4
    N = size * S
    lay = Image.new('RGBA', (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    u = lambda v: v * N / 100.0
    wd = int(u(width))
    c = rgba(color)
    if name == 'touch':
        d.ellipse((u(22), u(22), u(78), u(78)), outline=c, width=wd)
        d.ellipse((u(41), u(41), u(59), u(59)), fill=c)
        d.ellipse((u(8), u(8), u(92), u(92)), outline=rgba(color, 0.35), width=max(2, wd // 2))
    elif name == 'app':
        d.rounded_rectangle((u(28), u(8), u(72), u(92)), u(10), outline=c, width=wd)
        d.line((u(43), u(80), u(57), u(80)), fill=c, width=wd)
    elif name == 'voice':
        d.rounded_rectangle((u(38), u(8), u(62), u(54)), u(12), outline=c, width=wd)
        d.arc((u(24), u(30), u(76), u(76)), 0, 180, fill=c, width=wd)
        d.line((u(50), u(76), u(50), u(90)), fill=c, width=wd)
        d.line((u(38), u(90), u(62), u(90)), fill=c, width=wd)
    elif name == 'remote':
        d.rounded_rectangle((u(30), u(6), u(70), u(94)), u(10), outline=c, width=wd)
        d.ellipse((u(43), u(16), u(57), u(30)), fill=c)
        for px, py in ((40, 48), (60, 48), (40, 64), (60, 64), (40, 80), (60, 80)):
            d.ellipse((u(px - 4), u(py - 4), u(px + 4), u(py + 4)), fill=c)
    elif name == 'bulb':
        d.ellipse((u(26), u(10), u(74), u(58)), outline=c, width=wd)
        d.line((u(38), u(54), u(38), u(68)), fill=c, width=wd)
        d.line((u(62), u(54), u(62), u(68)), fill=c, width=wd)
        d.line((u(36), u(70), u(64), u(70)), fill=c, width=wd)
        d.line((u(42), u(82), u(58), u(82)), fill=c, width=wd)
    elif name == 'fan':
        blade = Image.new('RGBA', (N, N), (0, 0, 0, 0))
        ImageDraw.Draw(blade).ellipse((u(44), u(8), u(70), u(46)), outline=c, width=wd)
        for ang in (0, 120, 240):
            lay.alpha_composite(blade.rotate(ang, center=(N / 2, N / 2), resample=Image.BICUBIC))
        d.ellipse((u(42), u(42), u(58), u(58)), fill=c)
    elif name == 'curtain':
        d.line((u(10), u(14), u(90), u(14)), fill=c, width=wd)
        for x0, x1 in ((16, 46), (54, 84)):
            d.rounded_rectangle((u(x0), u(22), u(x1), u(88)), u(4), outline=c, width=wd)
            d.line((u((x0 + x1) / 2), u(30), u((x0 + x1) / 2), u(80)), fill=c, width=max(2, wd // 2))
    elif name == 'dimmer':
        d.ellipse((u(30), u(30), u(70), u(70)), outline=c, width=wd)
        d.pieslice((u(30), u(30), u(70), u(70)), 90, 270, fill=c)
        import math
        for k in range(8):
            a = math.radians(k * 45)
            d.line((u(50 + 28 * math.cos(a)), u(50 + 28 * math.sin(a)), u(50 + 40 * math.cos(a)), u(50 + 40 * math.sin(a))), fill=c, width=wd)
    elif name == 'socket':
        d.rounded_rectangle((u(14), u(14), u(86), u(86)), u(14), outline=c, width=wd)
        for px, py in ((36, 40), (64, 40), (50, 66)):
            d.ellipse((u(px - 6), u(py - 6), u(px + 6), u(py + 6)), fill=c)
    elif name == 'scene':
        for i, (x0, y0) in enumerate(((14, 14), (54, 14), (14, 54), (54, 54))):
            d.rounded_rectangle((u(x0), u(y0), u(x0 + 32), u(y0 + 32)), u(7), outline=c, width=wd, fill=c if i == 1 else None)
    elif name == 'chat':
        d.rounded_rectangle((u(10), u(14), u(90), u(70)), u(16), outline=c, width=wd)
        d.polygon([(u(26), u(68)), (u(26), u(88)), (u(46), u(69))], fill=c)
        for px in (32, 50, 68):
            d.ellipse((u(px - 4), u(38), u(px + 4), u(46)), fill=c)
    elif name == 'doc':
        d.rounded_rectangle((u(22), u(8), u(78), u(92)), u(8), outline=c, width=wd)
        for y in (30, 46, 62):
            d.line((u(34), u(y), u(66), u(y)), fill=c, width=wd)
        d.line((u(34), u(78), u(52), u(78)), fill=c, width=wd)
    elif name == 'check':
        d.line((u(18), u(52), u(42), u(76), u(84), u(26)), fill=c, width=wd + 2, joint='curve')
    elif name == 'hub':
        d.ellipse((u(38), u(38), u(62), u(62)), fill=c)
        for x, y in ((50, 10), (14, 76), (86, 76)):
            d.line((u(50), u(50), u(x), u(y)), fill=c, width=wd)
            d.ellipse((u(x - 8), u(y - 8), u(x + 8), u(y + 8)), outline=c, width=wd)
    elif name == 'wifi':
        for r in (44, 30, 16):
            d.arc((u(50 - r), u(70 - r), u(50 + r), u(70 + r)), 225, 315, fill=c, width=wd)
        d.ellipse((u(44), u(64), u(56), u(76)), fill=c)
    return lay.resize((size, size), Image.LANCZOS)


def logo_lockup(base, xy, scale=1.0, opacity=1.0, tagline=False, align='l'):
    """The brand emblem (public/images/logo.png, the same file the website uses) and the wordmark."""
    S = int(72 * scale)
    mark = Image.open(IMG / 'logo.png').convert('RGBA').resize((S, S), Image.LANCZOS)
    word = text_layer(COMPANY.upper(), font(500, int(26 * scale)), rgba(IVORY), tracking=int(7 * scale))
    tag = text_layer(TAGLINE.upper(), font(400, int(13 * scale)), rgba(IVORY, 0.55), tracking=int(4 * scale)) if tagline else None
    w = S + int(18 * scale) + max(word.width, tag.width if tag else 0)
    x0 = xy[0] if align == 'l' else xy[0] - w
    lay = Image.new('RGBA', (w, S), (0, 0, 0, 0))
    paste(lay, mark, (0, 0))
    if tag:
        paste(lay, word, (S + int(18 * scale), int(S * 0.16)))
        paste(lay, tag, (S + int(18 * scale), int(S * 0.62)))
    else:
        paste(lay, word, (S + int(18 * scale), (S - word.height) // 2))
    paste(base, lay, (x0, xy[1]), opacity)
    return w, S


# ---- product renders and photos -------------------------------------------------------------------------
@lru_cache(maxsize=None)
def _render(series, pid):
    return Image.open(IMG / 'catalog' / series / f'{pid}.webp').convert('RGBA')


@lru_cache(maxsize=256)
def panel(series, pid, width, shadow=True):
    """Panel render scaled to `width`, with a soft drop shadow. Returns an RGBA layer (with margin)."""
    p = _render(series, pid)
    h = int(p.height * width / p.width)
    p = p.resize((width, h), Image.LANCZOS)
    m = 70
    lay = Image.new('RGBA', (width + m * 2, h + m * 2), (0, 0, 0, 0))
    if shadow:
        sh = Image.new('RGBA', lay.size, (0, 0, 0, 0))
        sh.paste((0, 0, 0, 255), (m, m + int(h * 0.05)), p.getchannel('A').point(lambda v: int(v * 0.55)))
        lay = Image.alpha_composite(lay, sh.filter(ImageFilter.GaussianBlur(26)))
    lay.alpha_composite(p, (m, m))
    return lay


def place_panel(base, series, pid, width, center, opacity=1.0, scale=1.0):
    lay = panel(series, pid, width)
    if scale != 1.0:
        lay = lay.resize((int(lay.width * scale), int(lay.height * scale)), Image.BICUBIC)
    paste(base, lay, (center[0] - lay.width // 2, center[1] - lay.height // 2), opacity)


@lru_cache(maxsize=None)
def scene_photo(name):
    return Image.open(IMG / 'scenes' / f'{name}.webp').convert('RGB')


def vgrad(size, top, bottom):
    """Vertical alpha gradient layer from `top` to `bottom` (RGBA colours)."""
    w, h = size
    col = Image.new('RGBA', (1, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        col.putpixel((0, y), tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(4)))
    return col.resize(size)


def contact_lines():
    return [f'WhatsApp {PHONE}', EMAIL] + ([SITE_URL.replace('https://', '').replace('http://', '')] if SITE_URL else [])
