// ── Mock venue data ───────────────────────────────────────────────
// Replace with real API calls when backend is ready.
// Each venue: id, name, city, distance, capacity, interestedCount

const MOCK_VENUES = [
  {
    id: 'v1',
    name: 'The Globe Sports Bar',
    city: 'New York',
    distance: '0.3 mi',
    capacity: 120,
    interestedCount: 47,
    address: '14 W 33rd St, New York, NY',
  },
  {
    id: 'v2',
    name: 'Kickoff Cantina',
    city: 'Los Angeles',
    distance: '1.2 mi',
    capacity: 200,
    interestedCount: 89,
    address: '1234 Sunset Blvd, Los Angeles, CA',
  },
  {
    id: 'v3',
    name: 'Stadium View Brewery',
    city: 'Dallas',
    distance: '0.8 mi',
    capacity: 150,
    interestedCount: 63,
    address: '456 Main St, Dallas, TX',
  },
  {
    id: 'v4',
    name: 'The Corner Flag Café',
    city: 'Chicago',
    distance: '0.5 mi',
    capacity: 80,
    interestedCount: 34,
    address: '789 Michigan Ave, Chicago, IL',
  },
  {
    id: 'v5',
    name: 'Golazo Sports Lounge',
    city: 'Miami',
    distance: '2.1 mi',
    capacity: 300,
    interestedCount: 128,
    address: '555 Biscayne Blvd, Miami, FL',
  },
  {
    id: 'v6',
    name: 'Full Time Bar & Grill',
    city: 'Houston',
    distance: '1.5 mi',
    capacity: 100,
    interestedCount: 22,
    address: '321 Westheimer Rd, Houston, TX',
  },
  {
    id: 'v7',
    name: 'The Golden Boot',
    city: 'Seattle',
    distance: '0.4 mi',
    capacity: 90,
    interestedCount: 56,
    address: '88 Pike St, Seattle, WA',
  },
  {
    id: 'v8',
    name: 'Copa Café & Bar',
    city: 'San Francisco',
    distance: '3.0 mi',
    capacity: 60,
    interestedCount: 18,
    address: '200 Market St, San Francisco, CA',
  },
  {
    id: 'v9',
    name: 'Ninety Minutes',
    city: 'Boston',
    distance: '1.0 mi',
    capacity: 175,
    interestedCount: 71,
    address: '42 Boylston St, Boston, MA',
  },
  {
    id: 'v10',
    name: 'Offside Bar & Kitchen',
    city: 'Portland',
    distance: '0.7 mi',
    capacity: 110,
    interestedCount: 40,
    address: '660 NW 23rd Ave, Portland, OR',
  },
];

export function getVenues() {
  return Promise.resolve([...MOCK_VENUES]);
}

export function getVenueById(id) {
  return Promise.resolve(MOCK_VENUES.find((v) => v.id === id) ?? null);
}
