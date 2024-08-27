import { CWLDetail } from "@/api/cwl";
import ClanCard from "@/components/infocards/ClanCard";
import CWLCard from "@/components/infocards/CWLCard";
import DamageTable from "@/components/tables/DamageTable";
import StarsTable from "@/components/tables/StarsTable";
import TownhallChart from "../../components/charts/TownhallChart";
import NationalityChart from "../../components/charts/NationalityChart";
import ClanStarsChart from "@/components/charts/ClanStarsChart";
import ClanDamageChart from "@/components/charts/ClanDamageChart";

interface CWLProfileProps {
  data: CWLDetail;
}

export default function CWLProfile({ data }: CWLProfileProps) {
  const { cwl, clan, statistics, rounds } = data;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full px-20 pb-10">
      <CWLCard cwl={cwl} />
      <ClanCard clan={clan} />
      <ClanStarsChart rounds={rounds} />
      <ClanDamageChart rounds={rounds} />
      <StarsTable stars={statistics.stars} />
      <DamageTable damage={statistics.damage} />
      <TownhallChart townhalls={statistics.townhalls} />
      <NationalityChart nationalities={statistics.nationalities} />
    </div>
  );
}
