
"use client"

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  Column,
  Table as TableType,
} from '@tanstack/react-table';
import { useState, useMemo, useCallback } from 'react';
import { Button, Input, Select } from '@assessment/ui';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  onBulkDelete?: (selectedIds: string[]) => void;
}

export function DataTable<TData extends { id: string | number }>({
  data,
  columns,
  isLoading,
  onBulkDelete,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
  });

  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map(row => row.original.id),
    [rowSelection, table]
  );

  const handleBulkDelete = useCallback(() => {
    if (onBulkDelete && selectedRows.length > 0) {
      onBulkDelete(selectedRows.map(String));
      table.resetRowSelection();
    }
  }, [onBulkDelete, selectedRows, table]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        
        {onBulkDelete && selectedRows.length > 0 && (
          <Button
            variant="danger"
            onClick={handleBulkDelete}
            className="ml-auto"
          >
            Delete Selected ({selectedRows.length})
          </Button>
        )}
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: `flex items-center ${
                            header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                          }`,
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${
                  row.getIsSelected() ? 'bg-blue-50' : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-sm text-gray-700">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            options={[
              { value: '10', label: 'Show 10' },
              { value: '20', label: 'Show 20' },
              { value: '30', label: 'Show 30' },
              { value: '40', label: 'Show 40' },
              { value: '50', label: 'Show 50' },
            ]}
          />
          
          <div className="text-sm text-gray-700">
            {table.getFilteredRowModel().rows.length} results
          </div>
        </div>
      </div>
    </div>
  );
}