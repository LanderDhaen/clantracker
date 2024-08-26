import {
  CreditCard,
  Flag,
  Calendar,
  ArrowUpDown,
  Users,
  Swords,
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
import { CWLDetail } from "@/api/cwl";
import { colorLeague, formatLeague } from "@/lib/formatLeague";
import { formatPlacementType } from "@/lib/formatPlacementTypes";
import { formatPlacement } from "@/lib/formatPlacement";

interface CWLCardProps {
  cwl: CWLDetail["cwl"];
}

export default function CWLCard({ cwl }: CWLCardProps) {
  const { ID, updatedAt, month, year, league, placement, placementType, size } =
    cwl;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/cwls/${ID}/edit`);
  };

  return (
    <Card className="shadow-lg rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex items-center">
              <Swords className="mr-4" />
              Clan War League
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
        <CardDescription>CWL Information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <CreditCard className="mr-2" />
          ID: {ID}
        </div>
        <div className="flex items-center mb-4">
          <Calendar className="mr-2" />
          Month: {format(new Date(year, month), "MMMM yyyy")}
        </div>
        <div className="flex items-center mb-4">
          <Swords className="mr-2" />
          Clan War League:{" "}
          <span
            className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${colorLeague(
              league
            )}`}
          >
            {formatLeague(league)}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <Flag className="mr-2" />
          Placement: {formatPlacement(placement)}
        </div>
        <div className="flex items-center mb-4">
          <ArrowUpDown className="mr-2" />
          Result: {formatPlacementType(placementType)}
        </div>
        <div className="flex items-center">
          <Users className="mr-2" />
          Size: {size}
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="text-gray-500 italic">
        Last Updated: {format(new Date(updatedAt), "dd/MM/yyyy HH:mm")}
      </CardFooter>
    </Card>
  );
}
