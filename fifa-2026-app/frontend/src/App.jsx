import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import TeamsPage from './pages/TeamsPage.jsx';
import MatchesPage from './pages/MatchesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BracketPage from './pages/BracketPage.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/matches" replace />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/bracket" element={<BracketPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
