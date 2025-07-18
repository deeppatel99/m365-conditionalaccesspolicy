import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem("auth") === "true";

  return (
    <AppBar position="sticky" color="primary" elevation={2} sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: 36, height: 36, marginRight: 12 }}
          />
          <Typography variant="h6" fontWeight={700} noWrap>
            ForSynse
          </Typography>
        </Box>
        <Box>
          {!isAuth ? (
            <>
              {location.pathname !== "/login" && (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
              {location.pathname !== "/signup" && (
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              )}
            </>
          ) : (
            <>
              {location.pathname !== "/dashboard" && (
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              )}
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("auth");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
