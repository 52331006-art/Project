import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus, FaPen, FaTrashAlt, FaSearch, FaUndo } from 'react-icons/fa'
import { useMenu } from '../context/MenuContext.js'
import { iconFor } from '../utils/categories.js'
import { imageOrPlaceholder, showPlaceholder } from '../utils/images.js'
import Modal from '../components/Modal.jsx'
import DishForm from '../components/DishForm.jsx'
import MenuStatus from '../components/MenuStatus.jsx'

const money = (amount) => `$${amount.toFixed(2)}`

function Admin() {
  const { dishes, status, addDish, editDish, removeDish, resetMenu } = useMenu()

  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // null = form closed, {} = new dish, dish = editing it
  const [deleting, setDeleting] = useState(null) // dish waiting for delete confirmation
  const [confirmReset, setConfirmReset] = useState(false)
  const [busy, setBusy] = useState(false)

  const query = search.trim().toLowerCase()
  const visible = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(query) || dish.category.toLowerCase().includes(query),
  )

  const isNew = editing?.id == null
  const takenNames = dishes
    .filter((dish) => dish.id !== editing?.id)
    .map((dish) => dish.name.toLowerCase())
  const imageOptions = [...new Set(dishes.map((dish) => dish.image).filter(Boolean))]

  // Runs a save/delete action, shows a toast and closes the dialog on success.
  const run = async (action, successMessage, close) => {
    setBusy(true)
    try {
      await action()
      toast.success(successMessage)
      close()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const handleSave = (data) =>
    run(
      () => (isNew ? addDish(data) : editDish(editing.id, data)),
      isNew ? `${data.name} added to the menu` : `${data.name} updated`,
      () => setEditing(null),
    )

  const handleDelete = () =>
    run(
      () => removeDish(deleting.id),
      `${deleting.name} removed from the menu`,
      () => setDeleting(null),
    )

  const handleReset = () =>
    run(resetMenu, 'Menu reset to the default dishes', () => setConfirmReset(false))

  return (
    <>
      <section className="page-header text-center">
        <div className="container">
          <p className="eyebrow">Admin</p>
          <h1>Manage Menu</h1>
          <p className="lead mb-0">Add, edit and remove the dishes on your menu.</p>
        </div>
      </section>

      <div className="container py-5">
        {status !== 'ready' ? (
          <MenuStatus status={status} />
        ) : (
          <>
            <div className="admin-toolbar mb-4">
              <div className="admin-search">
                <FaSearch aria-hidden="true" />
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search dishes…"
                  aria-label="Search dishes"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
                  onClick={() => setConfirmReset(true)}
                >
                  <FaUndo />
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-brand d-inline-flex align-items-center gap-2"
                  onClick={() => setEditing({})}
                >
                  <FaPlus />
                  Add Dish
                </button>
              </div>
            </div>

            <p className="text-body-secondary small mb-2">
              {visible.length === dishes.length
                ? `${dishes.length} dishes`
                : `Showing ${visible.length} of ${dishes.length} dishes`}
            </p>

            <div className="card info-card overflow-hidden">
              {visible.length === 0 ? (
                <p className="text-center text-body-secondary py-5 mb-0">
                  {dishes.length === 0
                    ? 'The menu is empty. Add your first dish to get started.'
                    : `No dishes match "${search}".`}
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table admin-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Dish</th>
                        <th scope="col">Category</th>
                        <th scope="col" className="text-end">Price</th>
                        <th scope="col" className="text-end">
                          <span className="visually-hidden">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((dish) => {
                        const Icon = iconFor(dish.category)
                        return (
                          <tr key={dish.id}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={imageOrPlaceholder(dish.image)}
                                  onError={showPlaceholder}
                                  className="admin-thumb"
                                  alt=""
                                />
                                <div className="min-w-0">
                                  <strong className="d-block">{dish.name}</strong>
                                  <span className="admin-desc small text-body-secondary">
                                    {dish.description}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="dish-category">
                                <Icon />
                                {dish.category}
                              </span>
                            </td>
                            <td className="text-end fw-semibold">{money(dish.price)}</td>
                            <td className="text-end text-nowrap">
                              <button
                                type="button"
                                className="icon-btn"
                                aria-label={`Edit ${dish.name}`}
                                onClick={() => setEditing(dish)}
                              >
                                <FaPen />
                              </button>
                              <button
                                type="button"
                                className="icon-btn icon-btn-danger"
                                aria-label={`Delete ${dish.name}`}
                                onClick={() => setDeleting(dish)}
                              >
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {editing && (
        <Modal title={isNew ? 'Add a Dish' : `Edit ${editing.name}`} onClose={() => setEditing(null)}>
          <DishForm
            dish={editing}
            takenNames={takenNames}
            imageOptions={imageOptions}
            saving={busy}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete dish?" onClose={() => setDeleting(null)}>
          <div className="modal-body">
            <p className="mb-0">
              <strong>{deleting.name}</strong> will be removed from the menu. This can&apos;t be
              undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setDeleting(null)}
              autoFocus
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger" disabled={busy} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Modal>
      )}

      {confirmReset && (
        <Modal title="Reset the menu?" onClose={() => setConfirmReset(false)}>
          <div className="modal-body">
            <p className="mb-0">
              All your changes will be lost and the menu will go back to the original dishes.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setConfirmReset(false)}
              autoFocus
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger" disabled={busy} onClick={handleReset}>
              Reset Menu
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Admin
