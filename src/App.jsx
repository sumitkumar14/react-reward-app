import React, { useEffect, useState } from 'react';
import { getTransactions } from './api/transactionApi';
import DynamicTable from './components/DynamicTable';
import {
  summarizeRewards,
  summarizeMonthlyRewards,
  calculatePoints,
} from './utils/calculateRewards';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rewards, setRewards] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);

  useEffect(() => {
    getTransactions()
      .then((txns) => {
        setTransactions(txns);
        setRewards(summarizeRewards(txns));
        setMonthlySummary(summarizeMonthlyRewards(txns));
      })
      .catch(() => {
        setError('Failed to load dashboard data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Transform total monthly rewards for table
  const totalmonthlyRewardsData = monthlySummary
    ? monthlySummary.map((t) => ({
        'Customer ID': t.customerId,
        Name: t.name,
        Month: t.month,
        Year: t.year,
        'Reward Points': t.points,
      }))
    : [];

  // Transform total rewards object into array
  const totalRewardsData = rewards
    ? Object.entries(rewards).map(([customer, info]) => ({
        Name: customer,
        'Reward Points': info.total,
      }))
    : [];

  // Transform transactions with points for display
  const transactionsData = transactions.map((t) => ({
    'Transaction ID': t.id,
    'Customer Name': t.customer,
    'Purchase Date': new Date(t.date).toLocaleDateString(),
    Product: t.product,
    Price: t.amount.toFixed(2),
    'Reward Points': calculatePoints(t.amount),
  }));

  return (
    <div style={{ padding: '1rem' }}>
      {loading ? (
        <h2>Loading Dashboard data...</h2>
      ) : error ? (
        <h2 style={{ color: 'crimson' }}>{error}</h2>
      ) : (
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
      )}
    </div>
  );
}

export default App;
