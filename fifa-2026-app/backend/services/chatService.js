import OpenAI from 'openai';
import { getAllMatches } from './matchService.js';
import { getAllTeams } from './teamService.js';

let openai = null;

function getClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

function buildContext() {
  const matches = getAllMatches();
  const teams = getAllTeams();

  const teamList = teams.map((t) => `${t.name} (${t.group})`).join(', ');
  const upcomingMatches = matches
    .slice(0, 20)
    .map(
      (m) =>
        `Match ${m.matchNumber}: ${m.homeTeam} vs ${m.awayTeam} — ${m.date} at ${m.location} (${m.group || m.round})`
    )
    .join('\n');

  return `You are a helpful FIFA World Cup 2026 assistant. Here is context about the tournament:\n\nTeams: ${teamList}\n\nSample upcoming matches:\n${upcomingMatches}\n\nAnswer questions about the World Cup 2026 schedule, teams, venues, and groups.`;
}

export async function chat(userMessage) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      reply:
        'Chatbot is not configured. Please set the OPENAI_API_KEY environment variable on the server.',
    };
  }

  const client = getClient();
  const systemPrompt = buildContext();

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return { reply: completion.choices[0].message.content };
}
