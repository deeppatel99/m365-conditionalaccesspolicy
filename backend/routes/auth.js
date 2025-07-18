const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const rateLimiter = require("../middlewares/rateLimiter");
const {
  signupSchema,
  sendOtpSchema,
  verifyOtpSchema,
  loginSchema,
} = require("../validations/authValidation");

// POST /signup
router.post("/signup", validate(signupSchema), authController.signup);

// POST /send-otp
router.post(
  "/send-otp",
  rateLimiter,
  validate(sendOtpSchema),
  authController.sendOtp
);

// POST /verify-otp
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);

// POST /login
router.post("/login", validate(loginSchema), authController.login);

// GET /check-domain?email=...
router.get("/check-domain", authController.checkDomain);

module.exports = router;
