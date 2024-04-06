import React from 'react';
import { CircularProgress, Typography } from '@mui/material';


const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <CircularProgress color="primary" />
    <Typography variant="body1" style={{ marginLeft: '10px' }}>processing your card ...</Typography>
  </div>
);

export default Loader;
