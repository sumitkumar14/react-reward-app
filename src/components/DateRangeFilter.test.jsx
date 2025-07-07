import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeFilter from './DateRangeFilter';
import dayjs from 'dayjs';

describe('DateRangeFilter', () => {
  const mockSetDateRange = jest.fn();
  const defaultDateRange = {
    start: dayjs('2025-04-01'),
    end: dayjs('2025-05-01'),
  };

  beforeEach(() => {
    mockSetDateRange.mockClear();
    render(<DateRangeFilter dateRange={defaultDateRange} setDateRange={mockSetDateRange} />);
  });

  test('renders heading and both date pickers', () => {
    expect(screen.getByText(/Filter By Date Range/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Start Date/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/End Date/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/From Date must be before To Date/i)).toBeInTheDocument();
    expect(screen.getByText(/To Date must be after From Date/i)).toBeInTheDocument();
  });

  test('calls setDateRange when Start Date changes', async () => {
    const user = userEvent;
    const input = screen.getAllByLabelText(/Start Date/i)[1];
    await user.clear(input);
    await user.type(input, '04/15/2025');
    await user.tab(); // trigger blur event
    expect(mockSetDateRange).toHaveBeenCalled();
  });

  test('calls setDateRange when End Date changes', async () => {
    const user = userEvent;
    const input = screen.getAllByLabelText(/End Date/i)[1];
    await user.clear(input);
    await user.type(input, '05/15/2025');
    await user.tab();
    expect(mockSetDateRange).toHaveBeenCalled();
  });

  test('clears both dates when Clear button is clicked', async () => {
    const user = userEvent;
    const clearBtn = screen.getByRole('button', { name: /Clear/i });
    await user.click(clearBtn);
    expect(mockSetDateRange).toHaveBeenCalledWith({ start: null, end: null });
  });
});
