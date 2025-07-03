import React, { useEffect, useState } from 'react';
import { getTransactions } from './api/transactionApi';
import DynamicTable from './components/DynamicTable';
import {
  summarizeRewards,
  summarizeMonthlyRewards,
  calculatePoints,
  sortTransactionsByDate,
} from './utils/rewardsUtils';

/**
 * Renders the customer rewards dashboard with three main sections:
 * - 📅 Monthly rewards per customer
 * - 🏆 Total cumulative rewards
 * - 🧾 Transaction history with reward calculation
 *
 * Fetches transaction data on mount, sorts and transforms it,
 * and passes it to `DynamicTable` components for display.
 *
 * @component
 */

function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rewards, setRewards] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);

  useEffect(() => {
    getTransactions()
      .then((txns) => {
        const sortedtxn = sortTransactionsByDate(txns);
        setTransactions(sortedtxn);
        setRewards(summarizeRewards(sortedtxn));
        setMonthlySummary(summarizeMonthlyRewards(sortedtxn));
      })
      .catch(() => {
        setError('Failed to load dashboard data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalmonthlyRewardsData = monthlySummary.map((t) => ({
    'Customer ID': t.customerId,
    Name: t.name,
    Month: t.month,
    Year: t.year,
    'Reward Points': t.points,
  }));

  const totalRewardsData = rewards
    ? Object.entries(rewards).map(([customer, info]) => ({
        Name: customer,
        'Reward Points': info.total,
      }))
    : [];

  const transactionsData = transactions.map((t) => ({
    'Transaction ID': t.id,
    'Customer Name': t.customer,
    'Purchase Date': new Date(t.date).toLocaleDateString(),
    Product: t.product,
    Price: `$${t.amount}`,
    'Reward Points': calculatePoints(t.amount),
  }));

  if (loading) return <h2>Loading Dashboard data...</h2>;
  if (error) return <h2 style={{ color: 'crimson' }}>{error}</h2>;

  return (
    <>
      <h1>Customer Rewards Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>📅 User Monthly Rewards</h2>
        <DynamicTable
          columns={['Customer ID', 'Name', 'Month', 'Year', 'Reward Points']}
          data={totalmonthlyRewardsData}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>🏆 Total Rewards</h2>
        <DynamicTable columns={['Name', 'Reward Points']} data={totalRewardsData} />
      </section>

      <section>
        <h2>🧾 Transactions</h2>
        <DynamicTable
          columns={[
            'Transaction ID',
            'Customer Name',
            'Purchase Date',
            'Product',
            'Price',
            'Reward Points',
          ]}
          data={transactionsData}
        />
      </section>
    </>
  );
}

export default DashboardView;
