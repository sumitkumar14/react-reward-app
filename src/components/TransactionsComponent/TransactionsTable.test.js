import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsTable from './TransactionsTable';
import * as rewardsUtils from '../../utils/rewardsUtils';

// Mock calculatePoints to isolate logic
jest.mock('../../utils/rewardsUtils', () => ({
  calculatePoints: jest.fn(),
}));

const mockTransactions = [
  {
    id: 'TXN001',
    customer: 'Alice',
    date: '2025-04-05',
    amount: 120,
    product: 'Speaker',
  },
  {
    id: 'TXN002',
    customer: 'Bob',
    date: '2025-05-15',
    amount: 90,
    product: 'Keyboard',
  },
];

describe('TransactionsTable', () => {
  beforeEach(() => {
    rewardsUtils.calculatePoints.mockImplementation((amount) => {
      if (amount === 120) return 90;
      if (amount === 90) return 40;
      return 0;
    });
  });

  test('renders section title and table headers', () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(screen.getByText('🧾 Transactions')).toBeInTheDocument();
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

  test('renders all transaction rows with calculated reward points', () => {
    render(<TransactionsTable transactions={mockTransactions} />);

    // Row 1
    expect(screen.getByText('TXN001')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('4/5/2025')).toBeInTheDocument();
    expect(screen.getByText('Speaker')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    // Row 2
    expect(screen.getByText('TXN002')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('5/15/2025')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
    expect(screen.getByText('$90')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });
});
