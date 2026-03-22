/**
 * VenueGallery – Placeholder image gallery for venue photos.
 * Replace gradient placeholders with real <img> tags when backend provides image URLs.
 */

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1a1a2e 0%, #56042c 100%)',
  'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
  'linear-gradient(135deg, #533483 0%, #16213e 100%)',
];

const PLACEHOLDER_EMOJIS = ['🏟️', '⚽', '🍺', '🎉'];
const PLACEHOLDER_LABELS = ['Main Hall', 'Viewing Area', 'Bar & Drinks', 'Match Night'];

export default function VenueGallery({ venue }) {
  const images = venue.images ?? [];

  return (
    <section className="vgal-root">
      <div className="vgal-grid">
        {/* Main (large) image */}
        <div className="vgal-main" aria-label="Venue main photo">
          {images[0] ? (
            <img src={images[0]} alt={`${venue.name} interior`} className="vgal-img" />
          ) : (
            <PlaceholderSlot idx={0} venueName={venue.name} />
          )}
          <div className="vgal-main-overlay">
            <span className="vgal-main-label">{venue.name}</span>
            <span className="vgal-main-cat">{venue.category}</span>
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="vgal-thumbs">
          {[1, 2, 3].map((idx) =>
            images[idx] ? (
              <img
                key={idx}
                src={images[idx]}
                alt={`${venue.name} photo ${idx + 1}`}
                className="vgal-thumb"
              />
            ) : (
              <PlaceholderSlot key={idx} idx={idx} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function PlaceholderSlot({ idx, venueName }) {
  return (
    <div
      className="vgal-placeholder"
      style={{ background: PLACEHOLDER_GRADIENTS[idx] }}
      aria-hidden="true"
    >
      <span className="vgal-ph-emoji">{PLACEHOLDER_EMOJIS[idx]}</span>
      {venueName && idx === 0 && (
        <span className="vgal-ph-name">{venueName}</span>
      )}
      {!venueName && (
        <span className="vgal-ph-label">{PLACEHOLDER_LABELS[idx]}</span>
      )}
    </div>
  );
}
