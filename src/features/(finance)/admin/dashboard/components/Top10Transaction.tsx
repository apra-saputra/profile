import { fetchFinanceLog } from "@/features/(finance)/commons/services/financeLog";
import { FinanceLog } from "@/features/(finance)/commons/types/financeLog";
import { dummyFinances } from "@/features/(finance)/commons/utils/constants/dummyTransaction";
import { Card, CardContent } from "@/features/commons/components/ui/card";
import { useToast } from "@/features/commons/hooks/use-toast";
import { FC, useEffect, useState } from "react";

const Top10Transaction: FC = () => {
  const { toast } = useToast();
  // State untuk menyimpan data transaksi
  const [data, setData] = useState<FinanceLog[]>(dummyFinances); // Default menggunakan dummy data
  const [isLoading, setIsLoading] = useState(false); // Untuk indikasi loading

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
    <Card>
      <CardContent className="min-h-[400px] space-y-4 py-2">
        <h2 className="text-lg font-semibold">Top 10 Transactions</h2>

        {isLoading ? ( // Jika sedang loading, tampilkan indikator loading
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                    ID
                  </th>
                  <th className="p-2 text-left text-sm font-medium text-gray-600 border border-gray-300">
                    Created At
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
                      {transaction.id}
                    </td>
                    <td className="p-2 text-sm text-gray-800 border border-gray-300">
                      {JSON.stringify(new Date(transaction.createdAt))}
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
  );
};

export default Top10Transaction;
