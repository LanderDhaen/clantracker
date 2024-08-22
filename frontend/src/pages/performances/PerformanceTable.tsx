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

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/Input";

import TownhallFilterPopover from "@/components/townhall/TownhallFilter";
import { getAllTownhallsResponse } from "@backend-types/townhall";
import { GetAllPerformancesResponse } from "@backend-types/performance";

interface PerformanceTableProps {
  columns: ColumnDef<GetAllPerformancesResponse[number]>[];
  data: GetAllPerformancesResponse;
  townhalls: getAllTownhallsResponse;
}

export function PerformanceTable({
  columns,
  data,
  townhalls,
}: PerformanceTableProps) {
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
    <div className="mx-20 mb-20 p-10 bg-white rounded-3xl shadow-lg">
      <div className="flex pb-2 items-center">
        <div className="flex space-x-4">
          <Input
            placeholder="Filter usernames..."
            value={table.getColumn("account")?.getFilterValue() as string | ""}
            onChange={(event) =>
              table.getColumn("account")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <TownhallFilterPopover
            townhalls={townhalls}
            filterTownhalls={
              (table.getColumn("townhall")?.getFilterValue() as number[]) || []
            }
            onSelectChange={handleNumberChange}
          />
        </div>
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
