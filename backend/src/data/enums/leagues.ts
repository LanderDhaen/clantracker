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
