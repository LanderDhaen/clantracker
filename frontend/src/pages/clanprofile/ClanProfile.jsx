import { useNavigate } from "react-router-dom";

import {
  CreditCard,
  Crown,
  TrendingUp,
  MapPin,
  Languages,
  Castle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { colorLeague, formatLeague } from "@/lib/formatLeague";

import { Button } from "@/components/ui/Button";

import NationatityChart from "./NationalityChart";
import TownhallChart from "./TownhallChart";
import RoleChart from "./RoleChart";
import CWLChart from "./CWLChart";
import ClanCard from "@/components/clan/ClanCard";

export default function ClanProfile({ data }) {
  const { clan, statistics, leagues, nationalities, townhalls, roles } = data;

  const filteredLeagues = (year) =>
    leagues.filter((league) => league.year === parseInt(year));

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
