import SearchAppBar from './components/Navbar';
import CardWrapper from './components/CardWrapper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPanel from './components/AdminPanel';
import CircularProgress from '@mui/joy/CircularProgress';
import { Alert, Snackbar } from '@mui/material';
import "./App.css";
import WorldMap from './components/WorldMap';
import Dialog from '@mui/material/Dialog';
import PublicIcon from '@mui/icons-material/Public';
import Button from '@mui/material/Button';

// Sample dummy profiles data with realistic information and profile pictures
const dummyProfiles = [
  {
    id: 1,
    firstName: "Emma",
    lastName: "Johnson",
    email: "emma.johnson@example.com",
    phone: "555-123-4567",
    age: 32,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1991-05-10",
    university: "Stanford University",
    company: { name: "Innovate Tech" },
    address: {
      city: "San Francisco",
      state: "California",
      coordinates: {
        lat: "37.7749",
        lng: "-122.4194"
      }
    }
  },
  {
    id: 2,
    firstName: "David",
    lastName: "Chen",
    email: "david.chen@example.com",
    phone: "555-987-6543",
    age: 28,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1995-09-15",
    university: "MIT",
    company: { name: "Future Solutions" },
    address: {
      city: "Boston",
      state: "Massachusetts",
      coordinates: {
        lat: "42.3601",
        lng: "-71.0589"
      }
    }
  },
  {
    id: 3,
    firstName: "Sofia",
    lastName: "Rodriguez",
    email: "sofia.r@example.com",
    phone: "555-456-7890",
    age: 35,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1988-12-03",
    university: "UCLA",
    company: { name: "Creative Designs" },
    address: {
      city: "Los Angeles",
      state: "California",
      coordinates: {
        lat: "34.0522",
        lng: "-118.2437"
      }
    }
  },
  {
    id: 4,
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@example.com",
    phone: "555-789-0123",
    age: 41,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1982-07-21",
    university: "University of Chicago",
    company: { name: "Financial Experts" },
    address: {
      city: "Chicago",
      state: "Illinois",
      coordinates: {
        lat: "41.8781",
        lng: "-87.6298"
      }
    }
  },
  {
    id: 5,
    firstName: "Mia",
    lastName: "Jackson",
    email: "mia.jackson@example.com",
    phone: "555-234-5678",
    age: 26,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1997-03-28",
    university: "NYU",
    company: { name: "Urban Planning Associates" },
    address: {
      city: "New York",
      state: "New York",
      coordinates: {
        lat: "40.7128",
        lng: "-74.0060"
      }
    }
  },
  {
    id: 6,
    firstName: "Lucas",
    lastName: "Martinez",
    email: "lucas.m@example.com",
    phone: "555-345-6789",
    age: 31,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1992-11-14",
    university: "University of Texas",
    company: { name: "Sustainable Energy Co." },
    address: {
      city: "Austin",
      state: "Texas",
      coordinates: {
        lat: "30.2672",
        lng: "-97.7431"
      }
    }
  },
  {
    id: 7,
    firstName: "Olivia",
    lastName: "Thompson",
    email: "olivia.t@example.com",
    phone: "555-567-8901",
    age: 29,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1994-08-07",
    university: "University of Washington",
    company: { name: "Northwest Medical Group" },
    address: {
      city: "Seattle",
      state: "Washington",
      coordinates: {
        lat: "47.6062",
        lng: "-122.3321"
      }
    }
  },
  {
    id: 8,
    firstName: "Ethan",
    lastName: "Brown",
    email: "ethan.brown@example.com",
    phone: "555-678-9012",
    age: 38,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1985-02-19",
    university: "University of Michigan",
    company: { name: "Great Lakes Engineering" },
    address: {
      city: "Detroit",
      state: "Michigan",
      coordinates: {
        lat: "42.3314",
        lng: "-83.0458"
      }
    }
  },
  {
    id: 9,
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    phone: "555-901-2345",
    age: 33,
    image: "https://images.unsplash.com/photo-1619085383593-b021707e140a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1990-01-12",
    university: "University of California, Berkeley",
    company: { name: "Data Insights Inc." },
    address: {
      city: "San Jose",
      state: "California",
      coordinates: {
        lat: "37.3382",
        lng: "-121.8863"
      }
    }
  },
  {
    id: 10,
    firstName: "Marcus",
    lastName: "Williams",
    email: "marcus.w@example.com",
    phone: "555-345-6780",
    age: 45,
    image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1978-06-25",
    university: "Howard University",
    company: { name: "Williams & Associates" },
    address: {
      city: "Atlanta",
      state: "Georgia",
      coordinates: {
        lat: "33.7490",
        lng: "-84.3880"
      }
    }
  },
  {
    id: 11,
    firstName: "Zoe",
    lastName: "Kim",
    email: "zoe.kim@example.com",
    phone: "555-123-7890",
    age: 27,
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1996-04-17",
    university: "Columbia University",
    company: { name: "Global Marketing Ltd." },
    address: {
      city: "Philadelphia",
      state: "Pennsylvania",
      coordinates: {
        lat: "39.9526",
        lng: "-75.1652"
      }
    }
  },
  {
    id: 12,
    firstName: "Jamal",
    lastName: "Thomas",
    email: "jamal.t@example.com",
    phone: "555-789-1234",
    age: 36,
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    birthDate: "1987-11-30",
    university: "University of Florida",
    company: { name: "Sunshine Tech Solutions" },
    address: {
      city: "Miami",
      state: "Florida",
      coordinates: {
        lat: "25.7617",
        lng: "-80.1918"
      }
    }
  }
];

