import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const AllTransactionHistory = ({ allTransactions }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        All Transaction History
      </Typography>
      <List>
        {allTransactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Amount: $${transaction.amount}`}
              secondary={`To: ${transaction.receiver} | Date: ${transaction.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AllTransactionHistory;
