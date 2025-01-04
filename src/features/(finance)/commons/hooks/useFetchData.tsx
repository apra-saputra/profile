import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/features/commons/hooks/use-toast";

interface UseFetchDataProps<T> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  fetch: () => Promise<T>;
}

const useFetchData = (
  { data, setData, fetch }: UseFetchDataProps<any>,
  dependencies: Array<string | number | boolean> = []
) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  let isObject = false,
    isArray = false;
  if (typeof data === "object") isObject = true;

  if (Array.isArray(data)) isArray = true;

  useEffect(() => {
    if (user?.id && ((isArray && data.length) || (isObject && data))) {
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

      fetchData();
    }
  }, [isArray && data.length, user?.id, ...dependencies]);
  return { isLoading };
};

export default useFetchData;
