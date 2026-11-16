import { FaThList, FaLeaf, FaDrumstickBite, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa'

// The categories a dish can belong to, in menu order.
export const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks']

// Icon for each category. Any new category falls back to FaUtensils.
const categoryIcons = {
  All: FaThList,
  Starters: FaLeaf,
  Mains: FaDrumstickBite,
  Desserts: FaIceCream,
  Drinks: FaCoffee,
}

export const iconFor = (category) => categoryIcons[category] ?? FaUtensils
