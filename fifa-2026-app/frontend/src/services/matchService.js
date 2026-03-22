// ── Match service ────────────────────────────────────────────────
// Thin wrapper around api.js with helpers for the watch party feature.
// Swap the mock helpers for real endpoints when the backend is ready.

export { fetchMatch, fetchMatches } from './api.js';

// ── Interest tracking (localStorage — swap for API later) ────────

const INTEREST_KEY = 'wp_interested_matches';

function readInterested() {
  try {
    return JSON.parse(localStorage.getItem(INTEREST_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function isMatchInterested(matchNumber) {
  return readInterested().includes(String(matchNumber));
}

export function toggleMatchInterest(matchNumber) {
  const list = readInterested();
  const id = String(matchNumber);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(INTEREST_KEY, JSON.stringify(next));
  return next.includes(id);
}

// ── Display helpers ──────────────────────────────────────────────

export function formatMatchTitle(match) {
  if (!match) return '';
  const home = match.homeTeam || 'TBD';
  const away = match.awayTeam || 'TBD';
  return `${home} vs ${away}`;
}
