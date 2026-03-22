import { useState, useMemo } from 'react';
import VenueCard from './VenueCard.jsx';

const FILTER_OPTIONS = [
  { id: 'all',     label: 'All' },
  { id: 'nearby',  label: '📍 Nearby' },
  { id: 'popular', label: '🔥 Popular' },
];

// ── VenueList ─────────────────────────────────────────────────────
// Left panel: searchable, filterable list of venue cards.

function VenueList({ venues, selectedVenueId, onSelectVenue }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const displayed = useMemo(() => {
    let list = venues;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q),
      );
    }

    if (filter === 'popular') {
      list = [...list].sort((a, b) => b.interestedCount - a.interestedCount);
    } else if (filter === 'nearby') {
      list = [...list].sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
      );
    }

    return list;
  }, [venues, search, filter]);

  return (
    <aside className="wp-venue-list">
      <div className="wp-vl-header">
        <h2 className="wp-vl-title">Watch at a Venue</h2>
        <p className="wp-vl-sub">Find a café or bar showing this match</p>
      </div>

      <input
        className="wp-vl-search"
        type="text"
        placeholder="Search venues or cities…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search venues"
      />

      <div className="wp-vl-filters" role="group" aria-label="Sort venues">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.id}
            className={`wp-vl-filter-btn${filter === f.id ? ' active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="wp-vl-cards">
        {displayed.length === 0 ? (
          <p className="wp-vl-empty">No venues found for "{search}".</p>
        ) : (
          displayed.map((v) => (
            <VenueCard
              key={v.id}
              venue={v}
              selected={selectedVenueId === v.id}
              onSelect={onSelectVenue}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default VenueList;
