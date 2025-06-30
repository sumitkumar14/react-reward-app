import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './api/transactionApi';

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

jest.mock('./api/transactionApi', () => ({
  getTransactions: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    api.getTransactions.mockResolvedValue(mockTransactions);
  });

  test('renders dashboard with all sections and tables', async () => {
    render(<App />);

    // Check loading content (optional)
    expect(screen.getByText('Customer Rewards Dashboard')).toBeInTheDocument();

    await waitFor(() => {
      // All three table titles
      expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
      expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
    });

    // Validate table rows exist
    expect(screen.getByText('C001')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('TXN001')).toBeInTheDocument();
    expect(screen.getByText('Speaker')).toBeInTheDocument();
  });

  test('calculates and displays correct reward points', async () => {
    render(<App />);
    await waitFor(() => {
      // 120 => 2*(20) + 50 = 90, 90 => 40
      expect(screen.getByText('90')).toBeInTheDocument(); // from Alice's purchase
      expect(screen.getByText('40')).toBeInTheDocument(); // from Bob's purchase
    });
  });
});
