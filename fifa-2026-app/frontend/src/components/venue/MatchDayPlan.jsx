export default function MatchDayPlan({ venue, matchTitle, attractions }) {
  const topSpots = (attractions ?? []).slice(0, 3);

  const steps = [
    {
      time:  'Morning',
      icon:  '🌅',
      title: topSpots[0]?.name ?? 'Explore the city',
      desc:  topSpots[0]
        ? `Start your day at ${topSpots[0].name} — ${topSpots[0].desc}`
        : 'Discover local landmarks, markets, and culture near the venue.',
    },
    {
      time:  'Afternoon',
      icon:  topSpots[1] ? '🏛️' : '🍽️',
      title: topSpots[1]?.name ?? 'Local lunch & culture',
      desc:  topSpots[1]
        ? `Head to ${topSpots[1].name} for a fascinating afternoon experience. ${topSpots[1].desc}`
        : 'Grab a meal at a local restaurant and soak up the pre-match atmosphere.',
    },
    {
      time:  'Pre-Match',
      icon:  '🚇',
      title: `Head to ${venue.name}`,
      desc:  `Arrive early to grab your seat. ${venue.transit ?? `The venue opens at ${venue.hours?.open ?? '11:00 AM'}.`}`,
    },
    {
      time:  'Match Time',
      icon:  '⚽',
      title: matchTitle ? `Watch: ${matchTitle}` : 'The Beautiful Game',
      desc:  `Cheer with fans from around the world at ${venue.name}. Experience the energy of FIFA 2026 live!`,
    },
    {
      time:  'Post-Match',
      icon:  '🎉',
      title: 'Celebrate & Connect',
      desc:  'Stay for the post-match atmosphere, share your experience, and make memories that last.',
    },
  ];

  return (
    <section className="mdp-root">
      <div className="mdp-header">
        <h2 className="mdp-title">Your Match Day Plan</h2>
        <p className="mdp-sub">
          A suggested itinerary for the perfect FIFA 2026 match-day experience in {venue.city}
        </p>
      </div>

      <div className="mdp-timeline">
        {steps.map((step, i) => (
          <div key={i} className="mdp-step">
            <div className="mdp-step-left">
              <div className="mdp-step-icon-wrap">
                <span className="mdp-step-icon">{step.icon}</span>
              </div>
              {i < steps.length - 1 && <div className="mdp-step-line" />}
            </div>
            <div className="mdp-step-body">
              <span className="mdp-step-time">{step.time}</span>
              <h4 className="mdp-step-title">{step.title}</h4>
              <p  className="mdp-step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
