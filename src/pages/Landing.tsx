// Landing page for the application
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/logokit/fs-bkg-1440.png";
import logo from "../assets/logokit/Forsynse logo_Bold_white.svg";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      px={2}
      sx={{
        bgcolor: "background.default",
        borderRadius: 0,
        boxShadow: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(36, 41, 46, 0.45)",
          backdropFilter: "blur(2px)",
          zIndex: 1,
        }}
      />
      {/* App Logo */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={logo}
          alt="ForSynse Logo"
          style={{
            width: 180,
            height: "auto",
            marginBottom: 28,
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        />
        {/* App Description */}
        <Typography
          variant="subtitle1"
          color="#e0e7ef"
          mb={4}
          textAlign="center"
          sx={{ maxWidth: 420 }}
        >
          Capture leads, verify users, and keep your company secure.
          <br />
          Fast, simple, and secure onboarding.
        </Typography>
        {/* Signup Button */}
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            mb: 2,
            width: "100%",
            maxWidth: 300,
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
        {/* Login Button */}
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          sx={{
            width: "100%",
            maxWidth: 300,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: 18,
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              borderColor: "#fff",
              background: "rgba(255,255,255,0.08)",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
