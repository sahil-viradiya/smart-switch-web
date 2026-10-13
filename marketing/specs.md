# Platform specs these files follow

`python marketing/check.py` verifies every file against these rules by reading the real files (sizes, codecs, audio) and decoding video frames. The numbers live in `specs.py`.

**Honesty note:** Meta's own help pages were not reachable when this was written, so the rules come from several current third-party guides (2026) that mostly agree. Where they disagree, the **stricter** value is used. Before spending on ads, open the placement previews in Ads Manager, which show exactly what Meta will cover.

Sources: [Instagram size guide 2026](https://www.linearity.io/blog/instagram-size-guide/), [Instagram post size 2026](https://wavegen.ai/instagram-post-size), [Instagram aspect ratios 2026](https://posteverywhere.ai/blog/instagram-aspect-ratios), [Meta ad sizes 2026](https://superscale.ai/learn/meta-ad-sizes), [Meta ad specs 2026](https://benly.ai/learn/meta-ads/meta-ads-specs-size-guide), [Meta ad sizes and safe zones 2026](https://www.marketertools.fyi/blog/meta-ad-sizes-safe-zones-2026), [Instagram hashtag limit](https://later.com/blog/instagram-hashtags/amp).

## Images (the five posts)

| Rule | Value | Why |
| --- | --- | --- |
| Size | **1080 x 1350 px (4:5)** | The tallest size that works everywhere: Instagram feed, Facebook feed and Meta feed ads (feed ads accept 1:1 to 4:5). Instagram also accepts 3:4 (1080 x 1440) since 2025, but Facebook and ads do not, so 4:5 is the safe single choice |
| Format | PNG, RGB, no transparency | Both platforms accept PNG and JPG, and recompress. Max 30 MB (ours are about 0.2 MB) |
| Side margin | At least 40 px (we use 80 px) | Instagram's profile grid shows 3:4 and centre-crops a 4:5 post, trimming about 36 px from each side. Text and logos must stay clear of that |

## Meta ad images (`meta_ads/`)

| Placement | Size | Rule used |
| --- | --- | --- |
| Feed (Facebook and Instagram) | 1080 x 1350 (4:5) | Same as the posts. At least 40 px clear at each side |
| Square feed, carousel, Marketplace | 1080 x 1080 (1:1) | At least 40 px clear at each side |
| Stories and Reels ads | 1080 x 1920 (9:16) | Everything important inside y=270..1248 (about 14% clear at the top, 35% at the bottom for the profile bar, button and caption) and 65 px clear at each side. Only faint background texture is outside |
| Facebook link ads | 1200 x 628 (1.91:1) | At least 40 px clear at each side |

Format PNG, RGB. Every image is checked by `check.py`: size, format, size on disk, and brightness outside the safe area. Copy limits are the same as `ads.md` (125, 27, 27). These figures come from third-party guides, so confirm them in the Ads Manager preview.

## Videos (the two reels, each in two versions)

| Rule | Value |
| --- | --- |
| Size and shape | **1080 x 1920 px, 9:16**: Reels, Stories, Facebook Reels, Reels ads |
| Frame rate | 30 fps |
| Video codec | H.264 High profile, yuv420p, BT.709 colour, MP4, "faststart" so it plays while loading |
| Audio | AAC stereo, 160 kbps (Meta asks for 128 kbps or more). An original music bed generated for this project (96 BPM, 12 bars = 30 s, key of C or A minor): chords, plucked melody, bass, soft kick, clap and hats, plus tap, tick, chime and whoosh sounds. Loudness -17 to -20 LUFS, peaks below -1 dBFS, no silent gaps, and enough energy above 300 Hz for phone speakers |
| Length | 30 seconds |
| File size | 5 to 6 MB (limit 4 GB) |
| Cover | 1080 x 1920 JPG. The grid shows its centre 3:4 and the feed shows its centre 4:5, so all text sits inside y = 285 to 1635 |

### Two versions of each reel, because the safe zones differ

| Version | Use for | Keep key content inside | Why |
| --- | --- | --- | --- |
| `-organic.mp4` | Instagram and Facebook Reels and Stories, YouTube Shorts, WhatsApp Status | y = 250 to 1580 | The app covers about 250 px at the top and 340 px at the bottom |
| `-ads.mp4` | Meta **ads** in Reels and Stories | y = 270 to 1248, and 65 px side margins | Meta overlays the call-to-action button and text on about 14% at the top and 35% at the bottom, plus about 6% at each side |

The ads version is the same film with its content scaled to fit the smaller zone. Use the organic version for ads and the button would sit on top of your phone number.

Feed ads should use the **posts** (4:5). Do not put a 9:16 video in the Feed placement: Feed shows 4:5, which would trim the content.

## Text

| Rule | Value |
| --- | --- |
| Hashtags | **At most 5** on a post or reel (Instagram, since December 2025). More can stop the comment from posting. All captions use the same five |
| Caption | 2,200 characters at most (ours are under 700) |
| Ad primary text | 125 characters (more is hidden behind "...more"). Ours are 83 to 104 |
| Ad headline | 27 characters. Ours are 18 to 26 |
| Ad description | 27 characters. Ours are 22 to 26 |

## What the audit found in the first version, and fixed

1. Captions had **10 hashtags**, double the limit. Now 5.
2. The reel kept content down to y = 1580, which is correct for Reels but **wrong for ads**, where Meta covers the bottom 35%. Added the separate ads version.
3. The first reel had **no audio**, and the first fix was a low hum (a drone under 300 Hz plus a few clicks) that phone speakers cannot reproduce and that had no rhythm. Both reels now have a proper music bed. The audit measures the sound (length, loudness, clipping, silence, energy above 300 Hz) and requires every cut and tap to sit on the beat.
4. The video was encoded at a low bitrate on flat dark gradients, which can show visible banding on phones. Re-encoded with finer quality settings and slight dithering.
5. No explicit colour tags (BT.709). Added, so colours match across players.
6. A moving finger in reel 2 briefly entered the bottom area covered by the app. It now enters from the side.
7. A **website copy error** found while building reel 2: several pages said one panel can hold curtain control, but curtain control only exists as its own 2M panel. The site now says so.
