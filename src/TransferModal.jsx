import React, { useState } from 'react';
import { Modal, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';


import Loader from './Loader'; // Import the Loader component

const TransferModal = ({ open, onClose, currentUser }) => {
  const [amount, setAmount] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false); // State to control loading spinner visibility

    const load = () => {
        setLoading(true);
        setTimeout(() => {
            handleTransfer()
        }, 4000);
        
    }


  const handleTransfer = () => {
    const senderBalance = currentUser.balance;

    if (amount <= 0 || isNaN(amount)) {
      toast.error('Invalid amount');
      return;
    }

    if (senderBalance < amount) {
      toast.error('Insufficient balance');
      return;
    }

    if (!receiverName || !cardNumber || !expiry || !cvv) {
      toast.error('Please fill in all the fields');
      return;
    }

    
    // Simulate credit card validation here if needed

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const receiver = users.find(user => user.username === receiverName);

    if (!receiver) {
      toast.error('Receiver account not found');
      setLoading(false); // Hide loading spinner if receiver not found
      return;
    }

    const updatedSenderBalance = senderBalance - amount;
    const updatedReceiverBalance = receiver.balance + parseInt(amount);

    // Update sender's balance
    const updatedUsers = users.map(user => {
      if (user.username === currentUser.username) {
        return { ...user, balance: updatedSenderBalance };
      }
      return user;
    });

    // Update receiver's balance
    const updatedReceiver = { ...receiver, balance: updatedReceiverBalance };
    const updatedUsersWithReceiver = updatedUsers.map(user => {
      if (user.username === receiver.username) {
        return updatedReceiver;
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsersWithReceiver));

    toast.success(`Amount $${amount} transferred to ${receiverName}`);
    setLoading(false); // Hide loading spinner after successful transfer
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '400px', height: 'max-content', backgroundColor: 'white', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="text" onClick={onClose}>Close</Button>
          </div>
          <Typography variant="h6" gutterBottom style={{fontFamily: 'poppins'}}>
            Transfer Money
          </Typography>
          <TextField
            style={{fontFamily: 'poppins'}}
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            style={{fontFamily: 'poppins'}}
            label="Receiver's Account Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
          <TextField
            style={{fontFamily: 'poppins'}}
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            type='date'
            style={{fontFamily: 'poppins'}}
            label="Expiry"
            variant="outlined"
            fullWidth
            margin="normal"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

          <TextField
            style={{fontFamily: 'poppins'}}
            label="CVV"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
              

          {
          loading ? <Loader /> : (
            <Button variant="contained" color="primary" onClick={()=> load()}>Transfer</Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransferModal;
