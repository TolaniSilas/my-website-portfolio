export default function Loading() {
  return (
    <div className="page-transition page-shell" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Preparing the next page.</span>
      <div className="page-transition-placeholder" aria-hidden="true">
        <div className="page-transition-heading" />
        <div className="page-transition-intro" />
        <div className="page-transition-divider" />
        <div className="page-transition-line" />
        <div className="page-transition-line" />
        <div className="page-transition-line page-transition-line-short" />
      </div>
    </div>
  );
}
