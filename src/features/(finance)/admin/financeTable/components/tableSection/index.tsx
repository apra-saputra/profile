import {
  PageInfo,
  ServerDataTable,
} from "@/features/(finance)/commons/components/tables/ServerDataTable";
import { useAuth } from "@/features/(finance)/commons/contexts/AuthContext";
import useFetchData from "@/features/(finance)/commons/hooks/useFetchData";
import {
  countFinanceLog,
  fetchFinanceLog,
} from "@/features/(finance)/commons/services/financeLog";
import { FinanceLog } from "@/features/(finance)/commons/types/finance/financeLog";
import { useCallback, useState } from "react";
import { ColumnFinanceReport } from "./ColumnFinance";
import { DateRange } from "react-day-picker";
import FilterCollections from "./FilterCollections";
import { Card, CardContent } from "@/features/commons/components/ui/card";
import { Skeleton } from "@/features/commons/components/ui/skeleton";

const TableSection = () => {
  const { user } = useAuth();

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    pageIndex: 0,
    pageSize: 10,
    count: 0,
    totalPage: 0,
  });
  const [data, setData] = useState<FinanceLog[]>([]);

  // filter
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const pageInfoCallback = useCallback(async () => {
    if (!user?.id) return;
    try {
      const count = await countFinanceLog({
        userRef: user?.id || "",
        startDate: dateRangeFilter?.from,
        endDate: dateRangeFilter?.to,
      });
      setPageInfo((state) => ({
        ...state,
        count,
        totalPage: Math.ceil(count / state.pageSize),
      }));
    } catch (error) {
      console.log("error", error);
    }
  }, [user?.id, dateRangeFilter?.from, dateRangeFilter?.to]);

  const { isLoading } = useFetchData(
    {
      setData,
      data,
      fetch: async () => {
        
        await pageInfoCallback();
        return await fetchFinanceLog({
          userRef: user?.id || "",
          limit: pageInfo.pageSize,
          offset: pageInfo.pageIndex * pageInfo.pageSize,
          startDate: dateRangeFilter?.from,
          endDate: dateRangeFilter?.to,
          categoryRef: selectedCategory
        });
      },
    },
    [
      pageInfo.pageSize,
      pageInfo.pageIndex,
      dateRangeFilter?.from,
      dateRangeFilter?.to,
      selectedCategory,
    ]
  );

  return (
    <div className="space-y-4">
      {/* filter */}
      <FilterCollections
        setDate={setDateRangeFilter}
        date={dateRangeFilter}
        category={selectedCategory}
        setCategory={setSelectedCategory}
      />
      {isLoading && !data.length ? (
        <Skeleton className="w-full h-10"/>
      ) : data.length ? (
        <ServerDataTable
          data={data}
          columns={ColumnFinanceReport}
          pageInfo={{
            ...pageInfo,
          }}
          setPageInfo={setPageInfo}
        />
      ) : (
        <Card>
          <CardContent className="p-4">
            <h4>There is no data</h4>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TableSection;
