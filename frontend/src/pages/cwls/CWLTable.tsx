import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
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

import { CWL } from "@/api/cwl";
import { getAllClansResponse } from "@backend-types/clan";
import ClanFilterPopover from "../../components/filters/ClanFilter";
import PrivateGuard from "@/components/PrivateGuard";
import YearFilterPopover from "../../components/filters/YearFilter";

interface ClanTableProps {
  columns: ColumnDef<CWL>[];
  data: CWL[];
  clans: getAllClansResponse;
}

export function CWLTable({ columns, data, clans }: ClanTableProps) {
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
    navigate(`/cwls/${id}`);
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
          <YearFilterPopover
            years={[2023, 2024]}
            filterYears={
              (table.getColumn("year")?.getFilterValue() as number[]) || []
            }
            onSelectChange={handleNumberChange}
          />
          <ClanFilterPopover
            clans={clans}
            filterClans={
              (table.getColumn("clanID")?.getFilterValue() as number[]) || []
            }
            onSelectChange={handleNumberChange}
          />
        </div>
        <PrivateGuard>
          <div className="flex items-center">
            <Button variant="outline" onClick={() => navigate("/accounts/add")}>
              <ListPlus className="mr-2" />
              Create CWL
            </Button>
          </div>
        </PrivateGuard>
      </div>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
