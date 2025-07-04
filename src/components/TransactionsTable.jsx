import React from 'react';
import PropTypes from 'prop-types';
import { calculatePoints } from '../utils/rewardsUtils';
import DynamicTable from './DynamicTable';
import { Typography, Box } from '@mui/material';

function TransactionsTable({ transactions }) {
  const transactionsData = transactions.map((t) => ({
    'Transaction ID': t.id,
    'Customer Name': t.customer,
    'Purchase Date': new Date(t.date).toLocaleDateString(),
    Product: t.product,
    Price: `$${t.amount}`,
    'Reward Points': calculatePoints(t.amount),
  }));

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        🧾 Transactions
      </Typography>
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
    </Box>
  );
}
TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TransactionsTable;
