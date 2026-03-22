import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: '⚽',
    iconClass: 'feature-icon--red',
    title: 'Watch Together',
    desc:  'Find the best venues to watch matches with fans around you. Browse cafés, bars, and fan zones by city.',
    cta:   'Find Venues',
    route: '/matches',
  },
  {
    icon: '🗺️',
    iconClass: 'feature-icon--blue',
    title: 'Explore Cities',
    desc:  'Discover Canadian cities, local attractions, and cultural hotspots during the World Cup.',
    cta:   'Browse Cities',
    route: '/teams',
  },
  {
    icon: '💬',
    iconClass: 'feature-icon--green',
    title: 'Join the Community',
    desc:  'Connect with fans, share experiences, and join live match conversations in real time.',
    cta:   'Join Now',
    route: '/matches',
  },
];

export default function FeatureSection() {
  const navigate = useNavigate();

  return (
    <section className="features">
      <div className="hp-container">
        <div className="features-header">
          <span className="hp-section-eyebrow">What we offer</span>
          <h2 className="hp-section-title">Everything you need<br />for the World Cup</h2>
          <p className="hp-section-sub">
            From finding the perfect viewing venue to exploring local culture —
            FIFA Connect is your complete tournament companion.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-icon ${f.iconClass}`}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <button className="feature-link" onClick={() => navigate(f.route)}>
                {f.cta} <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
