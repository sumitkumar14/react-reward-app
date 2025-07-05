import React from 'react';
import PropTypes from 'prop-types';
import { groupTransactionsBySortedMonthYear } from '../utils/rewardsUtils';
import DynamicTable from './DynamicTable';
import { Typography, Box } from '@mui/material';

function MonthlyRewardsUserTable({ transactions }) {
  const totalmonthlyRewardsData = groupTransactionsBySortedMonthYear(transactions);

  function mapGroupedRewardsToDisplayFormat(groupedData) {
    return Object.fromEntries(
      Object.entries(groupedData).map(([monthYear, transactions]) => {
        const transformed = transactions.map((txn) => ({
          'Customer ID': txn.customerId,
          'Customer Name': txn.customerName,
          'Transaction ID': txn.transactionId,
          'Amount Spent': txn.amountSpent,
          'Transaction Date': txn.transactionDate,
          'Transaction Year': txn.transactionYear,
          Points: txn.points,
        }));
        return [monthYear, transformed];
      })
    );
  }

  const displayData = mapGroupedRewardsToDisplayFormat(totalmonthlyRewardsData);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        📅 User Monthly Rewards
      </Typography>
      {Object.entries(displayData).map(([monthYear, data]) => (
        <Box sx={{ my: 4 }} key={monthYear}>
          <Typography align="center" variant="h6" gutterBottom color="primary">
            {monthYear}
          </Typography>
          <DynamicTable
            columns={[
              'Customer ID',
              'Customer Name',
              'Transaction ID',
              'Amount Spent',
              'Transaction Date',
              'Transaction Year',
              'Points',
            ]}
            data={data}
          />
        </Box>
      ))}
    </Box>
  );
}
MonthlyRewardsUserTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MonthlyRewardsUserTable;
