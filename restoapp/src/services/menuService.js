// Every read and write of menu dishes goes through this file.
//
// STAGE 1 (now): front end only. Dishes are saved in the browser's
// localStorage, starting from the default list in data/menu.js.
//
// STAGE 2 (API): replace the body of each function with a fetch() call.
// Every function already returns a Promise, so MenuProvider and the pages
// won't need to change. Example for a json-server style API:
//
//   const API_URL = 'http://localhost:3000/dishes'
//
//   export async function getDishes() {
//     const res = await fetch(API_URL)
//     if (!res.ok) throw new Error('Could not load the menu')
//     return res.json()
//   }
//
//   export async function createDish(dish) {
//     const res = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(dish),
//     })
//     if (!res.ok) throw new Error('Could not add the dish')
//     return res.json()
//   }
//
//   updateDish -> fetch(`${API_URL}/${id}`, { method: 'PUT', ... })
//   deleteDish -> fetch(`${API_URL}/${id}`, { method: 'DELETE' })

import defaultMenu from '../data/menu.js'

const STORAGE_KEY = 'restoapp.menu'

function readDishes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultMenu
  } catch {
    // Storage is blocked or the saved data is broken: fall back to the defaults.
    return defaultMenu
  }
}

function saveDishes(dishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes))
}

// GET /dishes
export async function getDishes() {
  return readDishes()
}

// POST /dishes. The server would normally create the id.
export async function createDish(dish) {
  const dishes = readDishes()
  const id = dishes.reduce((max, d) => Math.max(max, d.id), 0) + 1
  const created = { ...dish, id }
  saveDishes([...dishes, created])
  return created
}

// PUT /dishes/:id. Replaces the whole dish.
export async function updateDish(id, dish) {
  const dishes = readDishes()
  if (!dishes.some((d) => d.id === id)) throw new Error('Dish not found')
  const updated = { ...dish, id }
  saveDishes(dishes.map((d) => (d.id === id ? updated : d)))
  return updated
}

// DELETE /dishes/:id
export async function deleteDish(id) {
  saveDishes(readDishes().filter((d) => d.id !== id))
}

// Stage 1 only: throw away local changes and go back to data/menu.js.
// With a real API this would be done on the server instead.
export async function resetDishes() {
  localStorage.removeItem(STORAGE_KEY)
  return defaultMenu
}
