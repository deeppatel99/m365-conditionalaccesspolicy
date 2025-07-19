import React, { useState, createContext, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import GlobalSnackbar from "./components/GlobalSnackbar";
import LoadingBackdrop from "./components/LoadingBackdrop";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import {
  SnackbarContext,
  SnackbarState,
  SnackbarSeverity,
} from "./context/SnackbarContext";
import theme from "./theme";

function App() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const showMessage = (message: string, severity: SnackbarSeverity = "info") =>
    setSnackbar({ open: true, message, severity });
  const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarContext.Provider value={{ showMessage }}>
        <Router>
          <Navbar />
          <AppRoutes snackbar={snackbar} handleClose={handleClose} />
        </Router>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

interface AppRoutesProps {
  snackbar: SnackbarState;
  handleClose: () => void;
}

function AppRoutes({ snackbar, handleClose }: AppRoutesProps) {
  const [loading, setLoading] = useState(false);
  const { useLocation } = require("react-router-dom");
  const location = useLocation();

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400); // Simulate loading for demo
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <LoadingBackdrop open={loading} />
      <GlobalSnackbar {...snackbar} onClose={handleClose} />
      {location.pathname === "/dashboard" ? (
        <Box sx={{ width: "100%", px: { xs: 0, sm: 4 }, py: { xs: 0, sm: 2 } }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      ) : (
        <Container
          maxWidth="sm"
          sx={{ mt: { xs: 2, sm: 8 }, px: { xs: 0, sm: 2 } }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      )}
    </>
  );
}

export default App;
