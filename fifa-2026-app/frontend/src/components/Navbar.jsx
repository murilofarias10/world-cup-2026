import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

function Navbar() {
  const { session, profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">⚽</span>
          <span className="brand-text">
            FIFA <span className="brand-text-accent">Connect</span>
          </span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
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
            <NavLink to="/bracket" className={({ isActive }) => isActive ? 'active' : ''}>
              Bracket
            </NavLink>
          </li>

          {session ? (
            <li className="navbar-user">
              <span className="navbar-avatar" title={profile?.name ?? session.user.email}>
                {(profile?.name ?? session.user.email)?.[0]?.toUpperCase()}
              </span>
              <button className="navbar-signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
