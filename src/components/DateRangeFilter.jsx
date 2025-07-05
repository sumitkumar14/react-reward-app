import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/**
 * Renders a reusable date range filter using Material UI DatePickers.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.dateRange - { start: Date|null, end: Date|null }
 * @param {Function} props.setDateRange - callback to update the range
 */
function DateRangeFilter({ dateRange, setDateRange }) {
  const handleClear = () => setDateRange({ start: null, end: null });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filter By Date Range
        </Typography>
        <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={3} sx={{ mb: 1 }}>
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

          <Button
            onClick={handleClear}
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ height: 'fit-content', mt: 1 }}
          >
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
};

export default DateRangeFilter;
