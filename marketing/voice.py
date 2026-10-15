"""
Voice-over for the video ads.

Each reel has a script (one line per scene). A line is spoken by one of two sources:

  1. YOUR OWN RECORDING, if a file exists at  marketing/voice/<reel id>/<scene number>.(wav|mp3|m4a|aiff)
     (scene numbers start at 1). A real human voice always beats a computer voice for trust, so record the
     lines from  voiceover-scripts.md  on a phone in a quiet room and drop the files in.
  2. The computer voice built into macOS (`say`), in an Indian English voice. It is generated on this machine, so
     nothing is sent to any online service.

Every line is cleaned (silence trimmed, low rumble cut, evened out and brought to the same loudness), then laid on
the timeline over the music, which dips while the voice speaks. The final mix is brought to about -17 LUFS and
kept under -2 dB peak, which is what the platform checks in check.py look for.
"""
import math
import subprocess
import tempfile
from pathlib import Path

import music

HERE = Path(__file__).resolve().parent
VOICE_DIR = HERE / 'voice'
VOICE = 'Tara'        # en_IN female. Other Indian English voices on a Mac: Aman, Rishi (male). `say -v '?'` lists them.
RATE = 168            # words per minute for the computer voice
EXTS = ('.wav', '.mp3', '.m4a', '.aiff', '.aif')
CLEAN = ('silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,'
         'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,'
         'highpass=f=90,acompressor=threshold=0.12:ratio=3:attack=5:release=90,'
         'loudnorm=I=-16:TP=-2:LRA=7,aresample=48000,aformat=channel_layouts=mono')


def _run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f'command failed: {" ".join(cmd[:3])}...\n{r.stderr[-600:]}')
    return r


def duration(path):
    out = _run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(path)]).stdout
    return float(out.strip())


def own_recording(reel_id, n):
    for ext in EXTS:
        p = VOICE_DIR / reel_id / f'{n}{ext}'
        if p.exists():
            return p
    return None


def say(text, rate, out):
    with tempfile.TemporaryDirectory() as tmp:
        raw = Path(tmp) / 'raw.aiff'
        _run(['say', '-v', VOICE, '-r', str(rate), '-o', str(raw), text])
        _run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-af', CLEAN, '-ar', '48000', '-ac', '1', str(out)])


def clean(src, out):
    _run(['ffmpeg', '-y', '-v', 'error', '-i', str(src), '-af', CLEAN, '-ar', '48000', '-ac', '1', str(out)])


def prepare(reel_id, lines, workdir, max_seconds):
    """Cleaned clip for every line. If the computer voice would not fit `max_seconds` in total, speak a little faster."""
    clips = []
    rate = RATE
    for attempt in range(8):
        clips = []
        for n, text in enumerate(lines, 1):
            out = Path(workdir) / f'{reel_id}-{n}.wav'
            mine = own_recording(reel_id, n)
            if mine:
                clean(mine, out)
            else:
                say(text, rate, out)
            clips.append((out, duration(out), bool(mine)))
        if sum(c[1] for c in clips) <= max_seconds or any(c[2] for c in clips):
            break
        rate += 8
    return clips


def mix(total, starts_and_clips, events, out, style='warm'):
    """Music (calm, ducked under the voice) + voice clips at their start times, as one stereo WAV of `total` seconds."""
    with tempfile.TemporaryDirectory() as tmp:
        mus = Path(tmp) / 'music.wav'
        import wave
        pcm = music.render(total, events, style, drums_on=False)
        with wave.open(str(mus), 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(music.RATE)
            w.writeframes(pcm.tobytes())
        cmd = ['ffmpeg', '-y', '-v', 'error', '-i', str(mus)]
        for _, clip in starts_and_clips:
            cmd += ['-i', str(clip)]
        parts = []
        for i, (start, _) in enumerate(starts_and_clips, 1):
            ms = int(start * 1000)
            parts.append(f'[{i}:a]adelay={ms}:all=1,aformat=channel_layouts=stereo[v{i}]')
        n = len(starts_and_clips)
        vs = ''.join(f'[v{i}]' for i in range(1, n + 1))
        parts.append(f'{vs}amix=inputs={n}:normalize=0,apad=whole_dur={total}[vo]')
        parts.append('[vo]asplit=2[vsc][vmix]')
        parts.append('[0:a]aresample=48000,volume=0.9[m]')
        parts.append('[m][vsc]sidechaincompress=threshold=0.02:ratio=12:attack=20:release=400:makeup=1[md]')
        parts.append('[md]volume=0.42[mq]')
        parts.append('[mq][vmix]amix=inputs=2:normalize=0:duration=longest[mx]')
        parts.append(f'[mx]atrim=0:{total},loudnorm=I=-19:TP=-2:LRA=9,alimiter=limit=0.8,aresample=48000[out]')
        cmd += ['-filter_complex', ';'.join(parts), '-map', '[out]', '-ar', '48000', '-ac', '2', str(out)]
        _run(cmd)
    return out
