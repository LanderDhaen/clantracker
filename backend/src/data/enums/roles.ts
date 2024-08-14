export const ROLES = {
  LEADER: 10,
  COLEADER: 20,
  ELDER: 30,
  MEMBER: 40,
} as const;

export type Role = keyof typeof ROLES;
