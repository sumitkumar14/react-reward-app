
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeFilter from './DateRangeFilter';
import dayjs from 'dayjs';

describe('DateRangeFilter', () => {
  const defaultDateRange = {
    start: dayjs('2025-04-01'),
    end: dayjs('2025-05-01'),
  };

  const setup = (props = {}) => {
    const mockSetDateRange = jest.fn();
    const mockOnFilter = jest.fn();
    const mockOnClear = jest.fn();

    render(
      <DateRangeFilter
        dateRange={defaultDateRange}
        setDateRange={mockSetDateRange}
        onFilter={mockOnFilter}
        onClear={mockOnClear}
        {...props}
      />
    );

    return {
      mockSetDateRange,
      mockOnFilter,
      mockOnClear,
    };
  };

  test('renders headings, date pickers, and buttons', () => {
    setup();
    expect(screen.getByText(/Filter By Date Range/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Start Date/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/End Date/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/From Date must be before To Date/i)).toBeInTheDocument();
    expect(screen.getByText(/To Date must be after From Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  });

  test('calls setDateRange when start date is changed', async () => {
    const { mockSetDateRange } = setup();
    const user = userEvent

    const input = screen.getAllByLabelText(/Start Date/i)[1]; // MUI renders label twice
    await user.clear(input);
    await user.type(input, '04/10/2025');
    await user.tab(); // blur to trigger

    expect(mockSetDateRange).toHaveBeenCalled();
  });

  test('calls setDateRange when end date is changed', async () => {
    const { mockSetDateRange } = setup();
    const user = userEvent;

    const input = screen.getAllByLabelText(/End Date/i)[1];
    await user.clear(input);
    await user.type(input, '05/15/2025');
    await user.tab();

    expect(mockSetDateRange).toHaveBeenCalled();
  });

  test('calls onFilter when Filter button is clicked', async () => {
    const { mockOnFilter } = setup();
    const user = userEvent;

    const filterBtn = screen.getByRole('button', { name: /Filter/i });
    await user.click(filterBtn);

    expect(mockOnFilter).toHaveBeenCalled();
  });

  test('calls onClear when Clear button is clicked', async () => {
    const { mockOnClear } = setup();
    const user = userEvent;

    const clearBtn = screen.getByRole('button', { name: /Clear/i });
    await user.click(clearBtn);

    expect(mockOnClear).toHaveBeenCalled();
  });
});
