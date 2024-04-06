import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>
      <List>
        {transactions.map((transaction, index) => (
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

export default TransactionHistory;
