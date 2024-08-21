import useSWR from "swr";
import { get } from "./index.js";

import { getAllClansResponse } from "@backend-types/clan.js";

export function getClans() {
  return useSWR<getAllClansResponse>("/clans", get);
}
