import toast from 'react-hot-toast'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext.js'
import { imageOrPlaceholder, showPlaceholder } from '../utils/images.js'

// Double-click a card to add the dish to the cart.
function DishCard({ dish, Icon }) {
  const { addToCart, quantityOf } = useCart()
  const inCart = quantityOf(dish.id)

  const handleDoubleClick = () => {
    addToCart(dish.id)
    const total = inCart + 1
    // Same toast id per dish, so repeated adds update one toast instead of stacking.
    toast.success(
      total === 1 ? `${dish.name} added to your cart` : `${dish.name} added (${total} in cart)`,
      { id: `cart-${dish.id}` },
    )
  }

  return (
    <div
      className="card dish-card h-100"
      onDoubleClick={handleDoubleClick}
      title="Double-click to add to cart"
    >
      <div className="dish-img-wrap">
        <img
          src={imageOrPlaceholder(dish.image)}
          onError={showPlaceholder}
          className="dish-img"
          alt={dish.name}
          loading="lazy"
          draggable={false}
        />
        <span className="dish-price">${dish.price.toFixed(2)}</span>
        {inCart > 0 && (
          <span className="dish-in-cart">
            <FaShoppingCart aria-hidden="true" />
            {inCart} in cart
          </span>
        )}
      </div>
      <div className="card-body">
        <span className="dish-category mb-1">
          {Icon && <Icon />}
          {dish.category}
        </span>
        <h5 className="card-title">{dish.name}</h5>
        <p className="card-text">{dish.description}</p>
      </div>
    </div>
  )
}

export default DishCard
