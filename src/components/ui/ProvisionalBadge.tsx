export function ProvisionalBadge({ label = 'Provisional' }: { label?: string }) {
  return <span className="badge" title="Pending lab confirmation">{label}</span>;
}
