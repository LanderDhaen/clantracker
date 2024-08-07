export const clans = {
  DL3: 1,
  DLCW: 2,
  DL4: 3,
};

export const clanLabel = {
  [clans.DL3]: "Dutch Legion 3",
  [clans.DLCW]: "Dutch Legion CW",
  [clans.DL4]: "Dutch Legion 4",
};

export const formatClan = (clan) => clanLabel[clan];
