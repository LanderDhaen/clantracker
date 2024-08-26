import { CWLDetail } from "@/api/cwl";
import { Badge } from "../ui/Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { Card, CardContent } from "../ui/Card";
import { colorTownhall } from "@/lib/formatTownhall";
import { Medal } from "lucide-react";

interface DamageTableProps {
  damage: CWLDetail["statistics"]["damage"];
}

export default function DamageTable({ damage }: DamageTableProps) {
  return (
    <Card className="shadow-lg rounded-3xl">
      <CardContent>
        <Table>
          <TableCaption>
            A list of statistics about damage for this CWL.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-0" />
              <TableHead className="text-center">Username</TableHead>
              <TableHead className="text-center">Townhall</TableHead>
              <TableHead className="text-center">Attacks</TableHead>
              <TableHead className="text-center">Average Damage</TableHead>
              <TableHead className="text-center">Damage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {damage.map((d) => (
              <TableRow key={d.username}>
                <TableCell className="text-center px-0">
                  {d.bonus && <Medal size={12} />}
                </TableCell>
                <TableCell className="text-center">{d.username}</TableCell>
                <TableCell className="text-center">
                  <Badge color={colorTownhall(d.townhall)}>
                    TH {d.townhall}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{d.attacks}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    color={d.avgDamage >= 80 ? "bg-green-500" : "bg-red-500"}
                  >
                    {d.avgDamage}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{d.damage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
