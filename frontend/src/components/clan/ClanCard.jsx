import {
  User,
  Calendar,
  Home,
  Shield,
  Castle,
  Power,
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

import { colorLeague, formatLeague } from "@/lib/formatLeague";

import { useNavigate } from "react-router-dom";

export default function ClanCard({ clan }) {
  const { ID, name, level, location, language, cwl, longestWinStreak } = clan;

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
          <Button onClick={handleEditClick} variant="outline" className="ml-4">
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
    </Card>
  );
}
