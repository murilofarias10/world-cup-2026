import '../styles/CountryCard.css'

/**
 * CountryCard — reusable card displaying a host country.
 *
 * Props:
 *  - name        : Country name
 *  - flag        : URL to the flag image
 *  - banner      : URL to a scenic/landmark photo
 *  - description : Short blurb about the country's role as host
 *  - venues      : Number of venues in this country
 */
function CountryCard({ name, flag, banner, description, venues }) {
  return (
    <article className="country-card">
      <div className="country-card-banner">
        <img src={banner} alt={`${name} landmark`} loading="lazy" />
        <div className="country-flag-wrapper">
          <img src={flag} alt={`${name} flag`} />
        </div>
      </div>

      <div className="country-card-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="country-venues">
          <span>🏟️</span>
          <span>{venues} Venues</span>
        </div>
      </div>
    </article>
  )
}

export default CountryCard
