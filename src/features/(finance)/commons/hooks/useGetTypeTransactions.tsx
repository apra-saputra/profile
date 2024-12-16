import { useState, useEffect } from "react";
import { TypeTransaction } from "../types/finance/financeLog";
import { fetchTypeTransaction } from "../services/typeTransaction";

export const useGetTypeTransactions = () => {
  const [typeTransaction, setTypeTransaction] = useState<TypeTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchTypeTransaction();
        setTypeTransaction(data);
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { typeTransaction, loading, error };
};
