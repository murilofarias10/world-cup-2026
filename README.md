# FIFA World Cup 2026 — Fan App

> Built for the **Cursor Hackathon 2026**

A full-stack web application for tracking the FIFA World Cup 2026 — featuring match schedules, team information, an AI chat assistant, and an interactive host-nations map.

---

## Tech Stack

| Layer    | Tech                                             |
|----------|--------------------------------------------------|
| Frontend | React 19 · Vite · react-simple-maps             |
| Backend  | Node.js · Express · CSV data source             |
| Data     | `fifa-world-cup-2026-UTC.csv` (104 matches)     |

---

## Features

### Teams Page
- **Participating Nations flags grid** — all 48+ team flags displayed in an interactive grid
- **Host Nations section** — interactive SVG map of the USA, Canada & Mexico with all 16 venue city markers (built with `react-simple-maps`)
- **Groups A – L** — teams listed by group with live search
- TBD placeholder slots replaced by the host-nations map

### Matches Page
- **Hero banner** — tournament stats (48 teams, 104 matches, 16 venues, 3 hosts, 12 groups)
- **Round filter bar** — All · Today · MD 1/2/3 · R32 · R16 · QF · SF · Final
- **Advanced Filters** — filter by:
  - 🏳 **Host Nation** (USA / Canada / Mexico) — highlights all matches in that country
  - 📍 **Venue** — select any of the 16 host stadiums
  - 📅 **Day** — pick an exact match day
- **Featured Fixtures** section — opening match + host-nation highlights
- **Today's Matches** live section
- **Country flags** on every match card next to each team name

### Match Cards
- Team flags displayed inline for all 48 qualified nations
- Status badges: Scheduled · Live · Full Time
- Group color-coding (Groups A – L)
- Special styling for Opening match, Semi Finals, and Final

### AI Chat Widget
- Ask questions about teams, matches, and the tournament schedule

---

## Project Structure

```
fifa-2026-app/
├── backend/
│   ├── data/fifa-world-cup-2026-UTC.csv   # Source of truth (104 matches)
│   ├── flags/                             # Team flag PNGs (49 nations)
│   ├── controllers/                       # match · team · chat · auth
│   ├── routes/
│   ├── services/
│   └── server.js
└── frontend/
    ├── public/
    │   └── flags/                         # Static flag assets (copied from backend)
    └── src/
        ├── components/
        │   ├── MatchCard.jsx / .css       # Match card with team flags
        │   ├── Navbar.jsx / .css
        │   └── …
        ├── pages/
        │   ├── TeamsPage.jsx / .css       # Flags grid + host-nations map
        │   ├── MatchesPage.jsx / .css     # Advanced filters + match grid
        │   └── …
        └── utils/
            ├── flagUtils.js               # Team name → flag path mapping
            └── matchUtils.js              # Date helpers, match classification
```

---

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd fifa-2026-app/backend
npm install

# Frontend
cd ../frontend
npm install --legacy-peer-deps
```

### 2. Configure environment

Create `backend/.env`:

```env
PORT=4000
OPENAI_API_KEY=your_key_here
```

### 3. Run the app

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

| Host    | Stadiums                                                                              |
|---------|---------------------------------------------------------------------------------------|
| 🇺🇸 USA | Atlanta · Boston · Dallas · Houston · Kansas City · Los Angeles · Miami · New York/NJ · Philadelphia · San Francisco · Seattle |
| 🇨🇦 Canada | Toronto · Vancouver (BC Place)                                                   |
| 🇲🇽 Mexico | Mexico City · Guadalajara · Monterrey                                            |

---

*Cursor Hackathon 2026 — built with React + Node.js*
