export default function VenueInfoCard({ venue }) {
  return (
    <section className="vic-root">
      <h2 className="vic-section-title">About This Venue</h2>
      <p className="vic-description">{venue.description}</p>

      <div className="vic-grid">
        {/* Capacity */}
        <InfoRow icon="🪑" label="Capacity" value={`${venue.capacity} guests`} />

        {/* Distance */}
        <InfoRow icon="📍" label="Distance from Centre" value={venue.distance} />

        {/* Opening hours */}
        <InfoRow
          icon="🕐"
          label="Opening Hours"
          value={venue.hours ? `${venue.hours.open} – ${venue.hours.close}` : 'Open daily'}
        />

        {/* Rating */}
        <InfoRow
          icon="⭐"
          label="Guest Rating"
          value={`${venue.rating} / 5.0 (${venue.ratingCount} reviews)`}
        />

        {/* Accessibility */}
        {venue.accessibility && (
          <InfoRow icon="♿" label="Accessibility" value={venue.accessibility} fullWidth />
        )}

        {/* Transit */}
        {venue.transit && (
          <InfoRow icon="🚇" label="Getting Here (Transit)" value={venue.transit} fullWidth />
        )}

        {/* Parking */}
        {venue.parking && (
          <InfoRow icon="🅿️" label="Parking" value={venue.parking} fullWidth />
        )}
      </div>

      {/* Highlights */}
      {venue.highlights?.length > 0 && (
        <div className="vic-highlights">
          <h3 className="vic-highlights-title">What Makes It Special</h3>
          <ul className="vic-highlights-list">
            {venue.highlights.map((h) => (
              <li key={h} className="vic-highlight-item">
                <span className="vic-hl-check">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function InfoRow({ icon, label, value, fullWidth }) {
  return (
    <div className={`vic-row${fullWidth ? ' vic-row--full' : ''}`}>
      <span className="vic-row-icon">{icon}</span>
      <div className="vic-row-content">
        <span className="vic-row-label">{label}</span>
        <span className="vic-row-value">{value}</span>
      </div>
    </div>
  );
}
