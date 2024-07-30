import useSWR from "swr";
import { get } from "../../api";

import { columns } from "./Columns";
import { MemberTable } from "./MemberTable";

export default function MemberPage() {
  const { data, isLoading, isError } = useSWR(`/accounts`, get);

  return <>{data && <MemberTable columns={columns} data={data} />}</>;
}
