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

export default function ClanProfile({ clan }) {
  const navigate = useNavigate();
  const {
    ID,
    name,
    level,
    location,
    language,
    cwl,
    statistics,
    leagues,
    nationalities,
    townhalls,
    roles,
  } = clan;

  const filteredLeagues = (year) =>
    leagues.filter((league) => league.year === parseInt(year));

  const handleEditClick = () => {
    navigate(`/members/${ID}/edit`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full sm:px-20 pb-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              <div className="flex items-center">
                <Castle className="mr-4" />
                {name}
              </div>
            </CardTitle>
            <Button
              onClick={handleEditClick}
              variant="outline"
              className="ml-4"
            >
              Edit
            </Button>
          </div>
          <CardDescription>Clan Information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <CreditCard className="mr-2" />
            ID: {ID}
          </div>
          <div className="flex items-center mb-4">
            <TrendingUp className="mr-2" />
            Level: {level}
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            Location: {location}
          </div>
          <div className="flex items-center mb-4">
            <Languages className="mr-2" />
            Language: {language}
          </div>
          <div className="flex items-center">
            <Crown className="mr-2" />
            Clan War League:{" "}
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${colorLeague(
                cwl
              )}`}
            >
              {formatLeague(cwl)}
            </span>
          </div>
        </CardContent>
      </Card>
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
