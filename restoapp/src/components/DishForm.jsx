import { useState } from 'react'
import { CATEGORIES } from '../utils/categories.js'
import { imageOrPlaceholder, showPlaceholder } from '../utils/images.js'

// Form values are kept as strings while typing.
const toFormValues = (dish) => ({
  name: dish.name ?? '',
  category: dish.category ?? CATEGORIES[0],
  price: dish.price != null ? String(dish.price) : '',
  description: dish.description ?? '',
  image: dish.image ?? '',
})

function validate(values, takenNames) {
  const errors = {}
  const name = values.name.trim()
  const price = Number(values.price)

  if (!name) errors.name = 'Enter a name for the dish.'
  else if (takenNames.includes(name.toLowerCase())) errors.name = 'A dish with this name already exists.'

  if (values.price === '' || Number.isNaN(price) || price <= 0) {
    errors.price = 'Enter a price above 0.'
  }

  if (!values.description.trim()) errors.description = 'Add a short description.'

  return errors
}

// Add / edit form for one dish, shown inside a <Modal>.
// dish: the dish being edited, or {} for a new one.
// takenNames: lower-case names of the other dishes, to block duplicates.
// imageOptions: existing photo paths offered as suggestions.
function DishForm({ dish, takenNames, imageOptions, saving, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(dish))
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(values, takenNames)
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus()
      return
    }

    onSubmit({
      name: values.name.trim(),
      category: values.category,
      description: values.description.trim(),
      price: Math.round(Number(values.price) * 100) / 100,
      image: values.image.trim(),
    })
  }

  // Shared props for a field with a validation message underneath.
  const fieldProps = (name) => ({
    id: `dish-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `dish-${name}-error` : undefined,
  })

  const errorFor = (name) =>
    errors[name] && (
      <div className="invalid-feedback" id={`dish-${name}-error`}>
        {errors[name]}
      </div>
    )

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="modal-body">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="dish-name" className="form-label">Name</label>
            <input
              {...fieldProps('name')}
              className={`form-control${errors.name ? ' is-invalid' : ''}`}
              maxLength={60}
              autoFocus
            />
            {errorFor('name')}
          </div>

          <div className="col-sm-7">
            <label htmlFor="dish-category" className="form-label">Category</label>
            <select {...fieldProps('category')} className="form-select">
              {CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="col-sm-5">
            <label htmlFor="dish-price" className="form-label">Price (USD)</label>
            <div className="input-group has-validation">
              <span className="input-group-text">$</span>
              <input
                {...fieldProps('price')}
                type="number"
                min="0.5"
                step="0.5"
                inputMode="decimal"
                className={`form-control${errors.price ? ' is-invalid' : ''}`}
              />
              {errorFor('price')}
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="dish-description" className="form-label">Description</label>
            <textarea
              {...fieldProps('description')}
              rows="3"
              maxLength={200}
              className={`form-control${errors.description ? ' is-invalid' : ''}`}
            />
            {errorFor('description')}
          </div>

          <div className="col-12">
            <label htmlFor="dish-image" className="form-label">
              Photo <span className="text-body-secondary">(optional)</span>
            </label>
            <div className="d-flex gap-3 align-items-start">
              <img
                src={imageOrPlaceholder(values.image)}
                onError={showPlaceholder}
                className="form-img-preview"
                alt=""
              />
              <div className="flex-grow-1">
                <input
                  {...fieldProps('image')}
                  className="form-control"
                  list="dish-image-options"
                  placeholder="/images/hummus.jpg or https://…"
                />
                <datalist id="dish-image-options">
                  {imageOptions.map((src) => (
                    <option key={src} value={src} />
                  ))}
                </datalist>
                <div className="form-text">
                  Paste an image link or pick one of the existing photos. Leave it empty to use
                  a placeholder.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-brand" disabled={saving}>
          {saving ? 'Saving…' : dish.id == null ? 'Add Dish' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

export default DishForm
