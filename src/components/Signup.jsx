import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import './Login.css';  // Reusing the same styles as login

const Signup = ({ onRegister }) => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Call the registration function passed from App.js
    onRegister({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });
    
    // Navigate to login page
    navigation("/login");
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
        <h1>Sign Up</h1>
        <div>
          <TextField
            required
            id="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <br />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit">Register</button>
        </div>
      </Box>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Already have an account? <a href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Login</a></p>
      </div>
    </div>
  );
};

export default Signup; 