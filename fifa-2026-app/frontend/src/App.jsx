import { Routes, Route } from 'react-router-dom';
import Navbar            from './components/Navbar.jsx';
import HomePage          from './pages/HomePage.jsx';
import TeamsPage         from './pages/TeamsPage.jsx';
import MatchesPage       from './pages/MatchesPage.jsx';
import LoginPage         from './pages/LoginPage.jsx';
import BracketPage       from './pages/BracketPage.jsx';
import WatchPartyPage    from './pages/WatchPartyPage.jsx';
import VenueDetailsPage  from './pages/VenueDetailsPage.jsx';
import ChatWidget        from './components/ChatWidget.jsx';

// Pages that live inside the padded/max-width content area
function PageShell({ children }) {
  return <main className="main-content">{children}</main>;
}

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* Full-bleed — HomePage manages its own layout */}
        <Route path="/" element={<HomePage />} />

        {/* Standard padded pages */}
        <Route path="/teams"   element={<PageShell><TeamsPage /></PageShell>} />
        <Route path="/matches" element={<PageShell><MatchesPage /></PageShell>} />
        <Route path="/bracket" element={<PageShell><BracketPage /></PageShell>} />
        <Route path="/login"   element={<PageShell><LoginPage /></PageShell>} />
        <Route path="/watch-party/:matchId" element={<PageShell><WatchPartyPage /></PageShell>} />
        {/* Venue Details — full-bleed, manages its own layout */}
        <Route path="/venue/:venueId" element={<VenueDetailsPage />} />
      </Routes>

      <ChatWidget />
    </div>
  );
}

export default App;
