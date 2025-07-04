import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactionApi';
import {
  summarizeRewards,
  summarizeMonthlyRewards,
  calculatePoints,
  sortTransactionsByDate,
} from '../utils/rewardsUtils';
import logger from '../utils/logger';
import SortablePaginatedTable from './SortablePaginatedTable';
import { Typography, Box } from '@mui/material';

/**
 * Renders the customer rewards dashboard with three main sections:
 * - 📅 Monthly rewards per customer
 * - 🏆 Total cumulative rewards
 * - 🧾 Transaction history with reward calculation
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
    logger.info('[Dashboard] Fetching transactions...');
    getTransactions()
      .then((txns) => {
        logger.debug('[Dashboard] Raw transactions:', txns);
        const sortedtxn = sortTransactionsByDate(txns);
        logger.debug('[Dashboard] Sorted transactions:', sortedtxn);

        const rewardsData = summarizeRewards(sortedtxn);
        const monthlyData = summarizeMonthlyRewards(sortedtxn);

        logger.debug('[Dashboard] Rewards Summary:', rewardsData);
        logger.debug('[Dashboard] Monthly Summary:', monthlyData);

        setTransactions(sortedtxn);
        setRewards(rewardsData);
        setMonthlySummary(monthlyData);
      })
      .catch((err) => {
        logger.error('[Dashboard] Failed to fetch transactions:', err);
        setError('Failed to load dashboard data. Please try again later.');
      })
      .finally(() => {
        logger.info('[Dashboard] Load complete');
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
    <Box padding="1rem">
      <Typography variant="h4" gutterBottom>
        Customer Rewards Dashboard
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          📅 User Monthly Rewards
        </Typography>
        <SortablePaginatedTable
          columns={['Customer ID', 'Name', 'Month', 'Year', 'Reward Points']}
          data={totalmonthlyRewardsData}
        />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          🏆 Total Rewards
        </Typography>
        <SortablePaginatedTable columns={['Name', 'Reward Points']} data={totalRewardsData} />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          🧾 Transactions
        </Typography>
        <SortablePaginatedTable
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
      </Box>
    </Box>
  );
}

export default DashboardView;
