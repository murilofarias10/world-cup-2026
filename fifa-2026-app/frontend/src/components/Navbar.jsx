import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">⚽</span>
          <span className="brand-text">FIFA 2026</span>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/teams" className={({ isActive }) => isActive ? 'active' : ''}>
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink to="/matches" className={({ isActive }) => isActive ? 'active' : ''}>
              Matches
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
