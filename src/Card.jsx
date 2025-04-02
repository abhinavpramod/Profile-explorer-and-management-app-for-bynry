import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card as MuiCard,
  Typography,
  Box,
  Chip,
  Skeleton,
  CardActionArea,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  DialogActions
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import "./Card.css";

function Card({ profile, viewMode = "grid" }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const defaultImage = "https://via.placeholder.com/150?text=Profile";
  
  // Add state for the image dialog
  const [imageDialog, setImageDialog] = useState(false);

  const handleClick = () => {
    // Navigate to profile details with map parameter
    navigate(`/profile/${profile.id}?showMap=true`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };
  
  // Close the image dialog
  const handleCloseImageDialog = () => {
    setImageDialog(false);
  };
  
  // Navigate to profile details page
  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}`);
    handleCloseImageDialog();
  };

  // For grid view
  if (viewMode === 'grid') {
    return (
      <>
        <MuiCard className="profile-card grid-view" elevation={2}>
          <CardActionArea onClick={handleClick}>
            <Box className="grid-content-wrapper">
              <Box className="grid-image-container">
                {!imageLoaded && !imageError && (
                  <Skeleton 
                    variant="rectangular" 
                    animation="wave" 
                    width="100%" 
                    height={200} 
                  />
                )}
                <img
                  src={imageError ? defaultImage : (profile.image || defaultImage)}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`${!imageLoaded ? "hidden" : ""} grid-profile-image`}
                />
              </Box>
              <Box className="grid-info-container">
                <Typography variant="h6" component="div" className="profile-name">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" className="profile-company">
                  {profile.company && profile.company.name 
                    ? profile.company.name 
                    : "Independent"}
                </Typography>
                
                <Box className="grid-details">
                  <Box className="grid-detail-item">
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">
                      {profile.address 
                        ? `${profile.address.city}, ${profile.address.state}` 
                        : "Location not available"}
                    </Typography>
                  </Box>
                  
                  <Box className="grid-detail-item">
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {profile.email || "Email not available"}
                    </Typography>
                  </Box>
                  
                  <Box className="grid-detail-item">
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2">
                      {profile.phone || "Phone not available"}
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="grid-tags">
                  {profile.tags && profile.tags.slice(0, 3).map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small" 
                      className="grid-tag-chip" 
                    />
                  ))}
                  {profile.tags && profile.tags.length > 3 && (
                    <Chip 
                      label={`+${profile.tags.length - 3}`} 
                      size="small" 
                      variant="outlined" 
                      className="more-tags-chip" 
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </CardActionArea>
        </MuiCard>
        
        {/* Full Image Dialog for Grid View */}
        <Dialog
          open={imageDialog}
          onClose={handleCloseImageDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              overflow: 'visible',
              borderRadius: 2
            }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {profile.firstName} {profile.lastName}'s Profile
              <IconButton 
                edge="end" 
                color="inherit" 
                onClick={handleCloseImageDialog} 
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ padding: 0, overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                width: '100%',
                height: '500px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <img
                src={imageError ? defaultImage : (profile.image || defaultImage)}
                alt={`${profile.firstName} ${profile.lastName}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', py: 2, px: 3 }}>
            <Button onClick={handleViewProfile} variant="outlined">
              View Profile Details
            </Button>
            <Button onClick={handleCloseImageDialog} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // For list view
  return (
    <>
      <Paper className="list-card" elevation={2}>
        <CardActionArea onClick={handleClick} className="list-card-action">
          <Box className="list-content-wrapper">
            {/* Left section - Image */}
            <Box className="list-image-container">
              {!imageLoaded && !imageError && (
                <Skeleton 
                  variant="rectangular" 
                  animation="wave" 
                  width="100%" 
                  height="100%" 
                />
              )}
              <img
                src={imageError ? defaultImage : (profile.image || defaultImage)}
                alt={`${profile.firstName} ${profile.lastName}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`${!imageLoaded ? "hidden" : ""} list-profile-image`}
              />
            </Box>
            
            {/* Right section - All information */}
            <Box className="list-info-container">
              <Box className="list-name-container">
                <Typography variant="h6" component="div" className="list-name">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Box className="list-company-container">
                  <BusinessIcon fontSize="small" className="company-icon" />
                  <Typography variant="body2" className="list-company">
                    {profile.company && profile.company.name 
                      ? profile.company.name 
                      : "Independent"}
                  </Typography>
                </Box>
              </Box>
              
              <Box className="list-contact-info">
                <Box className="list-detail-item">
                  <LocationOnIcon fontSize="small" className="location-icon" />
                  <Typography variant="body2" className="list-detail-text">
                    {profile.address 
                      ? `${profile.address.city}, ${profile.address.state}` 
                      : "Location not available"}
                  </Typography>
                </Box>
                
                <Box className="list-detail-item">
                  <EmailIcon fontSize="small" className="email-icon" />
                  <Typography variant="body2" className="list-detail-text" noWrap>
                    {profile.email || "Email not available"}
                  </Typography>
                </Box>
                
                <Box className="list-detail-item">
                  <PhoneIcon fontSize="small" className="phone-icon" />
                  <Typography variant="body2" className="list-detail-text">
                    {profile.phone || "Phone not available"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Paper>
      
      {/* Full Image Dialog for List View */}
      <Dialog
        open={imageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            overflow: 'visible',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {profile.firstName} {profile.lastName}'s Profile
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleCloseImageDialog} 
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: 0, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              width: '100%',
              height: '500px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img
              src={imageError ? defaultImage : (profile.image || defaultImage)}
              alt={`${profile.firstName} ${profile.lastName}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', py: 2, px: 3 }}>
          <Button onClick={handleViewProfile} variant="outlined">
            View Profile Details
          </Button>
          <Button onClick={handleCloseImageDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Card;