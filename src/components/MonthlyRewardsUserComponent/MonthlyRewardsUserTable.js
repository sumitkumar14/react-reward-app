import React from 'react';
import PropTypes from 'prop-types';
import { groupTransactionsBySortedMonthYear } from '../../utils/rewardsUtils';
import DynamicTable from '../DynamicTableComponent/DynamicTable';
import { Typography, Box } from '@mui/material';

/**
 * @component MonthlyRewardsUserTable
 * @description
 * Displays a collection of transaction reward tables grouped by month and year.
 * Each table shows detailed transaction data for a specific month, formatted with human-friendly column names.
 *
 * The component:
 * - Accepts raw transaction data as input
 * - Groups the data by "Month Year" using `groupTransactionsBySortedMonthYear`
 * - Transforms each transaction into display-friendly keys (e.g., "Customer ID")
 * - Renders a separate <DynamicTable /> for each grouped period
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - Array of customer transaction objects. Each transaction should include:
 *  - {string} customerId
 *  - {string} customerName
 *  - {string} transactionId
 *  - {number} amountSpent
 *  - {string} transactionDate (ISO string)
 *  - {number} transactionYear
 *  - {number} points
 *
 * @returns {JSX.Element} Grouped reward tables by month, each rendered with a title and a DynamicTable of transaction rows.
 */

function MonthlyRewardsUserTable({ transactions }) {
  const totalmonthlyRewardsData = groupTransactionsBySortedMonthYear(transactions);

  function mapGroupedRewardsToDisplayFormat(groupedData) {
    return Object.fromEntries(
      Object.entries(groupedData).map(([monthYear, transactions]) => {
        const transformed = transactions.map((txn) => ({
          'Customer ID': txn.customerId,
          'Customer Name': txn.customerName,
          'Transaction ID': txn.transactionId,
          'Amount Spent': `$${txn.amountSpent}`,
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
          <Typography align="center" variant="h6" gutterBottom>
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
