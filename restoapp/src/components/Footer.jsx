import { Link } from 'react-router-dom'
import { FaUtensils, FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from 'react-icons/fa'
import { contact, socials } from '../data/restaurant.js'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-auto pt-5">
      <div className="container">
        <div className="row gy-4 pb-4">
          <div className="col-md-4">
            <h4 className="footer-brand">
              <FaUtensils className="brand-icon" />
              RestoApp
            </h4>
            <p className="mb-3">Classic Lebanese dishes, made fresh every day.</p>
            <div className="footer-social d-flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <h5 className="footer-title">Explore</h5>
            <ul className="footer-links list-unstyled mb-0">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/admin">Manage Menu</Link></li>
            </ul>
          </div>

          <div className="col-sm-6 col-md-4">
            <h5 className="footer-title">Visit Us</h5>
            <ul className="footer-contact list-unstyled mb-0">
              <li><FaMapMarkerAlt /> {contact.address}</li>
              <li><FaPhoneAlt /> {contact.phone}</li>
              <li><FaRegClock /> {contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center py-3">
          &copy; {year} RestoApp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
