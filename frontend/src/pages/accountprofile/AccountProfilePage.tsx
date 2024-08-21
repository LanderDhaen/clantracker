import { getAccountDetailsByID } from "@/api/account";
import AccountProfile from "./AccountProfile";

import { useParams } from "react-router-dom";
import AsyncData from "@/components/AsyncData";

export default function AccountProfilePage() {
  const { id } = useParams();

  const { data: account, isLoading, error } = getAccountDetailsByID(id);

  return (
    <AsyncData loading={isLoading} error={error}>
      <AccountProfile account={account!} />
    </AsyncData>
  );
}
