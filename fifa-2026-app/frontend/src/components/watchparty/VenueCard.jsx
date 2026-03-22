// ── VenueCard ────────────────────────────────────────────────────
// Displays a single venue with name, location, capacity, interest
// count, and a select/deselect button.

function VenueCard({ venue, selected, onSelect }) {
  return (
    <article className={`wp-venue-card${selected ? ' wp-venue-card--selected' : ''}`}>
      <div className="wp-vc-header">
        <div>
          <h4 className="wp-vc-name">{venue.name}</h4>
          <p className="wp-vc-address">{venue.address}</p>
        </div>
        {selected && <span className="wp-vc-selected-badge">✓ Selected</span>}
      </div>

      <div className="wp-vc-meta">
        <span className="wp-vc-meta-item">
          <span className="wp-vc-meta-icon">📍</span>
          {venue.city} · {venue.distance}
        </span>
        <span className="wp-vc-meta-item">
          <span className="wp-vc-meta-icon">🪑</span>
          Capacity {venue.capacity}
        </span>
        <span className="wp-vc-meta-item wp-vc-interest">
          <span className="wp-vc-meta-icon">🔥</span>
          <strong>{venue.interestedCount}</strong>&nbsp;interested
        </span>
      </div>

      <button
        className={`wp-vc-btn${selected ? ' wp-vc-btn--selected' : ''}`}
        onClick={() => onSelect(venue)}
      >
        {selected ? '✓ Venue Selected' : 'Select Venue'}
      </button>
    </article>
  );
}

export default VenueCard;
