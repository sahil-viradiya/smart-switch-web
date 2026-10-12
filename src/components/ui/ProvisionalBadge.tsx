export function ProvisionalBadge({ label = 'To be confirmed' }: { label?: string }) {
  return <span className="badge" title="Not published yet">{label}</span>;
}
