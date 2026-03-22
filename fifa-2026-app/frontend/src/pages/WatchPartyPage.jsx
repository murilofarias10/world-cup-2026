import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchMatch, formatMatchTitle } from '../services/matchService.js';
import { getVenues } from '../services/venueService.js';

import VenueList from '../components/watchparty/VenueList.jsx';
import MatchDetails from '../components/watchparty/MatchDetails.jsx';
import ChatPanel from '../components/watchparty/ChatPanel.jsx';

import './WatchPartyPage.css';

// ── WatchPartyPage ────────────────────────────────────────────────
// Split-screen layout:
//   LEFT  (32%): venue browsing panel
//   RIGHT (68%): match info + chat

function Spinner() {
  return (
    <div className="wpp-spinner-wrap">
      <div className="wpp-spinner" />
      <p className="wpp-spinner-label">Loading match info…</p>
    </div>
  );
}

function ErrorState({ message, onBack }) {
  return (
    <div className="wpp-error-state">
      <span className="wpp-error-icon">⚽</span>
      <h2 className="wpp-error-title">Match not found</h2>
      <p className="wpp-error-msg">{message}</p>
      <button className="wpp-back-btn" onClick={onBack}>
        ← Back to Matches
      </button>
    </div>
  );
}

export default function WatchPartyPage() {
  const { matchId } = useParams();
  const navigate    = useNavigate();

  const [match,         setMatch]         = useState(null);
  const [venues,        setVenues]        = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  // Track per-venue interested counts in local state so UI updates instantly.
  // Keys are venue ids; values are deltas applied on top of seed counts.
  const [venueDelta, setVenueDelta] = useState({});

  useEffect(() => {
    Promise.all([fetchMatch(matchId), getVenues()])
      .then(([m, v]) => {
        setMatch(m);
        setVenues(v);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [matchId]);

  function handleSelectVenue(venue) {
    setSelectedVenue((prev) => {
      const deselecting = prev?.id === venue.id;

      // Adjust interest delta
      setVenueDelta((d) => {
        const next = { ...d };
        if (deselecting) {
          next[venue.id] = (next[venue.id] ?? 0) - 1;
        } else {
          next[venue.id] = (next[venue.id] ?? 0) + 1;
          if (prev) next[prev.id] = (next[prev.id] ?? 0) - 1;
        }
        return next;
      });

      return deselecting ? null : venue;
    });
  }

  // Merge deltas into venue list for display
  const enrichedVenues = venues.map((v) => ({
    ...v,
    interestedCount: Math.max(0, v.interestedCount + (venueDelta[v.id] ?? 0)),
  }));

  const enrichedSelected = selectedVenue
    ? enrichedVenues.find((v) => v.id === selectedVenue.id) ?? selectedVenue
    : null;

  const matchTitle = formatMatchTitle(match);

  if (loading) return <Spinner />;
  if (error)   return <ErrorState message={error} onBack={() => navigate('/matches')} />;

  return (
    <div className="wpp-root">
      {/* ── Back nav ─────────────────────────────────────── */}
      <div className="wpp-topbar">
        <button className="wpp-back-link" onClick={() => navigate('/matches')}>
          ← Matches
        </button>
        <div className="wpp-topbar-center">
          <span className="wpp-topbar-eyebrow">WATCH PARTY</span>
          <span className="wpp-topbar-title">{matchTitle}</span>
        </div>
        <div className="wpp-topbar-right">
          {enrichedSelected && (
            <span className="wpp-topbar-venue-pill">
              📺 {enrichedSelected.name}
            </span>
          )}
        </div>
      </div>

      {/* ── Split layout ──────────────────────────────────── */}
      <div className="wpp-layout">
        {/* LEFT: venue list */}
        <VenueList
          venues={enrichedVenues}
          selectedVenueId={enrichedSelected?.id ?? null}
          onSelectVenue={handleSelectVenue}
        />

        {/* RIGHT: match details + chat */}
        <div className="wpp-right">
          <MatchDetails match={match} selectedVenue={enrichedSelected} />
          <ChatPanel matchTitle={matchTitle} />
        </div>
      </div>
    </div>
  );
}
