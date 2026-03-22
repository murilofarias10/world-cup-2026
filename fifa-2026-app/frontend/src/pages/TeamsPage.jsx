import { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { fetchTeams } from '../services/api.js';
import TeamCard from '../components/TeamCard.jsx';
import { ALL_TEAM_FLAGS } from '../utils/flagUtils.js';
import './TeamsPage.css';

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO-3166 numeric codes for host nations
const HOST_IDS = {
  '840': { name: 'USA',    color: '#002868' },
  '124': { name: 'Canada', color: '#D80621' },
  '484': { name: 'Mexico', color: '#006847' },
};

const VENUE_MARKERS = [
  { name: 'Mexico City',    coords: [-99.13,  19.43], country: 'Mexico'  },
  { name: 'Guadalajara',    coords: [-103.35, 20.67], country: 'Mexico'  },
  { name: 'Monterrey',      coords: [-100.32, 25.67], country: 'Mexico'  },
  { name: 'Toronto',        coords: [-79.38,  43.65], country: 'Canada'  },
  { name: 'Vancouver',      coords: [-123.12, 49.28], country: 'Canada'  },
  { name: 'Dallas',         coords: [-96.80,  32.78], country: 'USA'     },
  { name: 'Los Angeles',    coords: [-118.24, 34.05], country: 'USA'     },
  { name: 'New York / NJ',  coords: [-74.17,  40.73], country: 'USA'     },
  { name: 'San Francisco',  coords: [-122.42, 37.77], country: 'USA'     },
  { name: 'Seattle',        coords: [-122.33, 47.60], country: 'USA'     },
  { name: 'Miami',          coords: [-80.19,  25.76], country: 'USA'     },
  { name: 'Boston',         coords: [-71.06,  42.36], country: 'USA'     },
  { name: 'Philadelphia',   coords: [-75.16,  39.95], country: 'USA'     },
  { name: 'Kansas City',    coords: [-94.58,  39.10], country: 'USA'     },
  { name: 'Houston',        coords: [-95.37,  29.76], country: 'USA'     },
  { name: 'Atlanta',        coords: [-84.39,  33.75], country: 'USA'     },
];

const MARKER_COLORS = {
  USA:    '#002868',
  Canada: '#D80621',
  Mexico: '#006847',
};

// ── Flags grid (all participating nations) ────────────────────────
function FlagsGrid() {
  return (
    <div className="flags-section">
      <h2 className="flags-section-title">Participating Nations</h2>
      <div className="flags-grid">
        {ALL_TEAM_FLAGS.map((flagName) => (
          <div key={flagName} className="flag-item" title={flagName}>
            <img
              src={`/flags/${encodeURIComponent(flagName)}.png`}
              alt={flagName}
              className="flag-img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Interactive host-nations map ──────────────────────────────────
function HostNationsMap() {
  return (
    <div className="host-map-wrapper">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-97, 54], scale: 370 }}
        width={620}
        height={400}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const host = HOST_IDS[geo.id];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={host ? host.color : '#dde3ea'}
                  stroke="#fff"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover:   { outline: 'none', opacity: host ? 0.85 : 1 },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

        {VENUE_MARKERS.map(({ name, coords, country }) => (
          <Marker key={name} coordinates={coords}>
            <circle
              r={5}
              fill={MARKER_COLORS[country]}
              stroke="#fff"
              strokeWidth={1.5}
            />
            <title>{name}</title>
          </Marker>
        ))}
      </ComposableMap>

      <div className="host-map-legend">
        {Object.entries(MARKER_COLORS).map(([nation, color]) => (
          <span key={nation} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {nation}
          </span>
        ))}
        <span className="legend-item">
          <span className="legend-dot legend-dot--venue" />
          Venue city
        </span>
      </div>
    </div>
  );
}

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
          <FlagsGrid />
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
