# FIFA World Cup 2026 — Fan App

> Built for the **Cursor Hackathon 2026**

A full-stack web application for tracking the FIFA World Cup 2026 — featuring match schedules, team information, a Watch Party organiser, an interactive Leaflet map, and an AI chat assistant.

---

## Tech Stack

| Layer     | Tech                                                                    |
|-----------|-------------------------------------------------------------------------|
| Frontend  | React 19 · Vite · React Router v7                                       |
| Map       | React Leaflet 5 · Leaflet 1.9 · topojson-client · CartoDB Voyager tiles |
| Backend   | Node.js · Express                                                       |
| Data      | `fifa-world-cup-2026-UTC.csv` (104 matches · 48 teams · 16 venues)     |
| AI Chat   | OpenAI API                                                              |

---

## Features

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
        ├── components/
        │   ├── HostNationsMap.jsx/css      # Interactive Leaflet host-nations map
        │   ├── TeamsCarousel.jsx/css       # Two-row infinite-marquee carousel
        │   ├── TeamCarouselCard.jsx        # Individual carousel card + flag fallback
        │   ├── MatchCard.jsx/css           # Match card with flags + Watch Party CTA
        │   ├── ChatWidget.jsx              # AI chat bubble
        │   ├── Navbar.jsx/css
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
        │   └── LoginPage.jsx/css
        ├── services/
        │   ├── api.js                     # fetchMatches · fetchTeams · fetchMatch
        │   ├── matchService.js            # Interest tracking (localStorage)
        │   └── venueService.js            # Mock venue data
        └── utils/
            ├── flagUtils.js               # Team name → flag path · CAROUSEL_NATIONS
            └── matchUtils.js              # Date helpers · match classification
```

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

Create `backend/.env` (copy from `backend/.env.example`):

```env
PORT=4000
OPENAI_API_KEY=your_openai_key_here
```

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
- All venue and chat data is mocked on the frontend; the architecture is designed so a real backend can be wired in later.

---

*Cursor Hackathon 2026 — built with React + Node.js*
