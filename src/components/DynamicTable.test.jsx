import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicTable from './DynamicTable';

const columns = ['Name', 'Reward Points'];
const data = [
  { Name: 'Alice', 'Reward Points': 150 },
  { Name: 'Bob', 'Reward Points': 90 },
  { Name: 'Charlie', 'Reward Points': 200 },
  { Name: 'David', 'Reward Points': 50 },
  { Name: 'Eve', 'Reward Points': 180 },
  { Name: 'Frank', 'Reward Points': 75 },
];

describe('DynamicTable (paginated table)', () => {
  beforeEach(() => {
    render(<DynamicTable columns={columns} data={data} />);
  });

  test('renders headers and initial rows (paginated)', () => {
    columns.forEach((col) => expect(screen.getByText(col)).toBeInTheDocument());
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6); // 1 header + 5 data
  });

  test('navigates to next and previous page', () => {
    expect(screen.getByText('Alice')).toBeInTheDocument();

    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();

    const prevButton = screen.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('changes rows per page to 10 and displays all rows', async () => {
    const dropdown = screen.getByLabelText(/rows per page/i);
    userEvent.click(dropdown);
    const tenOption = await screen.findByRole('option', { name: '10' });
    userEvent.click(tenOption);

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(7); // 6 data + 1 header
  });
});
