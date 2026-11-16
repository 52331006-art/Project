import { createContext, useContext } from 'react'

export const MenuContext = createContext(null)

// Gives any component the dishes and the add / edit / delete actions.
// Usage: const { dishes, status, addDish } = useMenu()
export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu must be used inside <MenuProvider>')
  return context
}
