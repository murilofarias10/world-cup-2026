import { useState, useEffect, useMemo } from 'react';
import { fetchMatches } from '../services/api.js';
import MatchCard from '../components/MatchCard.jsx';

import {
  isToday,
  isFeaturedMatch,
  getMatchPriority,
} from '../utils/matchUtils.js';
import './MatchesPage.css';

// ── Constants ────────────────────────────────────────────────────
const HERO_STATS = [
  { value: '48',   label: 'Teams' },
  { value: '104',  label: 'Matches' },
  { value: '16',   label: 'Venues' },
  { value: '3',    label: 'Host Nations' },
  { value: '12',   label: 'Groups' },
];

const FILTERS = [
  { id: 'all',           label: 'All',   group: 'main' },
  { id: 'today',         label: 'Today', group: 'main' },
  { id: '1',             label: 'MD 1',  group: 'group' },
  { id: '2',             label: 'MD 2',  group: 'group' },
  { id: '3',             label: 'MD 3',  group: 'group' },
  { id: 'Round of 32',   label: 'R32',   group: 'ko' },
  { id: 'Round of 16',   label: 'R16',   group: 'ko' },
  { id: 'Quarter Finals',label: 'QF',    group: 'ko' },
  { id: 'Semi Finals',   label: 'SF',    group: 'ko' },
  { id: 'Finals',        label: 'Final', group: 'ko' },
];

const GROUP_STAGE_ROUNDS  = new Set(['1', '2', '3']);
const KNOCKOUT_ROUNDS     = new Set(['Round of 32', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Finals']);

// ── Sub-components ───────────────────────────────────────────────
function PageHero() {
  return (
    <div className="mp-hero">
      <div className="mp-hero-inner">
        <div className="mp-hero-text">
          <p className="mp-hero-eyebrow">FIFA WORLD CUP 2026™</p>
          <h1 className="mp-hero-title">Schedule &amp; Results</h1>
          <p className="mp-hero-sub">
            June 11 – July 19 · United States · Canada · Mexico
          </p>
        </div>
        <ul className="mp-hero-stats">
          {HERO_STATS.map(({ value, label }) => (
            <li key={label} className="mp-stat">
              <span className="mp-stat-value">{value}</span>
              <span className="mp-stat-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FilterBar({ active, onChange, todayCount }) {
  let prevGroup = null;

  return (
    <div className="mp-filter-bar">
      <div className="mp-filters">
        {FILTERS.map((f) => {
          const showSep = prevGroup !== null && f.group !== prevGroup;
          prevGroup = f.group;
          const label = f.id === 'today'
            ? `Today${todayCount ? ` (${todayCount})` : ''}`
            : f.label;

          return (
            <span key={f.id} className="mp-filter-wrap">
              {showSep && <span className="mp-filter-sep" />}
              <button
                className={`mp-filter-btn ${active === f.id ? 'active' : ''}`}
                onClick={() => onChange(f.id)}
              >
                {label}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SectionDivider({ icon, title, subtitle, count }) {
  return (
    <div className="mp-section-divider">
      <div className="mp-section-divider-inner">
        <span className="mp-section-icon">{icon}</span>
        <div>
          <h2 className="mp-section-title">{title}</h2>
          {subtitle && <p className="mp-section-sub">{subtitle}</p>}
        </div>
        {count != null && (
          <span className="mp-section-count">{count} matches</span>
        )}
      </div>
      <div className="mp-section-line" />
    </div>
  );
}

function FeaturedSection({ matches }) {
  if (!matches.length) return null;
  return (
    <section className="mp-featured">
      <div className="mp-featured-header">
        <span className="mp-featured-label">⭐ Featured Fixtures</span>
      </div>
      <div className="mp-featured-grid">
        {matches.map((m) => (
          <MatchCard key={m.matchNumber} match={m} featured />
        ))}
      </div>
    </section>
  );
}

function TodaySection({ matches }) {
  if (!matches.length) return null;
  return (
    <section className="mp-today">
      <div className="mp-today-header">
        <span className="mp-today-pulse" />
        <span className="mp-today-label">Today's Matches</span>
      </div>
      <div className="mp-matches-grid">
        {matches.map((m) => (
          <MatchCard key={m.matchNumber} match={m} featured />
        ))}
      </div>
    </section>
  );
}

function MatchGrid({ matches, emptyMsg = 'No matches found.' }) {
  if (!matches.length) {
    return <p className="mp-empty">{emptyMsg}</p>;
  }
  return (
    <div className="mp-matches-grid">
      {matches.map((m) => (
        <MatchCard key={m.matchNumber} match={m} />
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <div className="mp-spinner-wrap">
      <div className="mp-spinner" />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetchMatches()
      .then(setAllMatches)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const todayMatches = useMemo(
    () => allMatches.filter((m) => isToday(m.date)),
    [allMatches]
  );

  const featuredMatches = useMemo(() => {
    const base = allMatches
      .filter(isFeaturedMatch)
      .sort((a, b) => getMatchPriority(b) - getMatchPriority(a))
      .slice(0, 3);
    // Pad with first upcoming group matches if needed
    if (base.length < 3) {
      const ids = new Set(base.map((m) => m.matchNumber));
      const extras = allMatches
        .filter((m) => !ids.has(m.matchNumber))
        .slice(0, 3 - base.length);
      return [...base, ...extras];
    }
    return base;
  }, [allMatches]);

  const filteredMatches = useMemo(() => {
    if (activeFilter === 'all')   return allMatches;
    if (activeFilter === 'today') return todayMatches;
    return allMatches.filter((m) => m.round === activeFilter);
  }, [allMatches, activeFilter, todayMatches]);

  const groupStageMatches  = useMemo(() => allMatches.filter((m) => GROUP_STAGE_ROUNDS.has(m.round)),  [allMatches]);
  const knockoutMatches    = useMemo(() => allMatches.filter((m) => KNOCKOUT_ROUNDS.has(m.round)),      [allMatches]);

  return (
    <div className="matches-page">
      <PageHero />

      <FilterBar
        active={activeFilter}
        onChange={setActiveFilter}
        todayCount={todayMatches.length}
      />

      <div className="mp-content">
        {loading && <Spinner />}
        {error   && <p className="mp-error">{error}</p>}

        {!loading && !error && activeFilter === 'all' && (
          <>
            <TodaySection matches={todayMatches} />
            <FeaturedSection matches={featuredMatches} />

            <SectionDivider
              icon="⚽"
              title="Group Stage"
              subtitle="Matchday 1 · 2 · 3"
              count={groupStageMatches.length}
            />
            <MatchGrid matches={groupStageMatches} />

            <SectionDivider
              icon="🏆"
              title="Knockout Stage"
              subtitle="Round of 32 → Final"
              count={knockoutMatches.length}
            />
            <MatchGrid matches={knockoutMatches} />

          </>
        )}

        {!loading && !error && activeFilter !== 'all' && (
          <>
            <MatchGrid
              matches={filteredMatches}
              emptyMsg={
                activeFilter === 'today'
                  ? 'No matches scheduled for today.'
                  : 'No matches found for this round.'
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
