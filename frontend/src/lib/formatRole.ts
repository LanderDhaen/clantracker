export const ROLES = {
  LEADER: 10,
  COLEADER: 20,
  ELDER: 30,
  MEMBER: 40,
} as const;

export type RoleKey = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[RoleKey];

export const roleLabel: Record<RoleValue, string> = {
  [ROLES.LEADER]: "Leader",
  [ROLES.COLEADER]: "Co-leader",
  [ROLES.ELDER]: "Elder",
  [ROLES.MEMBER]: "Member",
};

export const formatRole = (role: RoleValue) => roleLabel[role];

export const colorChart = (role: RoleValue) => {
  switch (role) {
    case ROLES.LEADER:
      return "#85CDFF";
    case ROLES.COLEADER:
      return "#47B1FF";
    case ROLES.ELDER:
      return "#0077FF";
    case ROLES.MEMBER:
      return "#364F7C";
    default:
      return "#000000";
  }
};
