import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortablePaginatedTable from './SortablePaginatedTable';

const columns = ['Name', 'Reward Points'];
const data = [
  { Name: 'Alice', 'Reward Points': 150 },
  { Name: 'Bob', 'Reward Points': 90 },
  { Name: 'Charlie', 'Reward Points': 200 },
  { Name: 'David', 'Reward Points': 50 },
  { Name: 'Eve', 'Reward Points': 180 },
  { Name: 'Frank', 'Reward Points': 75 },
];

describe('SortablePaginatedTable', () => {
  test('renders headers and rows (paginated)', () => {
    render(<SortablePaginatedTable columns={columns} data={data} />);
    columns.forEach((col) => expect(screen.getByText(col)).toBeInTheDocument());

    // 5 rows per page
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6); // 1 header + 5 data
  });
  
  test('navigates to next page and back', () => {
    render(<SortablePaginatedTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();

    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    // Alice shouldn't appear on page 2
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();

    const prevButton = screen.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('changes rows per page to 10', async () => {
    render(<SortablePaginatedTable columns={columns} data={data} />);
    const dropdown = screen.getByLabelText(/rows per page/i);
    userEvent.click(dropdown);

    const tenOption = await screen.findByRole('option', { name: '10' });
    userEvent.click(tenOption);

    // Wait for rows to update
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(7); // 6 data rows + 1 header
  });
});
