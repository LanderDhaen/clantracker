import useSWR from "swr";
import { get } from "../../api";

import AsyncData from "@/components/AsyncData";

import { ClanTable } from "./ClanTable";
import { columns } from "./ClanColumns";

export default function MemberFormPage() {
  const {
    data,
    isLoading: clansLoading,
    error: clansError,
  } = useSWR(`/clans`, get);

  return (
    <>
      <AsyncData loading={clansLoading} error={clansError}>
        <ClanTable columns={columns} data={data} />
      </AsyncData>
    </>
  );
}
