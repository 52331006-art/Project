import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

// Gives any component the cart and the actions to change it.
// Usage: const { items, itemCount, addToCart } = useCart()
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
