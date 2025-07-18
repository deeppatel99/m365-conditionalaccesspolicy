// Utility functions for OTP generation, email sending, and domain handling

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("../config");

// Generates a 6-digit OTP as a string
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

// Hashes the OTP using SHA-256 for secure storage
function hashOTP(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

// Sends an OTP email to the specified address
async function sendOTPEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP.host,
    port: config.SMTP.port,
    auth: {
      user: config.SMTP.user,
      pass: config.SMTP.pass,
    },
  });

  await transporter.sendMail({
    from: "no-reply@example.com",
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });
}

// Verifies if the provided OTP matches the stored hash
function verifyOTP(otp, hash) {
  return hashOTP(otp) === hash;
}

// Checks if the OTP has expired based on the expiration timestamp
function isOTPExpired(expiresAt) {
  return Date.now() > Number(expiresAt);
}

// Extracts the domain part from an email address
function extractDomain(email) {
  return email.split("@")[1];
}

// Checks if a domain is in the restrictedDomains list from config
function isRestrictedDomain(domain) {
  return config.restrictedDomains.includes(domain);
}

module.exports = {
  generateOTP, // Generate a 6-digit OTP
  hashOTP, // Hash an OTP
  sendOTPEmail, // Send an OTP email
  verifyOTP, // Verify an OTP
  isOTPExpired, // Check if OTP is expired
  extractDomain, // Extract domain from email
  isRestrictedDomain, // Check if domain is restricted
};
