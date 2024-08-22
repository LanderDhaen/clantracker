import useSWR from "swr";
import { get } from "./index.js";
import { GetAllPerformancesResponse } from "@backend-types/performance.js";

export function getPerformances() {
  return useSWR<GetAllPerformancesResponse>("/performances", get);
}
