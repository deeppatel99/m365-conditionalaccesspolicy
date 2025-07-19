// OTP verification page for users
import React, { useState, useContext, FormEvent } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { SnackbarContext } from "../context/SnackbarContext";
import api from "../utils/api";
import OtpInput from "../components/OtpInput";

const Verify: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { showMessage } = useContext(SnackbarContext);
  const email = (location.state as { email?: string })?.email;

  // Handle OTP form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!otp || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      // Call verify-otp API
      await api.post("/verify-otp", { email, otp });
      localStorage.setItem("auth", "true");
      showMessage("OTP verified! Welcome.", "success");
      navigate("/dashboard");
    } catch (err: any) {
      showMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "OTP verification failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // If no email is provided, prompt user to start from signup or login
  if (!email)
    return (
      <Typography color="error">
        No email provided. Please start from signup or login.
      </Typography>
    );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 2 }}
    >
      <Typography variant="h5" mb={2} align="center">
        Verify OTP
      </Typography>
      <Typography variant="body2" mb={2} align="center">
        Enter the 6-digit code sent to <b>{email}</b>
      </Typography>
      {/* OTP Input Field */}
      <OtpInput value={otp} onChange={setOtp} length={6} />
      {/* Error Message */}
      {error && (
        <Typography color="error" align="center" mb={2}>
          {error}
        </Typography>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Verify"}
      </Button>
    </Box>
  );
};

export default Verify;
