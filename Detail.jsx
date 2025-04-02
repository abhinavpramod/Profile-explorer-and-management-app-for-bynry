import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Alert
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Map from "./Map";

const defaultImage = "https://via.placeholder.com/400x200?text=Profile+Image";

function Detail({ profiles }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('showMap') === 'true') {
      setShowMap(true);
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    try {
      if (profiles) {
        const foundProfile = profiles.find(p => p.id.toString() === id);
        if (foundProfile) {
          setProfile(foundProfile);
          setLoading(false);
        } else {
          setError("Profile not found");
          setLoading(false);
        }
      } else {
        setError("No profiles available");
        setLoading(false);
      }
    } catch (err) {
      setError("Error loading profile");
      setLoading(false);
    }
  }, [id, profiles]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const scrollToMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showMap && !loading && profile) {
      setTimeout(scrollToMap, 100);
    }
  }, [showMap, loading, profile]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
            <Skeleton variant="text" width={150} height={40} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="85%" />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="rectangular" width={120} height={36} />
          </Box>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleGoBack}
          variant="contained"
        >
          Back to Profiles
        </Button>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Loading profile...
        </Alert>
      </Box>
    );
  }
  
  const hasAddress = profile.address && 
    (profile.address.city || profile.address.state || 
    (profile.address.coordinates && (profile.address.coordinates.lat || profile.address.coordinates.lng)));
  
  const hasCoordinates = profile.address?.coordinates?.lat && profile.address?.coordinates?.lng;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4, px: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleGoBack}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Back to Profiles
      </Button>
      
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <Grid container>
          {/* Image section - displays full image */}
          <Grid item xs={12} md={5} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ p: 3, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {!imageLoaded && !imageError && (
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height="300px" 
                  animation="wave" 
                />
              )}
              <Box 
                component="img"
                src={imageError ? defaultImage : (profile.image || defaultImage)}
                alt={`${profile.firstName} ${profile.lastName}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  display: imageLoaded ? "block" : "none",
                  borderRadius: 1
                }}
              />
            </Box>
          </Grid>
          
          {/* Profile info section */}
          <Grid item xs={12} md={7} sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {profile.firstName} {profile.lastName}
            </Typography>
            
            {profile.company && profile.company.name && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BusinessIcon sx={{ mr: 1, color: "primary.main", fontSize: 20 }} />
                <Typography variant="h6" color="text.secondary">
                  {profile.company.name}
                </Typography>
              </Box>
            )}
            
            {hasAddress && (
              <Typography variant="body1" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                <LocationOnIcon sx={{ mr: 1, color: "error.main", fontSize: 20 }} />
                {profile.address.city && profile.address.state ? 
                  `${profile.address.city}, ${profile.address.state}` : 
                  "Address details incomplete"}
              </Typography>
            )}
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: "success.main", fontSize: 20 }} />
              <Typography variant="body1">
                {profile.email || "No email provided"}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, color: "info.main", fontSize: 20 }} />
              <Typography variant="body1">
                {profile.phone || "No phone provided"}
              </Typography>
            </Box>
            
            {hasCoordinates && (
              <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowMap(true);
                  setTimeout(scrollToMap, 100);
                }}
                sx={{ mt: 2 }}
              >
                View on Map
              </Button>
            )}
            
            {profile.tags && profile.tags.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.tags.map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
        
        {/* Bio section */}
        {profile.bio && (
          <>
            <Divider />
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.bio}
              </Typography>
            </Box>
          </>
        )}
        
        {/* Address section with map */}
        {hasAddress && (
          <>
            <Divider />
            <Box sx={{ p: 3 }} id="map-section">
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              
              {profile.address?.street && (
                <Typography variant="body1" paragraph>
                  {profile.address.street}
                  {profile.address.zipcode && `, ${profile.address.zipcode}`}
                  <br />
                  {profile.address.city && profile.address.state && 
                    `${profile.address.city}, ${profile.address.state}`}
                </Typography>
              )}
              
              {hasCoordinates && (
                <>
                  {!showMap && (
                    <Button 
                      variant="outlined" 
                      size="medium" 
                      onClick={toggleMap}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      Show Map
                    </Button>
                  )}
                  
                  {showMap && (
                    <>
                      <Box sx={{ height: 400, width: '100%', mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                        <Map coordinates={profile.address.coordinates} />
                      </Box>
                      
                      <Button 
                        variant="outlined" 
                        size="medium" 
                        onClick={toggleMap}
                      >
                        Hide Map
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default Detail;