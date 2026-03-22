import { useState, useEffect } from 'react';
import { fetchMatches } from '../services/api.js';
import MatchCard from '../components/MatchCard.jsx';
import './MatchesPage.css';

const ROUND_OPTIONS = [
  'All',
  '1',
  '2',
  '3',
  'Round of 32',
  'Round of 16',
  'Quarter Finals',
  'Semi Finals',
  'Finals',
];

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [selectedRound, setSelectedRound] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = selectedRound !== 'All' ? { round: selectedRound } : {};

    fetchMatches(params)
      .then(setMatches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedRound]);

  return (
    <div className="matches-page">
      <div className="page-header">
        <h1>Matches</h1>
        <p className="page-subtitle">FIFA World Cup 2026 Schedule</p>
      </div>

      <div className="round-filters">
        {ROUND_OPTIONS.map((round) => (
          <button
            key={round}
            className={`filter-btn ${selectedRound === round ? 'active' : ''}`}
            onClick={() => setSelectedRound(round)}
          >
            {round === '1' || round === '2' || round === '3'
              ? `Matchday ${round}`
              : round}
          </button>
        ))}
      </div>

      {loading && <p className="status-msg">Loading matches...</p>}
      {error && <p className="status-msg error">{error}</p>}

      {!loading && !error && (
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard key={match.matchNumber} match={match} />
          ))}
          {matches.length === 0 && (
            <p className="status-msg">No matches found for this round.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MatchesPage;
