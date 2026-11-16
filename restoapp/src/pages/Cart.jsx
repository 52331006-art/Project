import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaMinus, FaPlus, FaTrashAlt, FaArrowLeft, FaShoppingBag } from 'react-icons/fa'
import { useMenu } from '../context/MenuContext.js'
import { useCart } from '../context/CartContext.js'
import { imageOrPlaceholder, showPlaceholder } from '../utils/images.js'
import MenuStatus from '../components/MenuStatus.jsx'

const DELIVERY_FEE = 3
const FREE_DELIVERY_FROM = 50

const money = (amount) => `$${amount.toFixed(2)}`

function Cart() {
  const { status } = useMenu()
  const { items, itemCount, changeQuantity, removeFromCart, clearCart } = useCart()

  const removeItem = (item) => {
    removeFromCart(item.id)
    toast(`${item.name} removed from your cart`)
  }

  const checkout = () => {
    // There is no backend yet, so just pretend the order went through.
    toast.success('Order placed! Your food is on its way.')
    clearCart()
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  return (
    <>
      <section className="page-header text-center">
        <div className="container">
          <p className="eyebrow">Almost there</p>
          <h1>Your Cart</h1>
          <p className="lead mb-0">Check your order before you check out.</p>
        </div>
      </section>

      <div className="container py-5">
        {status !== 'ready' ? (
          <MenuStatus status={status} />
        ) : items.length === 0 ? (
          <div className="text-center py-5">
            <FaShoppingBag className="empty-cart-icon mb-3" aria-hidden="true" />
            <h2>Your cart is empty</h2>
            <p className="text-body-secondary mb-4">
              Find something tasty on the menu, then double-click it to add it here.
            </p>
            <Link to="/menu" className="btn btn-brand btn-lg">
              Browse the Menu
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <ul className="list-unstyled mb-3">
                {items.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <img
                      src={imageOrPlaceholder(item.image)}
                      onError={showPlaceholder}
                      className="cart-thumb"
                      alt=""
                    />
                    <div className="cart-item-info">
                      <span className="dish-category">{item.category}</span>
                      <h5 className="mb-1">{item.name}</h5>
                      <span className="small text-body-secondary">{money(item.price)} each</span>
                    </div>
                    <div
                      className="qty-control"
                      role="group"
                      aria-label={`Quantity of ${item.name}`}
                    >
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={item.quantity === 1}
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        <FaMinus />
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <strong className="cart-line-total">{money(item.price * item.quantity)}</strong>
                    <button
                      type="button"
                      className="remove-btn"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item)}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
              <Link to="/menu" className="continue-link">
                <FaArrowLeft />
                Continue shopping
              </Link>
            </div>

            <div className="col-lg-4">
              <div className="card info-card summary-card p-4">
                <h4 className="mb-4">Order Summary</h4>
                <dl className="summary-list mb-0">
                  <div>
                    <dt>Items</dt>
                    <dd>{itemCount}</dd>
                  </div>
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{money(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>{delivery === 0 ? 'Free' : money(delivery)}</dd>
                  </div>
                  <div className="summary-total">
                    <dt>Total</dt>
                    <dd>{money(total)}</dd>
                  </div>
                </dl>
                {delivery > 0 && (
                  <p className="small text-body-secondary mt-3 mb-0">
                    Add {money(FREE_DELIVERY_FROM - subtotal)} more for free delivery.
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-accent btn-lg w-100 mt-4"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
