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

export default function Profile({ profile }) {
  const { statistics, performances } = profile;
  const {
    ID,
    username,
    name,
    role,
    joined,
    left,
    clan,
    clanlevel,
    clanID,
    townhall,
    main,
  } = profile;

  const filteredPerformances = (year) =>
    performances.filter((performance) => performance.year === parseInt(year));

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full p-20">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <User className="mr-4" />
                {username}
              </div>
            </CardTitle>
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
              Joined: {format(new Date(joined), "dd-MM-yyyy")}
            </div>
            <div className="flex items-center mb-4">
              <Power className="mr-2" />
              Status:{" "}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                  left
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
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
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <Castle className="mr-4" />
                {clan}
              </div>
            </CardTitle>
            <CardDescription>Clan Information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <CreditCard className="mr-2" />
              ID: {ID}
            </div>
            <div className="flex items-center mb-4">
              <TrendingUp className="mr-2" />
              Clan Level: {clanlevel}
            </div>
          </CardContent>
        </Card>
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
    </>
  );
}
