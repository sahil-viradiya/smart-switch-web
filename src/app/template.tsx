/** Re-mounted on every navigation, so each page fades in. (Opacity only — transforms would break pinned scenes.) */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
