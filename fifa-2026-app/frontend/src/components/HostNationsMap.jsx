import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import { feature as topoFeature } from 'topojson-client';
import 'leaflet/dist/leaflet.css';
import { HOST_CITIES, COUNTRY_COLORS, HOST_ISO_IDS } from '../data/hostCities.js';
import './HostNationsMap.css';

// CartoDB Voyager – realistic terrain + labels, no API key required
const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
  ' contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Subtle fill + stroke for each host nation
function geoStyle(feature) {
  const nation = HOST_ISO_IDS[Number(feature.id)];
  if (!nation) return { fillOpacity: 0, color: 'transparent', weight: 0 };
  const color = COUNTRY_COLORS[nation];
  return {
    color,
    weight:      1.8,
    opacity:     0.55,
    fillColor:   color,
    fillOpacity: 0.09,
  };
}

// Inner component that handles fly-to from the sidebar.
// Must live inside <MapContainer> to access the map instance.
function FlyController({ target }) {
  const map  = useMap();
  const prev = useRef(null);
  useEffect(() => {
    if (target && target !== prev.current) {
      prev.current = target;
      map.flyTo(target.coords, 8, { duration: 1.8, easeLinearity: 0.35 });
    }
  }, [target, map]);
  return null;
}

export default function HostNationsMap() {
  const [worldGeo,   setWorldGeo]   = useState(null);
  const [flyTarget,  setFlyTarget]  = useState(null);
  const [activeCity, setActiveCity] = useState(null);

  // Fetch world-atlas topojson once and convert to GeoJSON filtered to
  // the three host nations. Fails silently if offline.
  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((world) => {
        if (cancelled) return;
        const all      = topoFeature(world, world.objects.countries);
        const filtered = {
          type:     'FeatureCollection',
          features: all.features.filter((f) => HOST_ISO_IDS[Number(f.id)]),
        };
        setWorldGeo(filtered);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  function handleCitySelect(city) {
    setActiveCity(city.id);
    setFlyTarget(city);
  }

  const grouped = ['USA', 'Canada', 'Mexico'].map((country) => ({
    country,
    cities: HOST_CITIES.filter((c) => c.country === country),
  }));

  return (
    <div className="hnm-root">
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside className="hnm-sidebar">
        <p className="hnm-sidebar-heading">Host Cities</p>

        {grouped.map(({ country, cities }) => (
          <div key={country} className="hnm-nation-group">
            <h4
              className="hnm-nation-label"
              style={{ color: COUNTRY_COLORS[country] }}
            >
              {country}
            </h4>

            {cities.map((city) => {
              const isActive = activeCity === city.id;
              return (
                <button
                  key={city.id}
                  className={`hnm-city-row${isActive ? ' hnm-city-row--active' : ''}`}
                  style={isActive ? { borderLeftColor: COUNTRY_COLORS[country] } : {}}
                  onClick={() => handleCitySelect(city)}
                  title={city.stadium}
                >
                  <span
                    className="hnm-city-dot"
                    style={{ background: COUNTRY_COLORS[country] }}
                  />
                  <span className="hnm-city-name">{city.city}</span>
                  <span className="hnm-city-badge">{city.matches}</span>
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* ── Map area ──────────────────────────────────────────────── */}
      <div className="hnm-map-area">
        <MapContainer
          center={[40, -97]}
          zoom={3}
          minZoom={2}
          maxZoom={12}
          zoomControl
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer url={TILE_URL} attribution={TILE_ATTR} maxZoom={19} />

          {/* Subtle country overlay for the 3 host nations */}
          {worldGeo && (
            <GeoJSON
              key="host-nations"
              data={worldGeo}
              style={geoStyle}
            />
          )}

          {/* City markers */}
          {HOST_CITIES.map((city) => {
            const isActive = activeCity === city.id;
            const color    = COUNTRY_COLORS[city.country];
            return (
              <CircleMarker
                key={city.id}
                center={city.coords}
                radius={isActive ? 11 : 7}
                pathOptions={{
                  fillColor:   color,
                  color:       '#ffffff',
                  weight:      isActive ? 3 : 2,
                  fillOpacity: 0.92,
                }}
                eventHandlers={{ click: () => handleCitySelect(city) }}
              >
                <Popup className="hnm-popup-wrap">
                  <div className="hnm-popup">
                    <div
                      className="hnm-popup-stripe"
                      style={{ background: color }}
                    />
                    <div className="hnm-popup-body">
                      <p className="hnm-popup-city">{city.city}</p>
                      <p className="hnm-popup-stadium">{city.stadium}</p>
                      {city.note && (
                        <p className="hnm-popup-note">{city.note}</p>
                      )}
                      <div className="hnm-popup-meta">
                        <span
                          className="hnm-popup-country-chip"
                          style={{
                            color,
                            background: `${color}18`,
                            border:     `1px solid ${color}44`,
                          }}
                        >
                          {city.country}
                        </span>
                        <span className="hnm-popup-matches">
                          {city.matches} matches
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          <FlyController target={flyTarget} />
        </MapContainer>

        {/* Legend */}
        <div className="hnm-legend">
          {Object.entries(COUNTRY_COLORS).map(([country, color]) => (
            <span key={country} className="hnm-legend-item">
              <span className="hnm-legend-dot" style={{ background: color }} />
              {country}
            </span>
          ))}
          <span className="hnm-legend-sep" />
          <span className="hnm-legend-item">
            <span className="hnm-legend-dot hnm-legend-dot--ring" />
            Host venue
          </span>
        </div>
      </div>
    </div>
  );
}
