import useSWR from "swr";
import { get } from "../../api";

import ClanProfile from "./ClanProfile";

import { useParams } from "react-router-dom";

import AsyncData from "../../components/AsyncData";

export default function ClanProfilePage() {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(`/clans/${id}`, get);

  return (
    <>
      <AsyncData loading={isLoading} error={error}>
        <ClanProfile clan={data} />
      </AsyncData>
    </>
  );
}
