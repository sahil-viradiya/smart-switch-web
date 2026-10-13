# Catalogue data

The product catalogue (two series, 2M to 12M panels, 85 configurations) comes from the Color and Edge price lists. Only product data is used: names, sizes, versions, prices and panel images. Supplier company names, logos, contact details and trade terms are never copied.

## Where things live

| What | File |
| --- | --- |
| Generated rows (name, size, what is offered per series). No prices. | `src/content/catalog/products.data.ts` |
| Generated list prices. **Server only**, never sent to the browser. | `src/content/catalog/prices.data.ts` and `prices.ts` |
| Generated image sizes | `src/content/catalog/images.data.ts` |
| Panel images | `public/images/catalog/<series>/<id>.webp` |
| Sizes, materials, versions, function kinds, representative panel per size | `src/content/catalog/options.ts` |
| Series copy (Color, Edge) | `src/content/catalog/series.ts` |
| Accessories and custom icon fee | `src/content/catalog/accessories.ts` |
| Product objects and helpers (`getProduct`, `productsInSeries`, `listPrice`...) | `src/content/catalog/products.ts` |
| Show prices, currency, page size, `catalogueHref()` | `src/config/catalog.ts` |
| Types | `src/types/catalog.ts` |

Pages never import `products.data.ts` directly (and client code must never import `prices.ts`; it starts with `import 'server-only'`, so the build fails if you try). Use the helpers in `products.ts` so a change to the data format stays in one place.

## Row format

```ts
{ id: '2m-1-doorbell', module: '2M', label: '1 Doorbell', color: [3322, 2750, 3322, 2750], edge: [2552, 1980, 2552, 1980] }
```

`color` and `edge` hold which versions are offered, in this order: Wi-Fi glass, Wi-Fi acrylic, Zigbee glass, Zigbee acrylic (`1` = offered, `0` = not). A series that does not offer the panel is left out. `prices.data.ts` has the list prices in the same order (`0` = not offered).

## Updating from new price lists

```bash
pip install pymupdf pillow
python scripts/catalogue/extract_catalogue.py "<Color PDF>" "<Edge PDF>" \
  --out scripts/catalogue/out --ts src/content/catalog/products.data.ts   # also writes prices.data.ts beside it
```

1. Read `scripts/catalogue/out/anomalies.txt` (rows where prices look inconsistent) and check them by hand.
2. Copy the images from `scripts/catalogue/out/images/` to `public/images/catalog/`.
3. Copy `images.data.ts` from the output into `src/content/catalog/`.
4. Run `npm run check` and open `/catalogue`.

New function types or sizes may need a line in `options.ts` (`PRODUCT_KINDS`, `MODULES`, `REPRESENTATIVE`).

## Prices

Prices are hidden, and they are not in the browser code either: they live in the server-only `prices.data.ts`. To show them, set `showPrices: true` in `src/config/catalog.ts`; the catalogue page then passes "From" prices to the browser. Confirm tax and currency wording in the same file first.

## Known limits of the source

- The PDFs do not list finishes or colours, so the site says to ask for current options.
- Two 6A socket panels share one label in the PDF; they appear as variant A and B.
- The "2M 4 Switch" label has a stray size prefix in the PDF; it is stripped.
