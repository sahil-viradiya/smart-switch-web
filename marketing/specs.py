"""
Platform rules the marketing files are checked against (python marketing/check.py).

Sources: current third-party guides to Instagram and Meta ads sizes (Meta's own help pages were not
reachable when this was written), cross-checked against each other. Where guides disagree, the
STRICTER figure is used. Re-check in Instagram and the Ads Manager preview before a big campaign.
"""

# ---- images -------------------------------------------------------------------------------------------
POST_SIZE = (1080, 1350)        # 4:5. Works for the Instagram feed, Facebook feed and Meta feed ads (feed ads allow 1:1 to 4:5).
POST_FORMATS = ('PNG', 'JPEG')
IMAGE_MAX_BYTES = 30 * 1024 * 1024
# Instagram's profile grid shows posts as 3:4 (1080x1440). A 4:5 post is centre-cropped to that,
# which trims ~36 px off each side at 1080 wide. Keep text and logos inside this margin.
GRID_SIDE_CROP = 36
POST_MIN_MARGIN = 40

# ---- video --------------------------------------------------------------------------------------------
VIDEO_SIZE = (1080, 1920)       # 9:16: Reels, Stories, Facebook Reels, Reels ads
VIDEO_FPS = 30
VIDEO_SECONDS = (29.0, 31.0)    # these reels are 30 s
VIDEO_MAX_BYTES = 4 * 1024 ** 3
AUDIO_MIN_KBPS = 128
AUDIO_LUFS = (-21.0, -15.0)     # integrated loudness: loud enough for a phone, not so loud it is squashed
AUDIO_MAX_PEAK = -1.0           # true peak in dBFS, so it never clips
AUDIO_PRESENCE_MIN = -27.0      # loudness left after removing everything below 300 Hz (phone speakers cannot play it)
AUDIO_SYNC_TOLERANCE = 0.02     # seconds: cuts and taps must sit on the quarter-beat grid

# Where key content may sit, as (top y, bottom y) on the 1080x1920 frame.
SAFE_ORGANIC = (250, 1580)      # Instagram/Facebook Reels and Stories: app covers ~250 px top and ~340 px bottom
SAFE_ADS = (270, 1248)          # Meta Reels/Stories ADS: ~14% top and ~35% bottom (call to action, caption)
ADS_SIDE_MARGIN = 65            # ~6% each side
# The grid and the feed show a reel cover cropped: 3:4 centre (y 240..1680) in the grid, 4:5 centre (y 285..1635) in the feed.
COVER_VISIBLE = (285, 1635)
DARK = 100                      # a pixel brighter than this outside a safe zone counts as content

# ---- text ---------------------------------------------------------------------------------------------
MAX_HASHTAGS = 5                # Instagram, from December 2025
CAPTION_MAX = 2200
AD_PRIMARY_MAX = 125            # visible before "...more"
AD_HEADLINE_MAX = 27
AD_DESCRIPTION_MAX = 27
