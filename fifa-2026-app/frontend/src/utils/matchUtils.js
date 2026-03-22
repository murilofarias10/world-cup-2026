// ── Group color palette (soft bg, readable text, accent dot) ────
export const GROUP_PALETTE = {
  'Group A': { bg: '#fef2f2', text: '#b91c1c', accent: '#ef4444' },
  'Group B': { bg: '#eff6ff', text: '#1d4ed8', accent: '#3b82f6' },
  'Group C': { bg: '#f0fdf4', text: '#166534', accent: '#16a34a' },
  'Group D': { bg: '#fffbeb', text: '#92400e', accent: '#f59e0b' },
  'Group E': { bg: '#f5f3ff', text: '#5b21b6', accent: '#8b5cf6' },
  'Group F': { bg: '#ecfeff', text: '#155e75', accent: '#06b6d4' },
  'Group G': { bg: '#fff7ed', text: '#7c2d12', accent: '#ea580c' },
  'Group H': { bg: '#eef2ff', text: '#3730a3', accent: '#6366f1' },
  'Group I': { bg: '#fdf4ff', text: '#6b21a8', accent: '#a855f7' },
  'Group J': { bg: '#f0fdf4', text: '#14532d', accent: '#059669' },
  'Group K': { bg: '#fdf2f8', text: '#9d174d', accent: '#ec4899' },
  'Group L': { bg: '#f0f9ff', text: '#0c4a6e', accent: '#0ea5e9' },
};

export function getGroupStyle(group) {
  return GROUP_PALETTE[group] ?? { bg: '#f3f4f6', text: '#374151', accent: '#9ca3af' };
}

// ── Host nations ─────────────────────────────────────────────────
export const HOST_NATIONS = new Set(['Canada', 'USA', 'Mexico']);

export function isHostNationMatch(match) {
  return HOST_NATIONS.has(match.homeTeam) || HOST_NATIONS.has(match.awayTeam);
}

// ── Match classification helpers ─────────────────────────────────
export function isOpeningMatch(match) {
  return match.matchNumber === 1;
}

export function isPremiumMatch(match) {
  return match.round === 'Finals' || match.round === 'Semi Finals';
}

export function isFeaturedMatch(match) {
  return isOpeningMatch(match) || isHostNationMatch(match);
}

export function getMatchPriority(match) {
  if (match.round === 'Finals')        return 5;
  if (match.round === 'Semi Finals')   return 4;
  if (isOpeningMatch(match))           return 3;
  if (isHostNationMatch(match))        return 2;
  return 0;
}

// ── Date helpers ─────────────────────────────────────────────────
// CSV format: "DD/MM/YYYY HH:MM"
function parseCSVDate(dateStr) {
  if (!dateStr) return null;
  const [datePart, timePart = '00:00'] = dateStr.split(' ');
  const [dd, mm, yyyy] = datePart.split('/');
  return new Date(`${yyyy}-${mm}-${dd}T${timePart}:00Z`);
}

export function isToday(dateStr) {
  const d = parseCSVDate(dateStr);
  if (!d) return false;
  const now = new Date();
  return (
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth()    === now.getUTCMonth() &&
    d.getUTCDate()     === now.getUTCDate()
  );
}

export function getMatchStatus(dateStr) {
  const d = parseCSVDate(dateStr);
  if (!d) return 'scheduled';
  const now = new Date();
  const end = new Date(d.getTime() + 2 * 60 * 60 * 1000); // +2 h
  if (now < d)   return 'scheduled';
  if (now <= end) return 'live';
  return 'finished';
}

export function formatShortDate(dateStr) {
  const d = parseCSVDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

export function formatShortTime(dateStr) {
  const d = parseCSVDate(dateStr);
  if (!d) return '';
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  }) + ' UTC';
}
