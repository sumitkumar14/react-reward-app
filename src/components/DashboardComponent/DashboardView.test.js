import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardView from './DashboardView';
import * as api from '../../services/transactionApi';
import * as utils from '../../utils/rewardsUtils';

jest.mock('../../services/transactionApi', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../MonthlyRewardsUserComponent/MonthlyRewardsUserTable', () => {
  const PropTypes = require('prop-types');
  const Mock = ({ transactions }) => (
    <div data-testid="monthly">{JSON.stringify(transactions)}</div>
  );
  Mock.displayName = 'MockMonthlyRewardsUserTable';
  Mock.propTypes = {
    transactions: PropTypes.array.isRequired,
  };
  return Mock;
});

jest.mock('../UserMonthlyRewardsComponent/UserMonthlyRewardsTable', () => {
  const PropTypes = require('prop-types');
  const Mock = ({ transactions }) => (
    <div data-testid="UserMonthlyRewardsTable">{JSON.stringify(transactions)}</div>
  );
  Mock.displayName = 'MockUserMonthlyRewardsTable';
  Mock.propTypes = {
    transactions: PropTypes.array.isRequired,
  };
  return Mock;
});

jest.mock('../TotalRewardsComponent/TotalRewardsTable', () => {
  const PropTypes = require('prop-types');
  const Mock = ({ transactions }) => (
    <div data-testid="TotalRewardsTable">{JSON.stringify(transactions)}</div>
  );
  Mock.displayName = 'MockTotalRewardsTable';
  Mock.propTypes = {
    transactions: PropTypes.array.isRequired,
  };
  return Mock;
});
jest.mock('../TransactionsComponent/TransactionsTable', () => {
  const PropTypes = require('prop-types');
  const Mock = ({ transactions }) => (
    <div data-testid="TransactionsTable">{JSON.stringify(transactions)}</div>
  );
  Mock.displayName = 'MockTransactionsTable';
  Mock.propTypes = {
    transactions: PropTypes.array.isRequired,
  };
  return Mock;
});

const mockTransactions = [
  {
    id: 'TXN001',
    customerId: 'C001',
    customer: 'Alice',
    amount: 120,
    product: 'Bluetooth Speaker',
    date: '2025-04-05',
  },
  {
    id: 'TXN002',
    customerId: 'C002',
    customer: 'Bob',
    amount: 90,
    product: 'Keyboard',
    date: '2025-04-07',
  },
];

describe('DashboardView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.getTransactions.mockResolvedValue(mockTransactions);
    jest.spyOn(utils, 'sortTransactionsByDate').mockImplementation((txns) => txns);
    render(<DashboardView />);
  });

  test('filters transactions on Filter button click', async () => {
    const user = userEvent;

    // Wait for dashboard to finish loading
    await waitFor(() => {
      expect(screen.getByTestId('TransactionsTable')).toBeInTheDocument();
    });

    // Locate and update Start Date and End Date inputs
    const startInput = screen.getAllByLabelText(/Start Date/i)[1];
    const endInput = screen.getAllByLabelText(/End Date/i)[1];

    // Simulate user input (adjust format as needed based on MUI config)
    await user.clear(startInput);
    await user.type(startInput, '04/01/2025');
    await user.tab();

    await user.clear(endInput);
    await user.type(endInput, '04/06/2025');
    await user.tab();

    // Click Filter
    const filterBtn = screen.getByRole('button', { name: /Filter/i });
    await user.click(filterBtn);

    await waitFor(() => {
      const table = screen.getByTestId('TransactionsTable');
      // Only one transaction falls in this filtered range
      expect(table.textContent).toContain('TXN001');
    });
  });

  test('resets filters on Clear button click', async () => {
    const user = userEvent;

    await waitFor(() => {
      expect(screen.getByTestId('TransactionsTable')).toBeInTheDocument();
    });

    // Click Clear
    const clearBtn = screen.getByRole('button', { name: /Clear/i });
    await user.click(clearBtn);

    await waitFor(() => {
      const table = screen.getByTestId('TransactionsTable');
      expect(table.textContent).toContain('TXN001');
      expect(table.textContent).toContain('TXN002');
    });
  });

  test('displays error message if API fails', async () => {
    api.getTransactions.mockRejectedValueOnce(new Error('Network error'));
    render(<DashboardView />);
    expect(screen.getByText(/Loading Dashboard data/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load dashboard data/i)).toBeInTheDocument();
    });
  });
});
