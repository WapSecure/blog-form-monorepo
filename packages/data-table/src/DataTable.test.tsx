import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface TestData {
  id: number;
  name: string;
  email: string;
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const columns: ColumnDef<TestData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' }
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('handles row selection', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  it('calls onBulkDelete when delete button clicked', () => {
    const mockDelete = jest.fn();
    render(
      <DataTable 
        data={mockData} 
        columns={columns} 
        onBulkDelete={mockDelete} 
      />
    );
    
    // Select a row
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    
    // Click delete
    fireEvent.click(screen.getByText('Delete Selected (1)'));
    
    expect(mockDelete).toHaveBeenCalledWith(['1']);
  });
});