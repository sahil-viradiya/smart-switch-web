'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@/components/art/Icons';
import type { VideoAsset } from '@/config';
import { prefersReducedMotion } from '@/lib/scroll';

/**
 * A silent product film. It plays only while it is on screen and the tab is visible, loops, and
 * can be paused with the button. With reduced motion it starts paused on its poster; pressing
 * Play is a deliberate choice, so it then plays while in view like any other visitor.
 */
export function ProductFilm({ video }: { video: VideoAsset }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const inView = useRef(false);
  const held = useRef(false); // true while the visitor wants it paused

  const sync = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (inView.current && !held.current && !document.hidden) v.play().catch(() => {});
    else v.pause();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    held.current = prefersReducedMotion();

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => v.parentElement?.style.setProperty('--t', (v.currentTime / (v.duration || 1)).toFixed(4));
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('timeupdate', onTime);

    const io = new IntersectionObserver(([entry]) => { inView.current = !!entry?.isIntersecting; sync(); }, { threshold: 0.4 });
    io.observe(v);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('timeupdate', onTime);
    };
  }, [sync]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { held.current = false; v.play().catch(() => {}); }
    else { held.current = true; v.pause(); }
  };

  const label = playing ? 'Pause the film' : 'Play the film';
  return (
    <div className="film__frame">
      <video ref={ref} muted loop playsInline preload="metadata" poster={video.poster} width={video.width} height={video.height} aria-label={video.label} disablePictureInPicture>
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="film__shade" aria-hidden="true" />
      <button type="button" className="film__btn" onClick={toggle} aria-label={label}>
        {playing ? <Pause /> : <Play />}
        <span>{label}</span>
      </button>
      <div className="film__bar" aria-hidden="true"><span /></div>
    </div>
  );
}
