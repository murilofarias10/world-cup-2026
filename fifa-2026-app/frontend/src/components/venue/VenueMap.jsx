import { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CATEGORY_META } from '../../services/attractionService.js';

// CartoDB Positron – clean light map, labels visible, no API key
const TILE_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
                  ' contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const VENUE_COLOR = '#c8102e';

function FlyController({ target }) {
  const map  = useMap();
  const prev = useRef(null);
  useEffect(() => {
    if (target && target !== prev.current) {
      prev.current = target;
      map.flyTo([target.lat, target.lng], 15, { duration: 1.5, easeLinearity: 0.3 });
    }
  }, [target, map]);
  return null;
}

export default function VenueMap({ venue, attractions, flyTarget }) {
  if (!venue) return null;

  const center = [venue.lat, venue.lng];

  return (
    <div className="vmap-root">
      <div className="vmap-container">
        <MapContainer
          center={center}
          zoom={14}
          minZoom={10}
          maxZoom={18}
          scrollWheelZoom={false}
          zoomControl
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer url={TILE_URL} attribution={TILE_ATTR} maxZoom={19} />

          {/* ── Venue marker (large red) ── */}
          <CircleMarker
            center={center}
            radius={14}
            pathOptions={{
              fillColor:   VENUE_COLOR,
              color:       '#ffffff',
              weight:      3,
              fillOpacity: 0.95,
            }}
          >
            <Popup className="vmap-popup-wrap">
              <div className="vmap-popup">
                <div className="vmap-popup-stripe" style={{ background: VENUE_COLOR }} />
                <div className="vmap-popup-body">
                  <p className="vmap-popup-name">{venue.name}</p>
                  <p className="vmap-popup-type">📺 {venue.category}</p>
                  <p className="vmap-popup-addr">{venue.address}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>

          {/* ── Attraction markers ── */}
          {attractions.map((a) => {
            const meta  = CATEGORY_META[a.category] ?? { emoji: '📍', color: '#64748b', label: a.category };
            return (
              <CircleMarker
                key={a.id}
                center={[a.lat, a.lng]}
                radius={9}
                pathOptions={{
                  fillColor:   meta.color,
                  color:       '#ffffff',
                  weight:      2,
                  fillOpacity: 0.88,
                }}
              >
                <Popup className="vmap-popup-wrap">
                  <div className="vmap-popup">
                    <div className="vmap-popup-stripe" style={{ background: meta.color }} />
                    <div className="vmap-popup-body">
                      <p className="vmap-popup-name">{a.name}</p>
                      <p className="vmap-popup-type">{meta.emoji} {meta.label}</p>
                      <p className="vmap-popup-addr">{a.distance} from venue</p>
                      <p className="vmap-popup-desc">{a.desc}</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          <FlyController target={flyTarget} />
        </MapContainer>
      </div>

      {/* ── Legend ── */}
      <div className="vmap-legend">
        <span className="vmap-legend-item">
          <span className="vmap-legend-dot" style={{ background: VENUE_COLOR }} />
          Venue
        </span>
        {Object.entries(CATEGORY_META)
          .filter(([key]) =>
            attractions.some((a) => a.category === key),
          )
          .map(([key, meta]) => (
            <span key={key} className="vmap-legend-item">
              <span className="vmap-legend-dot" style={{ background: meta.color }} />
              {meta.label}
            </span>
          ))}
      </div>
    </div>
  );
}
