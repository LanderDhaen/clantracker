import useSWR from "swr";
import { get } from "../../api";

import { columns } from "./PerformanceColumns";
import { PerformanceTable } from "./PerformanceTable";

export default function MemberPage() {
  const { data, isLoading, isError } = useSWR(`/performances`, get);
  const { data: townhalls } = useSWR(`/townhalls`, get);

  return (
    <>
      {data && townhalls && (
        <PerformanceTable columns={columns} data={data} townhalls={townhalls} />
      )}
    </>
  );
}
