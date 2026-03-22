// Maps CSV team names → flag filename stems (files live in /public/flags/)
const TEAM_TO_FLAG = {
  Algeria:           'Algeria',
  Argentina:         'Argentina',
  Australia:         'Australia',
  Austria:           'Austria',
  Belgium:           'Belgium',
  Brazil:            'Brazil',
  'Cabo Verde':      'Cape Verde',
  Canada:            'Canada',
  Colombia:          'Colombia',
  "Côte d'Ivoire":   'Ivory Coast',
  Croatia:           'Croatia',
  'Curaçao':         'Curacao',
  Ecuador:           'Ecuador',
  Egypt:             'Egypt',
  England:           'England',
  France:            'France',
  Germany:           'Germany',
  Ghana:             'Ghana',
  Haiti:             'Haiti',
  'IR Iran':         'Iran',
  Japan:             'Japan',
  Jordan:            'Jordan',
  'Korea Republic':  'Republic of Korea',
  Mexico:            'Mexico',
  Morocco:           'Morocco',
  Netherlands:       'Netherlands',
  'New Zealand':     'New Zealand',
  Norway:            'Norway',
  Panama:            'Panama',
  Paraguay:          'Paraguay',
  Portugal:          'Portugal',
  Qatar:             'Qatar',
  'Saudi Arabia':    'Saudi Arabia',
  Scotland:          'Scotland',
  Senegal:           'Senegal',
  'South Africa':    'South Africa',
  Spain:             'Spain',
  Switzerland:       'Switzerland',
  Tunisia:           'Tunisia',
  Uruguay:           'Uruguay',
  USA:               'USA',
  Uzbekistan:        'Uzbekistan',
};

/**
 * Returns the /flags/ URL for a given team name, or null if not available.
 */
export function getTeamFlagPath(teamName) {
  if (!teamName || teamName === 'To be announced') return null;
  const flagName = TEAM_TO_FLAG[teamName];
  if (!flagName) return null;
  return `/flags/${encodeURIComponent(flagName)}.png`;
}

// The 42 confirmed nations for the carousel — derived directly from
// TEAM_TO_FLAG so it is always in sync and never contains play-off placeholders.
export const CAROUSEL_NATIONS = Object.keys(TEAM_TO_FLAG).map((name) => ({ name }));

// Legacy list kept for reference; no longer used in the carousel.
export const ALL_TEAM_FLAGS = [
  'Algeria', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil',
  'Canada', 'Cape Verde', 'Colombia', 'Croatia', 'Curacao', 'Ecuador',
  'Egypt', 'England', 'Fifa Play-Off 1', 'Fifa Play-Off 2',
  'France', 'Germany', 'Ghana', 'Haiti', 'Iran', 'Ivory Coast',
  'Japan', 'Jordan', 'Korea', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Norway', 'Panama', 'Paraguay', 'Portugal', 'Qatar',
  'Republic of Korea', 'Saudi Arabia', 'Scotland', 'Senegal',
  'South Africa', 'Spain', 'Switzerland', 'Tunisia',
  'UEFA Play-Off A', 'UEFA Play-Off B', 'UEFA Play-Off C', 'UEFA Play-Off D',
  'Uruguay', 'USA', 'Uzbekistan',
];

// Maps venue location strings → host nation
export const VENUE_TO_COUNTRY = {
  'Mexico City Stadium':           'Mexico',
  'Guadalajara Stadium':           'Mexico',
  'Monterrey Stadium':             'Mexico',
  'Toronto Stadium':               'Canada',
  'BC Place Vancouver':            'Canada',
  'Atlanta Stadium':               'USA',
  'Boston Stadium':                'USA',
  'Dallas Stadium':                'USA',
  'Houston Stadium':               'USA',
  'Kansas City Stadium':           'USA',
  'Los Angeles Stadium':           'USA',
  'Miami Stadium':                 'USA',
  'New York/New Jersey Stadium':   'USA',
  'Philadelphia Stadium':          'USA',
  'San Francisco Bay Area Stadium':'USA',
  'Seattle Stadium':               'USA',
};
