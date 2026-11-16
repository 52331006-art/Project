// Shown while the dishes are loading, or if loading failed.
// Renders nothing once the menu is ready.
function MenuStatus({ status }) {
  if (status === 'loading') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-brand" role="status">
          <span className="visually-hidden">Loading the menu…</span>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="alert alert-danger text-center" role="alert">
        We couldn&apos;t load the menu. Please refresh the page to try again.
      </div>
    )
  }

  return null
}

export default MenuStatus
