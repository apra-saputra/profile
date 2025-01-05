import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/commons/components/ui/table";
import { Button } from "@/features/commons/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/commons/components/ui/select";
import { cn } from "@/libs/utils";

export type PageInfo = {
  pageIndex: number;
  pageSize: number;
  count?: number;
  totalPage?: number;
};

interface DataWithId {
  id: number | string;
  [key: string]: any;
}

interface ServerDataTableProps<TData extends DataWithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pageInfo: PageInfo;
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo>>;
  selected?: number[];
  setSelected?: React.Dispatch<React.SetStateAction<number[]>>;
  className?: string;
  selectAll?: boolean;
}

function ServerDataTableComponent<TData extends DataWithId, TValue>({
  columns,
  data,
  pageInfo,
  setPageInfo,
  setSelected,
  selected,
  className,
  selectAll,
}: ServerDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPageInfo,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    state: {
      rowSelection,
      pagination: {
        pageIndex: pageInfo.pageIndex,
        pageSize: pageInfo.pageSize,
      },
    },
    pageCount: pageInfo.totalPage,
  });

  useEffect(() => {
    // console.log(Object.keys(rowSelection).length);
    if (Object.keys(rowSelection).length) {
      setSelected?.((prevSelected) => {
        const data = table
          .getSelectedRowModel()
          .rows.map((el) => el.original.id);

        // Menggabungkan data baru dengan yang sudah ada tanpa duplikasi
        const updatedSelected = [...prevSelected];
        data.forEach((item, index) => {
          if (!updatedSelected.some((selectedItem) => selectedItem === item)) {
            updatedSelected.push(index);
          }
        });

        return updatedSelected;
      });
    }
  }, [JSON.stringify(rowSelection), selectAll, selected?.length]);

  useEffect(() => {
    if (selectAll && selected?.length) {
      const transformedObject = selected?.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {} as { [key: number]: boolean }) as RowSelectionState;

      setRowSelection(transformedObject);
    }

    if (!selectAll && !selected?.length) {
      setRowSelection({});

      // setSelected?.([]);
    }
  }, [selectAll, selected?.length, Object.keys(rowSelection).length]);

  return (
    <div
      className={cn(
        `rounded-lg w-full border drop-shadow-lg bg-background overflow-hidden`,
        className
      )}
    >
      <Table className="overflow-x-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-secondary"
            >
              {headerGroup.headers.map((header) => {
                if (header.column.columnDef.enableHiding) {
                  return null;
                }
                return (
                  <TableHead
                    key={header.id}
                    className={`uppercase border text-foreground select-none ${
                      header.column.getCanSort()
                        ? "cursor-pointer"
                        : "cursor-none"
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="p-0 m-0"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-2 items-center text-wrap min-w-fit">
          <Select
            onValueChange={(value) =>
              setPageInfo((state) => {
                state.pageSize = Number(value);
                return { ...state };
              })
            }
            value={String(pageInfo.pageSize)}
          >
            <SelectTrigger className="bg-background w-16">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent className="w-8">
              <SelectItem value={`0`} disabled>
                LIMIT
              </SelectItem>
              <SelectItem value={`5`}>5</SelectItem>
              <SelectItem value={`10`}>10</SelectItem>
              <SelectItem value={`15`}>15</SelectItem>
              <SelectItem value={`20`}>20</SelectItem>
            </SelectContent>
          </Select>
          <span>total data: {pageInfo.count ?? 0}</span>|
          <span>
            current page:{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>{" "}
          </span>
          {!!setSelected && (
            <div className="flex gap-2 items-center">
              | <span>total select {selected?.length}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last Page
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ServerDataTable = React.memo(
  ServerDataTableComponent
) as typeof ServerDataTableComponent;
