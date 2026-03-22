const ROUND_ORDER = [
  'Round of 32',
  'Round of 16',
  'Quarter Finals',
  'Semi Finals',
  'Finals',
];

const ROUND_LABELS = {
  'Round of 32': 'Round of 32',
  'Round of 16': 'Round of 16',
  'Quarter Finals': 'Quarter Finals',
  'Semi Finals': 'Semi Finals',
  'Finals': 'Final',
};

/**
 * Transforms a flat list of matches from the API into a bracket structure.
 * Separates the 3rd-place match from The Final so the bracket column only
 * holds a single card (The Final), perfectly centered.
 *
 * Returns: { rounds: Array<{ round, label, matches }>, thirdPlace: match|null }
 */
export function formatBracket(matches) {
  const grouped = {};
  ROUND_ORDER.forEach((r) => {
    grouped[r] = [];
  });

  matches.forEach((m) => {
    if (grouped[m.round] !== undefined) {
      grouped[m.round].push(m);
    }
  });

  const rounds = ROUND_ORDER.filter((r) => grouped[r].length > 0).map((r) => ({
    round: r,
    label: ROUND_LABELS[r],
    matches: [...grouped[r]].sort((a, b) => a.matchNumber - b.matchNumber),
  }));

  // The CSV encodes two matches under "Finals": 3rd-place + The Final.
  // Separate them so the Finals bracket column holds only 1 card.
  let thirdPlace = null;
  const finalsIdx = rounds.findIndex((r) => r.round === 'Finals');
  if (finalsIdx !== -1 && rounds[finalsIdx].matches.length > 1) {
    const sorted = rounds[finalsIdx].matches;
    thirdPlace = sorted[0]; // earlier match = 3rd-place play-off
    rounds[finalsIdx] = {
      ...rounds[finalsIdx],
      matches: [sorted[sorted.length - 1]], // last match = The Final
    };
  }

  return { rounds, thirdPlace };
}

/**
 * Parse a date string from the CSV (format: "DD/MM/YYYY HH:MM") into a Date.
 * Treats the time as UTC.
 */
export function parseMatchDate(dateStr) {
  if (!dateStr) return null;
  const [datePart, timePart = '00:00'] = dateStr.split(' ');
  const [dd, mm, yyyy] = datePart.split('/');
  return new Date(`${yyyy}-${mm}-${dd}T${timePart}:00Z`);
}

/** Short display: "Jun 28, 2026" */
export function formatDateShort(dateStr) {
  const d = parseMatchDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Long display: "June 28, 2026 at 07:00 PM UTC" */
export function formatDateLong(dateStr) {
  const d = parseMatchDate(dateStr);
  if (!d) return dateStr;
  const datePart = d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
  return `${datePart} at ${timePart} UTC`;
}
