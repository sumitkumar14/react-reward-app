import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactionApi';
import { sortTransactionsByDate } from '../utils/rewardsUtils';
import logger from '../utils/logger';
import { Box } from '@mui/material';
import HeaderBar from './HeaderBar';
import UserMonthlyRewardsTable from './UserMonthlyRewardsTable';
import TotalRewardsTable from './TotalRewardsTable';
import TransactionsTable from './TransactionsTable';

import DateRangeFilter from './DateRangeFilter';
import dayjs from 'dayjs';

function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const filteredTxns = transactions.filter((txn) => {
    if (!dateRange.start || !dateRange.end) return true;
    const txnDate = dayjs(txn.date);
    return (
      txnDate.isAfter(dateRange.start.subtract(1, 'day')) &&
      txnDate.isBefore(dateRange.end.add(1, 'day'))
    );
  });

  useEffect(() => {
    logger.info('[Dashboard] Fetching transactions...');
    getTransactions()
      .then((txns) => {
        logger.debug('[Dashboard] Raw transactions:', txns);
        const sortedtxn = sortTransactionsByDate(txns);
        logger.debug('[Dashboard] Sorted transactions:', sortedtxn);
        setTransactions(sortedtxn);
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

  if (loading) return <h2>Loading Dashboard data...</h2>;
  if (error) return <h2 style={{ color: 'crimson' }}>{error}</h2>;

  return (
    <>
      <HeaderBar />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      </Box>

      <UserMonthlyRewardsTable transactions={filteredTxns} />
      <TotalRewardsTable transactions={filteredTxns} />
      <TransactionsTable transactions={filteredTxns} />
    </>
  );
}

export default DashboardView;
