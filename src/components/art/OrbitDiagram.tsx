const NODES = [
  { label: 'Paddles', x: 24, y: 20, d: '0s' },
  { label: 'Dimmer', x: 76, y: 22, d: '-1.2s' },
  { label: 'Local fail-safe', x: 80, y: 56, d: '-2.4s' },
  { label: 'Open connectivity', x: 56, y: 88, d: '-3.6s' },
  { label: 'Wall box', x: 20, y: 72, d: '-4.8s' },
] as const;

/** Decorative ecosystem diagram. Labels describe design intent, not certified compatibility. */
export function OrbitDiagram() {
  return (
    <div className="orbit" role="img" aria-label="Smart Switch at the centre of paddles, dimmer, local fail-safe, open connectivity and standard wall boxes">
      <span className="orbit__ring orbit__ring--outer" />
      <span className="orbit__ring" />
      <div className="orbit__core">
        <strong>SMART</strong>
        <strong>SWITCH</strong>
        <small>System</small>
      </div>
      {NODES.map((n) => (
        <span key={n.label} className="orbit__node" style={{ left: `${n.x}%`, top: `${n.y}%`, ['--d' as string]: n.d }}>
          {n.label}
        </span>
      ))}
    </div>
  );
}
