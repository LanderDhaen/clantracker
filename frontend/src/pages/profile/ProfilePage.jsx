import useSWR from "swr";
import { get } from "../../api";
import Profile from "../../pages/profile/Profile";

import { useParams } from "react-router-dom";

export default function MemberPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useSWR(`/accounts/${id}`, get);

  return <>{data && <Profile profile={data} />}</>;
}
