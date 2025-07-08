import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../services/transactionApi';
import { sortTransactionsByDate } from '../../utils/rewardsUtils';
import logger from '../../utils/logger';
import { Box } from '@mui/material';
import HeaderBar from '../HeaderComponent/HeaderBar';
import UserMonthlyRewardsTable from '../UserMonthlyRewardsComponent/UserMonthlyRewardsTable';
import TotalRewardsTable from '../TotalRewardsComponent/TotalRewardsTable';
import TransactionsTable from '../TransactionsComponent/TransactionsTable';
import MonthlyRewardsUserTable from '../MonthlyRewardsUserComponent/MonthlyRewardsUserTable';
import DateRangeFilter from '../DateFilterComponent/DateRangeFilter';
import dayjs from 'dayjs';

function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTxns, setFilteredTxns] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    logger.info('[Dashboard] Fetching transactions...');
    getTransactions()
      .then((txns) => {
        logger.debug('[Dashboard] Raw transactions:', txns);
        const sortedtxn = sortTransactionsByDate(txns);
        logger.debug('[Dashboard] Sorted transactions:', sortedtxn);
        setTransactions(sortedtxn);
        setFilteredTxns(sortedtxn); // Show all by default
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

  const handleFilter = () => {
    if (!dateRange.start || !dateRange.end) {
      setFilteredTxns(transactions);
      return;
    }

    const filtered = transactions.filter((txn) => {
      const txnDate = dayjs(txn.date);
      return (
        txnDate.isAfter(dateRange.start.subtract(1, 'day')) &&
        txnDate.isBefore(dateRange.end.add(1, 'day'))
      );
    });

    setFilteredTxns(filtered);
  };
  const handleClear = () => {
    setDateRange({ start: null, end: null });
    setFilteredTxns(transactions); // reset to full data here
  };

  if (loading)
    return (
      <Box
        sx={{
          flexGrow: 1,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Loading Dashboard data...</h2>
      </Box>
    );

  if (error) return <h2 style={{ color: 'crimson' }}>{error}</h2>;

  return (
    <>
      <HeaderBar />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          onFilter={handleFilter}
          onClear={handleClear}
        />
      </Box>
      <Box m={2}>
        <MonthlyRewardsUserTable transactions={filteredTxns} />
        <UserMonthlyRewardsTable transactions={filteredTxns} />
        <TotalRewardsTable transactions={filteredTxns} />
        <TransactionsTable transactions={filteredTxns} />
      </Box>
    </>
  );
}

export default DashboardView;
