import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {

  return (
    <Box component="footer" sx={{ backgroundColor: '#f5f5f5', padding: '24px', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
    </Box>
  );
};

export default Footer;
