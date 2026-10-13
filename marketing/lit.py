"""
Lights up the real panel renders icon by icon.

The renders show every icon lit. This finds each icon (coloured pixels inside the black screen, away from the
gold border), builds a dimmed "off" version, and can draw any mix of icons switched on, with a soft glow.
Nothing is invented: the icons are the ones in the price-list renders.
"""
from functools import lru_cache
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageMath
import brand as b


class Icon:
    __slots__ = ('mask', 'cx', 'cy', 'glow')


class LitPanel:
    M = 70  # margin around the panel for its shadow

    def __init__(self, series, pid, width):
        src = b._render(series, pid)
        w, h = width, int(src.height * width / src.width)
        self.w, self.h = w, h
        p = src.resize((w, h), Image.LANCZOS)
        self.orig = p
        _, S, V = p.convert('RGB').convert('HSV').split()
        m = ImageChops.multiply(S.point(lambda v: 255 if v > 120 else 0), V.point(lambda v: 255 if v > 100 else 0))
        box = Image.new('L', (w, h), 0)
        ImageDraw.Draw(box).rectangle((int(w * .08), int(h * .16), int(w * .92), int(h * .84)), fill=255)
        m = ImageChops.multiply(m, box)
        k = max(3, int(w * 0.012) * 2 + 1)
        dil = m.filter(ImageFilter.MaxFilter(k if k % 2 else k + 1))
        self.dil = dil
        # "Off" look: fade each icon toward the screen colour that would be behind it (not toward black).
        rgb = p.convert('RGB')
        keep = dil.point(lambda v: 255 - v)                       # screen pixels that are not icons
        rad = max(8, int(w * 0.05))
        num = Image.composite(rgb, Image.new('RGB', (w, h), (0, 0, 0)), keep).filter(ImageFilter.GaussianBlur(rad))
        den = keep.filter(ImageFilter.GaussianBlur(rad))
        est = Image.merge('RGB', [ImageMath.lambda_eval(lambda a: (a['n'] * 255 / (a['d'] + 1)).clip(0, 255) if False else a['n'] * 255 / (a['d'] + 1), n=num.getchannel(c), d=den).convert('L') for c in 'RGB'])
        off = Image.blend(est, rgb, 0.12).convert('RGBA')
        off.putalpha(p.getchannel('A'))
        self.base = p.copy()
        self.base.paste(off, (0, 0), dil)
        self.icons = self._split(dil)
        r = max(6, int(w * 0.022))
        for ic in self.icons:
            g = Image.new('RGBA', (w, h), (0, 0, 0, 0))
            g.paste(p, (0, 0), ic.mask)
            g = g.filter(ImageFilter.GaussianBlur(r))
            g.putalpha(g.getchannel('A').point(lambda v: min(255, int(v * 1.7))))
            ic.glow = g
        # shadow under the panel
        mg = self.M
        sh = Image.new('RGBA', (w + mg * 2, h + mg * 2), (0, 0, 0, 0))
        sh.paste((0, 0, 0, 255), (mg, mg + int(h * 0.05)), p.getchannel('A').point(lambda v: int(v * 0.55)))
        self.shadow = sh.filter(ImageFilter.GaussianBlur(26))
        self._cache = {}

    def _split(self, dil):
        f = max(1, self.w // 320)
        sw, sh = self.w // f, self.h // f
        small = dil.resize((sw, sh), Image.NEAREST)
        px = small.load()
        seen = [[False] * sw for _ in range(sh)]
        comps = []
        for y in range(sh):
            for x in range(sw):
                if px[x, y] and not seen[y][x]:
                    stack, pts = [(x, y)], []
                    seen[y][x] = True
                    while stack:
                        cx, cy = stack.pop()
                        pts.append((cx, cy))
                        for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                            if 0 <= nx < sw and 0 <= ny < sh and px[nx, ny] and not seen[ny][nx]:
                                seen[ny][nx] = True
                                stack.append((nx, ny))
                    if len(pts) >= 3:
                        comps.append(pts)
        icons = []
        for pts in comps:
            cm = Image.new('L', (sw, sh), 0)
            cmp = cm.load()
            for x, y in pts:
                cmp[x, y] = 255
            up = ImageChops.multiply(cm.resize((self.w, self.h), Image.NEAREST), dil)
            ic = Icon()
            ic.mask = up
            ic.cx = f * sum(x for x, _ in pts) / len(pts)
            ic.cy = f * sum(y for _, y in pts) / len(pts)
            icons.append(ic)
        icons.sort(key=lambda i: (round(i.cy / (self.h * 0.12)), i.cx))
        return icons

    def render(self, levels):
        """RGBA layer (with shadow margin) with icon i lit to levels[i] (0..1)."""
        key = tuple(round(l * 8) for l in levels)
        if key in self._cache:
            return self._cache[key]
        lay = self.base.copy()
        for ic, l in zip(self.icons, levels):
            if l > 0.02:
                g = ic.glow.copy()
                g.putalpha(g.getchannel('A').point(lambda v, l=l: int(v * 0.85 * l)))
                lay.alpha_composite(g)
        for ic, l in zip(self.icons, levels):
            if l > 0.02:
                lay.paste(self.orig, (0, 0), ic.mask.point(lambda v, l=l: int(v * l)))
        out = self.shadow.copy()
        out.alpha_composite(lay, (self.M, self.M))
        if len(self._cache) > 400:
            self._cache.clear()
        self._cache[key] = out
        return out

    @property
    def size(self):
        return self.w + self.M * 2, self.h + self.M * 2

    def center(self, i):
        """Centre of icon i in the layer's own coordinates."""
        return self.icons[i].cx + self.M, self.icons[i].cy + self.M


@lru_cache(maxsize=None)
def get(series, pid, width):
    return LitPanel(series, pid, width)
