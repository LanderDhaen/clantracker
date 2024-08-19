import { getAccounts } from "@/api/account";
import { columns } from "./AccountColumns";
import { MemberTable } from "./AccountTable";
import { getClans } from "@/api/clan";
import { getTownhalls } from "@/api/townhall";
import AsyncData from "@/components/AsyncData";
import { ToastContainer } from "react-toastify";

export default function AccountPage() {
  const {
    data,
    isLoading: membersLoading,
    error: membersError,
  } = getAccounts();
  const {
    data: clans,
    isLoading: clansLoading,
    error: clansError,
  } = getClans();
  const {
    data: townhalls,
    isLoading: townhallsLoading,
    error: townhallsError,
  } = getTownhalls();

  return (
    <AsyncData
      loading={membersLoading || clansLoading || townhallsLoading}
      error={membersError || clansError || townhallsError}
    >
      <ToastContainer />
      <MemberTable
        columns={columns}
        data={data!}
        clans={clans!}
        townhalls={townhalls!}
      />
    </AsyncData>
  );
}
