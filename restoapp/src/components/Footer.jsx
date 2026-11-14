import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <span className="fw-bold">RestoApp</span>
            <span className="text-secondary ms-2">&copy; {year} All rights reserved.</span>
          </div>
          <div className="col-md-6">
            <ul className="nav justify-content-center justify-content-md-end">
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-2 text-light" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
