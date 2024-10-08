import useSWR from "swr";
import { get } from "./index.js";
import {
  GetAllAccountsResponse,
  GetAccountByIDResponse,
  GetAccountDetailsByIDResponse,
  GetMainAccountsResponse,
} from "@backend-types/account";

export function getAccounts() {
  return useSWR<GetAllAccountsResponse>("/accounts", get);
}

export function getAccountByID(id: string | undefined) {
  return useSWR<GetAccountByIDResponse>(id ? `/accounts/${id}` : null, get);
}

export function getAccountDetailsByID(id: string | undefined) {
  return useSWR<GetAccountDetailsByIDResponse>(`/accounts/${id}/details`, get);
}

export function getMainAccounts() {
  return useSWR<GetMainAccountsResponse>("/accounts/main-accounts", get);
}
