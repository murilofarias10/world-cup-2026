import { useNavigate } from 'react-router-dom';

export default function VenueSidebar({ venue, matchTitle, matchId, attractions, onJoinParty }) {
  const navigate = useNavigate();
  const topAttraction = attractions?.[0];

  function handleDirections() {
    const query = encodeURIComponent(`${venue.name}, ${venue.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text:  `${venue.name} – ${venue.tagline}`,
        url:   window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).then(() =>
        alert('Link copied to clipboard!'),
      );
    }
  }

  return (
    <aside className="vsb-root">
      {/* ── Match context ── */}
      {matchTitle && (
        <div className="vsb-card vsb-match-card">
          <div className="vsb-card-label">⚽ Match Being Shown</div>
          <p className="vsb-match-title">{matchTitle}</p>
          {matchId && (
            <button
              className="vsb-link-btn"
              onClick={() => navigate(`/watch-party/${matchId}`)}
            >
              View Watch Party Page →
            </button>
          )}
        </div>
      )}

      {/* ── Quick stats ── */}
      <div className="vsb-card vsb-stats-card">
        <div className="vsb-card-label">📊 Venue At a Glance</div>
        <div className="vsb-stat-grid">
          <StatItem icon="🔥" value={venue.interestedCount} label="Interested" highlight />
          <StatItem icon="✅" value={venue.attendingCount  ?? '—'} label="Attending" />
          <StatItem icon="🪑" value={venue.capacity}         label="Capacity" />
          <StatItem icon="⭐" value={venue.rating}            label="Rating" />
        </div>
      </div>

      {/* ── Top nearby attraction ── */}
      {topAttraction && (
        <div className="vsb-card vsb-attraction-card">
          <div className="vsb-card-label">🏙️ Top Nearby Spot</div>
          <p className="vsb-attr-name">{topAttraction.name}</p>
          <p className="vsb-attr-desc">{topAttraction.desc}</p>
          <p className="vsb-attr-dist">📍 {topAttraction.distance} · ⏱️ {topAttraction.visitDuration}</p>
        </div>
      )}

      {/* ── Hours ── */}
      {venue.hours && (
        <div className="vsb-card vsb-hours-card">
          <div className="vsb-card-label">🕐 Today's Hours</div>
          <p className="vsb-hours-range">
            {venue.hours.open} <span className="vsb-hours-sep">→</span> {venue.hours.close}
          </p>
          <p className="vsb-hours-note">Opens early on match days — arrive before crowds!</p>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="vsb-actions">
        <button className="vsb-btn vsb-btn--primary" onClick={onJoinParty}>
          🎉 Join Watch Party
        </button>
        <button className="vsb-btn vsb-btn--secondary" onClick={handleDirections}>
          🗺️ Get Directions
        </button>
        <button className="vsb-btn vsb-btn--ghost" onClick={handleShare}>
          🔗 Share This Venue
        </button>
      </div>

      {/* ── Transit ── */}
      {venue.transit && (
        <div className="vsb-transit">
          <span className="vsb-transit-icon">🚇</span>
          <span className="vsb-transit-text">{venue.transit}</span>
        </div>
      )}
    </aside>
  );
}

function StatItem({ icon, value, label, highlight }) {
  return (
    <div className={`vsb-stat${highlight ? ' vsb-stat--hl' : ''}`}>
      <span className="vsb-stat-icon">{icon}</span>
      <span className="vsb-stat-value">{value}</span>
      <span className="vsb-stat-label">{label}</span>
    </div>
  );
}
