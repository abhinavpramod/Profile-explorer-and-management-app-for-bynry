import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import { Alert, Typography } from "@mui/material";

function GoogleMap({ data }) {
  const iframeRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setMapError(false);
    
    // Try to get coordinates from the data
    let lat, lng;
    
    if (data.address && data.address.coordinates) {
      lat = data.address.coordinates.lat;
      lng = data.address.coordinates.lng;
    } else if (data.address && data.address.geolocation) {
      // Fallback for API data format
      lat = data.address.geolocation.lat;
      lng = data.address.geolocation.long;
    }
    
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      const iframe = iframeRef.current;
      
      try {
        iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&output=embed`;
        
        // Handle iframe load event
        iframe.onload = () => {
          setIsLoading(false);
        };
        
        // Handle iframe error
        iframe.onerror = () => {
          setMapError(true);
          setIsLoading(false);
        };
      } catch (error) {
        console.error("Map loading error:", error);
        setMapError(true);
        setIsLoading(false);
      }
    } else {
      setMapError(true);
      setIsLoading(false);
      console.warn("Invalid coordinates for map:", data);
    }
    
    // Cleanup
    return () => {
      if (iframeRef.current) {
        iframeRef.current.onload = null;
        iframeRef.current.onerror = null;
      }
    };
  }, [data]);

  return (
    <div className="map-wrapper">
      {isLoading && (
        <div className="map-loading">
          <Typography variant="body2" color="text.secondary">
            Loading map...
          </Typography>
        </div>
      )}
      
      {mapError ? (
        <Alert severity="warning" sx={{ width: '100%' }}>
          Could not load the map. Please check if coordinates are valid.
        </Alert>
      ) : (
        <iframe
          ref={iframeRef}
          title="Google Map"
          height="300"
          width="100%"
          style={{ border: 0, borderRadius: '4px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
}

export default GoogleMap;
