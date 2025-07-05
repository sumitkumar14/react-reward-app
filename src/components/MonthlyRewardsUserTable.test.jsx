import React from 'react';
import { render, screen, within } from '@testing-library/react';
import MonthlyRewardsUserTable from './MonthlyRewardsUserTable';
import * as rewardsUtils from '../utils/rewardsUtils';

jest.mock('./DynamicTable', () => (props) => {
  return (
    <div data-testid="dynamic-table">
      {props.columns.map((col) => (
        <div key={col}>{col}</div>
      ))}
      {props.data.map((row, idx) => (
        <div key={idx} data-testid="row">
          {Object.values(row).join(',')}
        </div>
      ))}
    </div>
  );
});

describe('MonthlyRewardsUserTable', () => {
  const sampleTransactions = [
    {
      id: 'TXN001',
      customerId: 'C001',
      customer: 'Alice',
      amount: 120,
      date: '2025-04-10',
    },
    {
      id: 'TXN002',
      customerId: 'C002',
      customer: 'Bob',
      amount: 80,
      date: '2025-04-12',
    },
    {
      id: 'TXN010',
      customerId: 'C003',
      customer: 'Charlie',
      amount: 65,
      date: '2025-05-01',
    },
  ];

  test('renders heading and one table per month group', () => {
    render(<MonthlyRewardsUserTable transactions={sampleTransactions} />);

    // Header
    expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();

    // Tables for April and May
    expect(screen.getByText('April 2025')).toBeInTheDocument();
    expect(screen.getByText('May 2025')).toBeInTheDocument();

    // Tables rendered
    const tables = screen.getAllByTestId('dynamic-table');
    expect(tables.length).toBe(2);

    // Check columns inside one table
    const firstTable = tables[0];
    expect(within(firstTable).getByText('Customer ID')).toBeInTheDocument();
    expect(within(firstTable).getByText('Points')).toBeInTheDocument();
  });
});
