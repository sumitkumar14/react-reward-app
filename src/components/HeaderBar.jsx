import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HeaderBar() {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" component="div" align="center">
            Customer Rewards Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
