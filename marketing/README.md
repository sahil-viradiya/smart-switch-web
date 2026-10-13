# Marketing

Five social posts and one 30-second reel for Smart Switch, plus captions, tracked links and a claims check. Everything is built from the website's own panel images, room photos and data, so it always matches the site.

## What is here

| File | What it is |
| --- | --- |
| `posts/post-1-hero.png` | "Control your home with a touch." Hero panel, call to action |
| `posts/post-2-series.png` | "Pick your look." Color and Edge side by side |
| `posts/post-3-control.png` | "Control it your way." Touch, app, voice, remote |
| `posts/post-4-sizes.png` | "6 sizes." The range from 2M to 12M, 83 layouts per series |
| `posts/post-5-warranty.png` | "A 10-year warranty." Room photo, how to buy |
| `reels/reel-1-features/` | **Reel 1, "features":** a 30-second tour: glass or acrylic, Color and Edge, 6 sizes, touch, app, voice, remote, warranty, how to buy |
| `reels/reel-2-day/` | **Reel 2, "a day with one touch":** a customer-facing story. A finger taps the real panels, icons light up and the room brightens: morning curtains, afternoon fan, evening dimmers, then the warranty and how to buy |
| `reels/<reel>/<reel>-organic.mp4` | For Instagram and Facebook Reels and Stories, YouTube Shorts, WhatsApp Status |
| `reels/<reel>/<reel>-ads.mp4` | The same film for Meta **ads** (content kept out of the zones Meta covers) |
| `reels/<reel>/<reel>-cover.jpg` | Cover image for each reel |
| `meta_ads/` | **Meta ad images:** 8 creatives in 4 sizes (feed 1080x1350, square 1080x1080, story 1080x1920, link 1200x628), with their own `README.md` (which size for which placement, ad copy, test plan) |
| `ads.md` | Ready-to-use Meta ads copy (primary text, headline, description, button) within the length limits |
| `specs.md` | The size and format rules everything is checked against, with sources and what was fixed |
| `captions.md` | Caption, 5 hashtags and alt text for every piece, ready to paste |
| `links.md` | Tracked enquiry links, one per piece |
| `claims.md` | Where every claim comes from, and what was left out on purpose |
| `check.py` | Safety check to run before publishing |

Sizes: posts are 1080x1350 (4:5) for the Instagram and Facebook feed and for Meta feed ads. Reels are 1080x1920 (9:16). **Use the `-ads.mp4` files for paid ads and the `-organic.mp4` files everywhere else.** See `specs.md`.

## How people enquire or buy

The website has no online checkout, so every piece says **Enquire or buy** and points to:
- WhatsApp +91 97255 58828, phone, and hello@optimanex.com (from `src/config/site.ts`), and
- the website's enquiry form through a **tracked link** (`links.md`). The form saves the whole link in the **Source page** column of the enquiry sheet, so you can see which post or reel each enquiry came from.

When someone enquires, reply with a quotation, delivery and warranty terms in writing. That is what the Terms page promises.

## Suggested plan (two weeks)

| Day | Publish |
| --- | --- |
| 1 | Reel 2 (the customer story), then post 1 the same evening |
| 3 | Post 2 |
| 5 | Post 3 |
| 8 | Post 4 |
| 10 | Post 5 |
| 12 | Reel 1 (the features tour), or either reel as a Meta ad using the `-ads.mp4` file |

Put the Day 1 tracked link in your Instagram bio (captions do not make links clickable) and swap it to match each post if you like. Both reels carry an original music bed generated for this project (`music.py`): a chord progression, plucked melody, bass and a soft beat at 96 BPM, with tap and whoosh sounds. Every scene cut and finger tap lands on the beat. It is generated, so there is no music licence to worry about. You can replace it with trending audio inside the app. Many people watch with sound off, so everything is readable without it.

## Before you publish

1. Set the live address and rebuild so it is on the images and in the links:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain python marketing/build.py
   ```
   Until then the links show `https://YOUR-DOMAIN`.
2. `python marketing/check.py` must say OK. It checks the wording **and** the platform specs (sizes, codecs, safe zones, hashtag and ad-copy limits).
3. Read `claims.md` once. Two things are deliberately left out and are yours to decide: "Made in India" and any price.

## Rebuilding

```bash
pip install pillow          # plus ffmpeg on the PATH, and npm install once (it provides the Inter font files)
python marketing/build.py            # everything, about 20 seconds
python marketing/build.py posts      # only the posts
python marketing/build.py reel       # only the reels (both, organic and ads versions, about 2 minutes)
python marketing/build.py text       # only captions.md, links.md and ads.md
python marketing/build.py meta       # only the Meta ad images in meta_ads/ (about 10 seconds)
```

## Changing things

| To change | Edit |
| --- | --- |
| Wording on the posts and reel, captions | `content.py` (captions), `posts.py`, `reel.py` |
| Phone, email, colours, company name, warranty, panel counts | Not here. They are read from the website's config (`src/config`, `src/theme`, `src/content/catalog`), so change them there and rebuild |
| Which panel appears on a post | The `place_panel(...)` lines in `posts.py` and `reel.py` (use ids from `src/content/catalog/products.data.ts`) |
| Reel scenes and lengths | `reel.py` and `reel2.py` (`DUR`, they must add up to 30 seconds). Reel 2's panel animation is in `lit.py` |
| Sound | `music.py` (chords, melody, drums, interface sounds). Each reel picks a style in `reel.py` / `reel2.py` |
| Platform rules | `specs.py` |

Never add prices, certifications, "best" claims or the supplier's details. `check.py` will fail if you do.
