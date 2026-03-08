# FIFA World Cup 2026

A modern React web application for exploring information about the 2026 FIFA World Cup, hosted across the United States, Canada, and Mexico.

## Tech Stack

- **React 19** with functional components and hooks
- **React Router v7** for client-side routing
- **Vite** for fast builds and hot module replacement
- **CSS** with custom properties and responsive design

## Getting Started

```bash
npm install
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  components/
    Navbar.jsx       # Fixed top navigation bar
    Hero.jsx         # Full-viewport hero banner
    CountryCard.jsx  # Reusable host country card
    TeamCard.jsx     # Reusable team card
  pages/
    Home.jsx         # Home page layout
  styles/
    global.css       # Reset, variables, utilities
    Navbar.css
    Hero.css
    CountryCard.css
    TeamCard.css
  App.jsx            # Root component with routing
  main.jsx           # Application entry point
```
