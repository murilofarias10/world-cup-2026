import {
  getAllMatches,
  getMatchByNumber,
  getMatchesByRound,
  getMatchesByGroup,
} from '../services/matchService.js';

export function listMatches(req, res) {
  try {
    const { round, group } = req.query;

    if (round) return res.json(getMatchesByRound(round));
    if (group) return res.json(getMatchesByGroup(group));

    return res.json(getAllMatches());
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load matches' });
  }
}

export function getMatch(req, res) {
  try {
    const matchNumber = Number(req.params.matchNumber);
    const match = getMatchByNumber(matchNumber);

    if (!match) return res.status(404).json({ error: 'Match not found' });

    return res.json(match);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load match' });
  }
}
