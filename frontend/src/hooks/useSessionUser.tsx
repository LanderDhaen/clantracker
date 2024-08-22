import useSWR from "swr";
import { get } from "../api/index";

export function useSessionUser() {
  return useSWR("/users/me", get, {
    dedupingInterval: 60 * 60 * 24 * 1000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });
}
