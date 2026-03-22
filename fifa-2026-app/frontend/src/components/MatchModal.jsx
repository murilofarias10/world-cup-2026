import { useEffect } from 'react';
import { formatDateLong } from '../utils/bracketFormatter.js';
import './MatchModal.css';

function DetailRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="modal-row">
      <span className="modal-row-icon">{icon}</span>
      <div className="modal-row-content">
        <span className="modal-row-label">{label}</span>
        <span className="modal-row-value">{value}</span>
      </div>
    </div>
  );
}

export default function MatchModal({ match, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const isTBD = (t) => !t || t === 'To be announced';
  const home = isTBD(match.homeTeam) ? 'TBD' : match.homeTeam;
  const away = isTBD(match.awayTeam) ? 'TBD' : match.awayTeam;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-header">
          <span className="modal-round-badge">{match.group || match.round}</span>
          <span className="modal-match-num">Match #{match.matchNumber}</span>
        </div>

        <div className="modal-teams">
          <div className={`modal-team ${isTBD(match.homeTeam) ? 'modal-team--tbd' : ''}`}>
            {home}
          </div>
          <div className="modal-vs">vs</div>
          <div className={`modal-team ${isTBD(match.awayTeam) ? 'modal-team--tbd' : ''}`}>
            {away}
          </div>
        </div>

        {match.result && (
          <div className="modal-score">{match.result}</div>
        )}

        <div className="modal-details">
          <DetailRow icon="📅" label="Date & Time" value={formatDateLong(match.date)} />
          <DetailRow icon="🏟️" label="Stadium"    value={match.location} />
          <DetailRow icon="🏆" label="Round"      value={match.round} />
          {match.group && (
            <DetailRow icon="👥" label="Group" value={match.group} />
          )}
        </div>

        <p className="modal-hint">Press Esc or click outside to close</p>
      </div>
    </div>
  );
}
