import TournamentBracket from '../components/TournamentBracket.jsx';
import './BracketPage.css';

export default function BracketPage() {
  return (
    <div className="bracket-page">
      <div className="page-header">
        <h1>Tournament Bracket</h1>
        <p className="page-subtitle">
          FIFA World Cup 2026 — Knockout Stage · Click any card for match details
        </p>
      </div>
      <TournamentBracket />
    </div>
  );
}
