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

interface DamageTableProps {
  stars: CWLDetail["statistics"]["stars"];
}

export default function StarsTable({ stars }: DamageTableProps) {
  return (
    <Card className="shadow-lg rounded-3xl">
      <CardContent>
        <Table>
          <TableCaption>
            A list of statistics about stars for this CWL.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Username</TableHead>
              <TableHead className="text-center">Townhall</TableHead>
              <TableHead className="text-center">Attacks</TableHead>
              <TableHead className="text-center">Average Stars</TableHead>
              <TableHead className="text-center">Stars</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stars.map((s) => (
              <TableRow key={s.username}>
                <TableCell className="text-center">{s.username}</TableCell>
                <TableCell className="text-center">
                  <Badge color={colorTownhall(s.townhall)}>
                    TH {s.townhall}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{s.attacks}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    color={s.avgStars >= 2 ? "bg-green-500" : "bg-red-500"}
                  >
                    {s.avgStars}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{s.stars}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
