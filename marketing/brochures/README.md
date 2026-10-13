# Euxora Digital price lists (B2B and B2C)

Four PDFs, made from the two supplier price lists (Color and Edge) by `scripts/brochure/rebrand.py`:

| File | For | Prices |
| --- | --- | --- |
| `Euxora-Color-Price-List-2026-B2B.pdf` | Trade customers | every panel price + Rs 2000 |
| `Euxora-Color-Price-List-2026-B2C.pdf` | Retail customers | every panel price + Rs 5000 |
| `Euxora-Edge-Price-List-2026-B2B.pdf` | Trade customers | every panel price + Rs 2000 |
| `Euxora-Edge-Price-List-2026-B2C.pdf` | Retail customers | every panel price + Rs 5000 |

The PDFs are **not committed** (`.gitignore`): they hold real prices. Share each one only with the audience it is for.

## What changed from the supplier files

- The supplier logo and name became the Euxora Digital logo (`public/images/logo.png`) and name, on every page that had them.
- The supplier's website, address, phone and e-mail became Euxora Digital's (from `src/config/site.ts`).
- Removed: the "Made in India" flag and badge, the ISO certificate line, the supplier's company history, mission and vision, and the supplier name printed on the product photos.
- Prices: each panel price goes up by the amount above. The printed 50% stays true: the bold "discounted price" gets +2000 (or +5000) and the struck-through "unit price" gets twice that, so unit / 2 still equals the bold price. The old numbers are removed from the file, not covered.
- Document properties (title, author, producer) are Euxora Digital's.
- Not changed: colours, product images, layout, every other word, and the accessory prices (IR blaster, gateways, remote, custom icon).

## Rebuild

```bash
pip install pymupdf pillow opencv-python-headless numpy   # once
python scripts/brochure/rebrand.py "<Color Price List 2026.pdf>" "<Edge Price List 2026.pdf>"
```

To change an amount, edit `LEVELS` in `scripts/brochure/rebrand.py`.

## Things to check before sending

- The terms page still carries the supplier's terms word for word: 100% advance payment, delivery 7 to 15 days, "OEM/ODM available (minimum 150 pcs)", price list valid to 31 Dec 2026. Edit them to your own terms if they differ.
- Two slogans are printed into the artwork and still say "World's Most Expressive Smart Switch" (Color, page 18) and "World's Most Extravagant Smart Switch" (Edge, page 12). The Edge pages also say "precision-machined" and the "works with" page mentions Apple Siri. The website avoids these claims.
- One printed price in the Edge list (page 16) had a bold price equal to its struck-through price. It was treated as half of the struck price before the increase.
