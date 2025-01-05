import { FinanceLog } from "@/features/(finance)/commons/types/finance/financeLog";
import { formattedDateFirebase } from "@/features/(finance)/commons/utils/functions/formattedDateFirebase";
import { Button } from "@/features/commons/components/ui/button";
import { Card, CardContent } from "@/features/commons/components/ui/card";
import { FC, useState } from "react";
import DialogAddFinance from "../../../commons/components/DialogAddFinance";
import { useAuth } from "@/features/(finance)/commons/contexts/AuthContext";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";
import { formatCurrency } from "@/features/(finance)/commons/utils/functions/formatCurrency";
import { PlusCircle } from "lucide-react";
import { getThisMonth } from "@/features/(finance)/commons/utils/functions/getMonthList";
import { fetchTop10Logs } from "@/features/(finance)/commons/services/dashboard";

const Top10Transaction: FC = () => {
  const { user } = useAuth();
  // State untuk menyimpan data transaksi
  const [data, setData] = useState<FinanceLog[]>([]); // Default menggunakan dummy data
  const [isOpenAddDialog, SetIsOpenAddDialog] = useState(false);

  // Dijalankan saat komponen pertama kali di-render
  const { isLoading } = useFetchData(
    {
      data: data,
      setData: setData,
      fetch: async () => await fetchTop10Logs(user?.id || ""),
    },
    [isOpenAddDialog]
  );

  return (
    <>
      <Card className="w-full">
        <CardContent className="min-h-[400px] space-y-4 py-2 w-full overflow-x-auto">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">
              Top 10 Transactions - {getThisMonth()}
            </h2>
            <Button onClick={() => SetIsOpenAddDialog((state) => !state)}>
              <PlusCircle />
              Tambah Pengeluaran
            </Button>
          </div>

          {isLoading ? (
            <p>Loading..</p>
          ) : !data.length ? ( // Jika sedang loading, tampilkan indikator loading
            <p>data is</p>
          ) : (
            <div className="overflow-hidden w-full">
              <table className="min-w-full table-fixed border-collapse border border-gray-100 dark:border-gray-900">
                <thead className="bg-primary dark:bg-secondary">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      ID
                    </th>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      Date
                    </th>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      Name
                    </th>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      Amount
                    </th>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      Category
                    </th>
                    <th className="p-2 text-left text-sm font-medium border border-gray-100 dark:border-gray-900">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-background"
                          : "bg-gray-50 dark:bg-slate-800"
                      }`}
                    >
                      <td className="p-2 text-sm ">{++index}</td>
                      <td className="p-2 text-sm ">
                        {formattedDateFirebase(transaction.createdAt)}
                      </td>
                      <td className="p-2 text-sm ">{transaction.name}</td>
                      <td className="p-2 text-sm ">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="p-2 text-sm ">
                        {transaction.category.name}
                      </td>
                      <td className="p-2 text-sm ">
                        {transaction.typeTransaction.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <DialogAddFinance
        isOpen={isOpenAddDialog}
        setIsOpen={SetIsOpenAddDialog}
      />
    </>
  );
};

export default Top10Transaction;
