import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleCreateAccount = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      alert('Username already exists');
    } else {
      const newUser = { username, password, balance: 1000 }; // Initialize balance to a default value
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin(user);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'poppins' }}>
      <div style={{ width: '400px' }}>
        {isNewUser ? (
          <>
            <h1>Create Account</h1>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleCreateAccount}>Create Account</Button>
            <p style={{ marginTop: '20px' }}>
              Already have an account?{' '}
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsNewUser(false)}>
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            <p style={{ marginTop: '20px' }}>
              Don't have an account?{' '}
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsNewUser(true)}>
                Create Account
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
