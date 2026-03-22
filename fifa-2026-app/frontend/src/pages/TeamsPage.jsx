import { useState, useEffect, useMemo } from 'react';
import { fetchTeams } from '../services/api.js';
import TeamCard from '../components/TeamCard.jsx';
import TeamsCarousel from '../components/TeamsCarousel.jsx';
import HostNationsMap from '../components/HostNationsMap.jsx';
import { CAROUSEL_NATIONS } from '../utils/flagUtils.js';
import './TeamsPage.css';

// ── Host nations banner ───────────────────────────────────────────
function HostNationsSection() {
  return (
    <div className="host-nations-section">
      <div className="host-nations-header">
        <h2 className="host-nations-title">🌎 Host Nations</h2>
        <p className="host-nations-sub">
          United States &middot; Canada &middot; Mexico
        </p>
      </div>

      <div className="host-nations-flags">
        {['USA', 'Canada', 'Mexico'].map((nation) => (
          <div key={nation} className="host-nation-card">
            <img
              src={`/flags/${nation}.png`}
              alt={nation}
              className="host-flag-img"
            />
            <span className="host-nation-name">{nation}</span>
          </div>
        ))}
      </div>

      <HostNationsMap />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
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

  // Build carousel items from the definitive 42-nation list.
  // CAROUSEL_NATIONS is keyed from TEAM_TO_FLAG, so every entry has a valid
  // flag mapping and no play-off placeholders are ever included.
  // Group data is merged in from the API when available.
  const carouselItems = useMemo(() => {
    const teamMap = new Map(teams.map((t) => [t.name, t]));
    return CAROUSEL_NATIONS.map(({ name }) => ({
      id:    name,
      name,
      group: teamMap.get(name)?.group ?? '',
    }));
  }, [teams]);

  const grouped = teams.reduce((acc, team) => {
    const key = team.group || 'TBD';
    if (!acc[key]) acc[key] = [];
    acc[key].push(team);
    return acc;
  }, {});

  // Exclude TBD – replaced by the host-nations map section
  const sortedGroups = Object.keys(grouped)
    .filter((g) => g !== 'TBD')
    .sort();

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

      {loading && <p className="status-msg">Loading teams…</p>}
      {error   && <p className="status-msg error">{error}</p>}

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
        <>
          {carouselItems.length > 0 && <TeamsCarousel items={carouselItems} />}
          <HostNationsSection />

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
        </>
      )}
    </div>
  );
}

export default TeamsPage;
