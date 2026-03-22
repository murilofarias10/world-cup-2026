import { loadMatches } from '../utils/csvParser.js';

let matchesCache = null;

function getMatches() {
  if (!matchesCache) {
    matchesCache = loadMatches();
  }
  return matchesCache;
}

export function getAllMatches() {
  return getMatches();
}

export function getMatchByNumber(matchNumber) {
  return getMatches().find((m) => m.matchNumber === matchNumber) || null;
}

export function getMatchesByRound(round) {
  return getMatches().filter((m) => m.round === round);
}

export function getMatchesByGroup(group) {
  return getMatches().filter((m) => m.group === group);
}

export function invalidateCache() {
  matchesCache = null;
}
