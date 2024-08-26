export const PLACEMENTTYPES = {
  PROMOTION: 10,
  SAFE: 20,
  DEMOTION: 30,
} as const;

export type PlacementTypeKey = keyof typeof PLACEMENTTYPES;
export type PlacementTypeValue = (typeof PLACEMENTTYPES)[PlacementTypeKey];

export const placementTypeLabel: Record<PlacementTypeValue, string> = {
  [PLACEMENTTYPES.PROMOTION]: "Promotion",
  [PLACEMENTTYPES.SAFE]: "Safe",
  [PLACEMENTTYPES.DEMOTION]: "Demotion",
};

export const formatPlacementType = (placementType: PlacementTypeValue) =>
  placementTypeLabel[placementType];

export const colorPlacementType = (placementType: PlacementTypeValue) => {
  switch (placementType) {
    case PLACEMENTTYPES.PROMOTION:
      return "bg-green-500";
    case PLACEMENTTYPES.SAFE:
      return "bg-gray-500";
    case PLACEMENTTYPES.DEMOTION:
      return "bg-red-500";
  }
};
