import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Link,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

function Signup({ isLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    isAdmin: false // Default to regular user (non-admin)
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid";
    temp.username = formData.username ? "" : "Username is required";
    temp.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    temp.confirmPassword = formData.confirmPassword === formData.password ? "" : "Passwords do not match";
    
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      setTimeout(() => {
        try {
          // Store user data in localStorage with isAdmin flag
          const newUser = {
            email: formData.email,
            username: formData.username,
            isAdmin: formData.isAdmin
          };
          
          console.log("Creating new user:", newUser);
          
          // Store in users array or create if it doesn't exist
          const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
          existingUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          
          console.log("Updated users list:", existingUsers);
          
          // Show success message
          setSnackbar({
            open: true,
            message: `Account created successfully! You can now login.${formData.isAdmin ? ' Admin access granted.' : ''}`,
            severity: "success"
          });
          
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } catch (error) {
          console.error("Error during signup:", error);
          setSnackbar({
            open: true,
            message: `Error: ${error.message}`,
            severity: "error"
          });
        }
        
        setLoading(false);
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create an account to manage profiles
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                error={!!errors.username}
                helperText={errors.username}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            {/* Admin checkbox - Only for development purposes */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    name="isAdmin"
                    color="primary"
                  />
                }
                label="Admin user (for testing purposes)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </Grid>
            
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link 
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Signup; 