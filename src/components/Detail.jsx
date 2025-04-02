import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import GoogleMap from './Map';

export default function ActionAreaCard({ index, mapAlreadyOpen = false }) {
  // Default image if none provided
  const defaultImage = "https://via.placeholder.com/300x200?text=Profile+Image";

  return (
    <Card sx={{ width: '100%', maxWidth: '100%', boxShadow: 'none' }}>
      <CardMedia
        component="img"
        height="300"
        image={index.image || defaultImage}
        alt={`${index.firstName} ${index.lastName}`}
        sx={{ 
          objectFit: 'contain',
          background: '#f5f5f5',
          padding: '10px',
          borderBottom: '1px solid #eee',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {index.firstName} {index.lastName}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">
                  {index.age || 'Not specified'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <EmailIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {index.email || 'Not provided'}
                </Typography>
              </Box>
            </Box>

            {index.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PhoneIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {index.phone}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {index.company && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <WorkIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Company
                  </Typography>
                  <Typography variant="body1">
                    {index.company.name || 'Not specified'}
                  </Typography>
                </Box>
              </Box>
            )}

            {index.university && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    University
                  </Typography>
                  <Typography variant="body1">
                    {index.university}
                  </Typography>
                </Box>
              </Box>
            )}

            {index.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <LocationOnIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {index.address.city && index.address.state 
                      ? `${index.address.city}, ${index.address.state}` 
                      : 'Address not specified'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Additional Information */}
        {index.birthDate && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Birth Date
            </Typography>
            <Typography variant="body1">
              {index.birthDate}
            </Typography>
          </Box>
        )}

        {index.bloodGroup && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Blood Group
            </Typography>
            <Typography variant="body1">
              {index.bloodGroup}
            </Typography>
          </Box>
        )}

        {/* Map View - Only show if not already opened */}
        {!mapAlreadyOpen && index.address && index.address.coordinates && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Location
            </Typography>
            <Box sx={{ height: 250, width: '100%', border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
              <GoogleMap data={index} />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}