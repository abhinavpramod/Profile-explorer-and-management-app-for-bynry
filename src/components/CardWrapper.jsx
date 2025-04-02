import React, { useEffect, useState } from 'react'
import CardComponent from './Card'
import axios from "axios";
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
// import info from './data/data.json';

const CardWrapper = ({filteredData}) => {
    const[data,setData]=useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
    
    console.log(filteredData);
    useEffect(() => {
        // Update data state when filteredData changes
        setData(filteredData);
    }, [filteredData]);
    
    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };
    
    return (
        <div>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px', 
                borderBottom: '1px solid #eee' 
            }}>
                <Typography variant="h6" component="div">
                    {data && data.length} {data && data.length === 1 ? 'Profile' : 'Profiles'}
                </Typography>
                
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    size="small"
                >
                    <ToggleButton value="grid" aria-label="grid view">
                        <GridViewIcon />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                        <ViewListIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            
            <CardComponent data={data} viewMode={viewMode} />
        </div>
    )
}

export default CardWrapper