import React from 'react';
import PropTypes from 'prop-types';
import { summarizeMonthlyRewards } from '../utils/rewardsUtils';
import DynamicTable from './DynamicTable';
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
