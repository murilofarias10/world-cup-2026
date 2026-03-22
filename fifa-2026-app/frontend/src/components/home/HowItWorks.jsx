const STEPS = [
  {
    num:   '1',
    icon:  '📅',
    title: 'Pick a Match',
    desc:  'Browse all 104 FIFA 2026 fixtures by date, round, group, or host city.',
  },
  {
    num:   '2',
    icon:  '📍',
    title: 'Choose a Venue',
    desc:  'Find nearby cafés, bars, and fan zones showing the match — with real crowd intel.',
  },
  {
    num:   '3',
    icon:  '🎉',
    title: 'Join Fans & Explore',
    desc:  'Join the Watch Party channel, meet fellow fans, and discover the city around you.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw">
      <div className="hp-container">
        <div className="hiw-header">
          <span className="hp-section-eyebrow">Simple as 1-2-3</span>
          <h2 className="hp-section-title">How FIFA Connect works</h2>
          <p className="hp-section-sub">
            From the final whistle to local culture — we make every match day
            an experience worth sharing.
          </p>
        </div>

        <div className="hiw-steps">
          {STEPS.flatMap((step, i) => {
            const items = [
              <div key={step.num} className="hiw-step">
                <div className="hiw-step-icon">
                  {step.icon}
                  <span className="hiw-step-num">{step.num}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>,
            ];
            if (i < STEPS.length - 1) {
              items.push(
                <div key={`conn-${i}`} className="hiw-connector">
                  <div className="hiw-connector-line" />
                  <div className="hiw-connector-dot" />
                  <div className="hiw-connector-line" />
                </div>,
              );
            }
            return items;
          })}
        </div>
      </div>
    </section>
  );
}
