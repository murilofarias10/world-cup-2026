import AttractionCard from './AttractionCard.jsx';

export default function NearbyAttractions({ attractions, onViewOnMap }) {
  if (!attractions?.length) {
    return (
      <section className="nat-root">
        <div className="nat-header">
          <h2 className="nat-title">Nearby Places to Explore</h2>
          <p className="nat-sub">Discover what's around this venue during match day</p>
        </div>
        <div className="nat-empty">
          <span className="nat-empty-icon">🗺️</span>
          <p>No nearby attractions listed for this city yet.</p>
          <p className="nat-empty-hint">Check back soon — more destinations are being added.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="nat-root">
      <div className="nat-header">
        <h2 className="nat-title">Nearby Places to Explore</h2>
        <p className="nat-sub">
          Make it a full day out — discover local culture, food, and landmarks before kick-off
        </p>
      </div>

      <div className="nat-grid">
        {attractions.map((a) => (
          <AttractionCard
            key={a.id}
            attraction={a}
            onViewOnMap={onViewOnMap}
          />
        ))}
      </div>
    </section>
  );
}
