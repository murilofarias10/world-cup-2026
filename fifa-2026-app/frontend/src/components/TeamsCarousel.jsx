import { useState, useEffect } from 'react';
import { getTeamFlagPath } from '../utils/flagUtils.js';
import './TeamsCarousel.css';

// ── Constants ────────────────────────────────────────────────────
const HOST_NATIONS  = new Set(['USA', 'Canada', 'Mexico']);
const CARD_PLUS_GAP = 116;   // card width (104 px) + gap (12 px)
const SCROLL_SPEED  = 105;   // pixels per second — tune to taste

// ── MarqueeCard  (compact flag card used in each row) ────────────
function MarqueeCard({ item, isHost, onClick }) {
  const [failed, setFailed] = useState(false);
  const mapped = getTeamFlagPath(item.name);
  const src    = mapped ?? `/flags/${encodeURIComponent(item.name)}.png`;

  return (
    <article
      className={`tc-mc${isHost ? ' tc-mc--host' : ''}`}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(item)}
      aria-label={item.name}
    >
      <div className="tc-mc-flag-wrap">
        {!failed ? (
          <img
            src={src}
            alt={`${item.name} flag`}
            className="tc-mc-flag"
            draggable={false}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="tc-mc-placeholder">
            {item.name
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0] ?? '')
              .join('')
              .toUpperCase()}
          </div>
        )}
      </div>

      {isHost && <span className="tc-mc-host-label">HOST</span>}
      <p className="tc-mc-name">{item.name}</p>
    </article>
  );
}

// ── MarqueeRow  (one infinite-scroll strip) ───────────────────────
// direction: "left" | "right"
// Items are doubled so the loop is invisible: when the animation
// moves the track by exactly -50% / +50% it snaps back seamlessly.
function MarqueeRow({ items, direction, onCardClick }) {
  // duration scales with item count so speed stays constant (px/s)
  const duration = Math.round((items.length * CARD_PLUS_GAP) / SCROLL_SPEED);
  const doubled  = [...items, ...items];

  return (
    <div className="tc-marquee-row">
      <div
        className={`tc-marquee-track tc-marquee-track--${direction}`}
        style={{ '--md': `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <MarqueeCard
            key={`${item.id ?? item.name}-${i}`}
            item={item}
            isHost={HOST_NATIONS.has(item.name)}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

// ── TeamsCarousel  (two-row marquee) ─────────────────────────────
// Props:
//   items    – [{ id, name, group? }]
//   title    – optional string
//   subtitle – optional string

export default function TeamsCarousel({ items, title, subtitle }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Row 2 uses the reversed order so the two rows feel independent
  const reversed = [...items].reverse();

  return (
    <section className="tc-root">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="tc-header">
        <div className="tc-header-text">
          <h2 className="tc-title">{title ?? 'Participating Nations'}</h2>
          <p className="tc-subtitle">
            {subtitle ?? `${items.length} nations  ·  hover to pause`}
          </p>
        </div>
      </div>

      {/* ── Two rows ─────────────────────────────────────────── */}
      <div className="tc-marquee-wrap">
        <MarqueeRow items={items}    direction="left"  onCardClick={setSelectedTeam} />
        <MarqueeRow items={reversed} direction="right" onCardClick={setSelectedTeam} />
      </div>

      {/* ── Team detail modal ─────────────────────────────────── */}
      {selectedTeam && (
        <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </section>
  );
}

// ── TeamModal ─────────────────────────────────────────────────────
function TeamModal({ team, onClose }) {
  const mapped  = getTeamFlagPath(team.name);
  const flagSrc = mapped ?? `/flags/${encodeURIComponent(team.name)}.png`;
  const isHost  = HOST_NATIONS.has(team.name);
  const [flagFailed, setFlagFailed] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="tc-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${team.name} details`}
    >
      <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tc-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {!flagFailed ? (
          <img
            src={flagSrc}
            alt={`${team.name} flag`}
            className="tc-modal-flag"
            draggable={false}
            onError={() => setFlagFailed(true)}
          />
        ) : (
          <div className="tc-modal-flag-placeholder">
            {team.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
          </div>
        )}

        <h3 className="tc-modal-name">{team.name}</h3>

        {isHost && (
          <span className="tc-modal-host-badge">🌎 Host Nation</span>
        )}

        {team.group && (
          <p className="tc-modal-group">{team.group}</p>
        )}

        <p className="tc-modal-note">Full team profile coming soon.</p>
      </div>
    </div>
  );
}
