import { useNavigate } from 'react-router-dom';

const CITIES = [
  {
    key:     'toronto',
    imgClass:'exp-toronto',
    emoji:   '🏙️',
    tag:     'Ontario',
    title:   'Toronto Fan Zones',
    desc:    'Experience the electric atmosphere of Maple Leaf Square, Nathan Phillips Square, and local fan hubs.',
    matches: 7,
    stadium: 'BMO Field',
  },
  {
    key:     'vancouver',
    imgClass:'exp-vancouver',
    emoji:   '🏔️',
    tag:     'British Columbia',
    title:   'Vancouver Match Nights',
    desc:    'Set against the stunning backdrop of mountains and sea, Vancouver brings a unique coastal World Cup vibe.',
    matches: 7,
    stadium: 'BC Place',
  },
  {
    key:     'montreal',
    imgClass:'exp-montreal',
    emoji:   '🎨',
    tag:     'Québec',
    title:   'Montréal Cultural Spots',
    desc:    'Dive into Montréal\'s renowned arts scene, bilingual culture, and legendary food culture between matches.',
    matches: null,
    stadium: null,
    note: 'Cultural Destination',
  },
];

export default function ExperienceSection() {
  const navigate = useNavigate();

  return (
    <section className="experience">
      <div className="hp-container">
        <div className="experience-header">
          <div>
            <span className="hp-section-eyebrow">Featured destinations</span>
            <h2 className="hp-section-title">
              Experience the World Cup<br />Beyond the Stadium
            </h2>
          </div>
          <button className="feature-link" onClick={() => navigate('/teams')}>
            View all cities →
          </button>
        </div>

        <div className="experience-grid">
          {CITIES.map((city) => (
            <div key={city.key} className="exp-card">
              <div className={`exp-card-img ${city.imgClass}`}>
                <span style={{ position: 'relative', zIndex: 1 }}>{city.emoji}</span>
              </div>
              <div className="exp-card-body">
                <span className="exp-card-tag">{city.tag}</span>
                <h3>{city.title}</h3>
                <p>{city.desc}</p>
                {city.stadium && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', marginTop: '-0.5rem' }}>
                    🏟️ {city.stadium} · {city.matches} matches
                  </p>
                )}
                {city.note && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', marginTop: '-0.5rem' }}>
                    ✨ {city.note}
                  </p>
                )}
                <button className="exp-card-btn" onClick={() => navigate('/teams')}>
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
