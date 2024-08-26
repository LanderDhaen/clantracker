import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ListPlus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import NationalityFilterPopover from "../../components/filters/NationalityFilter";
import ClanFilterPopover from "../../components/filters/ClanFilter";
import TownhallFilterPopover from "../../components/filters/TownhallFilter";
import { GetAllAccountsResponse } from "@backend-types/account";
import { getAllClansResponse } from "@backend-types/clan";
import { getAllTownhallsResponse } from "@backend-types/townhall";
import PrivateGuard from "@/components/PrivateGuard";

interface AccountTableProps {
  columns: ColumnDef<GetAllAccountsResponse[number]>[];
  data: GetAllAccountsResponse;
  clans: getAllClansResponse;
  townhalls: getAllTownhallsResponse;
}

export function AccountTable({
  columns,
  data,
  clans,
  townhalls,
}: AccountTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/accounts/${id}`);
  };

  const handleStringChange = (key: string, value: string) => {
    table
      .getColumn(key)
      ?.setFilterValue((prevValue: string[] = []) =>
        prevValue.includes(value)
          ? prevValue.filter((v) => v !== value)
          : [...prevValue, value]
      );
  };

  const handleNumberChange = (key: string, value: number) => {
    table
      .getColumn(key)
      ?.setFilterValue((prevValue: number[] = []) =>
        prevValue.includes(value)
          ? prevValue.filter((v) => v !== value)
          : [...prevValue, value]
      );
  };

  return (
    <div className="mx-20 p-10 bg-white rounded-3xl shadow-lg">
      <div className="flex justify-between pb-2">
        <div className="flex space-x-4">
          <Input
            placeholder="Filter usernames..."
            value={table.getColumn("username")?.getFilterValue() as string | ""}
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filter names..."
            value={table.getColumn("name")?.getFilterValue() as string | ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <NationalityFilterPopover
            nationalities={["Belgian", "Dutch"]}
            filterNationalities={
              (table.getColumn("nationality")?.getFilterValue() as string[]) ||
              []
            }
            onSelectChange={handleStringChange}
          />
          <ClanFilterPopover
            clans={clans}
            filterClans={
              (table.getColumn("clanID")?.getFilterValue() as number[]) || []
            }
            onSelectChange={handleNumberChange}
          />
          <TownhallFilterPopover
            townhalls={townhalls}
            filterTownhalls={
              (table.getColumn("townhall")?.getFilterValue() as number[]) || []
            }
            onSelectChange={handleNumberChange}
          />
        </div>
        <PrivateGuard>
          <div className="flex items-center">
            <Button variant="outline" onClick={() => navigate("/accounts/add")}>
              <ListPlus className="mr-2" />
              Create member
            </Button>
          </div>
        </PrivateGuard>
      </div>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original.ID)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
