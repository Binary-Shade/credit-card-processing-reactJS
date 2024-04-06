import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransferModal from './TransferModal';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Load user's balance from local storage on initial render
    if (user) {
      const storedUser = JSON.parse(localStorage.getItem('users')).find(u => u.username === user.username);
      setUser({ ...user, balance: storedUser.balance });
    }
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleTransferClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderUserAvatar = () => {
    if (user) {
      // Get the first letter of the username and capitalize it
      const initial = user.username.charAt(0).toUpperCase();
      return <Avatar alt="User Avatar" src="/user-avatar.png">{initial}</Avatar>;
    }
    return <Avatar alt="User Avatar" src="/user-avatar.png" />;
  };

  return (
    <div style={{fontFamily: 'poppins'}}>
      <ToastContainer />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {renderUserAvatar()}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Indian Bank
          </Typography>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ marginRight: '10px' }}>
                Balance: 
              </Typography>
              <Typography variant="h6" component="div">
                $ {user.balance}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              <Button color="inherit" onClick={handleTransferClick}>Transfer</Button>
            </div>
          ) : (
            <Button color="inherit" onClick={handleTransferClick}>Login / Create Account</Button>
          )}
        </Toolbar>
      </AppBar>
      {user ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Welcome back, {user.username}!</h1>
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
      <TransferModal open={openModal} onClose={handleCloseModal} currentUser={user} />
    </div>
  );
}

export default App;
