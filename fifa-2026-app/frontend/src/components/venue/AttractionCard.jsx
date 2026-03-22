import { CATEGORY_META } from '../../services/attractionService.js';

export default function AttractionCard({ attraction, onViewOnMap }) {
  const meta = CATEGORY_META[attraction.category] ?? {
    emoji: '📍',
    color: '#64748b',
    label: attraction.category,
  };

  return (
    <article className="atc-root">
      <div className="atc-icon-wrap" style={{ background: `${meta.color}18`, borderColor: `${meta.color}40` }}>
        <span className="atc-icon" role="img" aria-label={meta.label}>{meta.emoji}</span>
      </div>

      <div className="atc-body">
        <div className="atc-header">
          <h4 className="atc-name">{attraction.name}</h4>
          <span className="atc-cat-pill" style={{ color: meta.color, background: `${meta.color}14`, border: `1px solid ${meta.color}30` }}>
            {meta.label}
          </span>
        </div>

        <p className="atc-desc">{attraction.desc}</p>

        <div className="atc-meta">
          <span className="atc-meta-item">
            <span className="atc-meta-icon">📍</span>
            {attraction.distance}
          </span>
          <span className="atc-meta-sep">·</span>
          <span className="atc-meta-item">
            <span className="atc-meta-icon">⏱️</span>
            {attraction.visitDuration}
          </span>
        </div>

        <button
          className="atc-map-btn"
          onClick={() => onViewOnMap(attraction)}
          style={{ '--atc-color': meta.color }}
        >
          🗺️ View on Map
        </button>
      </div>
    </article>
  );
}
