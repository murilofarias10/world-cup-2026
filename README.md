# FIFA World Cup 2026 — Fan App

> Built for the **Cursor Hackathon 2026**

A full-stack web application for tracking the FIFA World Cup 2026 — featuring match schedules, team information, a Watch Party organiser, an interactive Leaflet map, an AI chat assistant, and full user authentication powered by Supabase.

---

## Tech Stack

| Layer       | Tech                                                                          |
|-------------|-------------------------------------------------------------------------------|
| Frontend    | React 19 · Vite · React Router v7                                             |
| Map         | React Leaflet 5 · Leaflet 1.9 · topojson-client · CartoDB Voyager tiles      |
| Backend     | Node.js · Express                                                             |
| Data        | `fifa-world-cup-2026-UTC.csv` (104 matches · 48 teams · 16 venues)           |
| Database    | Supabase (PostgreSQL) — matches · teams · host cities · watch party · users   |
| Auth        | Supabase Auth — email/password sign-up & sign-in with user profiles           |
| AI Chat     | OpenAI API                                                                    |

---

## Features

### Authentication
- **Login / Register page** — initial screen with two options: *Log In* or *Create Account*
- **Login** — email + password via Supabase Auth
- **Register** — name, email, country, password + two required consent checkboxes:
  - "I will be respectful with others"
  - "I confirm that I am older than 18 years old"
- **Navbar** — shows the user's avatar and a *Sign Out* button when logged in
- **User profiles** stored in Supabase (`user_profiles` table), auto-created on signup via a PostgreSQL trigger

