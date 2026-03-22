import { useNavigate, useParams } from 'react-router-dom';

// ── VenueCard ────────────────────────────────────────────────────
// Displays a single venue with name, location, capacity, interest
// count, select/deselect button, and a link to the full venue page.

function VenueCard({ venue, selected, onSelect }) {
  const navigate  = useNavigate();
  const { matchId } = useParams();

  function handleOpenVenue(e) {
    e.stopPropagation();
    const url = matchId
      ? `/venue/${venue.id}?matchId=${matchId}`
      : `/venue/${venue.id}`;
    navigate(url);
  }

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

      <div className="wp-vc-actions">
        <button
          className={`wp-vc-btn${selected ? ' wp-vc-btn--selected' : ''}`}
          onClick={() => onSelect(venue)}
        >
          {selected ? '✓ Venue Selected' : 'Select Venue'}
        </button>
        <button className="wp-vc-open-btn" onClick={handleOpenVenue}>
          Explore →
        </button>
      </div>
    </article>
  );
}

export default VenueCard;
