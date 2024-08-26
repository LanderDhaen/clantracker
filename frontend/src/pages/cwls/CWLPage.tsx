import AsyncData from "@/components/AsyncData";

import { CWLTable } from "./CWLTable";
import { columns } from "./CWLColumns";
import { getCWLs } from "@/api/cwl";
import { getClans } from "@/api/clan";

export default function CWLPage() {
  const { data, isLoading: cwlsLoading, error: cwlsError } = getCWLs();
  const {
    data: clans,
    isLoading: clansLoading,
    error: clansError,
  } = getClans();

  return (
    <AsyncData
      loading={cwlsLoading || clansLoading}
      error={cwlsError || clansError}
    >
      <CWLTable columns={columns} data={data!} clans={clans!} />
    </AsyncData>
  );
}
