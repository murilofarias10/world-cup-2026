import { getTeamFlagPath } from '../../utils/flagUtils.js';
import { formatShortDate, formatShortTime, getMatchStatus } from '../../utils/matchUtils.js';

// ── MatchDetails ──────────────────────────────────────────────────
// Displays the selected match's teams, date/time, stadium, and group/round.
// Used at the top of the right panel on WatchPartyPage.

function TeamDisplay({ name }) {
  const isTbd = !name || name === 'To be announced';
  const flagPath = isTbd ? null : getTeamFlagPath(name);

  return (
    <div className="wp-md-team">
      {flagPath && (
        <img
          src={flagPath}
          alt={name}
          className="wp-md-team-flag"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <span className="wp-md-team-name">{isTbd ? 'TBD' : name}</span>
    </div>
  );
}

function MatchDetails({ match, selectedVenue }) {
  if (!match) return null;

  const status = getMatchStatus(match.date);
  const label  = match.group ?? match.round ?? '';
  const venue  = match.location ?? '';

  return (
    <div className="wp-match-details">
      {/* Stage label */}
      <div className="wp-md-top">
        {label && <span className="wp-md-label">{label}</span>}
        <span className={`wp-md-status wp-md-status--${status}`}>
          {status === 'live' && <span className="wp-md-status-dot" />}
          {status === 'live' ? 'Live' : status === 'finished' ? 'FT' : 'Upcoming'}
        </span>
        <span className="wp-md-num">Match #{match.matchNumber}</span>
      </div>

      {/* Teams + score */}
      <div className="wp-md-matchup">
        <TeamDisplay name={match.homeTeam} />
        <div className="wp-md-center">
          {match.result ? (
            <span className="wp-md-score">{match.result}</span>
          ) : (
            <span className="wp-md-vs">VS</span>
          )}
        </div>
        <TeamDisplay name={match.awayTeam} />
      </div>

      {/* Meta row */}
      <div className="wp-md-meta">
        <span className="wp-md-meta-item">
          <span className="wp-md-meta-icon">📅</span>
          {formatShortDate(match.date)}
        </span>
        <span className="wp-md-meta-sep">·</span>
        <span className="wp-md-meta-item">
          <span className="wp-md-meta-icon">🕐</span>
          {formatShortTime(match.date)}
        </span>
        {venue && (
          <>
            <span className="wp-md-meta-sep">·</span>
            <span className="wp-md-meta-item">
              <span className="wp-md-meta-icon">🏟️</span>
              {venue}
            </span>
          </>
        )}
      </div>

      {/* Selected venue callout */}
      {selectedVenue && (
        <div className="wp-md-venue-callout">
          <span className="wp-md-venue-callout-icon">📺</span>
          <div>
            <p className="wp-md-venue-callout-title">Watching at</p>
            <p className="wp-md-venue-callout-name">{selectedVenue.name}</p>
            <p className="wp-md-venue-callout-sub">
              {selectedVenue.city} · {selectedVenue.distance} away ·{' '}
              <strong>{selectedVenue.interestedCount}</strong> people interested
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;
