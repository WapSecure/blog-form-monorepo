'use client'

import { DataTable } from '@assessment/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useUsers, useDeleteUsers, type User } from '@assessment/services';
import { useCallback } from 'react';

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    size: 40,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <img 
          src={row.original.image} 
          alt={`${row.original.firstName} ${row.original.lastName}`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>
          {row.original.firstName} {row.original.lastName}
        </span>
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    size: 150,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 80,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    size: 100,
    cell: ({ getValue }) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        getValue() === 'male' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-pink-100 text-pink-800'
      }`}>
        {String(getValue()).charAt(0).toUpperCase() + String(getValue()).slice(1)}
      </span>
    ),
  },
];

export default function DataTablePage() {
  const { data, isLoading } = useUsers();
  const { mutateAsync: deleteUsers } = useDeleteUsers();

  const handleBulkDelete = useCallback(async (selectedIds: string[]) => {
    await deleteUsers(selectedIds.map(Number));
  }, [deleteUsers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all users in the system
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DataTable 
          data={data || []} 
          columns={columns} 
          onBulkDelete={handleBulkDelete}
        />
      )}
    </div>
  );
}