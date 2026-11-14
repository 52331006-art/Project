import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaUtensils, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark site-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={close}>
          <FaUtensils className="brand-icon" />
          RestoApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {links.map(({ to, label, end }) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to} end={end} onClick={close}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            className="btn btn-accent cart-btn ms-lg-3 mb-2 mb-lg-0"
            to="/cart"
            onClick={close}
          >
            <FaShoppingCart />
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
