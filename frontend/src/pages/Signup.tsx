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
import { SignupForm, SignupErrors } from "../types/forms";
import { validateSignup } from "../utils/validation";

const initialState: SignupForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
};

const Signup: React.FC = () => {
  const [form, setForm] = useState<SignupForm>(initialState);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useContext(SnackbarContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateSignup(form);
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      // Check domain restriction
      const domain = form.email.split("@")[1];
      const check = await api.get(`/check-domain?domain=${domain}`);
      if (check.data.exists) {
        showMessage(
          "A user from your company has already registered. Please contact support.",
          "error"
        );
        setLoading(false);
        return;
      }
      // Signup API (snake_case fields)
      await api.post("/signup", {
        first_name: form.firstName,
        last_name: form.lastName,
        company: form.company,
        email: form.email,
      });
      showMessage("Signup successful! OTP sent to your email.", "success");
      navigate("/verify", { state: { email: form.email } });
    } catch (err: any) {
      const backendMsg =
        err.response?.data?.error || err.response?.data?.message;
      showMessage(backendMsg || "Signup failed", "error");
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
        Sign Up
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Company"
        name="company"
        value={form.company}
        onChange={handleChange}
        error={!!errors.company}
        helperText={errors.company}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
        type="email"
        autoComplete="email"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Button onClick={() => navigate("/login")} sx={{ mt: 1 }} fullWidth>
        Already have an account? Log in
      </Button>
    </Box>
  );
};

export default Signup;
