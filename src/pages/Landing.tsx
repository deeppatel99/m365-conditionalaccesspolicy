// Landing page for the application
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      px={2}
    >
      {/* App Logo */}
      <img
        src={logo}
        alt="InactiveUsers Logo"
        style={{ width: 80, height: 80, marginBottom: 24 }}
      />
      {/* App Title */}
      <Typography variant="h4" fontWeight={700} mb={1}>
        ForSynse
      </Typography>
      {/* App Description */}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        mb={4}
        textAlign="center"
      >
        Capture leads, verify users, and keep your company secure.
        <br />
        Fast, simple, and secure onboarding.
      </Typography>
      {/* Signup Button */}
      <Button
        variant="contained"
        size="large"
        sx={{ mb: 2, width: "100%", maxWidth: 300 }}
        onClick={() => navigate("/signup")}
      >
        Get Started
      </Button>
      {/* Login Button */}
      <Button
        variant="outlined"
        size="large"
        sx={{ width: "100%", maxWidth: 300 }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default Landing;
