function DishCard({ dish, Icon }) {
  return (
    <div className="card dish-card h-100">
      <div className="dish-img-wrap">
        <img src={dish.image} className="dish-img" alt={dish.name} loading="lazy" />
        <span className="dish-price">${dish.price.toFixed(2)}</span>
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
