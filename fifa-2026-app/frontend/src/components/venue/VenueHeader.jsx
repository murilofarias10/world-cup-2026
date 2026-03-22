import { useNavigate } from 'react-router-dom';

const BADGE_ICONS = {
  'Official Fan Zone': '🏆',
  'Fan Zone':          '🏆',
  'Sports Bar':        '📺',
  'Craft Brewery':     '🍺',
  'Brewery':           '🍺',
  'Café':              '☕',
  'Bar & Grill':       '🍔',
  'Bar & Kitchen':     '🥗',
  'Sports Lounge':     '🛋️',
  'Sports Pub':        '🎯',
  'Popular':           '🔥',
  'Most Popular':      '🔥',
  'Near Transit':      '🚇',
  'Near BC Place':     '🏟️',
  'Harbourfront':      '⚓',
  'Outdoor Patio':     '🌿',
  'Family Friendly':   '👨‍👩‍👧',
  'Mountain Views':    '🏔️',
  'Oceanfront Views':  '🌊',
  'Waterfront':        '🌊',
  'Historic District': '🏛️',
  'Iconic Venue':      '⭐',
  'Local Fave':        '❤️',
  'Pike Place Adjacent': '🐟',
};

function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="vhdr-stars" aria-label={`${rating} out of 5`}>
      {'★'.repeat(full)}
      {half  ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
}

export default function VenueHeader({ venue, matchTitle, onJoinParty }) {
  const navigate = useNavigate();

  function handleDirections() {
    const query = encodeURIComponent(`${venue.name}, ${venue.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }

  return (
    <header className="vhdr-root">
      {/* ── Country / category breadcrumb ── */}
      <div className="vhdr-breadcrumb">
        <span>{venue.country}</span>
        <span className="vhdr-bc-sep">›</span>
        <span>{venue.city}</span>
        <span className="vhdr-bc-sep">›</span>
        <span>{venue.category}</span>
      </div>

      {/* ── Name + tagline ── */}
      <h1 className="vhdr-name">{venue.name}</h1>
      <p  className="vhdr-tagline">"{venue.tagline}"</p>

      {/* ── Rating + address row ── */}
      <div className="vhdr-meta-row">
        <div className="vhdr-rating">
          <StarRating rating={venue.rating} />
          <span className="vhdr-rating-num">{venue.rating}</span>
          <span className="vhdr-rating-count">({venue.ratingCount} reviews)</span>
        </div>
        <span className="vhdr-dot">·</span>
        <span className="vhdr-address">📍 {venue.address}</span>
        <span className="vhdr-dot">·</span>
        <span className="vhdr-distance">{venue.distance} away</span>
      </div>

      {/* ── Badges ── */}
      <div className="vhdr-badges">
        {venue.badges.map((b) => (
          <span key={b} className="vhdr-badge">
            {BADGE_ICONS[b] ?? '•'} {b}
          </span>
        ))}
      </div>

      {/* ── Match context ── */}
      {matchTitle && (
        <div className="vhdr-match-context">
          <span className="vhdr-mc-icon">⚽</span>
          <span className="vhdr-mc-text">Showing: <strong>{matchTitle}</strong></span>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="vhdr-actions">
        <button className="vhdr-btn vhdr-btn--primary" onClick={onJoinParty}>
          🎉 Join Watch Party
        </button>
        <button className="vhdr-btn vhdr-btn--secondary" onClick={handleDirections}>
          🗺️ Get Directions
        </button>
        <button className="vhdr-btn vhdr-btn--ghost" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </header>
  );
}
