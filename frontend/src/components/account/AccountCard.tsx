import {
  CreditCard,
  MapPin,
  Calendar,
  Home,
  Power,
  Shield,
  User,
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

import { useNavigate } from "react-router-dom";
import PrivateGuard from "../PrivateGuard";
import { Separator } from "../ui/Separator";
import { format } from "date-fns";
import { GetAccountDetailsByIDResponse } from "@backend-types/account";
import { formatRole, RoleValue } from "@/lib/formatRole";

interface AccountCardProps {
  account: GetAccountDetailsByIDResponse["account"];
}

export default function AccountCard({ account }: AccountCardProps) {
  const { ID, updatedAt, username, role, nationality, joined, left, townhall } =
    account;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/accounts/${ID}/edit`);
  };

  return (
    <Card className="shadow-lg rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex items-center">
              <User className="mr-4" />
              {username}
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
        <CardDescription>Account Information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <CreditCard className="mr-2" />
          ID: {ID}
        </div>
        <div className="flex items-center mb-4">
          <Shield className="mr-2" />
          Role: {formatRole(role as RoleValue)}
        </div>
        <div className="flex items-center mb-4">
          <Calendar className="mr-2" />
          Joined: {format(new Date(joined), "dd/MM/yyyy")}
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
      <Separator className="mb-4" />
      <CardFooter className="text-gray-500 italic">
        Last Updated: {format(new Date(updatedAt), "dd/MM/yyyy HH:mm")}
      </CardFooter>
    </Card>
  );
}
