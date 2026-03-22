import {
  getAllTeams,
  getTeamByName,
  getTeamsByGroup,
} from '../services/teamService.js';

export function listTeams(req, res) {
  try {
    const { group } = req.query;

    if (group) return res.json(getTeamsByGroup(group));

    return res.json(getAllTeams());
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load teams' });
  }
}

export function getTeam(req, res) {
  try {
    const team = getTeamByName(req.params.name);

    if (!team) return res.status(404).json({ error: 'Team not found' });

    return res.json(team);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load team' });
  }
}
