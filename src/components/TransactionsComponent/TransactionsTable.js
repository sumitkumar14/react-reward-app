import React from 'react';
import PropTypes from 'prop-types';
import { calculatePoints } from '../../utils/rewardsUtils';
import DynamicTable from '../DynamicTableComponent/DynamicTable';
import { Typography, Box } from '@mui/material';

/**
 * @component TransactionsTable
 * @description
 * Displays a detailed table of customer purchase transactions along with calculated reward points.
 *
 * The component:
 * - Accepts a flat array of raw transaction records
 * - Maps each transaction into a display-friendly object with:
 *   - Transaction ID
 *   - Customer Name
 *   - Purchase Date (localized)
 *   - Product
 *   - Price (formatted as currency)
 *   - Reward Points (using `calculatePoints`)
 * - Renders a `DynamicTable` with labeled columns and formatted data
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - List of transactions, where each object includes:
 *   - {string} id - Transaction ID
 *   - {string} customer - Customer name
 *   - {string} date - Purchase date in ISO format
 *   - {string} product - Product purchased
 *   - {number} amount - Purchase amount in USD
 *
 * @returns {JSX.Element} A box containing a title and a table of individual transaction details
 */

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
