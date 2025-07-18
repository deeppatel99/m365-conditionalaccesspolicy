// Service layer for authentication-related business logic
const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const { generateUserId } = require("../utils/csvUtil");
const {
  generateOTP,
  hashOTP,
  verifyOTP,
  isOTPExpired,
  extractDomain,
  isRestrictedDomain,
} = require("../utils/otpUtil");
const emailService = require("./emailService");

// Helper function to sanitize input strings
function sanitize(str) {
  return String(str || "")
    .replace(/[^a-zA-Z0-9@.\-_\'\s]/g, "")
    .trim();
}

// Handles user signup logic
exports.signup = async (body) => {
  let { first_name, last_name, company, email } = body;
  // Sanitize all input fields
  first_name = sanitize(first_name);
  last_name = sanitize(last_name);
  company = sanitize(company);
  email = sanitize(email);

  // Extract domain from email
  const domain = extractDomain(email);
  // Check if the domain is restricted
  if (isRestrictedDomain(domain)) {
    const err = new Error(
      "Registration from this email domain is not allowed."
    );
    err.status = 403;
    throw err;
  }
  // Check if a user from this domain already exists
  const existing = await userModel.findByDomain(domain);
  if (existing) {
    const err = new Error(
      "A user from your company has already registered. Please contact support."
    );
    err.status = 403;
    throw err;
  }

  // Create new user object
  const user = {
    id: generateUserId(),
    first_name,
    last_name,
    company,
    email,
    domain,
    created_at: new Date().toISOString(),
    querycount: 0,
    querymax: 10,
    verified: "false",
  };
  await userModel.create(user);

  // Generate and send OTP for verification
  const otp = generateOTP();
  const hashed = hashOTP(otp);
  const otpRecord = {
    email,
    otp: hashed,
    expires_at: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
  };
  await otpModel.create(otpRecord);
  // await emailService.sendOTPEmail(email, otp);

  return { message: "User registered. OTP sent." };
};

// Handles sending OTP to a user
exports.sendOtp = async (body) => {
  let { email } = body;
  email = sanitize(email);
  const otp = generateOTP();
  const hashed = hashOTP(otp);
  const otpRecord = {
    email,
    otp: hashed,
    expires_at: Date.now() + 10 * 60 * 1000,
  };
  await otpModel.create(otpRecord);
  // await emailService.sendOTPEmail(email, otp);
  return { message: "OTP sent" };
};

// Handles OTP verification
exports.verifyOtp = async (body) => {
  let { email, otp } = body;
  email = sanitize(email);
  otp = sanitize(otp);
  const otpEntry = await otpModel.findLatestByEmail(email);
  if (!otpEntry) {
    const err = new Error("No OTP found for this email.");
    err.status = 400;
    throw err;
  }
  if (isOTPExpired(otpEntry.expires_at)) {
    const err = new Error("OTP expired.");
    err.status = 400;
    throw err;
  }
  if (!verifyOTP(otp, otpEntry.otp)) {
    const err = new Error("Invalid OTP.");
    err.status = 400;
    throw err;
  }
  await userModel.updateByEmail(email, { verified: "true" });
  return { message: "OTP verified. Access granted." };
};

// Handles login logic (sends OTP for login)
exports.login = async (body) => {
  let { email } = body;
  email = sanitize(email);
  const user = await userModel.findByEmail(email);
  if (!user) {
    const err = new Error("User not found. Please sign up.");
    err.status = 404;
    throw err;
  }
  const otp = generateOTP();
  const hashed = hashOTP(otp);
  const otpRecord = {
    email,
    otp: hashed,
    expires_at: Date.now() + 10 * 60 * 1000,
  };
  await otpModel.create(otpRecord);
  // await emailService.sendOTPEmail(email, otp);
  return { message: "OTP sent for login." };
};

// Checks if a domain already has a registered user
exports.checkDomain = async (query) => {
  let { email } = query;
  email = sanitize(email);
  const domain = extractDomain(email);
  const exists = !!(await userModel.findByDomain(domain));
  return { exists };
};
