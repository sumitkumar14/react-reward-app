import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardView from './DashboardView';
import * as api from '../api/transactionApi';
import * as utils from '../utils/rewardsUtils';

jest.mock('../api/transactionApi', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
}));

jest.mock('./UserMonthlyRewardsTable', () => (props) => (
  <div data-testid="UserMonthlyRewardsTable">{JSON.stringify(props.transactions)}</div>
));
jest.mock('./TotalRewardsTable', () => (props) => (
  <div data-testid="TotalRewardsTable">{JSON.stringify(props.transactions)}</div>
));
jest.mock('./TransactionsTable', () => (props) => (
  <div data-testid="TransactionsTable">{JSON.stringify(props.transactions)}</div>
));

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
  });

  test('displays loading state initially and renders dashboard on success', async () => {
    render(<DashboardView />);
    expect(screen.getByText(/Loading Dashboard data/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Customer Rewards Dashboard/i)).toBeInTheDocument();
    });

    // Validate child component props via test IDs
    const userTable = screen.getByTestId('UserMonthlyRewardsTable');
    const totalTable = screen.getByTestId('TotalRewardsTable');
    const txnTable = screen.getByTestId('TransactionsTable');

    expect(userTable.textContent).toContain('Alice');
    expect(totalTable.textContent).toContain('Bob');
    expect(txnTable.textContent).toContain('TXN001');
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
