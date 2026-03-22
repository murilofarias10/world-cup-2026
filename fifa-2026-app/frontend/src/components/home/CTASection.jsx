import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="hp-container">
        <p className="cta-kicker">June 11 – July 19, 2026</p>
        <h2 className="cta-title">
          Ready to experience FIFA 2026 in Canada?
        </h2>
        <p className="cta-sub">
          Join thousands of fans already planning their World Cup journey.
          Find your city, your venue, and your community.
        </p>
        <div className="cta-actions">
          <button className="cta-btn-primary" onClick={() => navigate('/matches')}>
            Start Exploring
          </button>
          <button className="cta-btn-secondary" onClick={() => navigate('/matches')}>
            View Matches →
          </button>
        </div>
      </div>
    </section>
  );
}
