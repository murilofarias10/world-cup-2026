import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Decorative rings */}
      <div className="hero-ring hero-ring--1" />
      <div className="hero-ring hero-ring--2" />
      <div className="hero-ring hero-ring--3" />
      {/* Dot grid */}
      <div className="hero-grid" />

      <div className="hero-content">
        <p className="hero-eyebrow">FIFA World Cup 2026™</p>

        <h1 className="hero-brand">
          FIFA <span>Connect</span>
        </h1>

        <p className="hero-heading">
          Discover Canada through the<br />World Cup experience
        </p>

        <p className="hero-sub">
          A tourism + social platform connecting World Cup fans
          to Canadian cities, venues, and local culture.
        </p>

        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={() => navigate('/matches')}>
            Explore Matches →
          </button>
          <button className="hero-btn-secondary" onClick={() => navigate('/teams')}>
            Discover Cities
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">104</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="hero-stat-sep" />
          <div className="hero-stat">
            <span className="stat-num">16</span>
            <span className="stat-label">Venues</span>
          </div>
          <div className="hero-stat-sep" />
          <div className="hero-stat">
            <span className="stat-num">48</span>
            <span className="stat-label">Nations</span>
          </div>
          <div className="hero-stat-sep" />
          <div className="hero-stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Host Countries</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-arrow" />
      </div>
    </section>
  );
}
