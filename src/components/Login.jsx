import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogin, isLogin, onLogin, registeredUsers }) => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Find user in the registered users array
    const user = registeredUsers.find(
      u => u.username === formData.username && u.password === formData.password
    );
    
    if (user) {
      // Successful login
      onLogin(user);
      setIsLogin(!isLogin);
      navigation("/adminpanel");
    } else {
      // Failed login
      setError('Invalid username or password');
    }
  };

  return (
    <div className="wrapper">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Login</h1>
        <div>
          <TextField
            required
            id="username"
            label="User Name"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit">Submit</button>
        </div>
      </Box>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Don't have an account? <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
