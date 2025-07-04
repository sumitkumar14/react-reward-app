import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeFilter from './DateRangeFilter';

describe('DateRangeFilter (Vanilla HTML version)', () => {
  const mockSetDateRange = jest.fn();

  beforeEach(() => {
    mockSetDateRange.mockClear();
    render(
      <DateRangeFilter
        dateRange={{ start: '2025-04-01', end: '2025-05-01' }}
        setDateRange={mockSetDateRange}
      />
    );
  });

  it('renders start and end date inputs with correct initial values', () => {
    const startInput = screen.getByLabelText(/Start Date/i);
    const endInput = screen.getByLabelText(/End Date/i);

    expect(startInput).toBeInTheDocument();
    expect(startInput).toHaveValue('2025-04-01');
    expect(endInput).toBeInTheDocument();
    expect(endInput).toHaveValue('2025-05-01');
  });

  it('calls setDateRange when start date is changed', async () => {
    const user = userEvent.setup();
    const startInput = screen.getByLabelText(/Start Date/i);

    await user.clear(startInput);
    await user.type(startInput, '2025-04-15');

    expect(mockSetDateRange).toHaveBeenCalledWith(expect.objectContaining({ start: '2025-04-15' }));
  });

  it('calls setDateRange when end date is changed', async () => {
    const user = userEvent.setup();
    const endInput = screen.getByLabelText(/End Date/i);

    await user.clear(endInput);
    await user.type(endInput, '2025-05-20');

    expect(mockSetDateRange).toHaveBeenCalledWith(expect.objectContaining({ end: '2025-05-20' }));
  });

  it('clears both fields when Clear button is clicked', async () => {
    const user = userEvent.setup();
    const clearBtn = screen.getByRole('button', { name: /Clear/i });

    await user.click(clearBtn);

    expect(mockSetDateRange).toHaveBeenCalledWith({ start: '', end: '' });
  });
});
