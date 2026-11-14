// Every dish on the menu. The Menu page reads this list.
// price is in USD. image paths point to files in public/images/.

const menu = [
  // Starters
  {
    id: 1,
    name: 'Hummus',
    category: 'Starters',
    description: 'Creamy chickpea dip with tahini, lemon and olive oil, topped with whole chickpeas and paprika.',
    price: 6,
    image: '/images/hummus.jpg',
  },
  {
    id: 2,
    name: 'Falafel',
    category: 'Starters',
    description: 'Crispy fried chickpea and herb fritters, served with tahini sauce.',
    price: 7,
    image: '/images/falafel.jpg',
  },
  {
    id: 3,
    name: 'Mezze Platter',
    category: 'Starters',
    description: 'A sharing spread of hummus, baba ghanouj, muhammara and labneh with za\'atar, served with warm bread.',
    price: 18,
    image: '/images/mezze-platter.jpg',
  },

  // Mains
  {
    id: 4,
    name: 'Shish Taouk',
    category: 'Mains',
    description: 'Chicken skewers marinated in garlic, lemon and yogurt, grilled over charcoal with peppers.',
    price: 14,
    image: '/images/shish-taouk.jpg',
  },
  {
    id: 5,
    name: 'Beef Shawarma',
    category: 'Mains',
    description: 'Slow-roasted spiced beef sliced from the spit, served with tahini, pickles and bread.',
    price: 15,
    image: '/images/beef-shawarma.jpg',
  },
  {
    id: 6,
    name: 'Mixed Grill',
    category: 'Mains',
    description: 'A selection of grilled chicken and meat skewers with rice, bread and dipping sauces.',
    price: 22,
    image: '/images/mixed-grill.jpg',
  },

  // Desserts
  {
    id: 7,
    name: 'Baklava',
    category: 'Desserts',
    description: 'Layers of flaky filo pastry filled with pistachios and soaked in sweet syrup.',
    price: 6,
    image: '/images/baklava.jpg',
  },
  {
    id: 8,
    name: 'Osmalieh',
    category: 'Desserts',
    description: 'Crispy shredded pastry topped with ashta cream, pistachios and a drizzle of syrup.',
    price: 7,
    image: '/images/osmalieh.jpg',
  },

  // Drinks
  {
    id: 9,
    name: 'Fresh Lemonade',
    category: 'Drinks',
    description: 'Freshly squeezed lemons with mint and ice.',
    price: 4,
    image: '/images/lemonade.jpg',
  },
  {
    id: 10,
    name: 'Mint Tea',
    category: 'Drinks',
    description: 'Hot tea brewed with fresh mint leaves.',
    price: 3,
    image: '/images/mint-tea.jpg',
  },
  {
    id: 11,
    name: 'Arabic Coffee',
    category: 'Drinks',
    description: 'Lightly roasted coffee brewed with cardamom.',
    price: 3,
    image: '/images/arabic-coffee.jpg',
  },
]

export default menu
