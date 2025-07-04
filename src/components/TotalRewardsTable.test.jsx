import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsTable from './TotalRewardsTable';
import * as rewardsUtils from '../utils/rewardsUtils';

// Mock the summarizeRewards function
jest.mock('../utils/rewardsUtils', () => ({
  summarizeRewards: jest.fn(),
}));

// Sample transaction data
const mockTransactions = [
  { customer: 'Alice', customerId: 'C001', amount: 120, date: '2025-04-10', product: 'Speaker' },
  { customer: 'Bob', customerId: 'C002', amount: 90, date: '2025-04-11', product: 'Keyboard' },
];

describe('TotalRewardsTable', () => {
  beforeEach(() => {
    rewardsUtils.summarizeRewards.mockReturnValue({
      Alice: { total: 90 },
      Bob: { total: 40 },
    });
  });

  test('renders the section title and reward summary table', () => {
    render(<TotalRewardsTable transactions={mockTransactions} />);

    expect(screen.getByText('🏆 Total Rewards')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

  test('renders summarized rewards for each customer', () => {
    render(<TotalRewardsTable transactions={mockTransactions} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });
});
