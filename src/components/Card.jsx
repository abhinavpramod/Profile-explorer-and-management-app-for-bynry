import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip, Divider, CircularProgress, Avatar, Box } from '@mui/material';
import GoogleMap from './Map';
import "./Card.css";
import ActionAreaCard from './Detail';

export default function CardComponent({ data, viewMode = 'grid' }) {
    const [mapVisibility, setMapVisibility] = useState({});
    const [detailVisibility, setDetailVisibility] = useState({});
    const [loading, setLoading] = useState(false);

    // Toggle map visibility for a specific profile
    const toggleMap = (id) => {
        setMapVisibility(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Toggle detail view for a specific profile
    const toggleDetail = (id) => {
        setDetailVisibility(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Default image if none provided
    const defaultImage = "https://via.placeholder.com/300x200?text=Profile+Image";

    // Simulate loading when showing map
    const handleShowMap = (id) => {
        setLoading(true);
        toggleMap(id);
        setTimeout(() => setLoading(false), 800);
    };

    // Render the grid view of profiles
    const renderGridView = () => (
        <div className='cardwrapper'>
            {data && data.length > 0 ? (
                data.map((person) => (
                    <Card 
                        sx={{ 
                            maxWidth: 345, 
                            margin: '15px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }} 
                        key={person.id}
                        className="profile-card"
                    >
                        {detailVisibility[person.id] ? (
                            <div className="detail-view">
                                <Button 
                                    size="small" 
                                    color="primary" 
                                    onClick={() => toggleDetail(person.id)}
                                    sx={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}
                                >
                                    Back
                                </Button>
                                <ActionAreaCard 
                                    index={person} 
                                    mapAlreadyOpen={mapVisibility[person.id]}
                                />
                            </div>
                        ) : (
                            <>
                                <CardActionArea onClick={() => toggleDetail(person.id)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={person.image || defaultImage}
                                        alt={`${person.firstName} ${person.lastName}`}
                                        sx={{ 
                                            objectFit: 'cover',
                                            objectPosition: 'center top',
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultImage;
                                        }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                            {person.firstName} {person.lastName}
                                        </Typography>
                                        
                                        <Divider sx={{ my: 1 }} />
                                        
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {person.email || 'No email provided'}
                                        </Typography>
                                        
                                        {person.address && (
                                            <Chip 
                                                label={`${person.address.city || ''}, ${person.address.state || ''}`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                sx={{ mt: 1 }}
                                            />
                                        )}
                                    </CardContent>
                                </CardActionArea>
                                
                                <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
                                    <Button 
                                        size="small" 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleShowMap(person.id)}
                                    >
                                        View Location
                                    </Button>
                                    <Button 
                                        size="small" 
                                        variant="outlined" 
                                        onClick={() => toggleDetail(person.id)}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                                
                                {mapVisibility[person.id] && (
                                    <div className='map-container'>
                                        {loading ? (
                                            <div className="loading-indicator">
                                                <CircularProgress size={40} />
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    Loading map...
                                                </Typography>
                                            </div>
                                        ) : (
                                            <div className='map'>
                                                <GoogleMap data={person} />
                                                <Button 
                                                    size="small" 
                                                    variant="outlined" 
                                                    color="secondary"
                                                    onClick={() => toggleMap(person.id)}
                                                    sx={{ mt: 1 }}
                                                >
                                                    Close Map
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </Card>
                ))
            ) : (
                <div className="no-results">
                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        No profiles found. Please add profiles in the admin panel.
                    </Typography>
                </div>
            )}
        </div>
    );

    // Render the list view of profiles
    const renderListView = () => (
        <div className='list-wrapper'>
            {data && data.length > 0 ? (
                data.map((person) => (
                    <Card 
                        sx={{ 
                            width: '100%', 
                            margin: '10px 0',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'box-shadow 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                            }
                        }} 
                        key={person.id}
                        className="profile-list-item"
                    >
                        {detailVisibility[person.id] ? (
                            <div className="detail-view">
                                <Button 
                                    size="small" 
                                    color="primary" 
                                    onClick={() => toggleDetail(person.id)}
                                    sx={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}
                                >
                                    Back
                                </Button>
                                <ActionAreaCard 
                                    index={person} 
                                    mapAlreadyOpen={mapVisibility[person.id]}
                                />
                            </div>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    p: 2,
                                    width: { xs: '100%', sm: '200px' },
                                    alignItems: 'center',
                                    justifyContent: 'center' 
                                }}>
                                    <Avatar
                                        src={person.image || defaultImage}
                                        alt={`${person.firstName} ${person.lastName}`}
                                        sx={{ 
                                            width: 120, 
                                            height: 120,
                                            border: '1px solid #eee'
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultImage;
                                        }}
                                    />
                                </Box>
                                
                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 1 auto' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                                {person.firstName} {person.lastName}
                                            </Typography>
                                            
                                            {person.address && (
                                                <Chip 
                                                    label={`${person.address.city || ''}, ${person.address.state || ''}`}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                        
                                        <Divider sx={{ my: 1 }} />
                                        
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                            {person.email && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Email: {person.email}
                                                </Typography>
                                            )}
                                            
                                            {person.phone && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Phone: {person.phone}
                                                </Typography>
                                            )}
                                            
                                            {person.company && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Company: {person.company.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                    
                                    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                        <Button 
                                            size="small" 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => handleShowMap(person.id)}
                                        >
                                            View Location
                                        </Button>
                                        <Button 
                                            size="small" 
                                            variant="outlined" 
                                            onClick={() => toggleDetail(person.id)}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Box>
                            </Box>
                        )}
                        
                        {mapVisibility[person.id] && (
                            <div className='map-container'>
                                {loading ? (
                                    <div className="loading-indicator">
                                        <CircularProgress size={40} />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Loading map...
                                        </Typography>
                                    </div>
                                ) : (
                                    <div className='map'>
                                        <GoogleMap data={person} />
                                        <Button 
                                            size="small" 
                                            variant="outlined" 
                                            color="secondary"
                                            onClick={() => toggleMap(person.id)}
                                            sx={{ mt: 1 }}
                                        >
                                            Close Map
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                ))
            ) : (
                <div className="no-results">
                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        No profiles found. Please add profiles in the admin panel.
                    </Typography>
                </div>
            )}
        </div>
    );

    return viewMode === 'grid' ? renderGridView() : renderListView();
}