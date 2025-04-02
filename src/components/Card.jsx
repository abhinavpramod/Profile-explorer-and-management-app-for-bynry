import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Avatar,
  Chip,
  Skeleton,
  CardActionArea,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import "./Card.css";

function Card({ profile, viewMode = "grid", onToggleFollowStatus }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const defaultImage = "https://via.placeholder.com/150?text=Profile";

  useEffect(() => {
    setIsFollowing(profile.isFollowing || false);
  }, [profile]);

  const handleClick = (e) => {
    if (e.target.closest('.card-actions')) {
      return;
    }
    navigate(`/profile/${profile.id}`);
  };

  const handleToggleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    if (onToggleFollowStatus) {
      onToggleFollowStatus(profile.id, !isFollowing);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <MuiCard 
      className={`profile-card ${viewMode === 'list' ? 'list-view' : 'grid-view'}`} 
      elevation={3}
    >
      <CardActionArea onClick={handleClick}>
        <Box className={`card-content-wrapper ${viewMode === 'list' ? 'list-content' : 'grid-content'}`}>
          {viewMode === 'grid' && (
            <Box className="card-media-container">
              {!imageLoaded && !imageError && (
                <Skeleton 
                  variant="rectangular" 
                  animation="wave" 
                  width="100%" 
                  height={140} 
                />
              )}
              <CardMedia
                component="img"
                height="140"
                image={imageError ? defaultImage : (profile.image || defaultImage)}
                alt={`${profile.firstName} ${profile.lastName}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={!imageLoaded ? "hidden" : ""}
              />
            </Box>
          )}
          
          <CardContent className={viewMode === 'list' ? 'list-card-content' : 'grid-card-content'}>
            <Box className="card-header">
              {viewMode === 'list' && (
                <Avatar 
                  src={imageError ? defaultImage : (profile.image || defaultImage)}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  onError={handleImageError}
                  className="list-avatar"
                />
              )}
              <Box className="card-title-container">
                <Typography variant="h6" component="div" className="card-title">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-subtitle">
                  {profile.company && profile.company.name 
                    ? profile.company.name 
                    : "Independent"}
                </Typography>
              </Box>
            </Box>

            <Box className="card-details">
              <Box className="profile-detail-item">
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {profile.address 
                    ? `${profile.address.city}, ${profile.address.state}` 
                    : "Location not available"}
                </Typography>
              </Box>
              
              <Box className="profile-detail-item">
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {profile.email || "Email not available"}
                </Typography>
              </Box>
              
              <Box className="profile-detail-item">
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {profile.phone || "Phone not available"}
                </Typography>
              </Box>
            </Box>
            
            <Box className="card-tags">
              {profile.tags && profile.tags.slice(0, viewMode === 'list' ? 3 : 2).map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small" 
                  className="profile-tag" 
                />
              ))}
              {profile.tags && profile.tags.length > (viewMode === 'list' ? 3 : 2) && (
                <Chip 
                  label={`+${profile.tags.length - (viewMode === 'list' ? 3 : 2)}`} 
                  size="small" 
                  variant="outlined" 
                  className="profile-tag" 
                />
              )}
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
      
      <Box className="card-actions">
        <Tooltip title={isFollowing ? "Unfollow" : "Follow"}>
          <IconButton 
            color={isFollowing ? "primary" : "default"} 
            onClick={handleToggleFollow}
            className="follow-button"
          >
            {isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </MuiCard>
  );
}

export default Card;