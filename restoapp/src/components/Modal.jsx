import { useEffect, useId, useRef } from 'react'

// A Bootstrap-styled dialog controlled by React: render it to open it,
// stop rendering it to close it. Escape closes it. Children supply the
// .modal-body and .modal-footer, so a <form> can wrap both.
function Modal({ title, onClose, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const previousFocus = document.activeElement
    const dialog = dialogRef.current

    // Move focus into the dialog unless a field inside already took it (autoFocus).
    if (!dialog.contains(document.activeElement)) dialog.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open') // stops the page scrolling behind

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      previousFocus?.focus?.()
    }
  }, [])

  return (
    <>
      <div
        ref={dialogRef}
        className="modal show d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id={titleId}>
                {title}
              </h2>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}

export default Modal
