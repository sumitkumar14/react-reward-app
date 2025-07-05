import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMonthlyRewardsTable from './UserMonthlyRewardsTable';
import * as rewardsUtils from '../utils/rewardsUtils';

// Mock the utility function
jest.mock('../utils/rewardsUtils', () => ({
  summarizeMonthlyRewards: jest.fn(),
}));

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
    customerId: 'C001',
    customer: 'Alice',
    amount: 60,
    product: 'USB Hub',
    date: '2025-04-18',
  },
  {
    id: 'TXN003',
    customerId: 'C002',
    customer: 'Bob',
    amount: 75,
    product: 'Keyboard',
    date: '2025-04-07',
  },
];

describe('UserMonthlyRewardsTable', () => {
  beforeEach(() => {
    rewardsUtils.summarizeMonthlyRewards.mockReturnValue([
      { customerId: 'C001', name: 'Alice', month: 'April', year: 2025, points: 180 },
      { customerId: 'C002', name: 'Bob', month: 'May', year: 2025, points: 25 },
    ]);
  });

  test('renders section title and column headers', () => {
    render(<UserMonthlyRewardsTable transactions={mockTransactions} />);

    expect(screen.getByText(/User Monthly Total Rewards/i)).toBeInTheDocument();

    const headers = ['Customer ID', 'Name', 'Month', 'Year', 'Reward Points'];

    headers.forEach((col) => expect(screen.getByText(col)).toBeInTheDocument());
  });

  test('displays summarized monthly rewards for each user', () => {
    render(<UserMonthlyRewardsTable transactions={mockTransactions} />);

    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('April')).toBeInTheDocument();
    expect(screen.getAllByText('2025').length).toBeGreaterThan(0);
    expect(screen.getByText('180')).toBeInTheDocument();

    expect(screen.getByText('C002')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
