import AsyncData from "@/components/AsyncData";

import { ClanTable } from "./ClanTable";
import { columns } from "./ClanColumns";
import { getClans } from "@/api/clan";

export default function MemberFormPage() {
  const { data, isLoading: clansLoading, error: clansError } = getClans();

  return (
    <AsyncData loading={clansLoading} error={clansError}>
      <ClanTable columns={columns} data={data ?? []} />
    </AsyncData>
  );
}
