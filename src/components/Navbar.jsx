import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          M&B
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <span className={isOpen ? 'open' : ''}></span>
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/countdown" className={location.pathname === '/countdown' ? 'active' : ''} onClick={closeMenu}>
              Countdown
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/haldi" className={location.pathname === '/haldi' ? 'active' : ''} onClick={closeMenu}>
              Haldi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wedding" className={location.pathname === '/wedding' ? 'active' : ''} onClick={closeMenu}>
              Wedding
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={closeMenu}>
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rsvp" className={location.pathname === '/rsvp' ? 'active' : ''} onClick={closeMenu}>
              RSVP
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
