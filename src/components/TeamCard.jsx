import '../styles/TeamCard.css'

/**
 * TeamCard — compact card showing a participating team.
 *
 * Props:
 *  - name  : Country / team name
 *  - flag  : URL to the flag image
 *  - group : Group letter (e.g. "A")
 */
function TeamCard({ name, flag, group }) {
  return (
    <div className="team-card">
      <img className="team-flag" src={flag} alt={`${name} flag`} loading="lazy" />
      <span className="team-name">{name}</span>
      {group && <span className="team-group">Group {group}</span>}
    </div>
  )
}

export default TeamCard
