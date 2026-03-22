import { loadMatches, extractTeams } from '../utils/csvParser.js';

let teamsCache = null;

function getTeams() {
  if (!teamsCache) {
    const matches = loadMatches();
    teamsCache = extractTeams(matches);
  }
  return teamsCache;
}

export function getAllTeams() {
  return getTeams();
}

export function getTeamByName(name) {
  const lower = name.toLowerCase();
  return getTeams().find((t) => t.name.toLowerCase() === lower) || null;
}

export function getTeamsByGroup(group) {
  return getTeams().filter((t) => t.group === group);
}