### Teams Page
- **Participating Nations carousel** — two-row infinite marquee with all 42 confirmed nations, flags, and group labels; hover to pause; team modal on click
- **Host Nations section** — interactive [React Leaflet](https://react-leaflet.js.org/) map centered on North America:
  - CartoDB Voyager basemap (realistic terrain, roads, labels — no API key)
  - Subtle country overlays for USA 🇺🇸, Canada 🇨🇦, and Mexico 🇲🇽 (topojson boundaries)
  - 16 color-coded city markers; click opens a popup with city, stadium, country, and match count
  - Sidebar listing all host cities grouped by country — click any to fly the map there
  - Floating frosted-glass legend
- **Groups A – L** — teams listed by group with live search

### Matches Page
- **Hero banner** — tournament stats (48 teams · 104 matches · 16 venues · 3 host nations · 12 groups)
- **Round filter bar** — All · Today · MD 1/2/3 · R32 · R16 · QF · SF · Final
- **Advanced Filters** — filter by host nation, venue, or exact match day
- **Featured Fixtures** — opening match + host-nation highlights
- **Match cards** — team flags, status badges (Scheduled / Live / Full Time), group colour-coding, special styling for Opening / Semi-Final / Final

### Watch Party
- **"I'm Interested" button** on every match card → navigates to `/watch-party/:matchId`
- **Split-screen layout**:
  - **Left panel** — searchable, filterable venue list (Nearby / Popular); each venue card shows name, city, distance, capacity, and interested count; select a venue to highlight it in the right panel
  - **Right panel** — match details (teams, date/time, stadium, group), selected venue callout, and community chat
- **Chat channel** — join/leave gate; system messages on join/leave; auto-scrolling message list with mock participants

### Bracket Page
- Knockout-stage bracket view

### AI Chat Widget
- Floating chat bubble on every page — ask about teams, matches, or the schedule

---

## Project Structure

```
fifa-2026-app/
├── backend/
│   ├── data/
│   │   └── fifa-world-cup-2026-UTC.csv   # Source of truth (104 matches)
│   ├── flags/                             # Team flag PNGs (42 nations)
│   ├── controllers/                       # match · team · chat · auth
│   ├── routes/
│   ├── services/
│   └── server.js
└── frontend/
    ├── public/
    │   └── flags/                         # Static flag assets
    └── src/
        ├── context/
        │   └── AuthContext.jsx            # Global Supabase session & profile state
        ├── lib/
        │   └── supabase.js                # Supabase client (reads VITE_ env vars)
        ├── components/
        │   ├── HostNationsMap.jsx/css      # Interactive Leaflet host-nations map
        │   ├── TeamsCarousel.jsx/css       # Two-row infinite-marquee carousel
        │   ├── TeamCarouselCard.jsx        # Individual carousel card + flag fallback
        │   ├── MatchCard.jsx/css           # Match card with flags + Watch Party CTA
        │   ├── ChatWidget.jsx              # AI chat bubble
        │   ├── Navbar.jsx/css              # Navigation + auth state (avatar / sign-out)
        │   ├── TournamentBracket.jsx
        │   ├── MatchModal.jsx
        │   └── watchparty/
        │       ├── VenueList.jsx           # Searchable venue list panel
        │       ├── VenueCard.jsx           # Individual venue card
        │       ├── MatchDetails.jsx        # Match info + selected venue callout
        │       └── ChatPanel.jsx           # Join/leave channel + chat UI
        ├── data/
        │   └── hostCities.js              # All 16 FIFA 2026 host venues + coordinates
        ├── pages/
        │   ├── TeamsPage.jsx/css          # Carousel + Leaflet map + group grid
        │   ├── MatchesPage.jsx/css        # Advanced filters + featured + match grid
        │   ├── WatchPartyPage.jsx/css     # Split-screen watch party layout
        │   ├── BracketPage.jsx
        │   └── LoginPage.jsx/css          # Auth: choice → login or register flows
        ├── services/
        │   ├── api.js                     # fetchMatches · fetchTeams · fetchMatch
        │   ├── matchService.js            # Interest tracking (localStorage)
        │   └── venueService.js            # Mock venue data
        └── utils/
            ├── flagUtils.js               # Team name → flag path · CAROUSEL_NATIONS
            └── matchUtils.js              # Date helpers · match classification
```

---

## Database Schema (Supabase)

| Table                  | Rows | Description                                              |
|------------------------|------|----------------------------------------------------------|
| `matches`              | 104  | All FIFA 2026 fixtures — group stage through the Final   |
| `teams`                | 48   | Participating nations with group assignments             |
| `host_cities`          | 16   | Host venues with coordinates (lat/lng) for the map       |
| `watch_party_venues`   | 10   | Watch-party bars & lounges with city, capacity, address  |
| `user_profiles`        | —    | Extended user info: name, country, consent flags         |
| `watch_party_interests`| —    | Per-user match interest (replaces localStorage)          |
| `watch_party_messages` | —    | Real-time chat messages per match                        |

Row Level Security is enabled on every table. Public reference data (matches, teams, host cities, venues) is readable by anyone. User data is readable only by the owning user.

---

## Getting Started

### 1. Clone & install

```bash
git clone <repo-url>
cd world-cup-2026/fifa-2026-app

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install --legacy-peer-deps
# (--legacy-peer-deps is required because react-simple-maps 3 declares
#  a peer dep on React ≤ 18, while this project uses React 19)
```

### 2. Configure environment

**Backend** — create `backend/.env` (copy from `backend/.env.example`):

```env
PORT=4000
OPENAI_API_KEY=your_openai_key_here

# Supabase
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Frontend** — create `frontend/.env.local`:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> Both keys are available in your Supabase project under **Settings → API**.

### 3. Run

```bash
# Terminal 1 — backend (port 4000)
cd fifa-2026-app/backend
node server.js

# Terminal 2 — frontend (port 3000)
cd fifa-2026-app/frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Host Nations & Venues

| Host | City | Stadium | Matches |
|------|------|---------|---------|
| 🇺🇸 USA | New York / New Jersey | MetLife Stadium | 8 (incl. Final) |
| 🇺🇸 USA | Los Angeles | SoFi Stadium | 8 |
| 🇺🇸 USA | Dallas | AT&T Stadium | 8 |
| 🇺🇸 USA | San Francisco Bay Area | Levi's Stadium | 7 |
| 🇺🇸 USA | Miami | Hard Rock Stadium | 7 |
| 🇺🇸 USA | Seattle | Lumen Field | 6 |
| 🇺🇸 USA | Boston | Gillette Stadium | 6 |
| 🇺🇸 USA | Philadelphia | Lincoln Financial Field | 6 |
| 🇺🇸 USA | Kansas City | Arrowhead Stadium | 6 |
| 🇺🇸 USA | Houston | NRG Stadium | 6 |
| 🇺🇸 USA | Atlanta | Mercedes-Benz Stadium | 6 |
| 🇨🇦 Canada | Toronto | BMO Field | 7 |
| 🇨🇦 Canada | Vancouver | BC Place | 7 |
| 🇲🇽 Mexico | Mexico City | Estadio Azteca | 7 (incl. Opening) |
| 🇲🇽 Mexico | Guadalajara | Estadio Akron | 6 |
| 🇲🇽 Mexico | Monterrey | Estadio BBVA | 6 |

---

## Notes

- The map uses [CartoDB Voyager](https://carto.com/basemaps/) tiles — free for development, no API key required.
- Country boundary overlays are generated client-side from [`world-atlas@2`](https://github.com/topojson/world-atlas) (110m resolution) via `topojson-client`.
- Watch party venue and chat data is currently mocked on the frontend; the Supabase tables (`watch_party_venues`, `watch_party_messages`, `watch_party_interests`) are ready to be wired in.
- Ctrl+C on Windows may leave Node.js holding the port. The server registers `SIGINT`/`SIGTERM` handlers to close cleanly. If port 4000 is still in use, run `netstat -ano | findstr :4000` and `taskkill /PID <pid> /F`.

---

*Cursor Hackathon 2026 — built with React + Node.js + Supabase*
