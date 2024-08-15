import useSWR, { SWRResponse } from "swr";
import { get } from "./index.js";

export type MemberListEntry = {
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

export function getMembers() {
  return useSWR("/accounts", get) as SWRResponse<MemberListEntry[]>;
}
