// Login page for existing users
import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../context/SnackbarContext";
import api from "../utils/api";
import { LoginForm, LoginErrors } from "../types/forms";
import { validateLogin } from "../utils/validation";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useContext(SnackbarContext);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateLogin({ email });
    if (Object.keys(errs).length) {
      setError(errs.email || "");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Call login API
      await api.post("/login", { email });
      showMessage("OTP sent to your email.", "success");
      navigate("/verify", { state: { email } });
    } catch (err: any) {
      const backendMsg =
        err.response?.data?.error || err.response?.data?.message;
      showMessage(backendMsg || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 2 }}
    >
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      {/* Email Field */}
      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        error={!!error}
        helperText={error}
        fullWidth
        margin="normal"
        type="email"
        autoComplete="email"
      />
      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Send OTP"}
      </Button>
      {/* Link to Signup */}
      <Button onClick={() => navigate("/signup")} sx={{ mt: 1 }} fullWidth>
        New user? Sign up
      </Button>
    </Box>
  );
};

export default Login;
