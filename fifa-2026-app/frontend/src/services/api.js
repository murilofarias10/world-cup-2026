const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function fetchMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/matches${query ? `?${query}` : ''}`);
}

export function fetchMatch(matchNumber) {
  return request(`/matches/${matchNumber}`);
}

export function fetchTeams(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/teams${query ? `?${query}` : ''}`);
}

export function fetchTeam(name) {
  return request(`/teams/${encodeURIComponent(name)}`);
}

export function sendChatMessage(message) {
  return request('/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

export function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
