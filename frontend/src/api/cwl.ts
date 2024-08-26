import useSWR from "swr";
import { get } from "./index.js";

export type CWLListEntry = {
  ID: number;
  month: number;
  year: number;
  league: string;
  placement: number;
  placementType: string;
  clanID: number;
  clanName: string;
};

export function getCWLs() {
  return useSWR<CWLListEntry[]>("/cwls", get);
}
