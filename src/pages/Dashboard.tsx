// Dashboard page for authenticated users
import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to login if not authenticated
    if (localStorage.getItem("auth") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Handle logout and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Box sx={{ mt: 2, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" mb={2}>
        Welcome to the Dashboard!
      </Typography>
      <Typography variant="body1" mb={2}>
        You are authenticated.
      </Typography>
      {/* Logout Button */}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
