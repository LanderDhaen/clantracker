import { getPerformances } from "@/api/performance";
import { columns } from "./PerformanceColumns";
import { PerformanceTable } from "./PerformanceTable";
import { getTownhalls } from "@/api/townhall";
import AsyncData from "@/components/AsyncData";

export default function MemberPage() {
  const {
    data,
    isLoading: performancesLoading,
    error: performancesError,
  } = getPerformances();

  const {
    data: townhalls,
    isLoading: townhallsLoading,
    error: townhallsError,
  } = getTownhalls();

  return (
    <AsyncData
      loading={performancesLoading || townhallsLoading}
      error={performancesError || townhallsError}
    >
      <PerformanceTable
        columns={columns}
        data={data ?? []}
        townhalls={townhalls ?? []}
      />
    </AsyncData>
  );
}
