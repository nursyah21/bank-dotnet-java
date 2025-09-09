"use client";

import { useMemo, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total_items: number;
  total_pages: number;
  rows_length: number;
  search_placeholder: string;
  filter_options?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total_items,
  total_pages,
  rows_length,
  search_placeholder,
  filter_options,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const term = event.currentTarget.value;
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }
  };

  const onFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("type", value);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`);
  };

  const onSortToggle = () => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get("sort");
    const newSort = currentSort === "asc" ? "desc" : "asc";
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? Number(pageParam) : 1;
  }, [searchParams]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `?${params.toString()}`;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const currentSort = searchParams.get("sort");

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            name="search"
            placeholder={search_placeholder}
            defaultValue={searchParams.get("search") || ""}
            onKeyDown={onSearch}
            className="h-8 w-[300px]"
          />
          <Button variant="outline" onClick={onSortToggle}>
            {currentSort === "desc" ? <SortDesc /> : <SortAsc />}
          </Button>
          {filter_options && (
            <Select
              value={searchParams.get("type") || filter_options[0]}
              onValueChange={onFilterChange}
            >
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder={filter_options[0]} />
              </SelectTrigger>
              <SelectContent side="top">
                {filter_options.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {rows_length} items from {total_items}.
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {total_pages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => router.push(createPageURL(currentPage - 1))}
            variant="outline"
            disabled={currentPage <= 1}
          >
            <ChevronsLeft />
          </Button>
          <Button
            onClick={() => router.push(createPageURL(currentPage + 1))}
            variant="outline"
            disabled={currentPage >= total_pages}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}