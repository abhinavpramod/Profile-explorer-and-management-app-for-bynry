import React, { useState, useEffect } from 'react';
import "./AdminPanel.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FormHelperText from '@mui/material/FormHelperText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

// Example image URLs for users to try
const exampleImageUrls = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
];

const AdminPanel = ({ profiles, onAddProfile, onUpdateProfile, onDeleteProfile }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showImageHelp, setShowImageHelp] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);
  
  // Default image if none provided or error occurs
  const defaultImage = "https://via.placeholder.com/150?text=Profile";
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    address: {
      city: '',
      state: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    }
  });

  const handleOpenAddModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      address: {
        city: '',
        state: '',
        coordinates: {
          lat: '',
          lng: ''
        }
      }
    });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (profile) => {
    setCurrentProfile(profile);
    setFormData({
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email || '',
      image: profile.image || '',
      address: {
        city: profile.address?.city || '',
        state: profile.address?.state || '',
        coordinates: {
          lat: profile.address?.coordinates?.lat || '',
          lng: profile.address?.coordinates?.lng || ''
        }
      }
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name.includes('coordinates.')) {
      const [_, coord] = name.split('coordinates.');
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          coordinates: {
            ...formData.address.coordinates,
            [coord]: value
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

  useEffect(() => {
    // Set image preview when image URL changes
    if (formData.image) {
      setImagePreview(formData.image);
      setImageError(false);
    } else {
      setImagePreview(defaultImage);
    }
  }, [formData.image]);

  const handleAddProfile = () => {
    onAddProfile({
      ...formData,
      id: Math.floor(Math.random() * 1000) + profiles.length + 1
    });
    handleCloseAddModal();
  };

  const handleUpdateProfile = () => {
    onUpdateProfile(formData);
    handleCloseEditModal();
  };

  const handleDeleteProfile = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      onDeleteProfile(id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImagePreview(defaultImage);
  };
  
  const applyExampleImage = (url) => {
    setFormData({
      ...formData,
      image: url
    });
    setShowImageHelp(false);
  };

  return (
    <div className="admin-panel">
      <h1>PROFILE MANAGEMENT</h1>
      <button className='add' onClick={handleOpenAddModal}>ADD PROFILE</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th className='user'>Full Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName} {person.lastName}</td>
              <td>{person.address?.city}, {person.address?.state}</td>
              <td className="action-buttons">
                <button className='updatebtn' onClick={() => handleOpenEditModal(person)}>EDIT</button>
                <button className='deletebtn' onClick={() => handleDeleteProfile(person.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Profile Modal */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-profile-modal"
      >
        <Box sx={modalStyle}>
          <h2>Add New Profile</h2>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Profile Image URL"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              error={imageError}
              helperText={imageError ? "Invalid image URL" : ""}
            />
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => setShowImageHelp(!showImageHelp)}
              sx={{ ml: 1, whiteSpace: 'nowrap' }}
            >
              {showImageHelp ? "Hide Help" : "Need Help?"}
            </Button>
          </Box>
          
          {showImageHelp && (
            <Box sx={{ mb: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                Examples of image URLs you can use:
              </Typography>
              <List dense>
                {exampleImageUrls.map((url, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={
                        <Link 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            applyExampleImage(url);
                          }}
                          underline="hover"
                        >
                          {url.substring(0, 40)}...
                        </Link>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mt: 2, 
            p: 2, 
            border: '1px dashed #ccc',
            borderRadius: 1
          }}>
            <Typography variant="subtitle2" gutterBottom>
              Image Preview
            </Typography>
            <Box
              component="img"
              src={imagePreview}
              alt="Profile Preview"
              onError={handleImageError}
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}
            />
          </Box>
          
          <TextField
            fullWidth
            margin="normal"
            label="City"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="State"
            name="address.state"
            value={formData.address.state}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Latitude"
            name="coordinates.lat"
            value={formData.address.coordinates.lat}
            onChange={handleInputChange}
            type="number"
            step="0.000001"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Longitude"
            name="coordinates.lng"
            value={formData.address.coordinates.lng}
            onChange={handleInputChange}
            type="number"
            step="0.000001"
          />
          <div className="modal-actions">
            <Button variant="contained" color="primary" onClick={handleAddProfile}>
              Add Profile
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseAddModal}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-profile-modal"
      >
        <Box sx={modalStyle}>
          <h2>Edit Profile</h2>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Profile Image URL"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              error={imageError}
              helperText={imageError ? "Invalid image URL" : ""}
            />
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => setShowImageHelp(!showImageHelp)}
              sx={{ ml: 1, whiteSpace: 'nowrap' }}
            >
              {showImageHelp ? "Hide Help" : "Need Help?"}
            </Button>
          </Box>
          
          {showImageHelp && (
            <Box sx={{ mb: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                Examples of image URLs you can use:
              </Typography>
              <List dense>
                {exampleImageUrls.map((url, idx) => (
                  <ListItem key={idx} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={
                        <Link 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            applyExampleImage(url);
                          }}
                          underline="hover"
                        >
                          {url.substring(0, 40)}...
                        </Link>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mt: 2, 
            p: 2, 
            border: '1px dashed #ccc',
            borderRadius: 1
          }}>
            <Typography variant="subtitle2" gutterBottom>
              Image Preview
            </Typography>
            <Box
              component="img"
              src={imagePreview}
              alt="Profile Preview"
              onError={handleImageError}
              sx={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}
            />
          </Box>
          
          <TextField
            fullWidth
            margin="normal"
            label="City"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="State"
            name="address.state"
            value={formData.address.state}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Latitude"
            name="coordinates.lat"
            value={formData.address.coordinates.lat}
            onChange={handleInputChange}
            type="number"
            step="0.000001"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Longitude"
            name="coordinates.lng"
            value={formData.address.coordinates.lng}
            onChange={handleInputChange}
            type="number"
            step="0.000001"
          />
          <div className="modal-actions">
            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminPanel;