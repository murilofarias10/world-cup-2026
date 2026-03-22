import './TeamCard.css';

function TeamCard({ team }) {
  return (
    <div className="team-card">
      <span className="team-card-name">{team.name}</span>
      {team.group && <span className="team-card-group">{team.group}</span>}
    </div>
  );
}

export default TeamCard;
