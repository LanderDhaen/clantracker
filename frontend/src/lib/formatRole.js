export const roleType = {
  LEADER: 10,
  COLEADER: 20,
  ELDER: 30,
  MEMBER: 40,
};

export const roleLabel = {
  [roleType.LEADER]: "Leader",
  [roleType.COLEADER]: "Co-leader",
  [roleType.ELDER]: "Elder",
  [roleType.MEMBER]: "Member",
};

export const formatRole = (role) => roleLabel[role];
