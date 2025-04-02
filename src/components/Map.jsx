import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from "@mui/material";

function Map({ coordinates }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let lat, lng;
    
    if (coordinates?.lat && coordinates?.lng) {
      lat = parseFloat(coordinates.lat);
      lng = parseFloat(coordinates.lng);
    } else if (coordinates?.location) {
      lat = parseFloat(coordinates.location.lat);
      lng = parseFloat(coordinates.location.lng);
    }
    
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      setError("Invalid coordinates provided");
      setLoading(false);
      return;
    }

    const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`;
    const iframe = mapRef.current;
    
    iframe.src = mapUrl;
    
    iframe.onload = () => {
      setLoading(false);
    };
    
    iframe.onerror = () => {
      setError("Failed to load map");
      setLoading(false);
    };

    return () => {
      if (mapRef.current) {
        mapRef.current.onload = null;
        mapRef.current.onerror = null;
      }
    };
  }, [coordinates]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden"
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            zIndex: 10
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error ? (
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      )}
    </Paper>
  );
}

export default Map;
