export function OfflinePage() {
  return (
    <section className="offline-page" aria-label="No internet connection">
      <div className="offline-grid" aria-hidden="true" />
      <div className="offline-orb offline-orb-primary" aria-hidden="true" />
      <div className="offline-orb offline-orb-secondary" aria-hidden="true" />
      <div className="offline-signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="offline-copy">
        <p>No internet connection</p>
        <h1>Offline Mode</h1>
        <span>The portfolio is waiting for your connection to return.</span>
      </div>
    </section>
  )
}
