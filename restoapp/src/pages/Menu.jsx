import { useState } from 'react'
import { FaThList, FaLeaf, FaDrumstickBite, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa'
import menu from '../data/menu.js'
import DishCard from '../components/DishCard.jsx'

// Category names in the order they appear in the data, with "All" first.
const categories = ['All', ...new Set(menu.map((dish) => dish.category))]

// Icon for each category. Any new category falls back to FaUtensils.
const categoryIcons = {
  All: FaThList,
  Starters: FaLeaf,
  Mains: FaDrumstickBite,
  Desserts: FaIceCream,
  Drinks: FaCoffee,
}
const iconFor = (category) => categoryIcons[category] ?? FaUtensils

function Menu() {
  const [selected, setSelected] = useState('All')

  const dishes =
    selected === 'All' ? menu : menu.filter((dish) => dish.category === selected)

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
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((category) => {
            const Icon = iconFor(category)
            const active = selected === category
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

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {dishes.map((dish) => (
            <div className="col" key={dish.id}>
              <DishCard dish={dish} Icon={iconFor(dish.category)} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Menu
