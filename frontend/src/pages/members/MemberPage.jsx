import useSWR from "swr";
import { get } from "../../api";

import { columns } from "./MemberColumns";
import { MemberTable } from "./MemberTable";

export default function MemberPage() {
  const { data, isLoading, isError } = useSWR(`/accounts`, get);
  const { data: clans } = useSWR(`/clans`, get);
  const { data: townhalls } = useSWR(`/townhalls`, get);

  return (
    <>
      {data && clans && townhalls && (
        <MemberTable
          columns={columns}
          data={data}
          clans={clans}
          townhalls={townhalls}
        />
      )}
    </>
  );
}
