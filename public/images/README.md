# Images

- `catalog/<series>/<id>.webp`: panel images, generated from the price lists. Do not edit by hand; see `docs/catalogue-data.md`.
- Accessories (gateways, IR blaster, remote) are shown with icons, not photos, because the price lists only had low-resolution pictures.
- `scenes/`: room photos for the hero, room tabs and use cases. Registered in `src/config/images.ts`, which also holds the marker label and position for each scene.
- `social.jpg`: 1200x630 share image used for link previews. Registered as `IMAGES.social`.
- `film-poster.jpg`: still for the product film (generated with the film, see `scripts/film/make_film.py`).
