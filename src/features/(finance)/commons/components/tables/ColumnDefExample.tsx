import { convertISOFormat } from "../../utils/functions/convertISOFormat";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export type ExampleColumnDef = {
  id: number;
  title: string;
  isCorrect: boolean;
  status: "SUCCESS" | "PENDING" | "ERROR";
  createdAt: Date;
  error: Error | null;
};

export default [
  { accessorKey: "id", header: "id" },
  { accessorKey: "title", header: "TITLE" },
  { accessorKey: "isCorrect", header: "isCorrect" },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const [onHover, setOnHover] = useState(false);
      return (
        <div className="flex justify-center items-center gap-x-2">
          <span>Status</span>
          <ArrowUpDown
            className={`duration-300 ease-in-out rounded-md border p-1 ${onHover ? 'text-accent' : "text-slate-400"}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div
          className={`${
            data.status === "SUCCESS" ? "bg-green-400 dark:bg-green-700" : ""
          } px-2 py-1 rounded text-center`}
        >
          {data.status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => convertISOFormat(new Date(row.original.createdAt)),
  },
  {
    accessorKey: "error",
    header: "Error Sending",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="min-h-[8rem] min-w-[150px]">
          {data.error ? JSON.stringify(data.error) : null}
        </div>
      );
    },
  },
] as ColumnDef<ExampleColumnDef>[];
