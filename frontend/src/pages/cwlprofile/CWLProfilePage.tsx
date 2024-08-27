import { getCWLDetailsByID } from "@/api/cwl";

import { useParams } from "react-router-dom";
import AsyncData from "@/components/AsyncData";

import CWLProfile from "./CWLProfile";

export default function CWLProfilePage() {
  const { id } = useParams();

  const { data, isLoading, error } = getCWLDetailsByID(id);

  return (
    <AsyncData loading={isLoading} error={error}>
      <CWLProfile data={data!} />
    </AsyncData>
  );
}
