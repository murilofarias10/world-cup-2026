import './MatchCard.css';

function MatchCard({ match }) {
  const dateStr = new Date(match.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="match-card">
      <div className="match-card-header">
        <span className="match-round">{match.group || match.round}</span>
        <span className="match-number">#{match.matchNumber}</span>
      </div>
      <div className="match-card-teams">
        <span className="team home">{match.homeTeam}</span>
        <span className="vs">vs</span>
        <span className="team away">{match.awayTeam}</span>
      </div>
      <div className="match-card-meta">
        <span className="match-date">{dateStr}</span>
        <span className="match-location">{match.location}</span>
      </div>
      {match.result && (
        <div className="match-result">{match.result}</div>
      )}
    </div>
  );
}

export default MatchCard;
