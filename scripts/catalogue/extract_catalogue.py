#!/usr/bin/env python3
"""
Extracts the product catalogue from the two supplier price-list PDFs.

Output (written to --out, default ./scripts/catalogue/out):
  catalogue.json            every configuration, per series: sizes, panel materials, connectivity, prices
  images/<series>/<id>.webp cropped panel render for each configuration
  anomalies.txt             rows where the PDF prices look inconsistent (reviewed by a human)

Requirements:  pip install pymupdf pillow
Usage:         python scripts/catalogue/extract_catalogue.py "<Color PDF>" "<Edge PDF>"

Only product data is read. Company names, logos, contact details and trade terms are ignored.
"""
import argparse, json, re, sys
from pathlib import Path
import pymupdf as fitz
from PIL import Image, ImageDraw

NAME_RE = re.compile(r"^\s*(\d+)M\s*-\s*(.+?)\s*$")
PRICE_RE = re.compile(r"^(\d{3,6})(?:/-)?$")
SERIES = {
    # panel image heights (pt) used on the list pages, and column geometry
    # box_dy: how far below/above a price box's discount badge its numbers can sit (pt)
    "color": {"panel_h": (137, 230), "box_dy": 125},
    "edge": {"panel_h": (110, 184), "box_dy": 75},
}


def page_names(page):
    """Product label lines on a page: [(y_center, module, label)]."""
    out = []
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            text = "".join(s["text"] for s in l["spans"]).strip()
            m = NAME_RE.match(text)
            if m:
                y = (l["bbox"][1] + l["bbox"][3]) / 2
                out.append((y, int(m.group(1)), m.group(2).strip()))
    return sorted(out)


def page_panels(page, heights):
    """Bounding boxes of the product panel renders on a page, top to bottom."""
    boxes = []
    for i in page.get_image_info(xrefs=True):
        x0, y0, x1, y1 = i["bbox"]
        w, h = x1 - x0, y1 - y0
        if i["xref"] == 0 and w >= 100 and any(abs(h - ph) < 3 for ph in heights):
            boxes.append((x0, y0, x1, y1))
    return sorted(set(boxes), key=lambda b: b[1])


def numbers(page):
    """Numeric price words and placeholders with positions."""
    out = []
    for x0, y0, x1, y1, w, *_ in page.get_text("words"):
        m = PRICE_RE.match(w)
        if m:
            out.append(((x0 + x1) / 2, (y0 + y1) / 2, int(m.group(1))))
    return out


def badge_centres(page):
    """x/y of every '50%' discount badge: one per price box. Splits glass (left) from acrylic (right)."""
    return [((x0 + x1) / 2, (y0 + y1) / 2) for x0, y0, x1, y1, w, *_ in page.get_text("words") if w == "50%"]


def parse_page(page, series):
    heights = SERIES[series]["panel_h"]
    names = page_names(page)
    panels = page_panels(page, heights)
    if not names:
        return []
    if len(names) != len(panels):
        raise SystemExit(f"{series} page {page.number + 1}: {len(names)} names but {len(panels)} panels")
    nums = numbers(page)
    badges = badge_centres(page)
    mods = [m for _, m, _ in names]
    module = max(set(mods), key=mods.count)  # a few labels carry a typo; the page is one module size
    rows = []
    for (ny, _m, label), panel in zip(names, panels):
        cy = (panel[1] + panel[3]) / 2
        # price boxes that belong to this row: badges whose y is within the row band
        row_badges = sorted([b for b in badges if abs(b[1] - cy) < 125], key=lambda b: b[0])
        prices = {}
        for side_idx, (bx, by) in enumerate(row_badges):
            side = "wifi" if side_idx == 0 else "zigbee"
            # numbers in this box: within ~150pt horizontally of the badge and the same row band
            box = [n for n in nums if abs(n[0] - bx) < 150 and abs(n[1] - by) < SERIES[series]["box_dy"]]
            left = sorted([n for n in box if n[0] < bx], key=lambda n: (n[1], n[0]))
            right = sorted([n for n in box if n[0] >= bx], key=lambda n: (n[1], n[0]))
            for mat, grp in (("glass", left), ("acrylic", right)):
                vals = [v for _, _, v in grp]
                if len(vals) >= 2:
                    unit, offer = max(vals[:2]), min(vals[:2])
                    prices.setdefault(side, {})[mat] = {"list": unit, "offer": offer}
        rows.append({"module": f"{module}M", "label": label, "panel": panel, "prices": prices})
    return rows


def cutout(img):
    """Trim to the gold bezel and make the tile background around the rounded corners transparent."""
    rgb = img.convert("RGB")
    # gold bezel pixels: warm and bright
    mask = rgb.point(lambda v: v).convert("RGB")
    px = rgb.load()
    w, h = rgb.size
    gold = Image.new("L", (w, h), 0)
    gp = gold.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r > 150 and (r - b) > 45:
                gp[x, y] = 255
    box = gold.getbbox()
    if box:
        rgb = rgb.crop((max(0, box[0] - 1), max(0, box[1] - 1), min(w, box[2] + 1), min(h, box[3] + 1)))
    out = rgb.convert("RGBA")
    for corner in ((0, 0), (out.width - 1, 0), (0, out.height - 1), (out.width - 1, out.height - 1)):
        ImageDraw.floodfill(out, corner, (0, 0, 0, 0), thresh=38)
    return out


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def price_set(prices):
    """[wifi glass, wifi acrylic, zigbee glass, zigbee acrylic] list prices; 0 = not offered."""
    get = lambda c, m: prices.get(c, {}).get(m, {}).get("list", 0)
    return [get("wifi", "glass"), get("wifi", "acrylic"), get("zigbee", "glass"), get("zigbee", "acrylic")]


