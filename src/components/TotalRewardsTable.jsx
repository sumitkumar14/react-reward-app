import React from 'react';
import PropTypes from 'prop-types';
import { summarizeRewards } from '../utils/rewardsUtils';
import DynamicTable from './DynamicTable';
import { Typography, Box } from '@mui/material';

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
