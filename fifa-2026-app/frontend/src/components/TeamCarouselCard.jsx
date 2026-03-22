import { useState } from 'react';
import { getTeamFlagPath } from '../utils/flagUtils.js';

const HOST_NATIONS = new Set(['USA', 'Canada', 'Mexico']);

// ── Flag image with graceful fallback ────────────────────────────
// Resolution order:
//   1. getTeamFlagPath(name)  — uses the TEAM_TO_FLAG mapping
//   2. /flags/<name>.png      — direct flag filename (covers ALL_TEAM_FLAGS items
//                               and any name that is itself a valid filename)
//   3. Placeholder div        — if the image 404s or no src resolves

function FlagImage({ name }) {
  const [failed, setFailed] = useState(false);

  // Try mapped path first; if no mapping, use the name directly as the filename
  const mappedSrc = getTeamFlagPath(name);
  const src       = mappedSrc ?? `/flags/${encodeURIComponent(name)}.png`;

  if (failed) {
    return <FlagPlaceholder name={name} />;
  }

  return (
    <img
      src={src}
      alt={`${name} flag`}
      className="tcc-flag"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

function FlagPlaceholder({ name }) {
  const initials = (name ?? '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();

  return (
    <div className="tcc-flag-placeholder" aria-label={name}>
      <span className="tcc-flag-initials">{initials}</span>
    </div>
  );
}

// ── TeamCarouselCard ──────────────────────────────────────────────
// Single card in the teams carousel.
// Props:
//   item      – { id, name, group? }
//   isHost    – boolean
//   isDragging – boolean (suppresses click during drag)
//   onClick   – (item) => void

function TeamCarouselCard({ item, isHost, isDragging, onClick }) {
  const hostClass = isHost ? ' tcc--host' : '';

  function handleClick() {
    if (!isDragging && onClick) onClick(item);
  }

  return (
    <article
      className={`tcc${hostClass}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${item.name}${item.group ? `, ${item.group}` : ''}`}
    >
      {isHost && (
        <span className="tcc-host-badge" aria-label="Host nation">
          🌎 Host
        </span>
      )}

      <div className="tcc-flag-wrap">
        <FlagImage name={item.name} />
      </div>

      <div className="tcc-body">
        <p className="tcc-name">{item.name}</p>
        {item.group && <span className="tcc-group">{item.group}</span>}
      </div>
    </article>
  );
}

export default TeamCarouselCard;
