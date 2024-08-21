export const PLACEMENTTYPES = {
  PROMOTION: 10,
  SAFE: 20,
  DEMOTION: 30,
} as const;

export type PlacementTypeKey = keyof typeof PLACEMENTTYPES;
export type PlacementTypeValue = (typeof PLACEMENTTYPES)[PlacementTypeKey];
