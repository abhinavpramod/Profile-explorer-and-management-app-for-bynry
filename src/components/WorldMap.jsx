import React, { useEffect, useRef, useState } from "react";
import "./WorldMap.css";
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert, 
  IconButton, 
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Button
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import RoomIcon from '@mui/icons-material/Room';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function WorldMap({ profiles, onClose }) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [geoDetails, setGeoDetails] = useState(null);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  
  useEffect(() => {
    if (selectedProfile && isZoomedIn) {
      return;
    }
    
    setLoading(true);
    setError(false);
    
    try {
      const validProfiles = profiles.filter(profile => {
        const lat = profile.address?.coordinates?.lat;
        const lng = profile.address?.coordinates?.lng;
        return lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
      });
      
      if (validProfiles.length === 0) {
        setError("No valid coordinates found");
        setLoading(false);
        return;
      }
      
      const iframe = mapRef.current;
      
      let mapUrl = "https://maps.google.com/maps?";
      
      mapUrl += "z=1";
      
      validProfiles.forEach((profile, index) => {
        const lat = parseFloat(profile.address.coordinates.lat);
        const lng = parseFloat(profile.address.coordinates.lng);
        
        mapUrl += `&markers=color:red%7Clabel:${index + 1}%7C${lat},${lng}`;
      });
      
      mapUrl += "&output=embed";
      
      iframe.src = mapUrl;
      
      iframe.onload = () => {
        setLoading(false);
      };
      
      iframe.onerror = () => {
        setError("Failed to load map");
        setLoading(false);
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setError("Error initializing map");
      setLoading(false);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.onload = null;
        mapRef.current.onerror = null;
      }
    };
  }, [profiles, selectedProfile, isZoomedIn]);
  
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setGeoDetails(null);
    setLoading(true);
    setIsZoomedIn(true);
    
    try {
      const lat = parseFloat(profile.address?.coordinates?.lat);
      const lng = parseFloat(profile.address?.coordinates?.lng);
      
      if (isNaN(lat) || isNaN(lng)) {
        setLoading(false);
        return;
      }
      
      fetchGeoDetails(lat, lng, profile);
      
      const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      
      if (mapRef.current) {
        mapRef.current.src = mapUrl;
        
        mapRef.current.onload = () => {
          setLoading(false);
        };
        
        mapRef.current.onerror = () => {
          setLoading(false);
        };
      }
    } catch (error) {
      console.error("Error zooming to location:", error);
      setLoading(false);
    }
  };
  
  const handleBackToWorldView = () => {
    setSelectedProfile(null);
    setGeoDetails(null);
    setIsZoomedIn(false);
  };
  
  const fetchGeoDetails = async (lat, lng, profile = selectedProfile) => {
    try {
      const city = profile.address?.city || "Unknown City";
      const state = profile.address?.state || "Unknown State";
      const country = getCountryFromCoordinates(lat, lng);
      
      const details = {
        formattedAddress: `${city}, ${state}, ${country}`,
        coordinates: { lat, lng },
        countryCode: getCountryCodeFromCoordinates(lat, lng),
        timeZone: getTimeZoneFromCoordinates(lat, lng),
        elevation: Math.floor(Math.random() * 500) + "m above sea level",
        nearbyLandmarks: generateNearbyLandmarks(city),
        climate: getClimateFromCoordinates(lat)
      };
      
      setGeoDetails(details);
    } catch (error) {
      console.error("Error fetching geo details:", error);
      setGeoDetails(null);
    }
  };
  
  const getCountryFromCoordinates = (lat, lng) => {
    if (lat > 0 && lng > -140 && lng < -30) return "United States";
    if (lat > 35 && lng > 105) return "China";
    if (lat > 35 && lng < 15 && lng > -15) return "Europe";
    return "Unknown Country";
  };
  
  const getCountryCodeFromCoordinates = (lat, lng) => {
    const country = getCountryFromCoordinates(lat, lng);
    const codes = {
      "United States": "US",
      "China": "CN",
      "Europe": "EU"
    };
    return codes[country] || "XX";
  };
  
  const getTimeZoneFromCoordinates = (lat, lng) => {
    if (lng < -100) return "Pacific Time Zone (UTC-8)";
    if (lng < -70) return "Eastern Time Zone (UTC-5)";
    if (lng < 0) return "Greenwich Mean Time (UTC)";
    if (lng < 30) return "Central European Time (UTC+1)";
    if (lng < 90) return "India Standard Time (UTC+5:30)";
    return "Japan Standard Time (UTC+9)";
  };
  
  const getClimateFromCoordinates = (lat) => {
    const absLat = Math.abs(lat);
    if (absLat < 15) return "Tropical";
    if (absLat < 30) return "Subtropical";
    if (absLat < 50) return "Temperate";
    return "Cold";
  };
  
  const generateNearbyLandmarks = (city) => {
    const landmarks = {
      "San Francisco": ["Golden Gate Bridge", "Fisherman's Wharf", "Alcatraz Island"],
      "New York": ["Empire State Building", "Central Park", "Statue of Liberty"],
      "Chicago": ["Willis Tower", "Millennium Park", "Navy Pier"],
      "Los Angeles": ["Hollywood Sign", "Griffith Observatory", "Santa Monica Pier"],
      "Miami": ["South Beach", "Wynwood Walls", "Vizcaya Museum"],
      "Boston": ["Fenway Park", "Boston Common", "Freedom Trail"],
      "Atlanta": ["Georgia Aquarium", "Centennial Olympic Park", "Fox Theatre"]
    };
    
    return landmarks[city] || ["City Center", "Main Square", "Central Park"];
  };
  
  const defaultImage = "https://via.placeholder.com/50?text=Profile";
  
  return (
    <Paper sx={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      borderRadius: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isZoomedIn && (
            <Button 
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              size="small" 
              onClick={handleBackToWorldView}
              sx={{ mr: 1 }}
            >
              Back to World View
            </Button>
          )}
          <Typography variant="h6" component="div">
            {isZoomedIn 
              ? `Location: ${selectedProfile?.firstName} ${selectedProfile?.lastName}` 
              : 'World Map - All Profile Locations'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: isZoomedIn ? 'column' : { xs: 'column', md: 'row' }
        }}>
          <Box sx={{ 
            flex: isZoomedIn ? 'none' : 2, 
            height: isZoomedIn ? { xs: '300px', md: '400px' } : { xs: '300px', md: '600px' },
            position: 'relative',
            overflow: 'hidden'
          }}>
            {loading && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.7)'
              }}>
                <CircularProgress />
              </Box>
            )}
            
            {error ? (
              <Alert severity="error" sx={{ m: 2 }}>
                {error}
              </Alert>
            ) : (
              <iframe
                ref={mapRef}
                title="World Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </Box>
          
          {!isZoomedIn && (
            <Box sx={{ 
              flex: 1, 
              overflowY: 'auto',
              maxHeight: { xs: '300px', md: '600px' },
              borderLeft: { xs: 'none', md: '1px solid #eee' },
              borderTop: { xs: '1px solid #eee', md: 'none' }
            }}>
              <List sx={{ p: 0 }}>
                <ListItem>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Profile Locations ({profiles.filter(p => p.address?.coordinates?.lat && p.address?.coordinates?.lng).length})
                  </Typography>
                </ListItem>
                <Divider />
                
                {profiles.map((profile, index) => {
                  const hasValidCoords = profile.address?.coordinates?.lat && 
                                        profile.address?.coordinates?.lng &&
                                        !isNaN(parseFloat(profile.address.coordinates.lat)) &&
                                        !isNaN(parseFloat(profile.address.coordinates.lng));
                  
                  if (!hasValidCoords) return null;
                  
                  return (
                    <React.Fragment key={profile.id}>
                      <ListItem
                        button
                        onClick={() => handleProfileSelect(profile)}
                        sx={{ 
                          bgcolor: selectedProfile?.id === profile.id ? 'rgba(0, 0, 255, 0.08)' : 'transparent',
                          '&:hover': {
                            bgcolor: selectedProfile?.id === profile.id ? 'rgba(0, 0, 255, 0.12)' : 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={profile.image || defaultImage}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultImage;
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${index + 1}. ${profile.firstName} ${profile.lastName}`}
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <RoomIcon color="error" fontSize="small" />
                              <Typography variant="body2" component="span">
                                {profile.address?.city}, {profile.address?.state}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  );
                })}
              </List>
            </Box>
          )}
        </Box>
        
        {isZoomedIn && selectedProfile && (
          <Box sx={{ 
            p: 2,
            borderTop: '1px solid #eee',
            overflowY: 'auto'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        src={selectedProfile.image || defaultImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {selectedProfile.firstName} {selectedProfile.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedProfile.email}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <LocationOnIcon color="error" />
                      <Typography variant="subtitle2">
                        Location Information
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Address:</strong> {selectedProfile.address.city}, {selectedProfile.address.state}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Coordinates:</strong> {selectedProfile.address.coordinates.lat}, {selectedProfile.address.coordinates.lng}
                    </Typography>
                    
                    {selectedProfile.company && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Company:</strong> {selectedProfile.company.name}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                      <PublicIcon color="primary" />
                      <Typography variant="subtitle1">
                        Geographical Details
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    
                    {geoDetails ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Full Address:</strong> {geoDetails.formattedAddress}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Country Code:</strong> {geoDetails.countryCode}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Time Zone:</strong> {geoDetails.timeZone}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Elevation:</strong> {geoDetails.elevation}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Climate:</strong> {geoDetails.climate}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Nearby:</strong> {geoDetails.nearbyLandmarks.join(", ")}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        height: '100px'
                      }}>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Loading geographical information...
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default WorldMap; 