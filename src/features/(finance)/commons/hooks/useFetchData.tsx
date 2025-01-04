import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/features/commons/hooks/use-toast";

interface UseFetchDataProps<T> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  fetch: () => Promise<T>;
}

const useFetchData = (
  { setData, fetch }: UseFetchDataProps<any>,
  dependencies: Array<string | number | boolean> = []
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetch();
        setData(fetchedData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Opps! Something wrong...",
          description: String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) { // Tetap fetch jika user ada
      fetchData();
    }
  }, [user?.id, ...dependencies]);

  return { isLoading };
};

export default useFetchData;