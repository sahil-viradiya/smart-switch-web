# Where every marketing claim comes from

Every statement in the posts, reel and captions is on this list, with its source. The website's own copy (`src/`) was written from the same price lists, so the site and the marketing say the same thing. If a claim cannot be traced here, do not use it.

**Sources:** `Color Price List 2026.pdf` and `Edge Price List 2026.pdf` (the two supplier price lists), and the website data in `src/` (`content/catalog/products.data.ts`, `config/specs.ts`, `config/site.ts`, `config/legal.ts`).

## Used

| Claim in the marketing | Source |
| --- | --- |
| Touch panels in glass or acrylic | Price lists, pages 2 to 38: each layout is priced as Glass and Acrylic. 10 layouts are acrylic only, so copy says "glass or acrylic", never "every panel in glass" |
| Two series, Color and Edge | The two price lists |
| Color: backlit icons in colours you choose, adjustable brightness and saturation | Color list, last page ("RGB colors to customize your Touch switch ... adjust the saturation and brightness") |
| Custom icons on request | Both lists, page 39 ("Create your own custom icon and panels") |
| Edge: round touch points, a simpler look | The Edge panel renders in the price list |
| Same sizes and functions in both series | Both lists carry the same sizes (2M to 12M) and the same functions. A few layouts exist in only one series (85 layouts in all, 83 in each series), which the copy does not contradict |
| 6 sizes, 2M to 12M | `products.data.ts` (counted by the build) |
| 83 layouts in each series | `products.data.ts` (counted by the build, and checked by `check.py`) |
| Switches, sockets, fan and curtain control, dimmers, USB charger, doorbell | The layout names in the price lists |
| Control by touch, app (Android and iOS), voice (Alexa and Google Home), IR remote | Color list, last page ("Touch control, App control Android - IOS, Voice control Alexa, Google Home, Remote control IR-Remote") |
| IR remote sold separately | Color list terms ("Remote cost will be extra") and page 39 (Remote R1-R2 is priced separately) |
| Wi-Fi version and Zigbee version of every panel | Every price row has both columns |
| 10-year warranty on the panels | Both lists (first and last page). The figure is `warrantyYears` in `config/specs.ts` |
| Installed by a licensed electrician | The website's own safety copy and Terms (wiring is not in the supplier's scope) |
| To buy: ask for a quotation, then order | The website's Terms ("A sale happens only when we confirm a quotation or order in writing"). There is no online checkout, so "Enquire or buy" means contact us |
| Reel 2: curtain control, fan control, dimmers, each on the wall | Layouts in the price lists: "Single Curtain Switch", "Dual Curtain Switch", "4 Switch 1 Fan", "2 Dimmer (Phase Cut)". Curtain control is its own 2M panel and is shown that way |
| Reel 2: icons light when touched | The icons in the price-list renders are backlit touch icons. The lighting in the film is an illustration of that |
| Reel 2: the room brightens | Illustration only. Every room picture in the reel is marked "ILLUSTRATION" on screen (real panel images placed on a sample wall) |
| Smart Switch is sold by Euxora Digital | `config/legal.ts` (confirmed by the owner) |
| WhatsApp, phone, email | `config/site.ts` |

## Deliberately NOT used

| Item in the supplier brochure | Why it is left out |
| --- | --- |
| The supplier's name, logo, address, phone, email, website, "Established in 2014" | You asked for no other company's details. These are the supplier's, not Euxora Digital's |
| "Best smart touch panel available in India" | A superlative we cannot prove. Advertising rules require substantiation |
| 50% discount, unit and discounted prices | Prices are hidden on the website. The 50% is a trade discount, and a public price would conflict with a quote |
| "Made in India", "Designed and Manufactured in India", the flag badge | It is the supplier's statement about its own factory. Add it only after you confirm Euxora Digital can state it as its own, and in the form the law allows (Legal Metrology and consumer rules apply to origin claims) |
| "Apple Siri" | The website does not claim it. Only add it after you have tested it |
| The platform name behind the app | The website does not name it, and the app name is not a Smart Switch claim |
| Payment terms (100% advance), delivery 7 to 15 days, OEM minimum quantity, price validity | Supplier trade terms. Publish your own terms with the quotation instead |
| Voltage, ratings in amps, certifications | Not stated in the price lists. The website marks them "to be confirmed". Marketing must not state them either |

## Third-party names

Alexa, Google Home, Android and iOS appear only to describe compatibility. Post 3, both reels and the captions carry the line "Alexa, Google Home, Android and iOS are trademarks of their owners. Smart Switch is not affiliated with them."

## Before you publish

1. Run `python marketing/check.py`. It fails on prices, supplier details, unsupported claims and odd characters.
2. If you add a claim, add its source here first.
3. Warranty wording must keep "terms are confirmed in writing when you order", which matches the Terms page.
