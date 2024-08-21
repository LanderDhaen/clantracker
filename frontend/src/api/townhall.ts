import useSWR from "swr";
import { get } from "./index.js";
import { getAllTownhallsResponse } from "@backend-types/townhall.js";

export function getTownhalls() {
  return useSWR<getAllTownhallsResponse>("/townhalls", get);
}
