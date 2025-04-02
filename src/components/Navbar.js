import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ text, setText, isLogin, setIsLogin, isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  
  console.log("Navbar - isAdmin:", isAdmin);
  console.log("Navbar - isLogin:", isLogin);
  
  // Add fallback check for admin status in case props aren't passed correctly
  React.useEffect(() => {
    if (!isAdmin && isLogin) {
      try {
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const user = JSON.parse(userJson);
          console.log("Navbar - Checking localStorage for admin status:", user);
          if (user.isAdmin) {
            console.log("Navbar - Found admin user in localStorage, updating state");
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error checking admin status in Navbar:", error);
      }
    }
  }, [isLogin, isAdmin, setIsAdmin]);
  
  const handleInputChange = (e) => {
    setText(e.target.value);
  };
    
  const handleLogout = () => {
    // Remove the user from localStorage
    localStorage.removeItem("currentUser");
    setIsLogin(false);
    setIsAdmin(false); // Reset admin status
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
            onClick={() => navigate("/")}
          >
            Profile Explorer App
          </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={text}
              onChange={handleInputChange}
            />
          </Search>
          
          <Box sx={{ display: 'flex', ml: 2 }}>
            <div className='btn' onClick={() => navigate("/")}>Home</div>
            
            {isLogin ? (
              <>
                {isAdmin && (
                  <div className='btn' onClick={handleAdminClick}>Admin</div>
                )}
                <div className='btn' onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <div className='btn' onClick={() => navigate("/login")}>Login</div>
                <div className='btn' onClick={() => navigate("/signup")}>Sign Up</div>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}