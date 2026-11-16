import { useEffect, useState } from 'react'
import { useMenu } from './MenuContext.js'
import { CartContext } from './CartContext.js'

const STORAGE_KEY = 'restoapp.cart'

function loadLines() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Holds the cart for the whole app and saves it in localStorage so it
// survives a page refresh. Must sit inside <MenuProvider>.
//
// The cart only stores { dishId, quantity } lines. Names, prices and photos
// come from the menu, so edits on the admin page show up in the cart and
// deleted dishes drop out of it.
function CartProvider({ children }) {
  const { dishes } = useMenu()
  const [lines, setLines] = useState(loadLines)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage is blocked: the cart still works, it just won't be remembered.
    }
  }, [lines])

  const items = lines
    .map(({ dishId, quantity }) => {
      const dish = dishes.find((d) => d.id === dishId)
      return dish && { ...dish, quantity }
    })
    .filter(Boolean)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const quantityOf = (dishId) => lines.find((line) => line.dishId === dishId)?.quantity ?? 0

  const addToCart = (dishId) =>
    setLines((current) =>
      current.some((line) => line.dishId === dishId)
        ? current.map((line) =>
            line.dishId === dishId ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...current, { dishId, quantity: 1 }],
    )

  const changeQuantity = (dishId, change) =>
    setLines((current) =>
      current.map((line) =>
        line.dishId === dishId
          ? { ...line, quantity: Math.max(1, line.quantity + change) }
          : line,
      ),
    )

  const removeFromCart = (dishId) =>
    setLines((current) => current.filter((line) => line.dishId !== dishId))

  const clearCart = () => setLines([])

  const value = {
    items,
    itemCount,
    quantityOf,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
