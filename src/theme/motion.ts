/** MOTION — easings, durations and timings (CSS and JS both read from here). */
export const motion = {
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeSoft: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
  easeCamera: 'cubic-bezier(0.45, 0, 0.2, 1)',

  durations: { hover: '0.28s', reveal: '0.9s', headline: '1.1s', scene: '1.4s' },

  /** Count-up duration for stat counters (ms). */
  counterMs: 1600,
  /** Seconds for one full loop of the outlined marquee strip. */
  marqueeSeconds: 46,
  /** Max tilt (deg) for pointer-tilt cards. */
  tiltMaxDeg: 7,

  /** Hero room carousel: how long each scene is held (ms). */
  heroHoldMs: 4800,
  /** Intro splash length (ms). Animation keyframes scale with `--intro-duration`. */
  introMs: 2400,
} as const;
