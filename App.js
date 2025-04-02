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
  },
  {
    id: 11,
    firstName: "Carlos",
    lastName: "Rodriguez",
    email: "carlos.rodriguez@example.com",
    phone: "+1 (555) 321-7654",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    company: { name: "Culinary Creations" },
    address: {
      street: "808 Cherry Lane",
      city: "San Antonio",
      state: "TX",
      zipcode: "78205",
      coordinates: { lat: "29.4241", lng: "-98.4936" }
    },
    bio: "Professional chef with expertise in international cuisine and sustainable cooking practices. I blend traditional techniques with modern innovations to create memorable dining experiences. My passion lies in sourcing local ingredients and creating dishes that tell a story of culture and place.",
    tags: ["Culinary Arts", "Sustainable Cooking", "Farm-to-Table"],
    website: "carlosrodriguez.chef",
    education: "Culinary Institute of America, New York",
    languages: ["English", "Spanish", "French"],
    skills: ["Menu Development", "Food Styling", "Culinary Education", "Sustainable Practices"],
    hobbies: ["Foraging for local ingredients", "Gardening", "Food photography"]
  },
  {
    id: 12,
    firstName: "Olivia",
    lastName: "Chen",
    email: "olivia.chen@example.com",
    phone: "+1 (555) 789-0123",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    company: { name: "Global Education Partners" },
    address: {
      street: "909 Maple Court",
      city: "Portland",
      state: "OR",
      zipcode: "97201",
      coordinates: { lat: "45.5051", lng: "-122.6750" }
    },
    bio: "Education consultant specializing in international curriculum development and teacher training. I work with schools worldwide to implement innovative teaching methodologies that prepare students for a global future. My approach combines research-backed strategies with practical classroom applications.",
    tags: ["Education", "Curriculum Development", "Teacher Training"],
    website: "oliviachen.education",
    education: "PhD in Education, University of Oregon",
    languages: ["English", "Mandarin", "Cantonese"],
    skills: ["Curriculum Design", "Educational Technology", "Cross-cultural Communication", "Workshop Facilitation"],
    hobbies: ["Visiting international schools", "Learning new languages", "Hiking the Pacific Northwest"]
  },
  {
    id: 13,
    firstName: "Marcus",
    lastName: "Jackson",
    email: "marcus.jackson@example.com",
    phone: "+1 (555) 654-7890",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    company: { name: "Urban Architecture Group" },
    address: {
      street: "101 Walnut Street",
      city: "Atlanta",
      state: "GA",
      zipcode: "30303",
      coordinates: { lat: "33.7488", lng: "-84.3877" }
    },
    bio: "Architect focused on sustainable urban development and community-centered design. I believe in creating spaces that foster connection while respecting environmental constraints. My projects range from affordable housing solutions to public spaces that celebrate local culture and history.",
    tags: ["Architecture", "Urban Planning", "Sustainable Design"],
    website: "marcusjackson.architecture",
    education: "Master's in Architecture, Georgia Tech",
    languages: ["English", "French"],
    skills: ["Architectural Design", "3D Modeling", "Sustainable Building Practices", "Community Engagement"],
    hobbies: ["Urban sketching", "Visiting architectural landmarks", "Community garden volunteering"]
  },
  {
    id: 14,
    firstName: "Elena",
    lastName: "Petrov",
    email: "elena.petrov@example.com",
    phone: "+1 (555) 123-9876",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    company: { name: "Wellness Integrative" },
    address: {
      street: "202 Redwood Terrace",
      city: "Minneapolis",
      state: "MN",
      zipcode: "55401",
      coordinates: { lat: "44.9778", lng: "-93.2650" }
    },
    bio: "Holistic health practitioner specializing in integrative medicine and nutrition. I help clients achieve optimal health through personalized wellness plans that address physical, emotional, and lifestyle factors. My practice combines evidence-based approaches with traditional healing wisdom.",
    tags: ["Integrative Medicine", "Nutrition", "Wellness"],
    website: "elenapetrov.health",
    education: "Doctor of Naturopathic Medicine, Bastyr University",
    languages: ["English", "Russian", "Ukrainian"],
    skills: ["Nutritional Analysis", "Health Coaching", "Stress Management", "Herbal Medicine"],
    hobbies: ["Medicinal herb gardening", "Cross-country skiing", "Fermenting foods"]
  },
  {
    id: 15,
    firstName: "Jamal",
    lastName: "Washington",
    email: "jamal.washington@example.com",
    phone: "+1 (555) 987-5432",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    company: { name: "Sound Innovation Studios" },
    address: {
      street: "303 Magnolia Drive",
      city: "Nashville",
      state: "TN",
      zipcode: "37203",
      coordinates: { lat: "36.1627", lng: "-86.7816" }
    },
    bio: "Music producer and audio engineer with experience across multiple genres. I help artists find their unique sound and bring their creative vision to life. My technical expertise and musical background enable me to bridge the gap between artistic expression and professional production.",
    tags: ["Music Production", "Audio Engineering", "Sound Design"],
    website: "jamalwashington.sound",
    education: "Bachelor's in Music Production, Berklee College of Music",
    languages: ["English", "Arabic"],
    skills: ["Studio Production", "Live Sound Engineering", "Mixing & Mastering", "Instrumental Arrangement"],
    hobbies: ["Jazz improvisation", "Vinyl collecting", "Building audio equipment"]
  },
  {
    id: 16,
    firstName: "Sophia",
    lastName: "Nguyen",
    email: "sophia.nguyen@example.com",
    phone: "+1 (555) 456-3210",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    company: { name: "BioTech Innovations" },
    address: {
      street: "404 Aspen Court",
      city: "Boston",
      state: "MA",
      zipcode: "02110",
      coordinates: { lat: "42.3601", lng: "-71.0589" }
    },
    bio: "Biomedical researcher specializing in regenerative medicine and tissue engineering. My work focuses on developing new therapies for degenerative diseases using stem cell technology. I'm passionate about translating laboratory discoveries into clinical applications that improve patient outcomes.",
    tags: ["Biotechnology", "Regenerative Medicine", "Research"],
    website: "sophianguyen.science",
    education: "PhD in Biomedical Engineering, MIT",
    languages: ["English", "Vietnamese", "Chinese"],
    skills: ["Stem Cell Culture", "Tissue Engineering", "Molecular Biology", "Clinical Trial Design"],
    hobbies: ["Science communication outreach", "Kayaking", "Classical piano"]
  },
  {
    id: 17,
    firstName: "Diego",
    lastName: "Herrera",
    email: "diego.herrera@example.com",
    phone: "+1 (555) 789-4561",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    company: { name: "Green Earth Sustainability" },
    address: {
      street: "505 Cedar Street",
      city: "Sacramento",
      state: "CA",
      zipcode: "95814",
      coordinates: { lat: "38.5816", lng: "-121.4944" }
    },
    bio: "Environmental scientist focusing on climate adaptation strategies and water conservation. I work with governments and organizations to develop sustainable policies that balance environmental protection with community needs. My field research informs practical solutions to pressing ecological challenges.",
    tags: ["Environmental Science", "Climate Adaptation", "Water Conservation"],
    website: "diegoherrera.environment",
    education: "Master's in Environmental Management, UC Davis",
    languages: ["English", "Spanish", "Portuguese"],
    skills: ["Environmental Impact Assessment", "GIS Mapping", "Policy Development", "Stakeholder Engagement"],
    hobbies: ["Wildlife photography", "Kayaking", "Native plant restoration"]
  },
  {
    id: 18,
    firstName: "Aisha",
    lastName: "Khan",
    email: "aisha.khan@example.com",
    phone: "+1 (555) 234-5678",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    company: { name: "Global Development Initiative" },
    address: {
      street: "606 Palm Avenue",
      city: "Washington",
      state: "DC",
      zipcode: "20001",
      coordinates: { lat: "38.9072", lng: "-77.0369" }
    },
    bio: "International development specialist with experience in humanitarian aid and education programs. I design and implement initiatives that empower communities in developing regions. My work focuses on creating sustainable solutions through local partnerships and capacity building.",
    tags: ["International Development", "Education", "Humanitarian Aid"],
    website: "aishakhan.development",
    education: "Master's in International Development, Georgetown University",
    languages: ["English", "Urdu", "Hindi", "French"],
    skills: ["Program Management", "Grant Writing", "Monitoring & Evaluation", "Cross-Cultural Leadership"],
    hobbies: ["Travel documentary making", "Cultural anthropology", "International cuisine"]
  },
  {
    id: 19,
    firstName: "Liam",
    lastName: "O'Connor",
    email: "liam.oconnor@example.com",
    phone: "+1 (555) 321-0987",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    company: { name: "Quantum Computing Labs" },
    address: {
      street: "707 Sycamore Lane",
      city: "Boulder",
      state: "CO",
      zipcode: "80302",
      coordinates: { lat: "40.0150", lng: "-105.2705" }
    },
    bio: "Quantum physicist working on the development of quantum computing applications. My research explores the intersection of quantum mechanics and information theory to solve complex computational problems. I'm passionate about making quantum concepts accessible to broader audiences.",
    tags: ["Quantum Physics", "Computing Research", "Algorithm Design"],
    website: "liamoconnor.quantum",
    education: "PhD in Quantum Physics, University of Colorado",
    languages: ["English", "Irish", "German"],
    skills: ["Quantum Algorithm Development", "Mathematical Modeling", "Scientific Computing", "Academic Publishing"],
    hobbies: ["Mountain climbing", "Science fiction writing", "Building quantum computing models"]
  }
];

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showWorldMap, setShowWorldMap] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("currentUser");
      if (userJson) {
        const user = JSON.parse(userJson);
        console.log("App.js - Current user:", user);
        setIsLoggedIn(true);
        setIsAdmin(user.isAdmin === true);
        console.log("App.js - Is admin:", user.isAdmin === true);
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
    
    // Remove the force reset so user data persists unless button is clicked
    // localStorage.removeItem("profiles");
    
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
    // Always reset to default profiles without confirmation
    localStorage.setItem("profiles", JSON.stringify(sampleProfiles));
    setProfiles(sampleProfiles);
    alert("All 19 demo profiles have been loaded!");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setIsAdmin(false);
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
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
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
                isLoggedIn && isAdmin ? (
                  <AdminPanel 
                    profiles={profiles} 
                    setProfiles={(newProfiles) => {
                      setProfiles(newProfiles);
                      localStorage.setItem("profiles", JSON.stringify(newProfiles));
                    }} 
                    resetToDefaultProfiles={resetToDefaultProfiles}
                  />
                ) : (
                  <Navigate to="/" replace />
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
