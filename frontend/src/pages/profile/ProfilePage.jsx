import useSWR from "swr";
import { get } from "../../api";
import Profile from "../../pages/profile/Profile";

export default function MemberPage() {
  const { data, isLoading, isError } = useSWR(`/accounts/1`, get);

  return <>{data && <Profile profile={data} />}</>;
}
