import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";

export type TownhallListEntry = {
  ID: number;
  level: number;
};

export function getTownhalls() {
  return useSWR("/townhalls", get) as SWRResponse<TownhallListEntry[]>;
}
