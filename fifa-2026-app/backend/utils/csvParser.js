import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSV_PATH = join(__dirname, '..', 'data', 'fifa-world-cup-2026-UTC.csv');

export function loadMatches() {
  const raw = readFileSync(CSV_PATH, 'utf-8');
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((r) => ({
    matchNumber: Number(r['Match Number']),
    round: r['Round Number'],
    date: r['Date'],
    location: r['Location'],
    homeTeam: r['Home Team'],
    awayTeam: r['Away Team'],
    group: r['Group'] || null,
    result: r['Result'] || null,
  }));
}

export function extractTeams(matches) {
  const teamSet = new Set();

  matches.forEach(({ homeTeam, awayTeam }) => {
    if (homeTeam && homeTeam !== 'To be announced') teamSet.add(homeTeam);
    if (awayTeam && awayTeam !== 'To be announced') teamSet.add(awayTeam);
  });

  return [...teamSet].sort().map((name, idx) => ({
    id: idx + 1,
    name,
    group: findTeamGroup(matches, name),
  }));
}

function findTeamGroup(matches, teamName) {
  const match = matches.find(
    (m) =>
      m.group && (m.homeTeam === teamName || m.awayTeam === teamName)
  );
  return match?.group || null;
}
