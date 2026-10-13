"""
All marketing wording in one place. Numbers and contact details come from brand.py (the website's own config),
so a change to the product data or contact details shows up here after a rebuild.

Rules for every line: only claims the website and the price lists support (see claims.md), plain ASCII
characters, no prices (they are hidden on the website too), nothing from the supplier brochure's company
details, and "enquire or buy" means "ask for a quotation and order" because the website does not sell online.
"""
import brand as b

CTA_SHORT = 'Enquire or buy'
CTA_LONG = 'Message us for a quote and place your order.'
MARKS = 'Alexa, Google Home, Android and iOS are trademarks of their owners. Smart Switch is not affiliated with them.'
WARRANTY = f'{b.WARRANTY_YEARS}-year warranty'
WARRANTY_NOTE = 'Warranty terms are confirmed in writing when you order.'
SOLD_BY = f'{b.BRAND} is sold by {b.COMPANY}.'
N_SIZES = len(b.MODULES)
N_LAYOUTS = b.LAYOUTS_PER_SERIES['color']
assert b.LAYOUTS_PER_SERIES['color'] == b.LAYOUTS_PER_SERIES['edge'], 'copy says "in each series"'

# Instagram allows at most 5 hashtags on a post or reel (rule introduced December 2025). More can stop the comment from posting.
HASHTAGS = '#SmartHome #HomeAutomation #TouchSwitch #InteriorDesign #SmartSwitch'

POSTS = [
    {
        'id': 'post-1-hero', 'utm': 'hero', 'intent': 'homeowner',
        'alt': 'A Color series touch panel with eight backlit icons, above the headline Control your home with a touch.',
        'caption': f"Control your home with a touch.\n\n{b.BRAND} panels replace a row of separate switches, a fan regulator and sockets with one glass or acrylic touch panel. Use the wall, the app on your phone, or your voice.\n\nWant it in your home? {CTA_LONG} WhatsApp {b.PHONE}, or send an enquiry from the link in our bio and we will suggest the right series, size and functions for your wall.",
    },
    {
        'id': 'post-2-series', 'utm': 'series', 'intent': 'architect',
        'alt': 'A Color series panel and an Edge series panel side by side.',
        'caption': "Two series, one choice to make.\n\nColor has backlit icons in colours you choose, with adjustable brightness and saturation, and custom icons on request. Edge has round touch points and a simpler look. Both come in the same sizes and the same functions.\n\nNot sure which suits your space? Ask us for specs and samples.",
    },
    {
        'id': 'post-3-control', 'utm': 'control', 'intent': 'homeowner',
        'alt': 'Four ways to control a Smart Switch panel: touch, app, voice and remote.',
        'caption': f"Control it your way.\n\nTouch the panel. Use the app on Android or iOS. Ask Alexa or Google Home. Or add a handheld IR remote (sold separately).\n\nEvery panel comes as a Wi-Fi version and a Zigbee version, so you can pick what suits your home.\n\n{MARKS}",
    },
    {
        'id': 'post-4-sizes', 'utm': 'sizes', 'intent': 'architect',
        'alt': 'Six Smart Switch panels in sizes from 2M to 12M.',
        'caption': f"{N_SIZES} sizes, {N_LAYOUTS} layouts in each series.\n\nFrom a compact 2M panel to a large 12M panel, with switches, sockets, fan control, curtain control, dimmers, a USB charger and a doorbell. Pick the size that fits your wall box, then the functions you need.\n\nTell us about the room and we will suggest a layout.",
    },
    {
        'id': 'post-5-warranty', 'utm': 'warranty', 'intent': 'homeowner',
        'alt': 'A living room wall with a Smart Switch panel, with the text 10-year warranty and contact details.',
        'caption': f"A {WARRANTY} on the panels, and installed by your own licensed electrician.\n\nTo buy: message us on WhatsApp {b.PHONE}, call, email {b.EMAIL}, or send an enquiry. We confirm the quotation, delivery and warranty terms with you in writing.\n\n{WARRANTY_NOTE} {SOLD_BY}",
    },
]

REELS = [
    {
        'id': 'reel-1-features', 'utm': 'reel1', 'intent': 'homeowner',
        'caption': f"Control your home with a touch. 30 seconds of Smart Switch: glass or acrylic panels, two series, {N_SIZES} sizes, control by touch, app, voice or remote, and a {WARRANTY}.\n\nTo buy or ask a question, message us on WhatsApp {b.PHONE}, email {b.EMAIL}, or use the link in our bio.\n\n{MARKS} {WARRANTY_NOTE} {SOLD_BY}",
        'onscreen': f"Control your home with a touch. | Glass or acrylic. | Pick your look: Color, Edge | {N_SIZES} sizes, {N_LAYOUTS} layouts in each series | Control it your way: touch, app, voice, remote | Wi-Fi or Zigbee | {WARRANTY.capitalize()} | {CTA_SHORT}.",
    },
    {
        'id': 'reel-2-day', 'utm': 'reel2', 'intent': 'homeowner',
        'caption': f"One touch, and the room responds.\n\nMorning curtains, afternoon fan, evening dimmers: touch panels in glass or acrylic, in two series and {N_SIZES} sizes. Use the wall, the app, your voice or a remote.\n\nThe room pictures are illustrations. To buy or ask a question, message us on WhatsApp {b.PHONE}, email {b.EMAIL}, or use the link in our bio. We send a written quotation.\n\n{MARKS} {WARRANTY_NOTE} {SOLD_BY}",
        'onscreen': f"One touch. | Morning: open the curtains | Afternoon: cool the room | Evening: dim the lights | Any way you like: touch, app, voice, remote | {WARRANTY.capitalize()} | Ready for your wall? {CTA_SHORT}.",
    },
]

# Ad copy for Meta Ads Manager. Recommended visible lengths: primary text 125, headline 27, description 27.
# These limits come from secondary guides (Meta's own page was not available), so confirm in the Ads Manager preview.
ADS = {
    'post-1-hero': ('Glass or acrylic touch panels for lights, fans and sockets. Message us on WhatsApp for a quote.', 'Control your home by touch', 'Enquire or buy on WhatsApp'),
    'post-2-series': ('Color or Edge? Same sizes, same functions, two looks. Ask us for specs and samples.', 'Color or Edge: pick a look', 'Ask for specs and samples'),
    'post-3-control': ('Control by touch, app, voice or remote. Wi-Fi or Zigbee versions. Ask us about your home.', 'Four ways to control it', 'Message us for a quote'),
    'post-4-sizes': (f'{N_SIZES} sizes, {N_LAYOUTS} layouts in each series. Tell us about your room and we will suggest a layout.', f'{N_SIZES} sizes, {N_LAYOUTS} layouts', 'Tell us about your room'),
    'post-5-warranty': (f'A {WARRANTY} on the panels. Terms confirmed in writing when you order. Message us for a quote.', f'A {WARRANTY}', 'Enquire or buy on WhatsApp'),
    'reel-1-features': (f'30 seconds of Smart Switch: glass or acrylic touch panels, {N_SIZES} sizes, {WARRANTY}. Message us to buy.', 'Smart touch switches', 'Enquire or buy on WhatsApp'),
    'reel-2-day': ('One touch, a whole room. Curtains, fans, lights and more. Message us on WhatsApp for a quote.', 'One touch, a whole room', 'Enquire or buy on WhatsApp'),
}
AD_BUTTON = 'Send WhatsApp message'
