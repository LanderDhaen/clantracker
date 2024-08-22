import {
  Castle,
  CreditCard,
  Crown,
  TrendingUp,
  MapPin,
  Languages,
  Flame,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";

import { colorLeague, formatLeague, LeagueValue } from "@/lib/formatLeague";

import { useNavigate } from "react-router-dom";
import PrivateGuard from "../PrivateGuard";
import { Separator } from "../ui/Separator";
import { format } from "date-fns";
import { getClanByIDResponse } from "@backend-types/clan";

interface ClanCardProps {
  clan: getClanByIDResponse["clan"];
}

export default function ClanCard({ clan }: ClanCardProps) {
  const {
    ID,
    updatedAt,
    name,
    abbreviation,
    level,
    location,
    language,
    cwl,
    longestWinStreak,
  } = clan;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/clans/${ID}/edit`);
  };

  return (
    <Card className="shadow-lg rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex items-center">
              <Castle className="mr-4" />
              {name}
            </div>
          </CardTitle>
          <PrivateGuard>
            <Button
              onClick={handleEditClick}
              variant="outline"
              className="ml-4"
            >
              Edit
            </Button>
          </PrivateGuard>
        </div>
        <CardDescription>Clan Information {abbreviation} </CardDescription>
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
        <div className="flex items-center mb-4">
          <Flame className="mr-2" />
          Longest Win Streak: {longestWinStreak}
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
      <Separator className="mb-4" />
      <CardFooter className="text-gray-500 italic">
        Last Updated: {format(new Date(updatedAt), "dd/MM/yyyy HH:mm")}
      </CardFooter>
    </Card>
  );
}
