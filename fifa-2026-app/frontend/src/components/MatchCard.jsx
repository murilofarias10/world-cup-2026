import {
  getGroupStyle,
  getMatchStatus,
  isHostNationMatch,
  isOpeningMatch,
  isPremiumMatch,
  formatShortDate,
  formatShortTime,
} from '../utils/matchUtils.js';
import { getTeamFlagPath } from '../utils/flagUtils.js';
import './MatchCard.css';

// ── Status badge ─────────────────────────────────────────────────
function StatusBadge({ status }) {
  const labels = { scheduled: 'Scheduled', live: 'Live', finished: 'FT' };
  return (
    <span className={`mc-status mc-status--${status}`}>
      {status === 'live' && <span className="mc-status-dot" />}
      {labels[status]}
    </span>
  );
}

// ── Group / Round badge ──────────────────────────────────────────
function GroupBadge({ group }) {
  const { bg, text, accent } = getGroupStyle(group);
  return (
    <span className="mc-badge-group" style={{ background: bg, color: text }}>
      <span className="mc-badge-dot" style={{ background: accent }} />
      {group}
    </span>
  );
}

function RoundBadge({ round }) {
  return <span className="mc-badge-round">{round}</span>;
}

// ── Team row with optional flag ──────────────────────────────────
function TeamRow({ name, isTbd }) {
  const flagPath = isTbd ? null : getTeamFlagPath(name);

  return (
    <span className={`mc-team-row ${isTbd ? 'mc-team--tbd' : ''}`}>
      {flagPath && (
        <img
          src={flagPath}
          alt={name}
          className="mc-team-flag"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <span className="mc-team-name">
        {isTbd ? 'TBD' : name}
      </span>
    </span>
  );
}

// ── The card ─────────────────────────────────────────────────────
function MatchCard({ match, featured = false }) {
  const status    = getMatchStatus(match.date);
  const isHost    = isHostNationMatch(match);
  const isPremium = isPremiumMatch(match);
  const isOpening = isOpeningMatch(match);
  const isTBD     = (t) => !t || t === 'To be announced';

  const classes = [
    'match-card',
    featured   ? 'match-card--featured' : '',
    isPremium  ? 'match-card--premium'  : '',
    isHost     ? 'match-card--host'     : '',
    isOpening  ? 'match-card--opening'  : '',
    status === 'live' ? 'match-card--live' : '',
  ].filter(Boolean).join(' ');

  const venue = match.location?.replace(' Stadium', '') ?? '';

  return (
    <article className={classes}>
      {/* Top bar */}
      <div className="mc-top">
        <div className="mc-top-left">
          {match.group
            ? <GroupBadge group={match.group} />
            : <RoundBadge round={match.round} />}
          {isOpening && (
            <span className="mc-label mc-label--opening">Opening</span>
          )}
          {isPremium && !isOpening && (
            <span className="mc-label mc-label--premium">
              {match.round === 'Finals' ? '🏆 Final' : '🥈 Semi'}
            </span>
          )}
        </div>
        <div className="mc-top-right">
          <StatusBadge status={status} />
          <span className="mc-num">#{match.matchNumber}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="mc-body">
        <TeamRow name={match.homeTeam} isTbd={isTBD(match.homeTeam)} />
        {match.result
          ? <span className="mc-score">{match.result}</span>
          : <span className="mc-vs">vs</span>}
        <TeamRow name={match.awayTeam} isTbd={isTBD(match.awayTeam)} />
      </div>

      {/* Footer */}
      <div className="mc-footer">
        <span className="mc-date">{formatShortDate(match.date)}</span>
        <span className="mc-sep">·</span>
        <span className="mc-time">{formatShortTime(match.date)}</span>
        {venue && (
          <>
            <span className="mc-sep">·</span>
            <span className="mc-venue">{venue}</span>
          </>
        )}
      </div>

      {/* Host nation accent strip */}
      {isHost && !isPremium && <div className="mc-host-strip" />}
    </article>
  );
}

export default MatchCard;
