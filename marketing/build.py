#!/usr/bin/env python3
"""
Builds the marketing material from the website's own data.

    python marketing/build.py            posts + reel + captions + links
    python marketing/build.py posts      only the five posts (fast)
    python marketing/build.py reel       only the reels (both, organic + ads versions, about 3 minutes)
    python marketing/build.py text       only captions.md, links.md and ads.md
    python marketing/build.py meta       only the Meta ads images in marketing/meta_ads/ (fast)

Needs:  pip install pillow   and   ffmpeg on the PATH   and   npm install (for the Inter font files).
Set NEXT_PUBLIC_SITE_URL to the live address before building so it appears on the images and in links.
"""
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import brand as b      # noqa: E402
import content as c    # noqa: E402

PLATFORM = {'post': 'instagram', 'reel': 'instagram'}


def tracked(spec, medium):
    """Enquiry link for a piece. The website stores the full path and query in the 'Source page' column of the
    enquiry sheet, so every enquiry shows which post or reel it came from."""
    base = b.SITE_URL or 'https://YOUR-DOMAIN'
    return f"{base}/request-demo?intent={spec['intent']}&utm_source=social&utm_medium={medium}&utm_campaign={spec['utm']}"


def write_text():
    out = ['# Captions\n', 'Ready to paste. Plain text. Add the link from `links.md` to your bio or story, because Instagram captions do not make links clickable.\n',
           'Instagram allows at most **5 hashtags** per post or reel, so the same five are used everywhere:\n\n'
           f'`{c.HASHTAGS}`\n']
    for i, p in enumerate(c.POSTS, 1):
        out += [f"\n---\n\n## Post {i}: `posts/{p['id']}.png`\n", '**Caption**\n', '```', p['caption'], '```\n', f"**Alt text:** {p['alt']}\n"]
    for i, r in enumerate(c.REELS, 1):
        out += [f"\n---\n\n## Reel {i}: `reels/{r['id']}/`\n",
                f"Upload `{r['id']}-organic.mp4` to Instagram, Facebook, YouTube Shorts and WhatsApp Status. Use `{r['id']}-ads.mp4` for Meta ads. Cover: `{r['id']}-cover.jpg`.\n",
                '**Caption**\n', '```', r['caption'], '```\n', f"**On-screen text, in order:** {r['onscreen']}\n",
                'The sound is an original music bed generated for this project (96 BPM, with every cut and tap on the beat), so there is no music licence to worry about. You can swap in trending audio inside the app.\n']
    (HERE / 'captions.md').write_text('\n'.join(out), encoding='utf8')

    ln = ['# Tracked enquiry links\n',
          'Each link opens the website\'s enquiry form. The form saves the whole address in the **Source page** column of the enquiry sheet, so you can see which post or reel brought each enquiry.\n']
    if not b.SITE_URL:
        ln.append('> **The live website address is not set.** These links use `https://YOUR-DOMAIN`. Set `NEXT_PUBLIC_SITE_URL` to your real address and run `python marketing/build.py text` to regenerate them.\n')
    ln += ['| Piece | Link |', '| --- | --- |']
    for i, p in enumerate(c.POSTS, 1):
        ln.append(f"| Post {i} | `{tracked(p, 'post')}` |")
    for i, r in enumerate(c.REELS, 1):
        ln.append(f"| Reel {i} | `{tracked(r, 'reel')}` |")
    ln += ['', 'Other useful links (no tracking needed):', '',
           f"- Catalogue: `{(b.SITE_URL or 'https://YOUR-DOMAIN')}/catalogue`",
           f"- WhatsApp: `https://wa.me/{b.WHATSAPP}`",
           f"- Email: `mailto:{b.EMAIL}`"]
    (HERE / 'links.md').write_text('\n'.join(ln) + '\n', encoding='utf8')

    ad = ['# Meta ads: ready-to-use setup\n',
          'For Facebook and Instagram ads. Because buying happens by message, the simplest set-up is a **click-to-WhatsApp** ad: the button opens a WhatsApp chat with your number, and you reply with a quotation.\n',
          f'- Button: **{c.AD_BUTTON}** (or "Learn more" with the tracked link from `links.md`)',
          f'- WhatsApp number: {b.PHONE}',
          '- Image ads (Feed): upload the post PNG, 1080x1350. Video ads (Reels and Stories): upload the **-ads.mp4** file, 1080x1920. Do not use the organic video for ads: its text sits where Meta puts the button.',
          '- Text limits (recommended visible lengths): primary text 125, headline 27, description 27. The lengths below are checked by `check.py`.',
          '- These limits and the safe zones come from third-party guides. Check the placement previews in Ads Manager before spending.',
          '- Ads that mention a warranty or a service should link to the terms. Keep "terms confirmed in writing" in the text, as written here.\n',
          '| Creative | File | Primary text | Headline | Description |', '| --- | --- | --- | --- | --- |']
    files = {p['id']: f"`posts/{p['id']}.png`" for p in c.POSTS}
    files.update({r['id']: f"`reels/{r['id']}/{r['id']}-ads.mp4`" for r in c.REELS})
    for key, (pt, hl, ds) in c.ADS.items():
        ad.append(f'| {key} | {files[key]} | {pt} | {hl} | {ds} |')
    (HERE / 'ads.md').write_text('\n'.join(ad) + '\n', encoding='utf8')
    print('wrote captions.md, links.md and ads.md')


def main():
    what = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if what in ('all', 'posts'):
        import posts
        posts.build(HERE / 'posts')
    if what in ('all', 'reel', 'reels'):
        import reel, reel2
        reel.build(HERE / 'reels')
        reel2.build(HERE / 'reels')
    if what in ('all', 'meta'):
        import meta_ads
        meta_ads.build()
        meta_ads.write_readme()
    if what in ('all', 'text'):
        write_text()


if __name__ == '__main__':
    main()
