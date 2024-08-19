import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";
import { ClanListEntry } from "./clan.js";
import { PerformanceDetail, PerformanceYearly } from "./performance.js";

export type AccountListEntry = {
  ID: number;
  username: string;
  name: string | null;
  role: number;
  joined: Date | string;
  left: Date | string | null;
  nationality: string;
  clan: string;
  clanID: number;
  townhall: number;
  main: string | null;
};

export type AccountDetail = {
  ID: number;
  username: string;
  name: string | null;
  role: number;
  joined: Date | string;
  left: Date | string | null;
  nationality: string;
  townhall: number;
  mainID: number | null;
  clan: ClanListEntry;
  statistics: PerformanceYearly[];
  performances: PerformanceDetail[];
};

export type MainAccountListEntry = {
  ID: number;
  username: string;
  townhall: number;
};

export function getAccounts() {
  return useSWR("/accounts", get) as SWRResponse<AccountListEntry[]>;
}

export function getAccountByID(id: string | undefined) {
  return useSWR(
    id ? `/accounts/${id}` : null,
    get
  ) as SWRResponse<AccountDetail>;
}

export function getMainAccounts() {
  return useSWR("/accounts/main-accounts", get) as SWRResponse<
    MainAccountListEntry[]
  >;
}
