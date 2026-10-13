"""
A short original music bed, generated in code (so there is nothing to license), plus the interface sounds.

96 BPM, 4/4, 12 bars = exactly 30 seconds. Each bar is one chord; a plucked arpeggio, bass, a soft kick,
clap and hats build up and drop out for the call to action. Scene cuts and finger taps are placed on the
beat grid by the reel files (BEAT is shared), so picture and sound lock together.

UI sounds on top of the music: 'tap' (finger press), 'tick' (an icon lighting), 'chime' (end cards) and
'whoosh' (a short swell that ends exactly on a scene cut).
"""
import math
import random

RATE = 44100
BPM = 96
BEAT = 60.0 / BPM            # 0.625 s
BAR = BEAT * 4               # 2.5 s
BARS = 12                    # 12 x 2.5 s = 30 s


def midi(name, octave):
    return 12 * (octave + 1) + {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}[name]


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


# (bass note, chord tones). Same four chords in a different order gives each reel its own feel.
CMAJ7 = (midi('C', 2), [60, 64, 67, 71])
AM7 = (midi('A', 2), [57, 60, 64, 67])
FMAJ7 = (midi('F', 2), [57, 60, 64, 65])
G6 = (midi('G', 2), [55, 59, 62, 64])
STYLES = {
    'bright': [CMAJ7, AM7, FMAJ7, G6] * 2 + [CMAJ7, AM7, FMAJ7, CMAJ7],
    'warm': [AM7, FMAJ7, CMAJ7, G6] * 2 + [AM7, FMAJ7, CMAJ7, AM7],
}
ARP = [0, 2, 1, 3, 2, 3, 1, 2]


def _tone(buf, t0, dur, f, amp, attack, decay, harm=((1, 1.0),)):
    s0, n = int(t0 * RATE), int(dur * RATE)
    w = 2 * math.pi * f
    for j in range(n):
        i = s0 + j
        if i >= len(buf):
            break
        t = j / RATE
        env = min(1.0, t / attack) * math.exp(-decay * t)
        v = 0.0
        for k, a in harm:
            v += a * math.sin(w * k * t)
        buf[i] += amp * env * v


def _pad(buf, t0, dur, f, amp):
    s0, n = int(t0 * RATE), int(dur * RATE)
    w1, w2 = 2 * math.pi * f, 2 * math.pi * f * 1.004
    for j in range(n):
        i = s0 + j
        if i >= len(buf):
            break
        t = j / RATE
        env = min(1.0, t / 0.4) * min(1.0, (dur - t) / 0.5)
        buf[i] += amp * env * (math.sin(w1 * t) + 0.6 * math.sin(w2 * t))


def _kick(buf, t0, amp=0.5):
    s0, ph = int(t0 * RATE), 0.0
    for j in range(int(0.3 * RATE)):
        i = s0 + j
        if i >= len(buf):
            break
        t = j / RATE
        ph += 2 * math.pi * (46 + 95 * math.exp(-28 * t)) / RATE
        buf[i] += amp * math.sin(ph) * math.exp(-9 * t)


def _clap(buf, t0, rnd, amp=0.20):
    s0 = int(t0 * RATE)
    for j in range(int(0.2 * RATE)):
        i = s0 + j
        if i >= len(buf):
            break
        t = j / RATE
        buf[i] += amp * (rnd.uniform(-1, 1) * math.exp(-24 * t) * 0.9 + math.sin(2 * math.pi * 190 * t) * math.exp(-32 * t) * 0.5)


def _hat(buf, t0, rnd, amp=0.07):
    s0, prev = int(t0 * RATE), 0.0
    for j in range(int(0.06 * RATE)):
        i = s0 + j
        if i >= len(buf):
            break
        t = j / RATE
        x = rnd.uniform(-1, 1)
        buf[i] += amp * (x - prev) * math.exp(-85 * t)
        prev = x


