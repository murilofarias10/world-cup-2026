import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { getVenueById }         from '../services/venueService.js';
import { getAttractionsByCity } from '../services/attractionService.js';
import { fetchMatch, formatMatchTitle } from '../services/matchService.js';

import VenueHeader       from '../components/venue/VenueHeader.jsx';
import VenueGallery      from '../components/venue/VenueGallery.jsx';
import VenueInfoCard     from '../components/venue/VenueInfoCard.jsx';
import VenueMap          from '../components/venue/VenueMap.jsx';
import NearbyAttractions from '../components/venue/NearbyAttractions.jsx';
import MatchDayPlan      from '../components/venue/MatchDayPlan.jsx';
import FanCommunity      from '../components/venue/FanCommunity.jsx';
import VenueSidebar      from '../components/venue/VenueSidebar.jsx';

import './VenueDetailsPage.css';

function Spinner() {
  return (
    <div className="vdp-spinner-wrap">
      <div className="vdp-spinner" />
      <p>Loading venue details…</p>
    </div>
  );
}

function ErrorState({ onBack }) {
  return (
    <div className="vdp-error">
      <span className="vdp-error-icon">🏟️</span>
      <h2>Venue not found</h2>
      <p>We couldn't find this venue. It may have been removed or the link is incorrect.</p>
      <button className="vdp-error-btn" onClick={onBack}>← Browse Venues</button>
    </div>
  );
}

export default function VenueDetailsPage() {
  const { venueId }             = useParams();
  const [searchParams]          = useSearchParams();
  const navigate                = useNavigate();
  const matchId                 = searchParams.get('matchId');

  const [venue,       setVenue]       = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [matchTitle,  setMatchTitle]  = useState('');
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(false);

  // The attraction that the user wants to fly to on the map
  const [flyTarget, setFlyTarget] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);

      try {
        const [v, match] = await Promise.all([
          getVenueById(venueId),
          matchId ? fetchMatch(matchId).catch(() => null) : Promise.resolve(null),
        ]);

        if (cancelled) return;

        if (!v) { setError(true); setLoading(false); return; }

        setVenue(v);
        if (match) setMatchTitle(formatMatchTitle(match));

        const atts = await getAttractionsByCity(v.cityKey);
        if (!cancelled) setAttractions(atts);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [venueId, matchId]);

  function handleViewOnMap(attraction) {
    setFlyTarget(attraction);
    // Scroll to map section
    document.querySelector('.vdp-map-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleJoinParty() {
    if (matchId) {
      navigate(`/watch-party/${matchId}`);
    } else {
      navigate('/matches');
    }
  }

  if (loading) return <div className="vdp-loading-wrap"><Spinner /></div>;
  if (error)   return <div className="vdp-loading-wrap"><ErrorState onBack={() => navigate('/matches')} /></div>;

  return (
    <div className="vdp-root">
      {/* ── Page header band ── */}
      <div className="vdp-hero-band">
        <div className="vdp-hero-inner">
          <VenueHeader
            venue={venue}
            matchTitle={matchTitle}
            onJoinParty={handleJoinParty}
          />
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="vdp-body">
        {/* LEFT — main content */}
        <main className="vdp-main">
          {/* Gallery */}
          <VenueGallery venue={venue} />

          {/* Venue details */}
          <VenueInfoCard venue={venue} />

          {/* Interactive map */}
          <section className="vdp-map-section">
            <div className="vdp-section-header">
              <h2 className="vdp-section-title">Explore the Area</h2>
              <p className="vdp-section-sub">
                Interactive map showing the venue and nearby places to visit before kick-off
              </p>
            </div>
            <VenueMap
              venue={venue}
              attractions={attractions}
              flyTarget={flyTarget}
            />
          </section>

          {/* Nearby attractions grid */}
          <NearbyAttractions
            attractions={attractions}
            onViewOnMap={handleViewOnMap}
          />

          {/* Match day timeline */}
          <MatchDayPlan
            venue={venue}
            matchTitle={matchTitle}
            attractions={attractions}
          />

          {/* Fan community */}
          <FanCommunity venue={venue} matchId={matchId} />
        </main>

        {/* RIGHT — sticky sidebar */}
        <VenueSidebar
          venue={venue}
          matchTitle={matchTitle}
          matchId={matchId}
          attractions={attractions}
          onJoinParty={handleJoinParty}
        />
      </div>
    </div>
  );
}
