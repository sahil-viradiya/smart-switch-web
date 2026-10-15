# Meta ads images

8 ad creatives, each in four sizes. Built from the website's own panel renders, room photo and data (`python marketing/build.py meta`), and checked by `python marketing/check.py`.

## Which file for which placement

| Folder | Size | Use it for |
| --- | --- | --- |
| `feed_1080x1350/` | 1080x1350 (4:5) | Facebook and Instagram feed. The largest feed format, so the first one to use. |
| `square_1080x1080/` | 1080x1080 (1:1) | Feed, carousel, Marketplace, right column. |
| `story_1080x1920/` | 1080x1920 (9:16) | Instagram and Facebook Stories and Reels ads. Everything important is inside y=270..1248 and 72 px from the sides, clear of the profile bar at the top and the button and caption at the bottom. |
| `link_1200x628/` | 1200x628 (1.91:1) | Facebook link ads. |

The image names are the same in every folder. Upload the same creative in all four sizes in one ad set and let Meta pick the placement ("Advantage+ placements"), or upload one size per placement for full control. Add the video ads from `reels/*/*-ads.mp4` next to them.

## The creatives

| Image | What it shows | Who it speaks to |
| --- | --- | --- |
| `touch` | The 8M Color panel with six switches and a fan control | Homeowners, for a first look at the product |
| `one-wall` | One panel, six functions: lights, fan, curtains, dimmers, sockets, scenes | Homeowners replacing a row of separate switches |
| `control` | Touch, app, voice and remote around a panel | Homeowners who like smart-home gadgets |
| `series` | Color and Edge side by side | Interior designers and architects choosing a look |
| `sizes` | The six sizes from 2M to 12M | Architects and electricians planning a wall box |
| `more` | Sockets, scene control, curtain control, dimmers, USB charger and doorbell panels | People who want more than light switches |
| `room` | A living-room wall with Touch, App and Voice callouts | Homeowners picturing it in their own room |
| `connect` | Wi-Fi or Zigbee versions | People comparing how it connects |

## Ad copy (paste into Ads Manager)

Limits checked by `check.py`: primary text 125, headline 27, description 27 characters. Button: **Send WhatsApp message** (click-to-WhatsApp) with the number +91 97255 58828, or "Learn more" with a tracked link from `../links.md`.

| Creative | Primary text | Headline | Description |
| --- | --- | --- | --- |
| `touch` (Switch to touch.) | Glass or acrylic touch panels for lights, fans, curtains and sockets. Message us on WhatsApp for a quote. | Switch to touch | Message us for a quote |
| `one-wall` (Everything on one wall.) | Replace a row of separate switches with one touch panel, with matching curtain and dimmer panels. Ask for a layout. | Everything on one wall | Ask for a layout |
| `control` (Touch. App. Voice. Remote.) | Control it by touch, app, voice or a handheld remote (sold separately). Message us to ask how it works. | Four ways to control it | Message us for a quote |
| `series` (Color or Edge?) | Color has backlit icons in colours you choose. Edge has round touch points. Ask us for specs and samples. | Color or Edge: pick a look | Ask for specs and samples |
| `sizes` (6 sizes. 83 layouts.) | 6 sizes and 83 layouts in each series. Tell us about your wall box and we suggest a panel. | 6 sizes, 83 layouts | Tell us about your room |
| `more` (More than switches.) | Sockets, scene control, curtain control, dimmers, a USB charger and a doorbell, all in the same touch panel style. | More than switches | Message us for a quote |
| `room` (Made for the wall you have.) | Send us your room details on WhatsApp and we suggest the series, size and functions. Installed by your electrician. | Made for your wall | Send your room details |
| `connect` (Wi-Fi or Zigbee.) | Pick the version that suits your home: Wi-Fi, or Zigbee with a gateway. Message us and we help you choose. | Wi-Fi or Zigbee | Message us for a quote |

## Video ads with a voice-over (`videos/`)

Two 30-second films, drawn for the ad safe zone, with a spoken voice-over, big captions and a quiet music bed that dips while the voice speaks. They also work as normal Reels. Use them for the ads that should bring enquiries: people who hear a clear voice and see the contact details, the warranty and the address are more likely to message.

| File | For | Story |
| --- | --- | --- |
| `videos/voice-1-one-touch.mp4` | Homeowners | A wall full of switches, one touch panel, what it controls, the two looks and six sizes, four ways to control it, the 10-year warranty and the licensed electrician, then WhatsApp |
| `videos/voice-2-how-to-buy.mp4` | People who are interested but unsure | Four steps from "message us on WhatsApp" to "your electrician fits it", the written quote, the warranty, who sells it and where, then WhatsApp |

- Cover images are next to each file. The words spoken are in `videos/voiceover-scripts.md`, with ad copy to paste.
- **The voice is a computer voice** (an Indian English voice built into the Mac this was made on). It is clear, but a real person is more trusted. Record the lines from `voiceover-scripts.md` on your phone, name the files `1.m4a`, `2.m4a` and so on, put them in `marketing/voice/<video id>/` and run `python marketing/build.py ads-video`. Your recording replaces the computer voice for that line.
- The brand name is not spoken (a computer voice may say it wrongly), but it is on screen. If you record the lines, add "Euxora Digital" to the last line.
- These films have no people in them. A short clip of a real installation or a real customer wall (with permission) would make them more convincing. Send it to me and I can add it.

## Before you publish

- Run `python marketing/check.py`. It fails on any mention of cost, supplier details, unsupported claims, wrong sizes, and anything outside the safe zones.
- Look at every placement in the Ads Manager preview. The size and safe-zone rules come from third-party guides, because Meta's own pages were not reachable when this was built.
- Room pictures are illustrations and say so on the image. Keep that line on them. Do not remove the trademark line on the `control` creative.
- A first test: run 3 to 4 creatives (try `touch`, `one-wall`, `control` and `room`) for 3 to 5 days, then put the budget on the one that brings the most WhatsApp messages.
- Suggested audience to start with (a suggestion, not data from this project): people 25 to 55 in and around Ahmedabad and Gujarat interested in home improvement, interior design, smart home and new homes, plus a separate audience of interior designers, architects and electrical contractors for the `series`, `sizes` and `more` creatives.
