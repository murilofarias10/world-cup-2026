import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

/**
 * Navbar — fixed top navigation bar.
 * Becomes opaque on scroll, collapses into a hamburger menu on mobile.
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  /* Track scroll position to toggle the solid background */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close the mobile menu whenever the route changes */
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Teams', path: '/teams' },
    { label: 'Groups', path: '/groups' },
    { label: 'Stadiums', path: '/stadiums' },
    { label: 'Matches', path: '/matches' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚽</span>
          <span>World Cup <span className="logo-accent">2026</span></span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={location.pathname === path ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
