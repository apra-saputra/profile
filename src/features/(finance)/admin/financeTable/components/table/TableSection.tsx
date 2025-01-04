import ColumnDef, {
  ExampleColumnDef,
} from "@/features/(finance)/commons/components/tables/ColumnDefExample";
import {
  PageInfo,
  ServerDataTable,
} from "@/features/(finance)/commons/components/tables/ServerDataTable";
import { useMemo, useState } from "react";

const exampleData: ExampleColumnDef[] = [
  {
    id: 1,
    title: "First Entry",
    isCorrect: true,
    status: "SUCCESS",
    createdAt: new Date("2023-01-01"),
    error: null,
  },
  {
    id: 2,
    title: "Second Entry",
    isCorrect: false,
    status: "ERROR",
    createdAt: new Date("2023-02-01"),
    error: new Error("Error occurred"),
  },
  {
    id: 3,
    title: "Third Entry",
    isCorrect: true,
    status: "PENDING",
    createdAt: new Date("2023-03-01"),
    error: null,
  },
  {
    id: 4,
    title: "Fourth Entry",
    isCorrect: true,
    status: "SUCCESS",
    createdAt: new Date("2023-04-01"),
    error: null,
  },
  {
    id: 5,
    title: "Fifth Entry",
    isCorrect: false,
    status: "ERROR",
    createdAt: new Date("2023-05-01"),
    error: new Error("Validation failed"),
  },
  {
    id: 6,
    title: "Sixth Entry",
    isCorrect: true,
    status: "PENDING",
    createdAt: new Date("2023-06-01"),
    error: null,
  },
  {
    id: 7,
    title: "Seventh Entry",
    isCorrect: true,
    status: "SUCCESS",
    createdAt: new Date("2023-07-01"),
    error: null,
  },
  {
    id: 8,
    title: "Eighth Entry",
    isCorrect: false,
    status: "ERROR",
    createdAt: new Date("2023-08-01"),
    error: new Error("Network issue"),
  },
  {
    id: 9,
    title: "Ninth Entry",
    isCorrect: true,
    status: "PENDING",
    createdAt: new Date("2023-09-01"),
    error: null,
  },
  {
    id: 10,
    title: "Tenth Entry",
    isCorrect: true,
    status: "SUCCESS",
    createdAt: new Date("2023-10-01"),
    error: null,
  },
];

const TableSection = () => {
  const limit = 5;
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    pageIndex: 0,
    pageSize: limit,
    count: exampleData.length,
    totalPage: exampleData.length / limit,
  });

  const data = useMemo(() => {
    console.log(pageInfo);

    // Calculate the starting index based on the current page and page size (limit)
    const startIndex = pageInfo.pageIndex * pageInfo.pageSize;
    // Slice the exampleData array to get only the items for the current page
    return exampleData.slice(startIndex, startIndex + pageInfo.pageSize);
  }, [pageInfo.pageIndex, pageInfo.pageSize]);

  return (
    <ServerDataTable
      data={data}
      columns={ColumnDef}
      pageInfo={{
        ...pageInfo,
      }}
      setPageInfo={setPageInfo}
    />
  );
};

export default TableSection;
