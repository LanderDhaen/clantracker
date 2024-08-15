import { getMembers } from "@/api/account";
import { columns } from "./MemberColumns";
import { MemberTable } from "./MemberTable";
import { getClans } from "@/api/clan";
import { getTownhalls } from "@/api/townhall";
import AsyncData from "@/components/AsyncData";

export default function MemberPage() {
  const { data, isLoading: membersLoading, error: membersError } = getMembers();
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
      <MemberTable
        columns={columns}
        data={data ?? []}
        clans={clans ?? []}
        townhalls={townhalls ?? []}
      />
    </AsyncData>
  );
}
