import { useState, useEffect } from 'react';
import { fetchTeams } from '../services/api.js';
import TeamCard from '../components/TeamCard.jsx';
import './TeamsPage.css';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const grouped = teams.reduce((acc, team) => {
    const key = team.group || 'TBD';
    if (!acc[key]) acc[key] = [];
    acc[key].push(team);
    return acc;
  }, {});

  const sortedGroups = Object.keys(grouped).sort();

  const filtered = search.trim()
    ? teams.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="teams-page">
      <div className="page-header">
        <h1>Teams</h1>
        <p className="page-subtitle">All participating nations</p>
      </div>

      <div className="teams-search">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="status-msg">Loading teams...</p>}
      {error && <p className="status-msg error">{error}</p>}

      {!loading && !error && filtered && (
        <div className="teams-flat-grid">
          {filtered.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
          {filtered.length === 0 && (
            <p className="status-msg">No teams match your search.</p>
          )}
        </div>
      )}

      {!loading && !error && !filtered && (
        <div className="teams-by-group">
          {sortedGroups.map((group) => (
            <div key={group} className="group-section">
              <h2 className="group-title">{group}</h2>
              <div className="group-teams">
                {grouped[group].map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamsPage;
