import { ProvisionalBadge } from './ProvisionalBadge';

interface Row { label: string; value: string; provisional: boolean }

export function SpecTable({ rows, caption }: { rows: readonly Row[]; caption: string }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label={caption}>
      <table className="spec-table">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>
                {r.value}
                {r.provisional && <ProvisionalBadge />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
