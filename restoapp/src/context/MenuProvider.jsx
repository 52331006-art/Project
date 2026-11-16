import { useEffect, useState } from 'react'
import * as menuService from '../services/menuService.js'
import { MenuContext } from './MenuContext.js'

// Loads the dishes once and shares them with the whole app.
// Each action saves through menuService first, then updates the list on
// screen, so pages always show what was actually saved.
// Actions throw if saving fails, so the caller can show an error.
function MenuProvider({ children }) {
  const [dishes, setDishes] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let ignore = false
    menuService
      .getDishes()
      .then((data) => {
        if (ignore) return
        setDishes(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  const addDish = async (dish) => {
    const created = await menuService.createDish(dish)
    setDishes((current) => [...current, created])
    return created
  }

  const editDish = async (id, dish) => {
    const updated = await menuService.updateDish(id, dish)
    setDishes((current) => current.map((d) => (d.id === id ? updated : d)))
    return updated
  }

  const removeDish = async (id) => {
    await menuService.deleteDish(id)
    setDishes((current) => current.filter((d) => d.id !== id))
  }

  const resetMenu = async () => {
    const defaults = await menuService.resetDishes()
    setDishes(defaults)
  }

  const value = { dishes, status, addDish, editDish, removeDish, resetMenu }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export default MenuProvider
