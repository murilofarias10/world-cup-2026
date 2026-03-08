import Hero from '../components/Hero'
import CountryCard from '../components/CountryCard'
import TeamCard from '../components/TeamCard'

/* ===== Static data for the host countries ===== */
const HOST_COUNTRIES = [
  {
    name: 'United States',
    flag: 'https://flagcdn.com/w80/us.png',
    banner:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80',
    description:
      'The main host nation with 11 venues across the country, including the opening match and the final at MetLife Stadium.',
    venues: 11,
  },
  {
    name: 'Canada',
    flag: 'https://flagcdn.com/w80/ca.png',
    banner:
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80',
    description:
      'Co-host with 2 venues — BMO Field in Toronto and BC Place in Vancouver — welcoming the World Cup for the first time.',
    venues: 2,
  },
  {
    name: 'Mexico',
    flag: 'https://flagcdn.com/w80/mx.png',
    banner:
      'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80',
    description:
      'The most experienced World Cup host, featuring 3 iconic venues including the legendary Estadio Azteca in Mexico City.',
    venues: 3,
  },
]

/* ===== Subset of qualified teams for the preview grid ===== */
const TEAMS = [
  { name: 'Brazil', code: 'br', group: 'A' },
  { name: 'Germany', code: 'de', group: 'A' },
  { name: 'Argentina', code: 'ar', group: 'B' },
  { name: 'France', code: 'fr', group: 'B' },
  { name: 'Spain', code: 'es', group: 'C' },
  { name: 'England', code: 'gb-eng', group: 'C' },
  { name: 'Portugal', code: 'pt', group: 'D' },
  { name: 'Netherlands', code: 'nl', group: 'D' },
  { name: 'Italy', code: 'it', group: 'E' },
  { name: 'Japan', code: 'jp', group: 'E' },
  { name: 'USA', code: 'us', group: 'F' },
  { name: 'Mexico', code: 'mx', group: 'F' },
  { name: 'South Korea', code: 'kr', group: 'G' },
  { name: 'Australia', code: 'au', group: 'G' },
  { name: 'Canada', code: 'ca', group: 'H' },
  { name: 'Uruguay', code: 'uy', group: 'H' },
]

/**
 * Home page — assembles the hero, host-countries section, and teams preview.
 */
function Home() {
  return (
    <main>
      {/* Full-screen hero banner */}
      <Hero />

      {/* Host Countries */}
      <section className="section host-countries">
        <div className="container">
          <h2 className="section-title">Host Countries</h2>
          <p className="section-subtitle">
            The first-ever 48-team World Cup will be held across three nations in
            North America
          </p>

          <div className="countries-grid">
            {HOST_COUNTRIES.map((country) => (
              <CountryCard key={country.name} {...country} />
            ))}
          </div>
        </div>
      </section>

      {/* Participating Teams preview */}
      <section className="section teams-section">
        <div className="container">
          <h2 className="section-title">Participating Teams</h2>
          <p className="section-subtitle">
            48 national teams will compete for the greatest prize in football
          </p>

          <div className="teams-grid">
            {TEAMS.map((team) => (
              <TeamCard
                key={team.code}
                name={team.name}
                flag={`https://flagcdn.com/w160/${team.code}.png`}
                group={team.group}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
