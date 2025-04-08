import React from 'react';
import { Divider, Typography, Box } from '@mui/material';

const OrDivider = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '300px',
        margin: '0 auto',
        mt:2,
        mb:2,
      }}
    >
      <Divider sx={{ flexGrow: 1 }} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mx: 2,
          px: 1,
          fontWeight: 500,
        }}
      >
        OR
      </Typography>
      <Divider sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default OrDivider;
