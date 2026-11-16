import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Admin from './pages/Admin.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MenuProvider from './context/MenuProvider.jsx'
import CartProvider from './context/CartProvider.jsx'

function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <CartProvider>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </MenuProvider>

      {/* Pop-up notifications, styled to match the theme */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--brand)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
          },
          success: {
            iconTheme: { primary: 'var(--accent-light)', secondary: 'var(--brand)' },
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
