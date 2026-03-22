import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-inner">
        <div className="hp-footer-brand">
          <span className="hp-footer-brand-icon">⚽</span>
          <div>
            <div className="hp-footer-brand-name">
              FIFA <span>Connect</span>
            </div>
            <div className="hp-footer-tagline">Explore · Connect · Experience</div>
          </div>
        </div>

        <nav className="hp-footer-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/bracket">Bracket</NavLink>
        </nav>

        <p className="hp-footer-copy">© 2026 FIFA Connect · Cursor Hackathon</p>
      </div>
    </footer>
  );
}