def write_ts(result, path):
    merged, order = {}, []
    for series in ("color", "edge"):
        for r in result[series]:
            if r["id"] not in merged:
                merged[r["id"]] = {"id": r["id"], "module": r["module"], "label": r["label"]}
                order.append(r["id"])
            merged[r["id"]][series] = price_set(r["prices"])
    mod = lambda m: int(m[:-1])
    order.sort(key=lambda i: (mod(merged[i]["module"]), result["color"] and 0))  # stable: keeps PDF order within a size
    flags = lambda ps: [1 if v > 0 else 0 for v in ps]
    lines = [
        "import type { CatalogRow } from '@/types';",
        "",
        "/**",
        " * Product configurations from the 2026 price lists. NO PRICES here: this file is bundled for the browser.",
        " * Generated by scripts/catalogue/extract_catalogue.py, then safe to edit by hand.",
        " *",
        " * Each series is [wifi glass, wifi acrylic, zigbee glass, zigbee acrylic]; 1 = offered, 0 = not offered.",
        " * A missing series means the configuration is not offered in it. Prices are in prices.data.ts (server only).",
        " */",
        "export const CATALOG_ROWS: readonly CatalogRow[] = [",
    ]
    price_lines = [
        "import 'server-only';",
        "import type { PriceSet, SeriesId } from '@/types';",
        "",
        "/**",
        " * LIST prices in rupees, as [wifi glass, wifi acrylic, zigbee glass, zigbee acrylic]; 0 = not offered.",
        " * SERVER ONLY: never import this from client code (the `server-only` import makes the build fail if you do).",
        " * Generated by scripts/catalogue/extract_catalogue.py.",
        " */",
        "export const PRICES: Record<string, Partial<Record<SeriesId, PriceSet>>> = {",
    ]
    for i in order:
        r = merged[i]
        parts = [f"id: '{r['id']}'", f"module: '{r['module']}'", f"label: '{r['label']}'"]
        pp = []
        for series in ("color", "edge"):
            if series in r:
                parts.append(f"{series}: [{', '.join(str(v) for v in flags(r[series]))}]")
                pp.append(f"{series}: [{', '.join(str(v) for v in r[series])}]")
        lines.append("  { " + ", ".join(parts) + " },")
        price_lines.append(f"  '{r['id']}': {{ " + ", ".join(pp) + " },")
    lines.append("];")
    price_lines.append("};")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n")
    path.with_name("prices.data.ts").write_text("\n".join(price_lines) + "\n")


def write_image_sizes(images_dir, path):
    """[width, height] of every extracted render, so <Image> gets real dimensions (no layout shift)."""
    entries = []
    for f in sorted(Path(images_dir).glob("*/*.webp")):
        with Image.open(f) as im:
            entries.append(f"  '{f.parent.name}/{f.stem}': [{im.width}, {im.height}],")
    path.write_text(
        "/** Pixel size of each product render. Generated by scripts/catalogue/extract_catalogue.py. */\n"
        "export const IMAGE_SIZES: Record<string, readonly [number, number]> = {\n" + "\n".join(entries) + "\n};\n"
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("color_pdf"); ap.add_argument("edge_pdf")
    ap.add_argument("--out", default="scripts/catalogue/out")
    ap.add_argument("--ts", help="also write the TypeScript data files used by the site (products.data.ts and the server-only prices.data.ts next to it)")
    a = ap.parse_args()
    out = Path(a.out); (out / "images").mkdir(parents=True, exist_ok=True)
    result, anomalies = {}, []
    for series, pdf in (("color", a.color_pdf), ("edge", a.edge_pdf)):
        doc = fitz.open(pdf); (out / "images" / series).mkdir(parents=True, exist_ok=True)
        rows = []
        for page in doc:
            for r in parse_page(page, series):
                r["page"] = page.number + 1
                rows.append(r)
        seen = {}
        for r in rows:
            pid = slug(f"{r['module']} {r['label']}")
            seen[pid] = seen.get(pid, 0) + 1
            r["id"] = pid if seen[pid] == 1 else f"{pid}-{seen[pid]}"
            # crop the panel render
            page = doc[r["page"] - 1]; x0, y0, x1, y1 = r["panel"]
            pad = 3
            clip = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad)
            scale = min(4.0, 960 / (x1 - x0 + 2 * pad))
            pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip, alpha=False)
            img = cutout(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
            img.save(out / "images" / series / f"{r['id']}.webp", "WEBP", quality=86, method=6)
            # sanity: the offer should be half of the list price
            for conn, mats in r["prices"].items():
                for mat, p in mats.items():
                    if abs(p["offer"] - round(p["list"] / 2 + 0.01)) > 1:
                        anomalies.append(f"{series} p{r['page']} {r['id']} {conn}/{mat}: list {p['list']} offer {p['offer']}")
            del r["panel"]
        result[series] = rows
    (out / "catalogue.json").write_text(json.dumps(result, indent=1))
    (out / "anomalies.txt").write_text("\n".join(anomalies) or "none")
    if a.ts:
        write_ts(result, Path(a.ts))
        write_image_sizes(out / "images", Path(a.ts).with_name("images.data.ts"))
    print({s: len(v) for s, v in result.items()}, "anomalies:", len(anomalies))


if __name__ == "__main__":
    sys.exit(main())
