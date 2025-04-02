import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Pagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import CachedIcon from "@mui/icons-material/Cached";

import Card from "./Card";

function CardWrapper({ profiles, loadingProfiles }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const itemsPerPage = 8;

  useEffect(() => {
    if (profiles) {
      const filterData = profiles.filter(profile => {
        const matchesSearch = searchTerm === "" || 
          `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesState = selectedState === "" || 
          profile.address?.state?.toLowerCase() === selectedState.toLowerCase();
        
        return matchesSearch && matchesState;
      });
      
      setFilteredData(filterData);
      setPage(1);
    }
  }, [profiles, searchTerm, selectedState]);

  useEffect(() => {
    if (profiles) {
      const states = [...new Set(profiles
        .filter(profile => profile.address && profile.address.state)
        .map(profile => profile.address.state))];
      
      setAvailableStates(states.sort());
    }
  }, [profiles]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedState("");
    setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const getPageData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loadingProfiles) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Box sx={{ 
        mb: 3, 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2 
      }}>
        <TextField
          label="Search profiles"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <ClearIcon 
                  style={{ cursor: "pointer" }} 
                  onClick={handleClearSearch}
                />
              </InputAdornment>
            )
          }}
        />
        
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={toggleFilters}
          sx={{ minWidth: "120px" }}
        >
          Filters
        </Button>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
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
      
      {showFilters && (
        <Paper sx={{ p: 2, mb: 3 }} elevation={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Filter by State</FormLabel>
                <RadioGroup value={selectedState} onChange={handleStateChange}>
                  <FormControlLabel 
                    value="" 
                    control={<Radio />} 
                    label="All States" 
                  />
                  {availableStates.map(state => (
                    <FormControlLabel 
                      key={state} 
                      value={state} 
                      control={<Radio />} 
                      label={state} 
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleClearFilters}
                  startIcon={<CachedIcon />}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
      
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle1" component="div">
            {filteredData.length} {filteredData.length === 1 ? 'profile' : 'profiles'} found
          </Typography>
          
          {selectedState && (
            <Chip 
              label={`State: ${selectedState}`} 
              onDelete={handleClearFilters}
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      </Box>
      
      {filteredData.length > 0 ? (
        <Box>
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: viewMode === "grid" 
              ? { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" } 
              : "1fr", 
            gap: viewMode === "grid" ? 3 : 2,
            mb: 4
          }}>
            {getPageData().map(profile => (
              <Card 
                key={profile.id} 
                profile={profile} 
                viewMode={viewMode}
              />
            ))}
          </Box>
          
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>
      ) : (
        <Paper 
          sx={{ 
            p: 4, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }} 
          elevation={1}
        >
          <Typography variant="h6" gutterBottom>
            No profiles match your search criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Try adjusting your search or filter settings
          </Typography>
          <Button 
            variant="outlined" 
            onClick={handleClearFilters}
            startIcon={<CachedIcon />}
          >
            Clear All Filters
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default CardWrapper;