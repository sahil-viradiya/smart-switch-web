/** Large outlined words drifting across the page. Decorative; the loop pauses on hover. */
export function Marquee({ words }: { words: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {words.map((w) => (<li key={w}>{w}<span className="marquee__dot" /></li>))}
    </ul>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">{row(false)}{row(true)}{row(true)}</div>
    </div>
  );
}
