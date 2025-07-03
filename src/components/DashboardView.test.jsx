import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardView from './DashboardView';
import * as api from '../api/transactionApi';

// Mocked transaction data
const mockTransactions = [
  {
    id: 'TXN001',
    customerId: 'C001',
    customer: 'Alice',
    date: '2025-04-10',
    amount: 120,
    product: 'Speaker',
  },
  {
    id: 'TXN002',
    customerId: 'C002',
    customer: 'Bob',
    date: '2025-05-15',
    amount: 90,
    product: 'Keyboard',
  },
];

jest.mock('../api/transactionApi', () => ({
  getTransactions: jest.fn(),
}));

describe('DashboardView component', () => {
  beforeEach(() => {
    api.getTransactions.mockResolvedValue(mockTransactions);
  });

  test('renders dashboard with all sections and tables', async () => {
    render(<DashboardView />);

    // Check loading content (optional)
    expect(screen.getByText('Loading Dashboard data...')).toBeInTheDocument();

    await waitFor(() => {
      // All three table titles
      expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
      expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
    });

    // Validate table rows exist
    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
    expect(screen.getByText('TXN001')).toBeInTheDocument();
    expect(screen.getByText('Speaker')).toBeInTheDocument();
  });

  test('displays error message if data fails to load', async () => {
    api.getTransactions.mockRejectedValueOnce(new Error('Network error'));

    render(<DashboardView />);

    // Expect loading initially
    expect(screen.getByText('Loading Dashboard data...')).toBeInTheDocument();

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to load dashboard data/i)).toBeInTheDocument();
    });
  });

  test('calculates and displays correct reward points', async () => {
    render(<DashboardView />);
    await waitFor(() => {
      // 120 => 2*(20) + 50 = 90, 90 => 40
      expect(screen.getAllByText('90').length).toBeGreaterThan(0);
      expect(screen.getAllByText('40').length).toBeGreaterThan(0);
    });
  });
});
