const authService = require("../services/authService");

// Handle user signup requests
exports.signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Handle sending OTP requests
exports.sendOtp = async (req, res) => {
  try {
    const result = await authService.sendOtp(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Handle OTP verification requests
exports.verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Handle user login requests
exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Handle domain check requests
exports.checkDomain = async (req, res) => {
  try {
    const result = await authService.checkDomain(req.query);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
