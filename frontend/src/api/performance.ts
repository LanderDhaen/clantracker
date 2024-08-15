import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";

export type PerformanceAllTime = {
  avgStars: number;
  avgDamage: number;
  totalStars: number;
  totalDamage: number;
  totalAttacks: number;
};

export type PerformanceYearly = PerformanceAllTime & {
  year: number;
};

export type PerformanceListEntry = {
  ID: number;
  account: string;
  townhall: number;
  alltime: PerformanceAllTime;
  yearly: PerformanceYearly[];
};

export function getPerformances() {
  return useSWR("/performances", get) as SWRResponse<PerformanceListEntry[]>;
}
