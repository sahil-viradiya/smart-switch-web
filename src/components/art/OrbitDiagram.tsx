const NODES = [
  { label: 'Touch', x: 24, y: 18, d: '0s' },
  { label: 'App', x: 76, y: 20, d: '-1s' },
  { label: 'Voice', x: 86, y: 52, d: '-2s' },
  { label: 'Zigbee', x: 66, y: 86, d: '-3s' },
  { label: 'Wi-Fi', x: 26, y: 84, d: '-4s' },
  { label: 'IR remote', x: 12, y: 50, d: '-5s' },
] as const;

/** Decorative diagram of the ways a panel can be controlled and connected. */
export function OrbitDiagram() {
  return (
    <div className="orbit" role="img" aria-label="Smart Switch at the centre of touch, app, voice, Zigbee, Wi-Fi and IR remote control">
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
