import useSWR from "swr";
import { get } from "./index.js";

import {
  getAllClansResponse,
  getClanByIDResponse,
} from "@backend-types/clan.js";

export function getClans() {
  return useSWR<getAllClansResponse>("/clans", get);
}

export function getClanByID(id: string | undefined) {
  return useSWR<getClanByIDResponse>(`/clans/${id}/`, get);
}
