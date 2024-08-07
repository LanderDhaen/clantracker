export const leagues = {
  CRYSTAL3: 10,
  CRYSTAL2: 20,
  CRYSTAL1: 30,
  MASTER3: 40,
  MASTER2: 50,
  MASTER1: 60,
  CHAMP3: 70,
  CHAMP2: 80,
  CHAMP1: 90,
};

export const leagueLabel = {
  [leagues.CRYSTAL3]: "Crystal 3",
  [leagues.CRYSTAL2]: "Crystal 2",
  [leagues.CRYSTAL1]: "Crystal 1",
  [leagues.MASTER3]: "Master 3",
  [leagues.MASTER2]: "Master 2",
  [leagues.MASTER1]: "Master 1",
  [leagues.CHAMP3]: "Champion 3",
  [leagues.CHAMP2]: "Champion 2",
  [leagues.CHAMP1]: "Champion 1",
};

export const leagueColors = {
  [leagues.CRYSTAL3]: "bg-purple-300 text-purple-800",
  [leagues.CRYSTAL2]: "bg-purple-300 text-purple-800",
  [leagues.CRYSTAL1]: "bg-purple-300 text-purple-800",
  [leagues.MASTER3]: "bg-gray-100 text-gray-800",
  [leagues.MASTER2]: "bg-gray-300 text-gray-600",
  [leagues.MASTER1]: "bg-gray-300 text-gray-600",
  [leagues.CHAMP3]: "bg-red-100 text-red-800",
  [leagues.CHAMP2]: "bg-red-100 text-red-800",
  [leagues.CHAMP1]: "bg-red-100 text-red-800",
};

export const formatLeague = (league) => leagueLabel[league];
export const colorLeague = (league) => leagueColors[league];
