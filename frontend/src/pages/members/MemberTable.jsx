import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
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

import { UserPlus } from "lucide-react";

import { ToastContainer } from "react-toastify";

import MemberFilters from "./MemberFilters";

export function MemberTable({ columns, data, clans, townhalls }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

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

  const handleRowClick = (id) => {
    navigate(`/members/${id}`);
  };

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="flex p-2 justify-between bg-gray-100">
        <MemberFilters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          clans={clans}
          townhalls={townhalls}
        />
        <div className="flex p-2 items-center">
          <Button
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
            onClick={() => navigate("/members/add")}
          >
            <UserPlus className="mr-2" />
            Create member
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
    </>
  );
}
