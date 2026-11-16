import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useMenu } from '../context/MenuContext.js'
import { iconFor } from '../utils/categories.js'
import DishCard from '../components/DishCard.jsx'
import MenuStatus from '../components/MenuStatus.jsx'

function Menu() {
  const { dishes, status } = useMenu()
  const [selected, setSelected] = useState('All')

  // Category names in the order they appear in the data, with "All" first.
  const categories = ['All', ...new Set(dishes.map((dish) => dish.category))]

  // If the selected category's last dish was deleted, fall back to "All".
  const current = categories.includes(selected) ? selected : 'All'

  const shown =
    current === 'All' ? dishes : dishes.filter((dish) => dish.category === current)

  return (
    <>
      <section className="page-header text-center">
        <div className="container">
          <p className="eyebrow">Fresh from our kitchen</p>
          <h1>Our Menu</h1>
          <p className="lead mb-0">Classic Lebanese dishes, made fresh every day.</p>
        </div>
      </section>

      <div className="container py-5">
        {status !== 'ready' ? (
          <MenuStatus status={status} />
        ) : dishes.length === 0 ? (
          <p className="text-center text-body-secondary py-5 mb-0">
            The menu is empty right now. Please check back soon.
          </p>
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
              {categories.map((category) => {
                const Icon = iconFor(category)
                const active = current === category
                return (
                  <button
                    key={category}
                    type="button"
                    className={`filter-btn${active ? ' active' : ''}`}
                    aria-pressed={active}
                    onClick={() => setSelected(category)}
                  >
                    <Icon />
                    {category}
                  </button>
                )
              })}
            </div>
            <p className="menu-hint text-center mb-5">
              <FaShoppingCart aria-hidden="true" />
              Double-click a dish to add it to your cart.
            </p>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {shown.map((dish) => (
                <div className="col" key={dish.id}>
                  <DishCard dish={dish} Icon={iconFor(dish.category)} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Menu
