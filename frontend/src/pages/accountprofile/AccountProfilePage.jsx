import useSWR from "swr";
import { get } from "../../api";
import AccountProfile from "./AccountProfile";

import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AccountProfilePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useSWR(`/accounts/${id}`, get);

  return <>{data && <AccountProfile profile={data} />}</>;
}
