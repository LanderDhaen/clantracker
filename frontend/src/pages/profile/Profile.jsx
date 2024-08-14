import { useNavigate } from "react-router-dom";
import DamageChart from "./DamageChart";
import StarsChart from "./StarsChart";

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
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { formatRole } from "@/lib/formatRole";
import { format } from "date-fns";

import { Button } from "@/components/ui/Button";
import ClanCard from "@/components/clan/ClanCard";

export default function Profile({ profile }) {
  const navigate = useNavigate();
  const { statistics, performances } = profile;
  const { account, clan } = profile;
  const { ID, username, role, joined, left, nationality, townhall } = account;

  const filteredPerformances = (year) =>
    performances.filter((performance) => performance.year === parseInt(year));

  const handleEditClick = () => {
    navigate(`/members/${ID}/edit`);
  };

  console.log(profile);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full px-20 pb-10">
      <Card className="shadow-lg rounded-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              <div className="flex items-center">
                <User className="mr-4" />
                {username}
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
          <CardDescription>Account Information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <CreditCard className="mr-2" />
            ID: {ID}
          </div>
          <div className="flex items-center mb-4">
            <Shield className="mr-2" />
            Role: {formatRole(role)}
          </div>
          <div className="flex items-center mb-4">
            <Calendar className="mr-2" />
            Joined: joined{" "}
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            Nationality: {nationality}
          </div>
          <div className="flex items-center mb-4">
            <Power className="mr-2" />
            Status:{" "}
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                left ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
            >
              {left ? "Left" : "Active"}
            </span>
          </div>
          <div className="flex items-center">
            <Home className="mr-2" />
            Townhall: {townhall}
          </div>
        </CardContent>
      </Card>
      <ClanCard clan={clan} />
      {statistics.map((statistic) => (
        <>
          <StarsChart
            statistics={statistic}
            performances={filteredPerformances(statistic.year)}
          />
          <DamageChart
            statistics={statistic}
            performances={filteredPerformances(statistic.year)}
          />
        </>
      ))}
    </div>
  );
}