def _whoosh(buf, t_cut, rnd, amp=0.10, dur=0.55):
    """Noise that swells and brightens, ending on the cut."""
    s0, y = int((t_cut - dur) * RATE), 0.0
    for j in range(int(dur * RATE)):
        i = s0 + j
        if i < 0 or i >= len(buf):
            continue
        p = j / (dur * RATE)
        y += (0.03 + 0.5 * p * p) * (rnd.uniform(-1, 1) - y)
        buf[i] += amp * y * (p ** 1.6)


def render(total, events, style='bright', drums_on=True):
    """Interleaved 16-bit stereo samples (array('h')) for `total` seconds, with `events` = [(seconds, kind)].
    `drums_on=False` leaves out the kick, hats and claps for a calmer bed (used for the website film)."""
    import array
    n = int(total * RATE)
    buf = [0.0] * n
    rnd = random.Random(7)
    prog = STYLES[style]
    for bar, (bass, chord) in enumerate(prog):
        t0 = bar * BAR
        for m in chord:
            _pad(buf, t0, BAR + 0.5, hz(m), 0.030)
        for beat in (0, 2):
            _tone(buf, t0 + beat * BEAT, BEAT * 1.9, hz(bass), 0.20, 0.012, 2.0, ((1, 1.0), (2, 0.55), (3, 0.28)))
        if bar not in (0, BARS - 1):
            _tone(buf, t0 + 3.5 * BEAT, BEAT * 0.9, hz(bass + 7), 0.10, 0.012, 3.0, ((1, 1.0), (2, 0.5)))   # pickup
        if bar >= 1:
            for k in range(8):                                                                             # plucked arpeggio
                m = chord[ARP[k] % 4] + 12
                accent = 1.0 if k % 2 == 0 else 0.7
                _tone(buf, t0 + k * BEAT / 2, 0.5, hz(m), 0.062 * accent, 0.004, 6.5, ((1, 1.0), (2, 0.28), (3, 0.12)))
            drums = drums_on and bar <= 9
            if drums:
                _kick(buf, t0)
                _kick(buf, t0 + 2 * BEAT)
            elif drums_on and bar == 10:
                _kick(buf, t0)
        if drums_on and 2 <= bar <= 9:
            for k in range(4):
                _hat(buf, t0 + k * BEAT + BEAT / 2, rnd)
        if drums_on and 3 <= bar <= 9:
            _clap(buf, t0 + BEAT, rnd)
            _clap(buf, t0 + 3 * BEAT, rnd)
    # master envelope for the music (fade in, long fade out on the last bar)
    for i in range(n):
        t = i / RATE
        buf[i] *= min(1.0, t / 0.5) * min(1.0, (total - t) / 1.8)
    peak = max(1e-9, max(abs(v) for v in buf))
    buf = [v * (0.55 / peak) for v in buf]
    # interface sounds, on top
    def add(t0, dur, fn):
        s0 = int(t0 * RATE)
        for j in range(int(dur * RATE)):
            if s0 + j < n:
                buf[s0 + j] += fn(j / RATE)
    for t0, kind in events:
        if kind == 'tap':
            add(t0, 0.25, lambda t: 0.26 * math.sin(2 * math.pi * 1400 * t) * math.exp(-55 * t) + 0.20 * math.sin(2 * math.pi * 620 * t) * math.exp(-22 * t))
        elif kind == 'tick':
            add(t0, 0.14, lambda t: 0.13 * math.sin(2 * math.pi * 1800 * t) * math.exp(-65 * t))
        elif kind == 'chime':
            add(t0, 1.6, lambda t: 0.13 * (math.sin(2 * math.pi * 880 * t) + 0.8 * math.sin(2 * math.pi * 1318.5 * t)) * math.exp(-3.6 * t))
        elif kind == 'whoosh':
            _whoosh(buf, t0, rnd)
    peak = max(1e-9, max(abs(v) for v in buf))
    g = min(1.6, 0.85 / peak)
    pcm = array.array('h')
    for v in buf:
        s = int(max(-1.0, min(1.0, v * g)) * 32767)
        pcm.append(s)
        pcm.append(s)
    return pcm
