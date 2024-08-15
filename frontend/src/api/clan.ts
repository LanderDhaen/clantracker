import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";

export type ClanListEntry = {
  ID: number;
  name: string;
  level: number;
  location: string;
  language: string;
  cwl: number;
  longestWinStreak: number;
};

export function getClans() {
  return useSWR("/clans", get) as SWRResponse<ClanListEntry[]>;
}
