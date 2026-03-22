/**
 * attractionService.js
 * Mock tourist attraction data keyed by city.
 * Replace with real API / CMS data when backend is ready.
 */

const CATEGORY_META = {
  landmark:    { emoji: '🏛️', color: '#7c3aed', label: 'Landmark'    },
  park:        { emoji: '🌿', color: '#059669', label: 'Park'         },
  waterfront:  { emoji: '🌊', color: '#0891b2', label: 'Waterfront'  },
  museum:      { emoji: '🎨', color: '#9333ea', label: 'Museum'       },
  market:      { emoji: '🛍️', color: '#d97706', label: 'Market'       },
  food:        { emoji: '🍽️', color: '#dc2626', label: 'Food & Drink' },
  nature:      { emoji: '🏔️', color: '#16a34a', label: 'Nature'       },
  entertainment:{ emoji: '🎭', color: '#0ea5e9', label: 'Entertainment'},
};

export { CATEGORY_META };

const ATTRACTIONS = {
  toronto: [
    { id: 'to1', name: 'CN Tower',               category: 'landmark',     lat: 43.6426, lng: -79.3871, distance: '0.9 mi', desc: 'Iconic 553m tower with glass floor and EdgeWalk experience above the Toronto skyline.',              visitDuration: '2–3 hrs' },
    { id: 'to2', name: 'Ripley\'s Aquarium',     category: 'entertainment',lat: 43.6423, lng: -79.3860, distance: '0.9 mi', desc: 'World-class aquarium with shark tunnels, jellyfish gallery, and immersive exhibits.',              visitDuration: '1.5–2 hrs' },
    { id: 'to3', name: 'Toronto Harbourfront',   category: 'waterfront',   lat: 43.6388, lng: -79.3822, distance: '0.3 mi', desc: 'Vibrant waterfront precinct with public art, restaurants, and Lake Ontario views.',                visitDuration: '1–2 hrs' },
    { id: 'to4', name: 'St. Lawrence Market',    category: 'market',       lat: 43.6489, lng: -79.3715, distance: '1.1 mi', desc: 'One of the world\'s great food markets. Over 120 vendors selling artisan cheese, meats, and produce.', visitDuration: '1–2 hrs' },
    { id: 'to5', name: 'Distillery District',    category: 'entertainment',lat: 43.6503, lng: -79.3596, distance: '1.5 mi', desc: 'Historic Victorian industrial district transformed into galleries, restaurants, and boutiques.',     visitDuration: '2–3 hrs' },
    { id: 'to6', name: 'Art Gallery of Ontario', category: 'museum',       lat: 43.6536, lng: -79.3925, distance: '1.4 mi', desc: 'Frank Gehry-redesigned gallery housing 100,000+ works including the world\'s largest Rubens collection.', visitDuration: '2–4 hrs' },
    { id: 'to7', name: 'Kensington Market',      category: 'market',       lat: 43.6545, lng: -79.4006, distance: '1.8 mi', desc: 'Bohemian neighbourhood of independent vendors, vintage shops, street food, and multicultural flavours.', visitDuration: '1.5–2 hrs' },
    { id: 'to8', name: 'High Park',              category: 'park',         lat: 43.6465, lng: -79.4637, distance: '3.5 mi', desc: 'Toronto\'s largest public park with nature trails, cherry blossoms, a zoo, and sports facilities.',    visitDuration: '2–4 hrs' },
  ],

  vancouver: [
    { id: 'va1', name: 'Stanley Park',            category: 'park',         lat: 49.2988, lng: -123.1387, distance: '2.5 mi', desc: 'Iconic 1,001-acre park featuring the famous Seawall, old-growth forest, and ocean views.',          visitDuration: '2–4 hrs' },
    { id: 'va2', name: 'Granville Island',        category: 'market',       lat: 49.2717, lng: -123.1338, distance: '1.2 mi', desc: 'Creative hub with the famous Public Market, artisan studios, and waterfront restaurants.',          visitDuration: '2–3 hrs' },
    { id: 'va3', name: 'Gastown',                 category: 'landmark',     lat: 49.2836, lng: -123.1089, distance: '1.0 mi', desc: 'Vancouver\'s oldest neighbourhood with cobblestone streets, the Steam Clock, and independent boutiques.', visitDuration: '1–2 hrs' },
    { id: 'va4', name: 'Capilano Suspension Bridge', category: 'nature',   lat: 49.3429, lng: -123.1141, distance: '8 mi',  desc: 'World-famous 137m suspension bridge spanning a rainforest canyon with treetop walks.',             visitDuration: '2–3 hrs' },
    { id: 'va5', name: 'Vancouver Seawall',       category: 'waterfront',   lat: 49.2841, lng: -123.1249, distance: '0.8 mi', desc: 'The world\'s longest uninterrupted waterfront path, stretching 22km around the city.',               visitDuration: '1–3 hrs' },
    { id: 'va6', name: 'Museum of Anthropology', category: 'museum',        lat: 49.2694, lng: -123.2588, distance: '6 mi',  desc: 'UBC\'s premier museum housing extraordinary First Nations art and cultural artifacts.',               visitDuration: '2–3 hrs' },
    { id: 'va7', name: 'Chinatown & Dr. Sun Yat-Sen Garden', category: 'landmark', lat: 49.2794, lng: -123.1022, distance: '0.9 mi', desc: 'The authentic classical Chinese garden outside China, surrounded by North America\'s third-largest Chinatown.', visitDuration: '1–2 hrs' },
    { id: 'va8', name: 'Grouse Mountain',         category: 'nature',       lat: 49.3716, lng: -123.0820, distance: '11 mi', desc: 'Year-round alpine resort with panoramic Vancouver views, grizzly bears, and summer activities.',     visitDuration: '3–5 hrs' },
  ],

  'new-york': [
    { id: 'ny1', name: 'The High Line',           category: 'park',         lat: 40.7480, lng: -74.0048, distance: '0.5 mi', desc: 'Elevated linear park on a historic freight rail line with art installations and Hudson views.',     visitDuration: '1–2 hrs' },
    { id: 'ny2', name: 'Hudson Yards',            category: 'landmark',     lat: 40.7536, lng: -74.0027, distance: '0.4 mi', desc: 'NYC\'s newest neighbourhood featuring The Vessel, Edge observation deck, and The Shed arts centre.', visitDuration: '2–3 hrs' },
    { id: 'ny3', name: 'Times Square',            category: 'entertainment',lat: 40.7580, lng: -73.9855, distance: '0.6 mi', desc: 'The Crossroads of the World — the ultimate NYC spectacle day and night.',                          visitDuration: '1 hr' },
    { id: 'ny4', name: 'Empire State Building',   category: 'landmark',     lat: 40.7484, lng: -73.9857, distance: '0.5 mi', desc: 'The iconic Art Deco skyscraper with observation decks offering 360° city views.',                   visitDuration: '1–2 hrs' },
    { id: 'ny5', name: 'Chelsea Market',          category: 'market',       lat: 40.7421, lng: -74.0059, distance: '0.7 mi', desc: 'Gourmet food hall inside the former Nabisco factory — a NYC essential for food lovers.',             visitDuration: '1–2 hrs' },
    { id: 'ny6', name: 'Bryant Park',             category: 'park',         lat: 40.7536, lng: -73.9832, distance: '0.8 mi', desc: 'Midtown\'s premier public square with seasonal events, dining, and lush gardens.',                  visitDuration: '45 min–1.5 hrs' },
  ],

  'los-angeles': [
    { id: 'la1', name: 'Griffith Observatory',    category: 'landmark',     lat: 34.1184, lng: -118.3004, distance: '2.5 mi', desc: 'Iconic hillside observatory with LA skyline panoramas and free astronomical exhibits.',         visitDuration: '1.5–2.5 hrs' },
    { id: 'la2', name: 'The Getty Center',        category: 'museum',       lat: 34.0780, lng: -118.4741, distance: '6 mi',   desc: 'World-class free art museum with garden terraces and sweeping views over LA and the Pacific.', visitDuration: '2–4 hrs' },
    { id: 'la3', name: 'Echo Park Lake',          category: 'park',         lat: 34.0780, lng: -118.2606, distance: '0.8 mi', desc: 'Vibrant urban park with lotus flowers, paddle boats, and the best downtown LA skyline views.',  visitDuration: '1–2 hrs' },
    { id: 'la4', name: 'Grand Central Market',    category: 'market',       lat: 34.0505, lng: -118.2492, distance: '4 mi',   desc: 'Historic 1917 food hall serving diverse LA street food from over 30 stallholders.',             visitDuration: '1–2 hrs' },
    { id: 'la5', name: 'Venice Beach Boardwalk',  category: 'waterfront',   lat: 33.9850, lng: -118.4695, distance: '14 mi',  desc: 'LA\'s free-spirited oceanfront promenade with street performers, skate parks, and murals.',     visitDuration: '2–3 hrs' },
    { id: 'la6', name: 'The Broad Museum',        category: 'museum',       lat: 34.0541, lng: -118.2504, distance: '4 mi',   desc: 'Contemporary art museum housing Jeff Koons, Cindy Sherman, and Jean-Michel Basquiat.',          visitDuration: '1.5–2.5 hrs' },
  ],

  seattle: [
    { id: 'se1', name: 'Pike Place Market',       category: 'market',       lat: 47.6095, lng: -122.3423, distance: '0.2 mi', desc: 'America\'s oldest farmers market — watch the famous fish toss and explore artisan stalls.',       visitDuration: '1–2 hrs' },
    { id: 'se2', name: 'Seattle Art Museum',      category: 'museum',       lat: 47.6074, lng: -122.3386, distance: '0.4 mi', desc: 'World-class contemporary and indigenous art collection in the heart of downtown Seattle.',        visitDuration: '2–3 hrs' },
    { id: 'se3', name: 'Olympic Sculpture Park',  category: 'park',         lat: 47.6165, lng: -122.3555, distance: '0.7 mi', desc: 'Free outdoor sculpture garden with Puget Sound and Olympic Mountain panoramas.',                 visitDuration: '45 min–1.5 hrs' },
    { id: 'se4', name: 'Chihuly Garden & Glass',  category: 'museum',       lat: 47.6206, lng: -122.3491, distance: '0.9 mi', desc: 'Extraordinary glass art installations in the shadow of the Space Needle.',                       visitDuration: '1–2 hrs' },
    { id: 'se5', name: 'Space Needle',            category: 'landmark',     lat: 47.6205, lng: -122.3493, distance: '0.9 mi', desc: 'Seattle\'s futuristic 1962 World\'s Fair icon with revolving restaurant and observation deck.',  visitDuration: '1–2 hrs' },
    { id: 'se6', name: 'Pioneer Square',          category: 'landmark',     lat: 47.6009, lng: -122.3325, distance: '0.8 mi', desc: 'Seattle\'s historic neighbourhood with Victorian architecture, galleries, and underground tours.', visitDuration: '1–2 hrs' },
  ],

  'mexico-city': [
    { id: 'mx1', name: 'Estadio Azteca',          category: 'landmark',     lat: 19.3029, lng: -99.1505, distance: '1.3 mi', desc: 'The most legendary stadium in football history — host of two World Cup finals. Tours available.', visitDuration: '1.5–2 hrs' },
    { id: 'mx2', name: 'Xochimilco',              category: 'waterfront',   lat: 19.2615, lng: -99.1090, distance: '4 mi',   desc: 'UNESCO World Heritage floating gardens — ride a colourful trajinera through ancient canals.',     visitDuration: '2–4 hrs' },
    { id: 'mx3', name: 'Coyoacán Market',         category: 'market',       lat: 19.3493, lng: -99.1624, distance: '2.5 mi', desc: 'The iconic neighbourhood of Frida Kahlo and Diego Rivera, famous for its artisan crafts market.', visitDuration: '2–3 hrs' },
    { id: 'mx4', name: 'Frida Kahlo Museum',      category: 'museum',       lat: 19.3554, lng: -99.1627, distance: '2.8 mi', desc: 'La Casa Azul — Frida Kahlo\'s blue house, now a beautifully preserved museum of her life and art.', visitDuration: '1.5–2 hrs' },
    { id: 'mx5', name: 'Bosque de Chapultepec',   category: 'park',         lat: 19.4085, lng: -99.1817, distance: '6 mi',   desc: 'One of the largest city parks in the world, home to lakes, museums, and the Chapultepec Castle.', visitDuration: '2–4 hrs' },
    { id: 'mx6', name: 'Plaza de Toros',          category: 'landmark',     lat: 19.3595, lng: -99.1466, distance: '1.8 mi', desc: 'The world\'s largest bullring, now hosting concerts and cultural events during FIFA 2026.',        visitDuration: '1–2 hrs' },
  ],

  dallas: [
    { id: 'da1', name: 'Klyde Warren Park',       category: 'park',         lat: 32.7893, lng: -96.8017, distance: '0.4 mi', desc: 'Award-winning deck park over Woodall Rodgers Freeway, with food trucks and lawn events.',          visitDuration: '1–2 hrs' },
    { id: 'da2', name: 'Dallas Arts District',    category: 'museum',       lat: 32.7870, lng: -96.7981, distance: '0.5 mi', desc: 'The largest contiguous urban arts district in the USA — 19 blocks of world-class culture.',        visitDuration: '2–4 hrs' },
    { id: 'da3', name: 'Reunion Tower',           category: 'landmark',     lat: 32.7757, lng: -96.8089, distance: '0.4 mi', desc: 'Dallas\'s iconic \"Ball of Lights\" tower with GeO-Deck observation level and revolving restaurant.', visitDuration: '1–2 hrs' },
    { id: 'da4', name: 'Dealey Plaza',            category: 'landmark',     lat: 32.7789, lng: -96.8081, distance: '0.7 mi', desc: 'Historic National Historic Landmark and site of the JFK Sixth Floor Museum.',                       visitDuration: '1–2 hrs' },
    { id: 'da5', name: 'Bishop Arts District',    category: 'entertainment',lat: 32.7483, lng: -96.8268, distance: '3 mi',   desc: 'Walkable neighbourhood of indie restaurants, coffee shops, boutiques, and street art.',             visitDuration: '2–3 hrs' },
    { id: 'da6', name: 'AT&T Stadium Tour',       category: 'landmark',     lat: 32.7479, lng: -97.0929, distance: '15 mi',  desc: 'Behind-the-scenes tour of the iconic stadium hosting 8 FIFA 2026 matches.',                       visitDuration: '1.5–2 hrs' },
  ],

  miami: [
    { id: 'mi1', name: 'Bayfront Park',           category: 'park',         lat: 25.7724, lng: -80.1840, distance: '0.3 mi', desc: 'Vibrant downtown park on Biscayne Bay hosting concerts and cultural events during FIFA 2026.',     visitDuration: '45 min–1.5 hrs' },
    { id: 'mi2', name: 'Wynwood Walls',           category: 'museum',       lat: 25.8006, lng: -80.1994, distance: '2.5 mi', desc: 'World-famous outdoor street art museum in Miami\'s most creative neighbourhood.',                  visitDuration: '1–2 hrs' },
    { id: 'mi3', name: 'South Beach',             category: 'waterfront',   lat: 25.7907, lng: -80.1300, distance: '2 mi',   desc: 'Iconic Art Deco oceanfront strip with white sand beaches and legendary Ocean Drive.',              visitDuration: '2–4 hrs' },
    { id: 'mi4', name: 'Little Havana',           category: 'food',         lat: 25.7721, lng: -80.2194, distance: '2 mi',   desc: 'The cultural heart of Miami\'s Cuban community — Calle Ocho food, music, cigars, and dominos.',    visitDuration: '2–3 hrs' },
    { id: 'mi5', name: 'Pérez Art Museum',        category: 'museum',       lat: 25.7738, lng: -80.1858, distance: '0.4 mi', desc: 'International modern and contemporary art in a stunning waterfront building over Biscayne Bay.',   visitDuration: '1.5–2.5 hrs' },
    { id: 'mi6', name: 'Bayside Marketplace',     category: 'market',       lat: 25.7753, lng: -80.1849, distance: '0.2 mi', desc: 'Open-air market and entertainment complex on the bay, with live music and waterfront dining.',       visitDuration: '1–2 hrs' },
  ],
};

// Fill missing cities with empty array
Object.values({ houston: [], boston: [], portland: [], 'san-francisco': [], chicago: [] })
  .forEach((_, i) => {
    const key = ['houston', 'boston', 'portland', 'san-francisco', 'chicago'][i];
    if (!ATTRACTIONS[key]) ATTRACTIONS[key] = [];
  });

export function getAttractionsByCity(cityKey) {
  return Promise.resolve(ATTRACTIONS[cityKey] ?? []);
}

export function getAttractionById(id) {
  for (const list of Object.values(ATTRACTIONS)) {
    const found = list.find((a) => a.id === id);
    if (found) return Promise.resolve(found);
  }
  return Promise.resolve(null);
}
