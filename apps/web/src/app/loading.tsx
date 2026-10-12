export default function Loading() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <div
        className="spinner"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid rgba(16, 185, 129, 0.15)',
          borderTopColor: 'var(--accent-primary)',
        }}
      />
      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        Synchronizing Smart Switch interface...
      </span>
    </div>
  );
}
