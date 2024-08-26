import NationatityChart from "../../components/charts/NationalityChart";
import TownhallChart from "../../components/charts/TownhallChart";
import RoleChart from "../../components/charts/RoleChart";
import CWLChart from "../../components/charts/CWLChart";
import ClanCard from "@/components/infocards/ClanCard";
import { getClanByIDResponse } from "@backend-types/clan";

interface ClanProfileProps {
  data: getClanByIDResponse;
}

export default function ClanProfile({ data }: ClanProfileProps) {
  const { clan, statistics, leagues, nationalities, townhalls, roles } = data;

  const filteredLeagues = (year: number) =>
    leagues.filter((league) => league.year === year);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full sm:px-20 pb-10">
      <ClanCard clan={clan} />
      <TownhallChart townhalls={townhalls} />
      <NationatityChart nationalities={nationalities} />
      <RoleChart roles={roles} />
      {statistics.map((statistic) => (
        <CWLChart
          statistics={statistic}
          leagues={filteredLeagues(statistic.year)}
        />
      ))}
    </div>
  );
}
