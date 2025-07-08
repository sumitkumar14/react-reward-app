/**
 * Renders a reusable date range filter using Material UI DatePickers.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.dateRange - { start: Date|null, end: Date|null }
 * @param {Function} props.setDateRange - callback to update the range
 * @param {Function} props.onFilter - callback to trigger filtering
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DateRangeFilter({ dateRange, setDateRange, onFilter, onClear }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filter By Date Range
        </Typography>

        <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={3}>
          {/* Start Date */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <DatePicker
              label="Start Date"
              value={dateRange.start}
              onChange={(newDate) => setDateRange((prev) => ({ ...prev, start: newDate }))}
              slotProps={{ textField: { size: 'small' } }}
            />
            <Typography variant="caption" color="text.secondary">
              From Date must be before To Date
            </Typography>
          </Box>

          {/* End Date */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <DatePicker
              label="End Date"
              value={dateRange.end}
              onChange={(newDate) => setDateRange((prev) => ({ ...prev, end: newDate }))}
              slotProps={{ textField: { size: 'small' } }}
            />
            <Typography variant="caption" color="text.secondary">
              To Date must be after From Date
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          gap={2}
          mt={2}
        >
          <Button onClick={onFilter} variant="contained" color="primary" size="small">
            Filter
          </Button>
          <Button onClick={onClear} variant="outlined" color="secondary" size="small">
            Clear
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

DateRangeFilter.propTypes = {
  dateRange: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default DateRangeFilter;
