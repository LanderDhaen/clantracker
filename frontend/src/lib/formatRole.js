export const roles = {
  LEADER: 10,
  COLEADER: 20,
  ELDER: 30,
  MEMBER: 40,
};

export const roleLabel = {
  [roles.LEADER]: "Leader",
  [roles.COLEADER]: "Co-leader",
  [roles.ELDER]: "Elder",
  [roles.MEMBER]: "Member",
};

export const formatRole = (role) => roleLabel[role];
