/**
 * @component UserMonthlyRewardsTable
 * @description
 * Renders a summary table displaying the total reward points earned by each customer,
 * broken down by month and year. Each row represents a customer's aggregated rewards
 * for a given period.
 *
 * The component:
 * - Accepts a list of raw transaction data
 * - Uses `summarizeMonthlyRewards` utility to group and total reward points per customer per month
 * - Formats the data into a display-friendly table structure
 * - Displays the table using the reusable `DynamicTable` component
 *
 * @param {Object} props
 * @param {Array<Object>} props.transactions - Array of transaction objects. Each transaction should include:
 *   - {string} customerId - Unique ID of the customer
 *   - {string} customer - Customer's display name
 *   - {string} date - ISO string of the transaction date
 *   - {number} amount - Dollar value of the transaction
 *
 * @returns {JSX.Element} A section containing a heading and a dynamic table of monthly reward summaries
 */

import React from 'react';
import PropTypes from 'prop-types';
import { summarizeMonthlyRewards } from '../../utils/rewardsUtils';
import DynamicTable from '../DynamicTableComponent/DynamicTable';
import { Typography, Box } from '@mui/material';

function UserMonthlyRewardsTable({ transactions }) {
  const totalmonthlyRewardsData = summarizeMonthlyRewards(transactions).map((t) => ({
    'Customer ID': t.customerId,
    Name: t.name,
    Month: t.month,
    Year: t.year,
    'Reward Points': t.points,
  }));

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        📅 User Monthly Total Rewards
      </Typography>
      <DynamicTable
        columns={['Customer ID', 'Name', 'Month', 'Year', 'Reward Points']}
        data={totalmonthlyRewardsData}
      />
    </Box>
  );
}
UserMonthlyRewardsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default UserMonthlyRewardsTable;
