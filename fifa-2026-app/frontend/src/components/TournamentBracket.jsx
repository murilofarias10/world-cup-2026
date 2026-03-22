import { useState, useEffect } from 'react';
import { fetchMatches } from '../services/api.js';
import { formatBracket, formatDateShort } from '../utils/bracketFormatter.js';
import MatchModal from './MatchModal.jsx';
import './TournamentBracket.css';

// ── Layout constants ─────────────────────────────────────────────
const BASE_SLOT   = 72;            // R32 slot height in px
const TOTAL_H     = BASE_SLOT * 16; // 1152px — every column is this tall
const CARD_W      = 196;           // card width in px
const CARD_H      = 62;            // card height in px (fixed for all rounds)
const COL_GAP     = 52;            // gap between columns
const CONN_REACH  = COL_GAP / 2;   // 26px — horizontal stub of connector

// ── Loading spinner ──────────────────────────────────────────────
function Spinner() {
  return (
    <div className="tb-spinner-wrap">
      <div className="tb-spinner" />
      <p>Loading bracket…</p>
    </div>
  );
}

// ── Individual match card (the clickable tile) ───────────────────
function BracketCard({ match, onClick, isFinal }) {
  const isTBD = (t) => !t || t === 'To be announced';
  const hasResult = !!match.result;

  return (
    <button
      className={[
        'tb-card',
        isFinal      ? 'tb-card--final'  : '',
        hasResult    ? 'tb-card--played' : '',
      ].join(' ')}
      style={{ height: `${CARD_H}px` }}
      onClick={() => onClick(match)}
      title="Click for match details"
    >
      <div className={`tb-team ${isTBD(match.homeTeam) ? 'tb-team--tbd' : ''}`}>
        {isTBD(match.homeTeam) ? 'TBD' : match.homeTeam}
      </div>
      <div className="tb-divider" />
      <div className={`tb-team ${isTBD(match.awayTeam) ? 'tb-team--tbd' : ''}`}>
        {isTBD(match.awayTeam) ? 'TBD' : match.awayTeam}
      </div>
      <div className="tb-card-meta">
        {formatDateShort(match.date)}
        {match.location && ` · ${match.location.replace(' Stadium', '')}`}
      </div>
      {hasResult && <div className="tb-result">{match.result}</div>}
    </button>
  );
}

// ── Connector lines rendered OUTSIDE slots (after all cards) ─────
// Drawn as absolutely positioned divs in the column body,
// so they are always behind cards in the stacking order.
function ColumnConnectors({ matches, slotHeight, isLastRound, isFirstRound }) {
  const LINE_COLOR = '#d1d5db';
  const LINE_W = 2;

  const connectors = [];

  matches.forEach((_, i) => {
    const centerY = i * slotHeight + slotHeight / 2;

    // Outgoing stubs (right side of each card → gap)
    if (!isLastRound) {
      connectors.push(
        <div
          key={`h-out-${i}`}
          className="tb-line"
          style={{
            left:   CARD_W,
            top:    centerY - LINE_W / 2,
            width:  CONN_REACH,
            height: LINE_W,
            background: LINE_COLOR,
          }}
        />
      );
    }

    // Incoming stubs (gap → left side of each card)
    if (!isFirstRound) {
      connectors.push(
        <div
          key={`h-in-${i}`}
          className="tb-line"
          style={{
            left:   -CONN_REACH,
            top:    centerY - LINE_W / 2,
            width:  CONN_REACH,
            height: LINE_W,
            background: LINE_COLOR,
          }}
        />
      );
    }

    // Vertical stitch between each pair (top of pair only)
    if (!isLastRound && i % 2 === 0 && i + 1 < matches.length) {
      const nextCenterY = (i + 1) * slotHeight + slotHeight / 2;
      connectors.push(
        <div
          key={`v-${i}`}
          className="tb-line"
          style={{
            left:   CARD_W + CONN_REACH - LINE_W / 2,
            top:    centerY,
            width:  LINE_W,
            height: nextCenterY - centerY,
            background: LINE_COLOR,
          }}
        />
      );
    }
  });

  return <>{connectors}</>;
}

// ── One round column ─────────────────────────────────────────────
function BracketColumn({ roundData, roundIndex, totalRounds, onCardClick, animDelay }) {
  const { label, matches, round } = roundData;
  const isLastRound  = roundIndex === totalRounds - 1;
  const isFirstRound = roundIndex === 0;
  const isFinalRound = round === 'Finals';

  // Each round's slot height = TOTAL_H divided by its match count
  // → all columns are always the same total height
  const slotHeight = TOTAL_H / matches.length;

  return (
    <div
      className={`tb-col ${isFinalRound ? 'tb-col--final' : ''}`}
      style={{
        width:          `${CARD_W}px`,
        marginRight:    isLastRound ? 0 : `${COL_GAP}px`,
        animationDelay: `${animDelay}ms`,
      }}
    >
      <div className="tb-col-head">{label}</div>

      {/* Column body: slots (cards) first, then connector lines on top */}
      <div className="tb-col-body" style={{ height: `${TOTAL_H}px` }}>

        {/* ── Cards (rendered first → lower in paint order) ── */}
        {matches.map((match, i) => {
          const topOffset = i * slotHeight + (slotHeight - CARD_H) / 2;
          return (
            <div
              key={match.matchNumber}
              className="tb-slot-card"
              style={{ top: `${topOffset}px` }}
            >
              <BracketCard
                match={match}
                onClick={onCardClick}
                isFinal={isFinalRound}
              />
            </div>
          );
        })}

        {/* ── Connector lines (rendered after cards → paint on top of background
              but pointer-events: none ensures cards remain interactive) ── */}
        <ColumnConnectors
          matches={matches}
          slotHeight={slotHeight}
          isLastRound={isLastRound}
          isFirstRound={isFirstRound}
        />
      </div>
    </div>
  );
}

// ── 3rd-place section ────────────────────────────────────────────
function ThirdPlaceSection({ match, onCardClick }) {
  if (!match) return null;
  return (
    <div className="tb-third-wrap">
      <div className="tb-third-label">🥉 3rd Place Match</div>
      <div style={{ width: CARD_W }}>
        <BracketCard match={match} onClick={onCardClick} isFinal={false} />
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────
export default function TournamentBracket() {
  const [rounds, setRounds]               = useState([]);
  const [thirdPlace, setThirdPlace]       = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches()
      .then((data) => {
        const { rounds: r, thirdPlace: tp } = formatBracket(data);
        setRounds(r);
        setThirdPlace(tp);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error)   return <p className="tb-error">{error}</p>;
  if (!rounds.length) return <p className="tb-error">No knockout data available yet.</p>;

  return (
    <div className="tb-root">
      <div className="tb-scroll-wrap">
        <div className="tb-board">
          {rounds.map((roundData, idx) => (
            <BracketColumn
              key={roundData.round}
              roundData={roundData}
              roundIndex={idx}
              totalRounds={rounds.length}
              onCardClick={setSelectedMatch}
              animDelay={idx * 90}
            />
          ))}
        </div>
      </div>

      <ThirdPlaceSection match={thirdPlace} onCardClick={setSelectedMatch} />

      {selectedMatch && (
        <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
