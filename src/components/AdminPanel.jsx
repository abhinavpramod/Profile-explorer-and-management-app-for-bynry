import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  FormHelperText,
  Card,
  CardMedia
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import PhotoIcon from "@mui/icons-material/Photo";
import { v4 as uuidv4 } from "uuid";

function AdminPanel({ profiles, setProfiles, resetToDefaultProfiles }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    company: { name: "" },
    address: { city: "", state: "", coordinates: { lat: "", lng: "" } }
  });
  
  const exampleImageUrls = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg"
  ];
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [showImageHelp, setShowImageHelp] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProfileId, setEditProfileId] = useState(null);
  const defaultProfileImage = "https://via.placeholder.com/300x200?text=Profile+Image";
  
  useEffect(() => {
    if (imagePreview) {
      checkImageUrl(imagePreview);
    }
  }, [imagePreview]);
  
  const applyExampleImage = (url) => {
    setFormData({ ...formData, image: url });
    setShowImageHelp(false);
  };
  
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name.includes("-")) {
      const [parent, child, subchild] = name.split("-");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: {
            ...formData[parent][child],
            [subchild]: value
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const checkImageUrl = (url) => {
    if (!url) {
      setImagePreview("");
      return;
    }
    
    setImagePreview(url);
  };
  
  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      image: url
    });
    checkImageUrl(url);
  };
  
  const handlePreviewImage = () => {
    checkImageUrl(formData.image);
  };
  
  const handleResetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      image: "",
      company: { name: "" },
      address: { city: "", state: "", coordinates: { lat: "", lng: "" } }
    });
    setErrors({});
    setImagePreview("");
    setIsEditMode(false);
    setEditProfileId(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix form errors",
        severity: "error"
      });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      try {
        if (isEditMode && editProfileId) {
          const updatedProfiles = profiles.map(profile => 
            profile.id === editProfileId ? { ...formData, id: editProfileId } : profile
          );
          setProfiles(updatedProfiles);
          setSnackbar({
            open: true,
            message: "Profile updated successfully",
            severity: "success"
          });
        } else {
          const newProfile = {
            ...formData,
            id: uuidv4(),
            isFollowing: false
          };
          setProfiles([...profiles, newProfile]);
          setSnackbar({
            open: true,
            message: "Profile added successfully",
            severity: "success"
          });
        }
        handleResetForm();
        setLoading(false);
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Error: ${error.message}`,
          severity: "error"
        });
        setLoading(false);
      }
    }, 1000);
  };
  
  const handleEditProfile = (profile) => {
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      image: profile.image || "",
      company: { 
        name: profile.company?.name || "" 
      },
      address: { 
        city: profile.address?.city || "", 
        state: profile.address?.state || "",
        coordinates: {
          lat: profile.address?.coordinates?.lat || "",
          lng: profile.address?.coordinates?.lng || ""
        }
      }
    });
    setImagePreview(profile.image || "");
    setIsEditMode(true);
    setEditProfileId(profile.id);
  };
  
  const handleDeleteProfile = (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
      setProfiles(updatedProfiles);
      setSnackbar({
        open: true,
        message: "Profile deleted successfully",
        severity: "success"
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handleShowImageHelp = () => {
    setShowImageHelp(true);
  };
  
  const handleCloseImageHelp = () => {
    setShowImageHelp(false);
  };
  
  return (
    <Box sx={{ mt: 3, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Profile" : "Add New Profile"}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "flex-start",
                gap: 1 
              }}>
                <TextField
                  label="Profile Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleImageChange}
                  fullWidth
                  placeholder="Enter a URL for the profile image"
                  sx={{ flexGrow: 1 }}
                />
                <Tooltip title="Preview Image">
                  <Button 
                    variant="outlined" 
                    onClick={handlePreviewImage}
                    disabled={!formData.image}
                  >
                    <PhotoIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Get Example Image URLs">
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleShowImageHelp}
                  >
                    <HelpIcon />
                  </Button>
                </Tooltip>
              </Box>
              <FormHelperText>
                Provide a URL to an image for the profile
              </FormHelperText>
            </Grid>
            
            {imagePreview && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Preview:
                </Typography>
                <Card sx={{ maxWidth: 300, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={imagePreview}
                    alt="Profile preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfileImage;
                    }}
                  />
                </Card>
              </Grid>
            )}
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Name"
                name="company.name"
                value={formData.company.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                label="Latitude"
                name="address-coordinates-lat"
                value={formData.address.coordinates.lat}
                onChange={handleInputChange}
                fullWidth
                type="number"
                inputProps={{ step: "0.000001" }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                label="Longitude"
                name="address-coordinates-lng"
                value={formData.address.coordinates.lng}
                onChange={handleInputChange}
                fullWidth
                type="number"
                inputProps={{ step: "0.000001" }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleResetForm}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                >
                  {isEditMode ? "Update Profile" : "Add Profile"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">
            Manage Profiles ({profiles.length})
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={resetToDefaultProfiles}
          >
            Reset to Demo Profiles
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {profiles.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
            No profiles found. Add a new profile using the form above.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {profiles.map((profile) => (
              <Grid item xs={12} key={profile.id}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.03)"
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar 
                      src={profile.image || defaultProfileImage}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      sx={{ width: 50, height: 50 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProfileImage;
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {profile.firstName} {profile.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {profile.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditProfile(profile)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteProfile(profile.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      
      <Dialog
        open={showImageHelp}
        onClose={handleCloseImageHelp}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Example Profile Image URLs
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleCloseImageHelp} 
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You can use any of these example URLs for profile images:
          </Typography>
          <List>
            {exampleImageUrls.map((url, index) => (
              <ListItem 
                key={index} 
                button 
                onClick={() => applyExampleImage(url)}
                sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
              >
                <ListItemIcon>
                  <Avatar src={url} />
                </ListItemIcon>
                <ListItemText 
                  primary={url} 
                  secondary="Click to use this image" 
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="body2" paragraph>
            Alternatively, you can use any other valid image URL or leave it blank to use a default image.
          </Typography>
        </DialogContent>
      </Dialog>
      
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import EditIcon from "@mui/icons-material/Edit";

export default AdminPanel;