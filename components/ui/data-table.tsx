"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button, Input, sanitizeString } from "@mfe/cc-front-shared";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowBigLeft, ArrowBigRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchName?: string;
  multiSelect?: boolean;
  id?: string;
  enableArrowUpDownKeyboardNavigation?: boolean;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  initialColumnVisibility?: VisibilityState;
}

export const parseDate = (str: string): Date => {
  const [day, month, year] = str.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchName,
  multiSelect = false,
  id,
  enableArrowUpDownKeyboardNavigation = false,
  page = 1,
  pageSize = 5,
  totalPages = 1,
  onPageChange,
  initialColumnVisibility = {},
}: Readonly<DataTableProps<TData, TValue>>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<{}>({});
  const [filteredData] = useState<TData[]>(data);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
      pagination: {
        pageIndex: page - 1,
        pageSize: pageSize,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
    enableMultiRowSelection: multiSelect,
  });

  useEffect(() => {
    table.setPageIndex(page - 1);
  }, [page, table.setPageIndex]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowId: number,
    idName: string
  ) => {
    if (!enableArrowUpDownKeyboardNavigation) return;
    const moveUp = (
      rowId: number,
      idName: string,
      moveToHeaderSelect: boolean
    ) => {
      const aboveTargetId = idName.replace(`${rowId}`, `${rowId - 1}`);
      const aboveTarget = document.querySelector(`#${aboveTargetId}`)
        ?.firstChild as HTMLElement;
      if (moveToHeaderSelect) {
        const selectAllTargetId = aboveTargetId
          .replace("td", "th")
          .replace("-0", "");
        const selectAllTarget = document.querySelector(`#${selectAllTargetId}`)
          ?.firstChild as HTMLElement;
        return selectAllTarget?.focus();
      }
      return aboveTarget?.focus();
    };
    const moveDown = (
      rowId: number,
      idName: string,
      moveToRowList: boolean
    ) => {
      const belowTargetId = idName.replace(`${rowId}`, `${rowId + 1}`);
      const belowTarget = document.querySelector(`#${belowTargetId}`)
        ?.firstChild as HTMLElement;
      if (moveToRowList) {
        const selectRow = `td-consultar-${rowId + 1}-checkbox`;
        const selectAllTarget = document.querySelector(`#${selectRow}`)
          ?.firstChild as HTMLElement;
        return selectAllTarget?.focus();
      }
      return belowTarget?.focus();
    };
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (rowId - 1 === 0) return moveUp(rowId, idName, true);
      return moveUp(rowId, idName, false);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (rowId === 0) return moveDown(rowId, idName, true);
      return moveDown(rowId, idName, false);
    }
  };

  return (
    <div id={`div-${id}-dataTable`}>
      <div
        className="flex items-center py-4 px-6 gap-2"
        id={`div-${id}-topActions`}
      >
        {searchKey && searchName && (
          <Input
            placeholder={`Buscar por ${searchName}...`}
            value={String(table.getColumn(searchKey)?.getFilterValue() ?? "")}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            id={`input-${id}-search`}
          />
        )}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total de {filteredData.length} propostas encontradas
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Selecionar colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border" id={`div-${id}-searchInput`}>
        <Table id={`div-${id}-table`}>
          <TableHeader className="bg-soccLight border-t-2 border-socc border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onKeyDown={(e) => handleKeyDown(e, 0, e.currentTarget.id)}
                    className={`font-bold text-socc ${
                      header?.id === "select" ? "" : "border-r"
                    } h-8`}
                    id={`th-${id}-${sanitizeString(
                      header?.id === "select"
                        ? "checkbox"
                        : (header.column.columnDef.header as string)
                    )}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-soccLight ${
                    index % 2 === 0 ? "bg-white" : "bg-soccLight"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onKeyDown={(e) =>
                        handleKeyDown(e, index + 1, e.currentTarget.id)
                      }
                      id={`td-${id}-${index + 1}-${sanitizeString(
                        cell.column.columnDef.id === "select"
                          ? "checkbox"
                          : (cell.column.columnDef.header as string)
                      )}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(page - 1)}
          disabled={page <= 1}
          id={`btn-${id}-voltarPagina`}
        >
          <ArrowBigLeft />
        </Button>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Pág {page} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages}
          id={`btn-${id}-avancarPagina`}
        >
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
}