function App() {
  const [text, setText] = useState("");
  const [oriData, setOriData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [showWorldMap, setShowWorldMap] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoad(true);
        
        // Use dummy profiles as the default data source
        setProfiles(dummyProfiles);
        setFilteredData(dummyProfiles);
        localStorage.setItem('profiles', JSON.stringify(dummyProfiles));
        
        setIsLoad(false);
        setNotification({
          open: true,
          message: 'Welcome to the demo profile explorer',
          severity: 'info'
        });
      } catch (error) {
        console.error('Error in initialization:', error);
        // Fallback to dummy profiles if everything else fails
        setProfiles(dummyProfiles);
        setFilteredData(dummyProfiles);
        setIsLoad(false);
        setNotification({
          open: true,
          message: 'Using demo data with random profile pictures',
          severity: 'info'
        });
      }
    };

    fetchData();

    // Load registered users from localStorage if available
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save registered users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);
  
  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
    
    // Filter profiles based on search text
    if (text.trim() === "") {
      setFilteredData(profiles); 
    } else {
      setFilteredData(
        profiles.filter(profile =>
          profile.firstName.toLowerCase().includes(text.toLowerCase()) ||
          profile.lastName.toLowerCase().includes(text.toLowerCase()) ||
          (profile.address?.city && profile.address.city.toLowerCase().includes(text.toLowerCase()))
        )
      );
    }
  }, [profiles, text]);

  // User registration handler
  const handleRegister = (userData) => {
    // Check if username already exists
    if (registeredUsers.some(user => user.username === userData.username)) {
      setNotification({
        open: true,
        message: 'Username already exists. Please choose another.',
        severity: 'error'
      });
      return false;
    }
    
    // Add new user to registeredUsers state
    setRegisteredUsers([...registeredUsers, userData]);
    setNotification({
      open: true,
      message: 'Registration successful! Please login with your credentials.',
      severity: 'success'
    });
    return true;
  };

  // User login handler
  const handleLogin = (user) => {
    setCurrentUser(user);
    setNotification({
      open: true,
      message: `Welcome, ${user.username}!`,
      severity: 'success'
    });
  };
  
  // Profile management handlers
  const handleAddProfile = (newProfile) => {
    setProfiles(prev => [...prev, newProfile]);
    setNotification({
      open: true,
      message: 'Profile added successfully!',
      severity: 'success'
    });
  };
  
  const handleUpdateProfile = (updatedProfile) => {
    setProfiles(prev => 
      prev.map(profile => 
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setNotification({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
  };
  
  const handleDeleteProfile = (id) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    setNotification({
      open: true,
      message: 'Profile deleted successfully!',
      severity: 'success'
    });
  };
  
  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Reset profiles to dummy data (for testing/demo purposes)
  const resetToDummyProfiles = () => {
    setProfiles(dummyProfiles);
    setFilteredData(dummyProfiles);
    localStorage.setItem('profiles', JSON.stringify(dummyProfiles));
    setNotification({
      open: true,
      message: 'Reset to demo profiles with random profile pictures',
      severity: 'success'
    });
  };

  // Toggle world map display
  const handleToggleWorldMap = () => {
    setShowWorldMap(!showWorldMap);
  };

  return (
    <div>
      <SearchAppBar text={text} setText={setText} isLogin={isLogin} setIsLogin={setIsLogin} />

      <Routes>
        <Route path="/login" element={
          <Login 
            setIsLogin={setIsLogin} 
            isLogin={isLogin} 
            onLogin={handleLogin} 
            registeredUsers={registeredUsers}
          />
        }/>
        <Route path="/signup" element={
          <Signup onRegister={handleRegister} />
        }/>
        <Route exact path="/" element={
          isLoad ? (
            <div className="loadbar"><CircularProgress size="lg"/></div>
          ) : (
            <>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '10px 20px',
                alignItems: 'center'
              }}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PublicIcon />}
                    onClick={handleToggleWorldMap}
                  >
                    View World Map
                  </Button>
                </div>
              </div>
              <CardWrapper filteredData={filteredData} />
              
              {/* World Map Dialog */}
              <Dialog
                open={showWorldMap}
                onClose={handleToggleWorldMap}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                  sx: { height: '90vh' }
                }}
              >
                <WorldMap 
                  profiles={profiles} 
                  onClose={handleToggleWorldMap} 
                />
              </Dialog>
            </>
          )
        } />
        <Route path="/adminpanel" element={
          <AdminPanel 
            profiles={profiles}
            onAddProfile={handleAddProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        } />
      </Routes>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
