import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Divider,
  Grid,
  Paper,
  Link,
  IconButton,
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
        fetch(`https://fakestoreapi.com/users/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Profile not found');
            }
            return response.json();
          })
          .then(data => {
            setProfile(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
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
        <Box sx={{ position: "relative", height: "200px", overflow: "hidden", bgcolor: "#f5f5f5" }}>
          {!imageLoaded && !imageError && (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
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
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: imageLoaded ? "block" : "none"
            }}
          />
          <Box 
            sx={{ 
              position: "absolute", 
              bottom: 0, 
              left: 0, 
              right: 0, 
              p: 2,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              color: "white"
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {profile.firstName} {profile.lastName}
            </Typography>
          </Box>
        </Box>
        
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  {profile.email || "No email provided"}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  {profile.phone || "No phone provided"}
                </Typography>
              </Box>
              
              {profile.company && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <BusinessIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="body1">
                    {profile.company.name || "No company information"}
                    {profile.company.title && ` (${profile.company.title})`}
                  </Typography>
                </Box>
              )}
              
              {hasAddress && (
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 2, color: "primary.main", mt: 0.5 }} />
                  <Box>
                    <Typography variant="body1">
                      {profile.address.city && profile.address.state ? 
                        `${profile.address.city}, ${profile.address.state}` : 
                        "Address details incomplete"}
                    </Typography>
                    
                    {profile.address.street && (
                      <Typography variant="body2" color="text.secondary">
                        {profile.address.street}
                        {profile.address.number && `, ${profile.address.number}`}
                        {profile.address.zipcode && `, ${profile.address.zipcode}`}
                      </Typography>
                    )}
                    
                    {(profile.address.coordinates?.lat || profile.address.coordinates?.lng) && (
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={toggleMap}
                        sx={{ mt: 1 }}
                      >
                        {showMap ? "Hide Map" : "Show Map"}
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
              
              {showMap && profile.address && profile.address.coordinates && (
                <Box sx={{ height: 300, mt: 2, mb: 2 }}>
                  <Map coordinates={profile.address.coordinates} />
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              {profile.bio && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Bio
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {profile.bio}
                  </Typography>
                </Box>
              )}
              
              {profile.website && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Website
                  </Typography>
                  <Link 
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {profile.website}
                  </Link>
                </Box>
              )}
              
              {profile.tags && profile.tags.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tags
                  </Typography>
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
              
              {profile.friends && profile.friends.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Connections
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.friends.map((friend, index) => (
                      <Chip 
                        key={index}
                        avatar={<Avatar src={friend.image} />}
                        label={`${friend.firstName} ${friend.lastName}`}
                        size="medium"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Box>
  );
}

export default Detail;