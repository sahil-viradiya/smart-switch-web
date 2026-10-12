# Catalogue extractor

Reads the supplier price-list PDFs and produces the data the site uses. Full instructions and file map: `docs/catalogue-data.md`.

```bash
pip install pymupdf pillow
python scripts/catalogue/extract_catalogue.py "<Color PDF>" "<Edge PDF>" --out scripts/catalogue/out --ts src/content/catalog/products.data.ts
```

Output goes to `--out`: `catalogue.json`, `images/<series>/<id>.webp` and `anomalies.txt`. Review `anomalies.txt` before copying anything into the app. Only product data is read; company details in the PDFs are ignored.
