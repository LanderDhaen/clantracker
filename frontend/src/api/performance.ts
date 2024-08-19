import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";

export type PerformanceAllTime = {
  avgStars: number;
  avgDamage: number;
  totalStars: number;
  totalDamage: number;
  totalAttacks: number;
};

export type PerformanceYearly = {
  year: number;
  avgStars: number;
  avgDamage: number;
  totalStars: number;
  totalDamage: number;
  totalAttacks: number;
};

export type PerformanceListEntry = {
  ID: number;
  account: string;
  townhall: number;
  alltime: PerformanceAllTime;
  yearly: PerformanceYearly[];
};

export type PerformanceDetail = {
  year: number;
  month: number;
  stars: number;
  damage: number;
  attacks: number;
  avgStars: number;
  avgDamage: number;
};

export function getPerformances() {
  return useSWR("/performances", get) as SWRResponse<PerformanceListEntry[]>;
}
