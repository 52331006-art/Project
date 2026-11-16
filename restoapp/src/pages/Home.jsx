import { Link } from 'react-router-dom'
import { FaLeaf, FaFire, FaMotorcycle, FaStar, FaQuoteLeft } from 'react-icons/fa'
import reviews from '../data/reviews.js'
import { contact } from '../data/restaurant.js'
import { useMenu } from '../context/MenuContext.js'
import { iconFor } from '../utils/categories.js'
import DishCard from '../components/DishCard.jsx'

// Dishes shown under "Chef's picks", by id. If they've all been deleted,
// the first three dishes on the menu are shown instead.
const featuredIds = [3, 4, 7]

const features = [
  {
    Icon: FaLeaf,
    title: 'Fresh Ingredients',
    text: 'Vegetables and herbs from local farms, delivered to our kitchen every morning.',
  },
  {
    Icon: FaFire,
    title: 'Charcoal Grilled',
    text: 'Our skewers are cooked over real charcoal for that smoky, home-style taste.',
  },
  {
    Icon: FaMotorcycle,
    title: 'Fast Delivery',
    text: 'Hot food at your door in about 30 minutes, anywhere in Beirut.',
  },
]

function Stars({ rating }) {
  return (
    <div className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={i < rating ? 'filled' : ''} />
      ))}
    </div>
  )
}

function Home() {
  const { dishes } = useMenu()
  const picks = dishes.filter((dish) => featuredIds.includes(dish.id))
  const featured = picks.length > 0 ? picks : dishes.slice(0, 3)

  return (
    <>
      <section className="home-hero text-center">
        <div className="container">
          <p className="eyebrow">Welcome to RestoApp</p>
          <h1 className="mb-3">A Taste of Beirut, Served Fresh</h1>
          <p className="lead hero-lead mx-auto mb-4">
            Family recipes, charcoal grills and warm bread straight from the oven. Eat in on
            Hamra Street or have it delivered to your door.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/menu" className="btn btn-accent btn-lg">
              View Our Menu
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
          {features.map(({ Icon, title, text }) => (
            <div className="col" key={title}>
              <div className="feature-icon mx-auto mb-3">
                <Icon />
              </div>
              <h5>{title}</h5>
              <p className="text-body-secondary mb-0">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section-alt py-5">
          <div className="container">
            <div className="section-heading text-center mb-5">
              <p className="eyebrow">Chef&apos;s picks</p>
              <h2>Our Most Loved Dishes</h2>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {featured.map((dish) => (
                <div className="col" key={dish.id}>
                  <DishCard dish={dish} Icon={iconFor(dish.category)} />
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link to="/menu" className="btn btn-brand btn-lg">
                See the Full Menu
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="container py-5">
        <div className="section-heading text-center mb-5">
          <p className="eyebrow">Reviews</p>
          <h2>What Our Guests Say</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {reviews.map((review) => (
            <div className="col" key={review.id}>
              <figure className="card info-card review-card h-100 p-4 mb-0">
                <FaQuoteLeft className="quote-icon mb-3" aria-hidden="true" />
                <Stars rating={review.rating} />
                <blockquote className="flex-grow-1 my-3">
                  <p className="mb-0">{review.text}</p>
                </blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span className="d-block small text-body-secondary">{review.detail}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band py-5">
        <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 text-center text-lg-start">
          <div>
            <h2 className="mb-2">Hungry yet?</h2>
            <p className="mb-0">
              Open {contact.hours.toLowerCase()}. Call {contact.phone} or order online.
            </p>
          </div>
          <Link to="/menu" className="btn btn-accent btn-lg flex-shrink-0">
            Order Now
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
