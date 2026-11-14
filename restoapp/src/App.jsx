import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />

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
