import React from 'react';
import PropTypes from 'prop-types';
import { summarizeRewards } from '../utils/rewardsUtils';
import DynamicTable from './DynamicTable';
import { Typography, Box } from '@mui/material';

/**
 * @component TotalRewardsTable
 * @description
 * Displays a summary table of total reward points earned by each customer.
 * 
 * The component:
 * - Receives an array of raw transaction objects
 * - Uses `summarizeRewards` to calculate total points per customer
 * - Transforms the reward summary into a display-friendly format
 * - Renders a `DynamicTable` with columns:
 *   - Customer ID
 *   - Name
 *   - Reward Points
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - List of transactions, where each object includes:
 *   - {string} customerId - Unique customer identifier
 *   - {string} customer - Customer name
 *   - {number} amount - Transaction amount
 *   - {string} date - Transaction ISO date string
 *
 * @returns {JSX.Element} A box containing a title and a summary table of total rewards
 */


function TotalRewardsTable({ transactions }) {
  const totalRewardsData = Object.entries(summarizeRewards(transactions)).map(
    ([customerID, info]) => ({
      'Customer ID': customerID,
      Name: info.name,
      'Reward Points': info.total,
    })
  );

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        🏆 Total Rewards
      </Typography>
      <DynamicTable columns={['Customer ID', 'Name', 'Reward Points']} data={totalRewardsData} />
    </Box>
  );
}
TotalRewardsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TotalRewardsTable;
