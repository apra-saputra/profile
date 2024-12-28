import { fetchFinanceLog } from "@/features/(finance)/commons/services/financeLog";
import { FinanceLog } from "@/features/(finance)/commons/types/finance/financeLog";
import { dummyFinances } from "@/features/(finance)/commons/utils/constants/dummyTransaction";
import { formattedDateFirebase } from "@/features/(finance)/commons/utils/functions/formattedDateFirebase";
import { Button } from "@/features/commons/components/ui/button";
import { Card, CardContent } from "@/features/commons/components/ui/card";
import { useToast } from "@/features/commons/hooks/use-toast";
import { FC, useEffect, useState } from "react";
import DialogAddFinance from "./DialogAddFinance";

const Top10Transaction: FC = () => {
  const { toast } = useToast();
  // State untuk menyimpan data transaksi
  const [data, setData] = useState<FinanceLog[]>(dummyFinances); // Default menggunakan dummy data
  const [isLoading, setIsLoading] = useState(false); // Untuk indikasi loading
  const [isOpenAddDialog, SetIsOpenAddDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchFinanceLog(10);
        setData(fetchedData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Opps! Something wrong...",
          description: String(error),
        });
      } finally {
        setIsLoading(false); // Akhiri loading
      }
    };

    fetchData();
  }, []); // Dijalankan saat komponen pertama kali di-render

  return (
    <>
      <Card className="w-full">
        <CardContent className="min-h-[400px] space-y-4 py-2 w-full overflow-x-auto">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">Top 10 Transactions</h2>
            <Button onClick={() => SetIsOpenAddDialog((state) => !state)}>
              plus
            </Button>
          </div>

          {isLoading ? ( // Jika sedang loading, tampilkan indikator loading
            <p>Loading...</p>
          ) : (
            <div className="overflow-hidden w-full">
              <table className="min-w-full table-fixed border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      ID
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      Date
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      Name
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      Amount
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      Category
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
                        {++index}
                      </td>
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
                        {formattedDateFirebase(transaction.createdAt)}
                      </td>
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
                        {transaction.name}
                      </td>
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
                        {transaction.amount}
                      </td>
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
                        {transaction.category.name}
                      </td>
                      <td className="p-2 text-sm text-gray-800 border border-gray-300">
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
