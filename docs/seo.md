# SEO

How the site is set up for search, which phrases each page targets, and what has to happen
outside the code for rankings to move.

## Where things live

| What | Source |
| --- | --- |
| Title, description, target phrases per page | `src/config/pages.ts` (`PAGES`) |
| Home title and description | `APP_CONFIG.DEFAULT_META_*` in `src/config/site.ts` |
| Feature / use-case page titles and descriptions | `seo` field in `src/content/features.ts`, `src/content/use-cases.ts` |
| Structured data (Organization, WebSite, Product, BreadcrumbList, FAQPage) | `src/lib/seo.ts` |
| Search Console / Bing ownership tags | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` |
| Sitemap, robots | `src/app/sitemap.ts`, `src/app/robots.ts` (pages with `noIndex` are left out) |

Rules:
- Titles stay at or under 60 characters including the ` | Euxora Digital` suffix (so about 43
  for the page part). Descriptions 110 to 160 characters. Put the main phrase first.
- The `keywords` list is a planning note; Google ignores the meta tag. A phrase only ranks if it
  is in the title, the description, the H1 or the page text.
- Every claim in a title, description or structured data must already be on the site (see
  `AGENTS.md`). No price, stock, rating, review or certification in structured data.
- FAQ structured data is on `/faq` only. Don't add it to other pages with the same questions.

## Keyword map

| Page | Main phrase | Supporting phrases |
| --- | --- | --- |
| `/` | smart switch / smart touch switch | smart switch board, touch switch board, home automation ahmedabad |
| `/product` | glass touch switch panel | acrylic touch switch, backlit touch switch, touch switch with fan regulator |
| `/catalogue` | smart switch catalogue | 2M / 4M / 6M / 8M / 12M touch switch |
| `/features` | wifi touch switch, zigbee touch switch | alexa smart switch, google home smart switch |
| `/features/wifi-and-zigbee` | wifi vs zigbee smart switch | zigbee gateway |
| `/features/app-and-voice` | alexa smart switch | app controlled switch, smart switch with remote |
| `/features/sizes-and-functions` | modular touch switch sizes | 6M smart switch, 12M smart switch panel |
| `/use-cases/residential-homes` | smart switches for home | living room touch switch, curtain touch switch |
| `/use-cases/architectural-renovations` | replace old switch board | two-way touch switch |
| `/use-cases/commercial-studios` | smart switches for office | USB touch switch |
| `/how-it-works` | smart switch installation | how to install smart switch, zigbee gateway setup |
| `/contact` | smart switch ahmedabad | touch switch ahmedabad, home automation gujarat |
| `/request-demo` | smart switch price / quotation | touch switch samples |
| `/faq` | smart switch faq | wifi or zigbee switch, 6A vs 16A |

## Launch checklist (outside the code)

1. Set `NEXT_PUBLIC_SITE_URL` to the real `https://` domain in the host's environment. Canonicals,
   the sitemap and structured data all use it; `localhost` there means Google gets no usable signal.
2. Google Search Console: add the domain, paste the HTML-tag code into
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, verify, then submit `/sitemap.xml`.
   Do the same in Bing Webmaster Tools.
3. Google Business Profile for the Ahmedabad address in `src/config/site.ts`, with the same name,
   address and phone as the site. For "smart switch ahmedabad" searches this matters more than any on-page change.
4. Test `/`, `/product` and `/faq` in the Rich Results Test. "Missing offers" on Product is expected
   (no prices are published).
5. Links from real sources: architect and interior-designer directories, IndiaMART/TradeIndia
   listings, electrician partners' sites, and social profiles that link back.
6. After 4 to 6 weeks, read Search Console → Performance → Queries. Phrases with impressions but
   few clicks need a better title or description; phrases people search that the site lacks need
   a page (for example a buying guide) with real content.
