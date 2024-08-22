export const LEAGUES = {
  CRYSTAL3: 10,
  CRYSTAL2: 20,
  CRYSTAL1: 30,
  MASTER3: 40,
  MASTER2: 50,
  MASTER1: 60,
  CHAMP3: 70,
  CHAMP2: 80,
  CHAMP1: 90,
} as const;

export type LeagueKey = keyof typeof LEAGUES;
export type LeagueValue = (typeof LEAGUES)[LeagueKey];

export const leagueLabel: Record<LeagueValue, string> = {
  [LEAGUES.CRYSTAL3]: "Crystal 3",
  [LEAGUES.CRYSTAL2]: "Crystal 2",
  [LEAGUES.CRYSTAL1]: "Crystal 1",
  [LEAGUES.MASTER3]: "Master 3",
  [LEAGUES.MASTER2]: "Master 2",
  [LEAGUES.MASTER1]: "Master 1",
  [LEAGUES.CHAMP3]: "Champion 3",
  [LEAGUES.CHAMP2]: "Champion 2",
  [LEAGUES.CHAMP1]: "Champion 1",
};

export const leagueColors: Record<LeagueValue, string> = {
  [LEAGUES.CRYSTAL3]: "bg-purple-300 text-purple-800",
  [LEAGUES.CRYSTAL2]: "bg-purple-300 text-purple-800",
  [LEAGUES.CRYSTAL1]: "bg-purple-300 text-purple-800",
  [LEAGUES.MASTER3]: "bg-gray-300 text-gray-800",
  [LEAGUES.MASTER2]: "bg-gray-300 text-gray-600",
  [LEAGUES.MASTER1]: "bg-gray-300 text-gray-600",
  [LEAGUES.CHAMP3]: "bg-red-100 text-red-800",
  [LEAGUES.CHAMP2]: "bg-red-100 text-red-800",
  [LEAGUES.CHAMP1]: "bg-red-100 text-red-800",
};

export const formatLeague = (league: LeagueValue) => leagueLabel[league];
export const colorLeague = (league: LeagueValue) => leagueColors[league];
