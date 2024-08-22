import ClanProfile from "./ClanProfile";

import { useParams } from "react-router-dom";

import AsyncData from "../../components/AsyncData";
import { getClanByID } from "@/api/clan";

export default function ClanProfilePage() {
  const { id } = useParams();

  const { data, isLoading, error } = getClanByID(id);

  return (
    <AsyncData loading={isLoading} error={error}>
      <ClanProfile data={data!} />
    </AsyncData>
  );
}
