import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Dialog, IconButton } from "@mui/material";
import CardWrapper from "./components/CardWrapper";
import Detail from "./components/Detail";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WorldMap from "./components/WorldMap";
import PublicIcon from '@mui/icons-material/Public';

const sampleProfiles = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    company: { name: "Tech Solutions Inc." },
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipcode: "94105",
      coordinates: { lat: "37.7749", lng: "-122.4194" }
    },
    bio: "Software developer with 5 years of experience in web technologies. Passionate about creating intuitive and responsive user interfaces using modern JavaScript frameworks. Advocating for clean code principles and test-driven development.",
    tags: ["JavaScript", "React", "Node.js"],
    website: "johndoe.dev",
    education: "Master's in Computer Science, Stanford University",
    languages: ["English", "Spanish"],
    skills: ["Full-stack Development", "UI/UX Design", "DevOps"],
    hobbies: ["Photography", "Hiking", "Playing guitar"]
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    company: { name: "Design Masters" },
    address: {
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipcode: "10022",
      coordinates: { lat: "40.7128", lng: "-74.0060" }
    },
    bio: "UI/UX designer passionate about creating beautiful and functional interfaces. With a background in psychology, I focus on user-centered design principles to craft experiences that are both intuitive and delightful. I've worked with startups and large corporations to reimagine their digital products.",
    tags: ["UI/UX", "Figma", "Adobe XD"],
    website: "janesmith.design",
    education: "Bachelor's in Graphic Design, RISD",
    languages: ["English", "French"],
    skills: ["User Research", "Visual Design", "Prototyping", "Design Systems"],
    hobbies: ["Painting", "Urban Sketching", "Yoga"]
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 234-5678",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    company: { name: "Data Analytics Pro" },
    address: {
      street: "789 Oak St",
      city: "Chicago",
      state: "IL",
      zipcode: "60601",
      coordinates: { lat: "41.8781", lng: "-87.6298" }
    },
    bio: "Data scientist specializing in machine learning and predictive analytics. I help companies make sense of their data and extract actionable insights that drive business decisions. My expertise includes statistical analysis, data visualization, and developing machine learning models.",
    tags: ["Python", "Machine Learning", "Data Science"],
    website: "robertjohnson.ai",
    education: "PhD in Statistics, University of Chicago",
    languages: ["English", "German"],
    skills: ["Statistical Analysis", "Natural Language Processing", "Big Data Technologies", "Neural Networks"],
    hobbies: ["Chess", "Playing piano", "Astronomy"]
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Wilson",
    email: "emily.wilson@example.com",
    phone: "+1 (555) 876-5432",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    company: { name: "Marketing Wizards" },
    address: {
      street: "101 Pine St",
      city: "Seattle",
      state: "WA",
      zipcode: "98101",
      coordinates: { lat: "47.6062", lng: "-122.3321" }
    },
    bio: "Digital marketing specialist with expertise in SEO and content strategy. I help brands find their voice and connect with their audience through compelling storytelling and data-driven marketing campaigns. My approach combines creativity with analytics to maximize ROI.",
    tags: ["SEO", "Content Marketing", "Social Media"],
    website: "emilywilson.marketing",
    education: "Bachelor's in Marketing, University of Washington",
    languages: ["English", "Mandarin"],
    skills: ["Campaign Management", "Analytics", "Social Media Strategy", "Email Marketing"],
    hobbies: ["Travel photography", "Cooking", "Mountain biking"]
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    company: { name: "Financial Experts LLC" },
    address: {
      street: "202 Maple Ave",
      city: "Boston",
      state: "MA",
      zipcode: "02108",
      coordinates: { lat: "42.3601", lng: "-71.0589" }
    },
    bio: "Financial analyst with a background in investment banking and portfolio management. I provide strategic financial advice to help individuals and organizations achieve their financial goals. My specialty is in risk assessment and developing sustainable investment strategies.",
    tags: ["Finance", "Investment", "Analysis"],
    website: "michaelbrown.finance",
    education: "MBA in Finance, Harvard Business School",
    languages: ["English", "Japanese"],
    skills: ["Financial Modeling", "Portfolio Management", "Risk Assessment", "Market Analysis"],
    hobbies: ["Golf", "Wine tasting", "Reading economic literature"]
  },
  {
    id: 6,
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    phone: "+1 (555) 765-4321",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    company: { name: "Health Innovations" },
    address: {
      street: "303 Cedar St",
      city: "Denver",
      state: "CO",
      zipcode: "80202",
      coordinates: { lat: "39.7392", lng: "-104.9903" }
    },
    bio: "Healthcare consultant focusing on improving patient care and operational efficiency. With over a decade of experience in healthcare administration, I've helped numerous hospitals and clinics implement best practices and innovative solutions that enhance patient outcomes while reducing costs.",
    tags: ["Healthcare", "Consulting", "Patient Care"],
    website: "sarahdavis.health",
    education: "Master's in Healthcare Administration, Johns Hopkins University",
    languages: ["English", "Italian"],
    skills: ["Healthcare Management", "Process Optimization", "Patient Experience Design", "Regulatory Compliance"],
    hobbies: ["Hiking in the Rockies", "Volunteering at local clinics", "Gardening"]
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 456-7890",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    company: { name: "Engineering Solutions" },
    address: {
      street: "404 Elm St",
      city: "Austin",
      state: "TX",
      zipcode: "78701",
      coordinates: { lat: "30.2672", lng: "-97.7431" }
    },
    bio: "Mechanical engineer specializing in sustainable energy systems and green technology. My work focuses on designing energy-efficient mechanical systems that reduce environmental impact while maintaining high performance. I've worked on projects ranging from residential buildings to large-scale industrial facilities.",
    tags: ["Mechanical Engineering", "Sustainable Energy", "Green Tech"],
    website: "davidmiller.engineering",
    education: "PhD in Mechanical Engineering, MIT",
    languages: ["English", "Portuguese"],
    skills: ["Renewable Energy Systems", "Thermodynamics", "CAD Design", "Project Management"],
    hobbies: ["Building small robots", "Woodworking", "Environmental activism"]
  },
  {
    id: 8,
    firstName: "Lisa",
    lastName: "Taylor",
    email: "lisa.taylor@example.com",
    phone: "+1 (555) 654-3210",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    company: { name: "Creative Content Co." },
    address: {
      street: "505 Birch Rd",
      city: "Los Angeles",
      state: "CA",
      zipcode: "90001",
      coordinates: { lat: "34.0522", lng: "-118.2437" }
    },
    bio: "Content creator and storyteller with experience in video production and social media. I help brands tell their stories through compelling multimedia content that resonates with their target audience. My background in film and journalism gives me a unique perspective on digital storytelling.",
    tags: ["Content Creation", "Video Production", "Social Media"],
    website: "lisataylor.media",
    education: "Bachelor's in Film Production, USC",
    languages: ["English", "Korean"],
    skills: ["Videography", "Editing", "Storytelling", "Brand Narrative Development"],
    hobbies: ["Documentary filmmaking", "Surfing", "Visiting art galleries"]
  },
  {
    id: 9,
    firstName: "Jason",
    lastName: "Thomas",
    email: "jason.thomas@example.com",
    phone: "+1 (555) 567-8901",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    company: { name: "Security Systems Inc." },
    address: {
      street: "606 Spruce Ave",
      city: "Philadelphia",
      state: "PA",
      zipcode: "19102",
      coordinates: { lat: "39.9526", lng: "-75.1652" }
    },
    bio: "Cybersecurity expert with a focus on network security and threat prevention. I help organizations protect their sensitive data and systems from evolving cyber threats. My approach combines proactive security measures with rapid incident response capabilities to ensure robust protection.",
    tags: ["Cybersecurity", "Network Security", "Threat Analysis"],
    website: "jasonthomas.security",
    education: "Master's in Computer Security, Carnegie Mellon University",
    languages: ["English", "Russian"],
    skills: ["Penetration Testing", "Security Architecture", "Incident Response", "Security Auditing"],
    hobbies: ["Participating in CTF competitions", "Lock picking", "Rock climbing"]
  },
  {
    id: 10,
    firstName: "Amanda",
    lastName: "Martin",
    email: "amanda.martin@example.com",
    phone: "+1 (555) 432-1098",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    company: { name: "HR Excellence" },
    address: {
      street: "707 Willow Dr",
      city: "Miami",
      state: "FL",
      zipcode: "33101",
      coordinates: { lat: "25.7617", lng: "-80.1918" }
    },
    bio: "Human resources professional specializing in talent acquisition and employee development. I'm passionate about creating inclusive workplaces where employees can thrive. My expertise includes implementing effective recruitment strategies, designing employee development programs, and fostering positive company cultures.",
    tags: ["HR", "Talent Acquisition", "Employee Development"],
    website: "amandamartin.hr",
    education: "Bachelor's in Human Resources Management, University of Florida",
    languages: ["English", "Spanish", "Portuguese"],
    skills: ["Recruitment", "Employee Relations", "Training & Development", "Diversity & Inclusion"],
    hobbies: ["Beach volleyball", "Salsa dancing", "Volunteering for career development workshops"]
  }
];

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showWorldMap, setShowWorldMap] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        setIsLoggedIn(true);
      }
    };
    
    checkAuth();
    loadProfiles();
  }, []);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const loadProfiles = () => {
    setLoadingProfiles(true);
    const savedProfiles = localStorage.getItem("profiles");
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
      setLoadingProfiles(false);
    } else {
      setTimeout(() => {
        setProfiles(sampleProfiles);
        localStorage.setItem("profiles", JSON.stringify(sampleProfiles));
        setLoadingProfiles(false);
      }, 1000);
    }
  };

  const resetToDefaultProfiles = () => {
    if (window.confirm("Are you sure you want to reset to demo profiles? This will delete all custom profiles.")) {
      localStorage.setItem("profiles", JSON.stringify(sampleProfiles));
      setProfiles(sampleProfiles);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  const handleToggleWorldMap = () => {
    setShowWorldMap(!showWorldMap);
  };

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === "light" ? "#1976d2" : "#90caf9"
      },
      background: {
        default: theme === "light" ? "#f5f5f5" : "#121212",
        paper: theme === "light" ? "#ffffff" : "#1e1e1e"
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar 
          text={searchText}
          setText={setSearchText}
          isLogin={isLoggedIn}
          setIsLogin={setIsLoggedIn}
        />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            px: { xs: 2, sm: 4 }, 
            pt: { xs: 2, sm: 3 },
            pb: 4,
            mt: 8
          }}
        >
          <Box sx={{ 
            display: "flex", 
            justifyContent: "flex-end", 
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2
          }}>
            {isLoggedIn && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PublicIcon />}
                onClick={handleToggleWorldMap}
              >
                View World Map
              </Button>
            )}
          </Box>
          
          <Routes>
            <Route 
              path="/" 
              element={
                <CardWrapper 
                  profiles={profiles.filter(profile => 
                    searchText === "" || 
                    `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
                    profile.email?.toLowerCase().includes(searchText.toLowerCase()) ||
                    profile.company?.name?.toLowerCase().includes(searchText.toLowerCase())
                  )} 
                  loadingProfiles={loadingProfiles}
                />
              } 
            />
            <Route 
              path="/profile/:id" 
              element={<Detail profiles={profiles} />} 
            />
            <Route 
              path="/admin" 
              element={
                isLoggedIn ? (
                  <AdminPanel 
                    profiles={profiles} 
                    setProfiles={(newProfiles) => {
                      setProfiles(newProfiles);
                      localStorage.setItem("profiles", JSON.stringify(newProfiles));
                    }} 
                    resetToDefaultProfiles={resetToDefaultProfiles}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/login" 
              element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
            />
            <Route 
              path="/signup" 
              element={<Signup isLoggedIn={isLoggedIn} />} 
            />
          </Routes>
        </Box>
        
        <Dialog 
          open={showWorldMap} 
          onClose={handleToggleWorldMap}
          fullWidth
          maxWidth="lg"
          PaperProps={{
            sx: { 
              height: '90vh',
              maxHeight: '90vh'
            }
          }}
        >
          <WorldMap profiles={profiles} onClose={handleToggleWorldMap} />
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default App;
