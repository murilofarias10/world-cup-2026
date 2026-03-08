import '../styles/Hero.css'

/**
 * Hero — full-viewport banner with the tournament title, subtitle,
 * a CTA button, and a scroll indicator at the bottom.
 */
function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">June – July 2026</span>
        <h1 className="hero-title">
          FIFA World Cup
          <span className="title-year">2026</span>
        </h1>
        <p className="hero-subtitle">United States, Canada &amp; Mexico</p>
        <button className="hero-cta" onClick={scrollToContent}>
          Explore
          <span className="cta-arrow">→</span>
        </button>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
