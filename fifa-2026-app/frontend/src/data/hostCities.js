/**
 * FIFA World Cup 2026 – Host Cities & Stadiums
 * All 16 confirmed host venues across USA, Canada, and Mexico.
 * Coordinates: [latitude, longitude] (Leaflet order).
 */
export const HOST_CITIES = [
  // ── United States (11 venues) ────────────────────────────────────
  {
    id:       'new-york-nj',
    city:     'New York / New Jersey',
    stadium:  'MetLife Stadium',
    country:  'USA',
    coords:   [40.8135, -74.0736],
    matches:  8,
    note:     'Hosting the Final',
  },
  {
    id:       'los-angeles',
    city:     'Los Angeles',
    stadium:  'SoFi Stadium',
    country:  'USA',
    coords:   [33.9534, -118.3392],
    matches:  8,
  },
  {
    id:       'dallas',
    city:     'Dallas',
    stadium:  'AT&T Stadium',
    country:  'USA',
    coords:   [32.7479, -97.0929],
    matches:  8,
  },
  {
    id:       'san-francisco',
    city:     'San Francisco Bay Area',
    stadium:  "Levi's Stadium",
    country:  'USA',
    coords:   [37.4033, -121.9694],
    matches:  7,
  },
  {
    id:       'miami',
    city:     'Miami',
    stadium:  'Hard Rock Stadium',
    country:  'USA',
    coords:   [25.9580, -80.2389],
    matches:  7,
  },
  {
    id:       'seattle',
    city:     'Seattle',
    stadium:  'Lumen Field',
    country:  'USA',
    coords:   [47.5952, -122.3316],
    matches:  6,
  },
  {
    id:       'boston',
    city:     'Boston',
    stadium:  'Gillette Stadium',
    country:  'USA',
    coords:   [42.0909, -71.2643],
    matches:  6,
  },
  {
    id:       'philadelphia',
    city:     'Philadelphia',
    stadium:  'Lincoln Financial Field',
    country:  'USA',
    coords:   [39.9007, -75.1675],
    matches:  6,
  },
  {
    id:       'kansas-city',
    city:     'Kansas City',
    stadium:  'Arrowhead Stadium',
    country:  'USA',
    coords:   [39.0489, -94.4839],
    matches:  6,
  },
  {
    id:       'houston',
    city:     'Houston',
    stadium:  'NRG Stadium',
    country:  'USA',
    coords:   [29.6847, -95.4107],
    matches:  6,
  },
  {
    id:       'atlanta',
    city:     'Atlanta',
    stadium:  'Mercedes-Benz Stadium',
    country:  'USA',
    coords:   [33.7554, -84.4010],
    matches:  6,
  },

  // ── Canada (2 venues) ────────────────────────────────────────────
  {
    id:       'toronto',
    city:     'Toronto',
    stadium:  'BMO Field',
    country:  'Canada',
    coords:   [43.6333, -79.4189],
    matches:  7,
  },
  {
    id:       'vancouver',
    city:     'Vancouver',
    stadium:  'BC Place',
    country:  'Canada',
    coords:   [49.2767, -123.1117],
    matches:  7,
  },

  // ── Mexico (3 venues) ────────────────────────────────────────────
  {
    id:       'mexico-city',
    city:     'Mexico City',
    stadium:  'Estadio Azteca',
    country:  'Mexico',
    coords:   [19.3029, -99.1505],
    matches:  7,
    note:     'Hosting the Opening Match',
  },
  {
    id:       'guadalajara',
    city:     'Guadalajara',
    stadium:  'Estadio Akron',
    country:  'Mexico',
    coords:   [20.6468, -103.4108],
    matches:  6,
  },
  {
    id:       'monterrey',
    city:     'Monterrey',
    stadium:  'Estadio BBVA',
    country:  'Mexico',
    coords:   [25.6693, -100.2405],
    matches:  6,
  },
];

export const COUNTRY_COLORS = {
  USA:    '#1d4ed8',   // flag blue
  Canada: '#c8102e',   // flag red
  Mexico: '#006847',   // flag green
};

/** ISO-3166-1 numeric IDs used by world-atlas topojson */
export const HOST_ISO_IDS = {
  840: 'USA',
  124: 'Canada',
  484: 'Mexico',
};
