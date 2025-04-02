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
  IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let temp = {};
    temp.username = formData.username ? "" : "Username is required";
    temp.password = formData.password ? "" : "Password is required";
    
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      setTimeout(() => {
        try {
          // Get users from localStorage
          const users = JSON.parse(localStorage.getItem("users") || "[]");
          console.log("Available users:", users);
          
          const user = users.find(u => u.username === formData.username.trim());
          console.log("Found user:", user);
          
          if (user) {
            // In a real app, you would verify the password here
            // For demo purposes, we'll just log the user in
            const currentUser = {
              id: user.id || "user-" + Date.now(),
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin || false // Make sure isAdmin is set
            };
            
            console.log("Storing current user:", currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            
            // Show a message if admin
            if (currentUser.isAdmin) {
              setSnackbar({
                open: true,
                message: "Logged in with admin privileges!",
                severity: "success"
              });
            }
            
            setIsLoggedIn(true);
            navigate("/");
          } else {
            // For demo purposes, create and login a non-admin user if not found
            const demoUser = {
              id: "demo-" + Date.now(),
              username: formData.username.trim(),
              isAdmin: false // Demo users are not admins
            };
            
            console.log("Creating demo user:", demoUser);
            localStorage.setItem("currentUser", JSON.stringify(demoUser));
            setIsLoggedIn(true);
            navigate("/");
          }
        } catch (error) {
          console.error("Login error:", error);
          setSnackbar({
            open: true,
            message: "Login failed. Please try again.",
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
            Login
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your credentials to access your account
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                      <PersonIcon color="action" />
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Grid>
            
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link 
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
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

export default Login;
