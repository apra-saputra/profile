import { FinanceLog } from "@/features/(finance)/commons/types/finance/financeLog";
import { convertISOFormat } from "@/features/(finance)/commons/utils/functions/convertISOFormat";
import { formatCurrency } from "@/features/(finance)/commons/utils/functions/formatCurrency";
import { ColumnDef } from "@tanstack/react-table";

export const ColumnFinanceReport: ColumnDef<FinanceLog>[] = [
  //   { header: "id", accessorKey: "id", enableHiding: true },
  {
    accessorKey: "createdAt",
    header: () => {
      return <div className="text-center w-[100px]">Tanggal</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-center w-[100px]">
          {convertISOFormat(data.createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Transaksi",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="min-w-[300px]">{data.name}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Nominal",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{formatCurrency(data.amount)}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: "Kategori",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-center px-2 py-1 border rounded-xl bg-accent-foreground text-background">
          {data.category.name}
        </div>
      );
    },
  },
  { accessorKey: "description", header: "Deskripsi" },
  { accessorKey: "typeTransaction.name", header: "Jenis Transaksi" },
];
